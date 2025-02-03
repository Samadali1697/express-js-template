import request from "supertest"
import express from "express"
import { Repository } from "typeorm"
import PersonEntity from "../../main/domain/person"
import { PersonRouter } from "../../main/person/person-router"

describe("Person Router Test", () => {
  let mockPersonRepository: Partial<Repository<PersonEntity>>
  let app: express.Application

  beforeEach(() => {
    mockPersonRepository = {
      findBy: jest.fn(),
    }

    app = express()
    app.use(express.json())
    app.use("/api", PersonRouter(mockPersonRepository as Repository<PersonEntity>))
  })

  test("GET /api/person - should return 400 if name query is missing", async () => {
    const res = await request(app).get("/api/person")
    expect(res.status).toBe(400)
    expect(res.body).toEqual({ error: "Missing 'name' query parameter" })
  })

  test("GET /api/person?name=Alice - should return the correct person", async () => {
    (mockPersonRepository.findBy as jest.Mock).mockResolvedValue([
      {
        id: 1,
        name: "Alice",
        address: "Berlin, Germany",
        isMarried: true,
      },
    ])

    const res = await request(app).get("/api/person").query({ name: "Alice" })
    expect(res.status).toBe(200)
    expect(res.body).toEqual([
      {
        id: 1,
        name: "Alice",
        address: "Berlin, Germany",
        isMarried: true,
      },
    ])
  })

  test("POST /api/person - should return 409 if person already exists", async () => {
    (mockPersonRepository.findBy as jest.Mock).mockResolvedValue([{ id: 1, name: "Alice" }])

    const res = await request(app).post("/api/person").send({
      name: "Alice",
      address: "Berlin",
      isMarried: true,
    })

    expect(res.status).toBe(409)
    expect(res.body).toEqual({ error: "Person already exists!" })
  })

  test("POST /api/person - should create a new person", async () => {
    (mockPersonRepository.findBy as jest.Mock).mockResolvedValue([])

    mockPersonRepository.save = jest.fn().mockResolvedValue({
      id: 2,
      name: "Bob",
      address: "Hamburg",
      isMarried: false,
    })

    const res = await request(app).post("/api/person").send({
      name: "Bob",
      address: "Hamburg",
      isMarried: false,
    })

    expect(res.status).toBe(200)
    expect(res.body).toEqual({
      id: 2,
      name: "Bob",
      address: "Hamburg",
      isMarried: false,
    })
  })

  test("DELETE /api/person/:id - should return 404 if person not found", async () => {
    mockPersonRepository.findOneBy = jest.fn().mockResolvedValue(null)

    const res = await request(app).delete("/api/person/99")

    expect(res.status).toBe(404)
    expect(res.body).toEqual({ error: "Person not found!" })
  })

  test("DELETE /api/person/:id - should delete person", async () => {
    mockPersonRepository.findOneBy = jest.fn().mockResolvedValue([{ 
      id: 1, name: "Alice", address: "Berlin", isMarried: false 
    }])
    mockPersonRepository.createQueryBuilder = jest.fn().mockReturnValue({
      delete: jest.fn().mockReturnThis(),
      from: jest.fn().mockReturnThis(),
      where: jest.fn().mockReturnThis(),
      execute: jest.fn().mockResolvedValue({ affected: 1 })
    })

    const res = await request(app).delete("/api/person/1")

    expect(mockPersonRepository.createQueryBuilder).toHaveBeenCalled()
    expect(res.status).toBe(200)
    expect(res.body).toEqual([{"address": "Berlin", "id": 1, "isMarried": false, "name": "Alice"}])
  })
})

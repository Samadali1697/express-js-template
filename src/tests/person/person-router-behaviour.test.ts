import request from "supertest"
import { DataSource } from "typeorm"
import { StartedPostgreSqlContainer } from "@testcontainers/postgresql"
import express from "express"
import { Repository } from "typeorm"
import PersonEntity from "../../main/domain/person"
import { PersonRouter } from "../../main/person/person-router"
import { containerPromise, createDataSource } from "../utils/postgres-container-initializer"
import { console } from "inspector"

let dataSource: DataSource
let container: StartedPostgreSqlContainer
let app: express.Express
let personRepository: Repository<PersonEntity>

beforeAll(async () => {
  container = await containerPromise
  dataSource = await createDataSource(container)

  personRepository = dataSource.getRepository(PersonEntity)

  app = express()
  app.use(express.json())
  app.use(PersonRouter(personRepository))
})

afterAll(async () => {
  await dataSource.destroy()
  await container.stop()
})

describe("Person API", () => {
  const reqBody = { name: "John Doe", address: "123 Street", isMarried: false }
  it("should create a person", async () => {
    const res = await request(app)
      .post("/person")
      .send(reqBody)

    expect(res.status).toBe(200)
    expect(res.body.name).toBe("John Doe")

    const personsFound = await personRepository.findBy({ name: "John Doe" })
    expect(personsFound).toMatchObject([{
      name: reqBody.name,
      address: reqBody.address,
      isMarried: reqBody.isMarried,
    }])
  })

  it("should not allow duplicate persons", async () => {
    const res = await request(app)
      .post("/person")
      .send({ name: "John Doe", address: "123 Street", isMarried: false })

    expect(res.status).toBe(409)
    expect(res.body.error).toBe("Person already exists!")

    const personsFound = await personRepository.findBy({ name: "John Doe" })
    expect(personsFound).toMatchObject([{
      name: reqBody.name,
      address: reqBody.address,
      isMarried: reqBody.isMarried,
    }])
  })

  it("should retrieve an existing person", async () => {
    const res = await request(app).get("/person?name=John Doe")

    expect(res.status).toBe(200)
    expect(res.body[0].name).toBe("John Doe")
  })

  it("should return 404 for non-existing person", async () => {
    const res = await request(app).get("/person?name=Jane Doe")

    expect(res.status).toBe(404)
    expect(res.body.error).toBe("Person not found!")

    const personsFound = await personRepository.findBy({ name: "Jane Doe" })
    expect(personsFound).toHaveLength(0)
  })

  it("should delete an existing person", async () => {
    const getPersonRes = await request(app).get("/person?name=John Doe")
    const personId = getPersonRes.body[0].id

    const deleteRes = await request(app).delete(`/person/${personId}`)
    expect(deleteRes.status).toBe(200)

    const checkAgainRes = await request(app).get("/person?name=John Doe")
    expect(checkAgainRes.status).toBe(404)

    const personsFound = await personRepository.findBy({ name: "John Doe" })
    expect(personsFound).toHaveLength(0)
  })
})

import request from "supertest"
import express from "express"
import personController from "../../main/person/person-controller"

const app = express()
app.use(express.json())
app.use("/api", personController)

describe("Person Controller", () => {
  test("GET /api/person - should return 400 if name query is missing", async () => {
    const res = await request(app).get("/api/person")
    expect(res.status).toBe(400)
    expect(res.body).toEqual({ error: "Missing 'name' query parameter" })
  })

  test("GET /api/person?name=Alice - should return the correct person", async () => {
    const res = await request(app).get("/api/person").query({ name: "Alice" })
    expect(res.status).toBe(200)
    expect(res.body).toEqual({
      id: 1,
      name: "Alice",
      address: "Berlin, Germany",
      isMarried: true
    })
  })

  test("GET /api/person?name=Unknown - should return 404 if person is not found", async () => {
    const res = await request(app).get("/api/person").query({ name: "Unknown" })
    expect(res.status).toBe(404)
    expect(res.body).toEqual({ error: "Person not found!" })
  })

  test("POST /api/person - should add a new person", async () => {
    const newPerson = { id: 3, name: "Charlie", address: "Hamburg, Germany", isMarried: false }
    const res = await request(app).post("/api/person").send(newPerson)

    expect(res.status).toBe(200)
    expect(res.body).toEqual(newPerson)
  })

  test("DELETE /api/person/:id - should delete a person if found", async () => {
    const res = await request(app).delete("/api/person/1")
    expect(res.status).toBe(200)
    expect(res.body).toEqual([{ id: 1, name: "Alice", address: "Berlin, Germany", isMarried: true }])
  })

  test("DELETE /api/person/:id - should return 404 if person not found", async () => {
    const res = await request(app).delete("/api/person/99")
    expect(res.status).toBe(404)
    expect(res.body).toEqual({ error: "Person not found!" })
  })
})

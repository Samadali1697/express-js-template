import express from "express"
import type { Request, Response } from "express"
import { Person } from "./types/Person"

const app = express()
app.use(express.json())
const PORT = 4000
const people: Person[] = [
  { id: 1, name: "Alice", address: "Berlin, Germany", isMarried: true },
  { id: 2, name: "Bob", address: "Munich, Germany", isMarried: false }
]

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`)
})

app.get("/api/person", (req: Request, res: Response) => {
  let searchPerson = req.query.name as string | undefined

  if (!searchPerson) {
    res.status(400).json({ error: "Missing 'name' query parameter" })
    return
  }

  const person = people.find(p => p.name.toLowerCase() === searchPerson.toLowerCase())

  if (!person) {
    res.status(404).json({ error: "Person not found!" })
    return
  }

  res.json(person)
})

app.post("/api/person", (req: Request<Person>, res: Response) => {
  const person: Person = req.body

  people.push(person)

  res.json(person)
})

app.delete("/api/person/:id", (req: Request, res: Response) => {
  const { id } = req.params;
  console.log(id)

  const personIndex = people.findIndex(p => p.id === parseInt(id))
  if (personIndex === -1) {
    res.status(404).json({ error: "Person not found!" })
    return
  }
  // console.log(personIndex)
  const deletedPerson = people.splice(personIndex, 1)

  res.json(deletedPerson)
})
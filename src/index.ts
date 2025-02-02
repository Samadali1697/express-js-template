import express from "express"
import type { Request, Response } from "express"
import { Person } from "./types/Person"

const app = express()
const PORT = 4000
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`)
})

app.get("/api/person", (req: Request, res: Response) => {
  let searchPerson = req.query.name as string | undefined

  if (!searchPerson) {
    res.status(400).json({ error: "Missing 'name' query parameter" })
    return
  }

  const people: Person[] = [
    { id: 1, name: "Alice", address: "Berlin, Germany", isMarried: true },
    { id: 2, name: "Bob", address: "Munich, Germany", isMarried: false }
  ]

  const person = people.find(p => p.name.toLowerCase() === searchPerson.toLowerCase())

  if (!person) {
    res.status(404).json({ error: "Person not found!" })
    return
  }

  res.json(person)
})
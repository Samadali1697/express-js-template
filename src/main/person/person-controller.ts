import type { Request, Response } from "express"
import express from "express"
import { Person } from "./types/person"

const router = express.Router()

const people: Person[] = [
  { id: 1, name: "Alice", address: "Berlin, Germany", isMarried: true },
  { id: 2, name: "Bob", address: "Munich, Germany", isMarried: false }
]

router.get("/person", (req: Request, res: Response) => {
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
  
router.post("/person", (req: Request<Person>, res: Response) => {
  const person: Person = req.body
  
  people.push(person)
  
  res.json(person)
})
  
router.delete("/person/:id", (req: Request, res: Response) => {
  const { id } = req.params
  
  const personIndex = people.findIndex(p => p.id === parseInt(id))
  if (personIndex === -1) {
    res.status(404).json({ error: "Person not found!" })
    return
  }

  const deletedPerson = people.splice(personIndex, 1)
  
  res.json(deletedPerson)
})

export default router
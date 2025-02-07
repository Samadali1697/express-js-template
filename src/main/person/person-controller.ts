import type { Request, Response } from "express"
import express from "express"
import PersonEntity from "../domain/person"
import AppDataSource from "../../data-source"
import { Repository } from "typeorm"

const PersonController = (personRepository: Repository<PersonEntity>) => {
  const router = express.Router()

  router.get("/person", async (req: Request, res: Response) => {
    const searchPerson = req.query.name as string | undefined
  
    if (!searchPerson) {
      res.status(400).json({ error: "Missing 'name' query parameter" })
      return
    }
    
    const personsFound = await personRepository.findBy({ name: searchPerson })
    if (!personsFound || personsFound.length === 0) {
      res.status(404).json({ error: "Person not found!" })
      return
    }
    
    res.json(personsFound)
  })

  router.post("/person", async (req: Request, res: Response) => {
    try {
      const { name, address, isMarried } = req.body
  
      const person = await personRepository.findBy({ name: name })
      if (!person || person.length !== 0) {
        res.status(409).json({ error: "Person already exists!" })
        return
      }
  
      const personToSave: PersonEntity = new PersonEntity()
      personToSave.name = name
      personToSave.address = address
      personToSave.isMarried = isMarried
  
      const savedPerson = await personRepository.save(personToSave)
  
      res.json(savedPerson)
    } catch (error) {
      console.error("Error saving person:", error)
      res.status(500).json({ error: "Failed to save person" })
    }
  })
    
  router.delete("/person/:id", async (req: Request, res: Response) => {
    try {
      const { id } = req.params

      const person = await personRepository.findOneBy({ id: parseInt(id) })
      if (!person) {
        res.status(404).json({ error: "Person not found!" })
        return
      }
  
      await personRepository.createQueryBuilder()
        .delete()
        .from(PersonEntity)
        .where("id = :id", { id: parseInt(id) })
        .execute()
  
      res.json(person)
    } catch (error) {
      console.error("Error deleting person:", error)
      res.status(500).json({ error: "Failed to delete person" })
    }
  })

  return router
}

export default PersonController(AppDataSource.getRepository(PersonEntity))
export { PersonController }

import express from "express"
import PersonController from "./main/person/person-controller"
import "reflect-metadata"
import AppDataSource from "./data-source"

const app = express()
app.use(express.json())
app.use("/api", PersonController)

const PORT = 4000
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`)
})

AppDataSource.initialize()
  .then(() => {})
  .catch((error: any) => console.log(error))

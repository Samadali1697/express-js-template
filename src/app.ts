import express from "express"
import personRouter from "./main/person/person-router"
import "reflect-metadata"
import AppDataSource from "./data-source"

const app = express()
app.use(express.json())
app.use("/api", personRouter)

const PORT = 4000
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`)
})

AppDataSource.initialize()
  .then(() => {})
  .catch((error: any) => console.log(error))
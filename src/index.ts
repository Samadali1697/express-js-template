import express from "express"
import peopleRouter from "./main/person/person-controller"
import "reflect-metadata"

const app = express()
app.use(express.json())
app.use("/api", peopleRouter);

const PORT = 4000
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`)
})

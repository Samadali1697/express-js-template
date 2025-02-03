import { DataSource } from "typeorm"
import Person from "./main/domain/person"

const AppDataSource = new DataSource({
    type: "postgres",
    host: "database",
    port: 5432,
    username: "user",
    password: "password",
    database: "express-js-template",
    synchronize: true,
    logging: true,
    entities: [Person],
    subscribers: [],
    migrations: [],
})

export default AppDataSource
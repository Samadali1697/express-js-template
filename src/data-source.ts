import { DataSource } from "typeorm"
import config from "./db-config";
import Person from "./main/domain/person"

const AppDataSource = new DataSource({
    type: "postgres",
    host: config.db.host,
    port: config.db.port,
    username: config.db.user,
    password: config.db.password,
    database: config.db.name,
    synchronize: false,
    logging: config.db.logging,
    entities: [Person],
    subscribers: [],
    migrations: [ "./src/migration/**/*.ts" ],
})

export default AppDataSource
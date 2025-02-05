import { PostgreSqlContainer, StartedPostgreSqlContainer } from "@testcontainers/postgresql"
import { DataSource } from "typeorm"
import PersonEntity from "../../main/domain/person"

export const containerPromise: Promise<StartedPostgreSqlContainer> = new PostgreSqlContainer()
    .withDatabase("testdb")
    .withUsername("testuser")
    .withPassword("testpass")
    .start()

export const createDataSource = async (container: StartedPostgreSqlContainer): Promise<DataSource> => {
    const dataSource = new DataSource({
        type: "postgres",
        host: container.getHost(),
        port: container.getPort(),
        username: container.getUsername(),
        password: container.getPassword(),
        database: container.getDatabase(),
        entities: [PersonEntity],
        synchronize: true,
        logging: false,
    })

    await dataSource.initialize()
    return dataSource
}
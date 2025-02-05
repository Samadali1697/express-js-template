import { MigrationInterface, QueryRunner } from "typeorm"

export class CreatePerson1738764724501 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            CREATE TABLE person (
                id SERIAL PRIMARY KEY,
                name VARCHAR(255),
                address TEXT,
                isMarried BOOLEAN
            );
        `)
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query("DROP TABLE person")
    }
}

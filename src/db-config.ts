import * as dotenv from "dotenv"

const envFile = `.env.${process.env.NODE_ENV || "dev"}`
dotenv.config({ path: envFile })

export default {
    db: {
        host: process.env.DB_HOST,
        port: Number(process.env.DB_PORT),
        user: process.env.DB_USER,
        password: process.env.DB_PASSWORD,
        name: process.env.DB_NAME,
        logging: process.env.DB_LOGGING === "true",
    },
}

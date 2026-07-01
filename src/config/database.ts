import { Sequelize } from "sequelize"
import * as dotenv from "dotenv"

dotenv.config()

const { DB_NAME, DB_USER, DB_PASSWORD, DB_HOST, DB_PORT, DB_DIALECT } = process.env

const sequelize = new Sequelize({
    database: DB_NAME || "eyun",
    username: DB_USER || "root",
    password: DB_PASSWORD || "",
    host: DB_HOST || "localhost",
    port: Number(DB_PORT) || 3306,
    dialect: (DB_DIALECT as "mysql") || "mysql",
    logging: false,
    pool: {
        max: 5,
        min: 0,
        acquire: 30000,
        idle: 10000,
    },
})

export default sequelize


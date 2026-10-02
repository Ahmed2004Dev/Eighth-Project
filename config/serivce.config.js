import {resolve} from "node:path"
import { config } from "dotenv"

export const NODE_ENV = process.env.NODE_ENV;

const envPath = {
    dev : "dev.env",
    pro : "pro.env",
}

config({path:resolve(`./config/${envPath[NODE_ENV]}`)})

export const PORT = process.env.PORT
export const DB_URI = process.env.DB_URI
export const DB_NAME = process.env.DB_NAME
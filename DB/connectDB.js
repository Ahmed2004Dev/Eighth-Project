import { MongoClient } from "mongodb";
import { DB_NAME, DB_URI } from "../config/serivce.config.js";
const client = new MongoClient(DB_URI);

export const db = client.db(DB_NAME)

export const authenticatDB = async ()=>{
    try {
        await client.connect();
        console.log("Connect DB Successfuly");
    } catch (error) {
        console.log(error);

    }
}
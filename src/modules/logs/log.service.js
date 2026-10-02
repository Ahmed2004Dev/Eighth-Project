import { ObjectId } from "mongodb"
import { db } from "../../../DB/connectDB.js"


export const createLogs = async () => {
    await db.createCollection("logs", { capped: true, size: 1000 })
}

export const inseertTologs = async () => {
    await db.collection("logs").insertOne({
        book_id:new ObjectId("64b5c2d8a123456ef8914000"),
        action: "borrowed"
    })
}
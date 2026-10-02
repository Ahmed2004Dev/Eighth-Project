import { db } from "../../../DB/connectDB.js";


export const EnsertToAuthers = async () => {
    const result = await db.collection("authors").insertOne({
        name: "Author1",
        Nationality: "British"
    });
    return result
}
import { db } from "../../../DB/connectDB.js";



export const createBooksColl = async () => {
    await db.createCollection("books",
        {
            validator: {
                $and: [
                    { title: { $ne: "" } },
                    { title: { $type: "string" } },
                    { title: { $exists: true } }
                ]
            }
        });
}

export const createIndex = async () => {
    await db.collection("books").createIndex({ title: 1 })
}

export const insertBook = async () => {
    await db.collection("books").insertOne({
        title: "Book1",
        author: "Ali",
        year: 1937,
        genres: ["Fantasy", "Adventure"]
    })
}

export const insertManyBook = async () => {
    await db.collection("books").insertMany([{
        title: "Future",
        author: "George Orwell",
        year: 2020,
        genres: ["Science Fiction"]
    },
    {
        title: "To Kill a Mockingbird",
        author: "Harper Lee",
        year: 1960,
        genres: ["Classic", "Fiction"]
    },
    {
        title: "Brave New World",
        author: "Aldous Huxley",
        year: 2006,
        genres: ["Dystopian", "Science Fiction"]
    },
    {
        title: "Future",
        author: "George Orwell",
        year: 2020,
        "genres": ["Science Fiction"]
    },
    {
        title: "Brave New World",
        author: "Aldous Huxley",
        year: 2006,
        genres: ["Dystopian", "Science Fiction"]
    }])
}

export const updateBook = async () => {
    await db.collection("books").updateOne({ title: "Future" }, { $set: { year: 2022 } })
}

export const SearchBook = async (value) => {
    const { title } = value
    const result = await db.collection("books").findOne({ title: title }, { title: 1, author: 1, year: 1, genres: 1 })
    return result
}

export const SearchBookByRange = async (value) => {
    const { from, to } = value
    const result = await db.collection("books").find({ year: { $gte: Number(from), $lte: Number(to) } }).toArray()
    return result
}

export const SearchBookByGeneries = async (value) => {
    const {genres} = value
    const result = await db.collection("books").find({ genres: {$in:[genres]} }).toArray()
    return result
}

export const SearchBookBySkip = async (value) => {
    const result = await db.collection("books").find({}).skip(2).sort({year:-1}).limit(3).toArray()
    return result
}

export const SearchBookByinteger = async () => {
    const result = await db.collection("books").find({year:{$type:"int"}}).toArray()
    return result
}

export const SearchBookByNoInclude = async () => {
    const result = await db.collection("books").find({genres:{$nin:["Horror","Science Fiction"]}}).toArray()
    return result
}

export const DeleteAllBook = async (value) => {
    const {before_year} = value
    const result = await db.collection("books").deleteMany({year:{$lte:Number(before_year)}})
    return result
}

export const AggregtionBookOne = async () => {
    const result = await db.collection("books").aggregate([
        {
            $match:{year:{$gte:2000}}
        },
        {
            $sort:{
                year:-1
            }
        }
    ]).toArray()
    return result
}

export const AggregtionBooktwo = async () => {
    const result = await db.collection("books").aggregate([
        {
            $match:{year:{$gte:2000}}
        },
        {
            $project:{
                _id:0,
                title:1,
                author:1,
                year:1
            }
        }
    ]).toArray()
    return result
}

export const AggregtionBookthree = async () => {
    const result = await db.collection("books").aggregate([
        {
            $unwind:"$genres"
        },
        {
            $project:{
                _id:0,
                title:1,
                genres:1
            }
        }
    ]).toArray()
    return result
}

export const AggregtionBookforth = async () => {
    const result = await db.collection("books").aggregate([
        {
            $lookup:{
                from:"authors",
                localField:"name",
                foreignField:"author",
                as:"logs Detaiels"
            }
        },
    ]).toArray()
    return result
}
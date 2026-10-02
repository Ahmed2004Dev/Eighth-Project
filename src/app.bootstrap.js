import express from "express"
import { PORT } from "../config/serivce.config.js";
import { authenticatDB } from "../DB/connectDB.js";
import { bookRouter } from "./modules/book/book.index.js";
import { authRouter } from "./modules/authors/authors.index.js";
import { logRouter } from "./modules/logs/log.index.js";

const  bootstrap = async ()=>{
    // Connect Express
    const app = express();

    // DB
    await authenticatDB()

    // Routing
    app.use(express.json())

    app.use("/books" , bookRouter)
    app.use("/auth" , authRouter)
    app.use("/log" , logRouter)

    app.use("{/*dummy}" , (req, res, next)=>{
        return res.status(404).json({Massage:"Invalid Routing"})
    })







    app.use((error,req,res,next)=>{
        const status = error?.cause?.status || 500
        return res.status(status).json({Massage:error.message || "Somthing went error" , stack:error.stack})
    })
    app.listen(PORT , ()=>{console.log(`the server work at PORT number ${PORT}`)})
}

export default bootstrap
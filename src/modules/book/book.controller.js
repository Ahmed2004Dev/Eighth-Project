import { Router } from "express";
import { AggregtionBookforth, AggregtionBookOne, AggregtionBookthree, AggregtionBooktwo, createBooksColl, createIndex, DeleteAllBook, insertBook, insertManyBook, SearchBook, SearchBookByGeneries, SearchBookByinteger, SearchBookByNoInclude, SearchBookByRange, SearchBookBySkip, updateBook } from "./book.service.js";
const router= Router()


router.post("/collection/books" , async (req,res,next)=>{
    const result = await createBooksColl();
    return res.status(201).json(result)
})

router.post("/collection/books/index" , async (req,res,next)=>{
    const result = await createIndex();
    return res.status(201).json(result)
    
})

router.post("/" , async (req,res,next)=>{
    const result = await insertBook();
    return res.status(201).json(result)
    
})

router.post("/books/batch" , async (req,res,next)=>{
    const result = await insertManyBook();
    return res.status(201).json(result)
    
})

router.patch("/Future" , async (req,res,next)=>{
    const result = await updateBook();
    return res.status(201).json(result)
})

router.get("/title/" , async (req,res,next)=>{
    const result = await SearchBook(req.query);
    return res.status(200).json(result)
})

router.get("/year/" , async (req,res,next)=>{
    const result = await SearchBookByRange(req.query);
    return res.status(200).json(result)
})

router.get("/genres" , async (req,res,next)=>{
    const result = await SearchBookByGeneries(req.query);
    return res.status(200).json(result)
})

router.get("/skip_limit" , async (req,res,next)=>{
    const result = await SearchBookBySkip();
    return res.status(200).json(result)
})

router.get("/year_integer" , async (req,res,next)=>{
    const result = await SearchBookByinteger();
    return res.status(200).json(result)
})

router.get("/exclude_genres" , async (req,res,next)=>{
    const result = await SearchBookByNoInclude();
    return res.status(200).json(result)
})

router.delete("/before_year" , async (req,res,next)=>{
    const result = await DeleteAllBook(req.query);
    return res.status(200).json(result)
})

router.get("/aggregate1" , async (req,res,next)=>{
    const result = await AggregtionBookOne();
    return res.status(200).json(result)
})

router.get("/aggregate2" , async (req,res,next)=>{
    const result = await AggregtionBooktwo();
    return res.status(200).json(result)
})

router.get("/aggregate3" , async (req,res,next)=>{
    const result = await AggregtionBookthree();
    return res.status(200).json(result)
})

router.get("/aggregate4" , async (req,res,next)=>{
    const result = await AggregtionBookforth();
    return res.status(200).json(result)
})


export default router
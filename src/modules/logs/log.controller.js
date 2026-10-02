import { Router } from "express";
import { createLogs, inseertTologs } from "./log.service.js";
const router = Router()


router.post("/collection/logs/capped" , async (req,res,next)=>{
    const result = await createLogs()
    return res.status(201).json(result)
})

router.post("/" , async (req,res,next)=>{
    const result = await inseertTologs()
    return res.status(201).json(result)
})





export default router
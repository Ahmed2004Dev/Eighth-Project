import { Router } from "express";
import { EnsertToAuthers } from "./authors.service.js";
const router = Router()



router.post("/addAuthor", async (req, res, next) => {
    const result = await EnsertToAuthers();
    return res.status(201).json({ Massage: "Done", result })

})







export default router
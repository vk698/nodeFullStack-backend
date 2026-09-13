import Router from "express";
import {createNotes, deleteNotes, getNotes, updatenotes} from "../controller/notes.controller.js"
import { authMiddleware } from "../middleware/authMiddleware.js";


 const router = Router();
 router.get("/getNotes", authMiddleware, getNotes);
 router.post("/createNotes",authMiddleware,createNotes)
 router.delete("/deleteNotes/:id",authMiddleware,deleteNotes)
 router.put("/updateNotes/:id",authMiddleware,updatenotes)

 export default router;
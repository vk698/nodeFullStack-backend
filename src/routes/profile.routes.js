import Router from "express";

import {upload} from "../storage/storage.js"
import { deleteProfile, findProfile, profile, updateProfile } from "../controller/profile.controller.js";
import { authMiddleware } from "../middleware/authMiddleware.js";

const router = Router();

router.post("/profile",authMiddleware,upload.single("image"),profile)
router.get("/findProfile",authMiddleware,findProfile);
router.patch("/updateProfile/:id",authMiddleware,updateProfile)
router.delete("/deleteProfile/:id",authMiddleware,deleteProfile)

export default router;
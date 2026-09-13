import Router from "express";

import {upload} from "../storage/storage.js"
import { login, register } from "../controller/auth.controller.js";
import { findProfile, profile } from "../controller/profile.controller.js";
import { authMiddleware } from "../middleware/authMiddleware.js";

const router = Router();

router.post("/register",register);
router.post("/login",login);
router.post("/profile",authMiddleware,upload.single("image"),profile)
router.get("/findProfile",authMiddleware,findProfile)
export default router;
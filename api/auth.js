import { Router } from "express";
const router = Router();

import { signMessage } from '../controllers/auth.js';
import { verify } from "../controllers/auth.js"

router.post("/signMessage", signMessage);
router.post("/verify", verify)

export default router;
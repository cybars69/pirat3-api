import { Router } from "express";
const router = Router();

import { signMessage } from '../controllers/auth.js';



router.post("/signMessage", signMessage);

export default router;
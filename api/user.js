import { Router } from "express";
const router = Router();

import { getUser, updateUser } from '../controllers/user.js';


router.put("/update", updateUser);
router.get("/", getUser)

export default router;
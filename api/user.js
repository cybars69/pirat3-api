import { Router } from "express";
const router = Router();

import { getUser, update, getUserId } from '../controllers/user.js';

router.get("/", getUser);

router.get("/:getuserbyid", getUserId);
router.patch("/update", update);


export default router;
import { Router } from "express";
const router = Router();

import { getUser, update, getUserId } from '../controllers/user.js';

// router.put("/update",);
router.patch("/update", update);
router.get("/:getuserbyid", getUserId);
router.get("/", getUser);



export default router;
// {
//     firstname:req.body.firstname ,
//     lastname:req.body.lastname, 
//     email: req.body.email
//   }
import { Router } from "express";
import { createShip, getAllMyShips, getShipById, deleteShipById } from "../controllers/ship.js";
const router = Router();

router.post("/", createShip);
router.post("/all", getAllMyShips);
router.post("/getById", getShipById);
router.post("/deleteById", deleteShipById);

export default router;
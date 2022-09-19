import { Router } from "express";
import { createBounty, getAllBountiesByShipId, deleteBounty } from "../controllers/bounty.js";
const router = Router();

router.post("/", createBounty);
router.post("/getByShipId", getAllBountiesByShipId);
router.post("/delete", deleteBounty);

export default router;
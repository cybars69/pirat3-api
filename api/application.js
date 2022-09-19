import { Router } from "express";
import { createApplication, approveApplication, getApplications, getApplicationById } from "../controllers/application.js";
const router = Router();

router.post("/", createApplication);

router.post("/approve", approveApplication);
router.post("/getApplications", getApplications)
router.post("/getApplication", getApplicationById)

export default router;
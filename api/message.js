import { Router } from "express";
import { newMessage, allMessagesByApplicationId, limitedMessagesById } from "../controllers/message.js";
const router = Router();

router.post("/", newMessage);
router.post("/allByThreadId", allMessagesByApplicationId);
router.post("/allByThreadId/:pageNum", limitedMessagesById);

export default router;
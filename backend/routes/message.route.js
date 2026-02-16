import express from "express";
const router = express.Router();
import { getAllContacts,getMessageByUserId,sendMessage ,getChatPartner } from "../controllers/message.controller.js";
import { protectRoute } from "../lib/middelware/auth.middelware.js";
import { arcjetProtection } from "../lib/middelware/arcjet.middelware.js";

router.use(arcjetProtection, protectRoute);
router.get('/contacts',  getAllContacts);
router.get('/chats', getChatPartner);
router.get('/:id', getMessageByUserId);
router.post("/send/:id",  sendMessage);


export default router
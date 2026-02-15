import express from "express";
const router = express.Router();
import { getAllContacts } from "../controllers/message.controller.js";
import { protectRoute } from "../lib/middelware/auth.middelware.js";
import { arcjetProtection } from "../lib/middelware/arcject.middelware.js";


router.get('/contacts', protectRoute, getAllContacts);
// router.get('/chats', getChatPartners);
// router.get('/:id', getMessageByUserId);
// router.get('/contacts', getAllContacts);
// router.post("/send/:id", sendMessage);


export default router
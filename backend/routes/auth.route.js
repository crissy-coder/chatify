import express from "express";
import {Signup, Signin, Signout } from "../controllers/auth.controller.js";
const router = express.Router();



router.post('/signup', Signup)
router.post('/signin', Signin)
router.post('/signout', Signout)


export default router
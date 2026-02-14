import express from "express";
import {Signup, Signin, Signout } from "../controllers/auth.controller.js";
import  {arcjetProtection } from "../lib/middelware/arcject.middelware.js";
const router = express.Router();



router.get('/rate_limit', arcjetProtection , (req,res) => {
    res.status(200).json({message:"This is a test for Rate Limit"})
});


router.post('/signup', Signup)
router.post('/signin', Signin)
router.post('/signout', Signout)


export default router
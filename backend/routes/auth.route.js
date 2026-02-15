import express from "express";
import {Signup, Signin, Signout,updateProfile } from "../controllers/auth.controller.js";
import  {arcjetProtection } from "../lib/middelware/arcject.middelware.js";
import { protectRoute } from "../lib/middelware/auth.middelware.js";
const router = express.Router();



router.get('/rate_limit', arcjetProtection , (req,res) => {
    res.status(200).json({message:"This is a test for Rate Limit"})
});


router.post('/signup', Signup)
router.post('/signin', Signin)
router.post('/signout', Signout)

router.put("/update_profile", protectRoute, updateProfile);
router.get("/check",protectRoute, (req, res) => {
    res.status(200).json({message: "Protected route accessed successfully", user: req.user});
});

export default router
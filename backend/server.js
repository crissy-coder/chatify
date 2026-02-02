// const express = require('express');
import express from "express";
import dotenv from "dotenv";
import path from "path";
import authRouter from "./routes/auth.route.js";
import messageRouter from "./routes/message.route.js";
const app = express();
const  __dirname = path.resolve();

dotenv.config();
// app.listen(3000, () => console.log("server is running"));
app.listen(3000, ()=>{
    try{
        console.log('Server is running on port 3000');
    }
    catch(err){
        console.log(err,"error occured while running server");
    }
});

app.use('/api/auth', authRouter);
app.use('/api/message', messageRouter);


if(process.env.NODE_ENV === "production"){
    app.use(express.static(path.join(__dirname, "../frontend/build")));
    // if not user try to enter any url other than /api/auth or /api/message it will redirect to index.html of frontend
    app.get("*", (req, res) => {
        res.sendFile(path.join(__dirname, "../frontend", "dist", "index.html"));
    });
}
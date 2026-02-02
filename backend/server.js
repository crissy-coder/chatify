// const express = require('express');
import express from "express";
import dotenv from "dotenv";
import authRouter from "./routes/auth.route.js";
import messageRouter from "./routes/message.route.js";
const app = express();

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

// const express = require('express');
import express from "express";
import dotenv from "dotenv";
import path, { parse } from "path";
import authRouter from "./routes/auth.route.js";
import messageRouter from "./routes/message.route.js";
import { connectDB } from "./lib/db.js";
import cookiesParser from "cookie-parser";
import cors from "cors";

dotenv.config();
const app = express();
const  __dirname = path.resolve();

const PORT = process.env.PORT || 3000;
console.log("MONGO_URI:", process.env.MONGO_URI);
console.log("NODE_ENV:", process.env.NODE_ENV);

app.use(express.json());
// app.use(cors({origin:process.env.CLIENT_URL,credentials: true,}));
app.use(cors({
  origin: "http://localhost:5173",
  credentials: true
}))
app.use(cookiesParser());

app.use('/api/auth', authRouter);
app.use('/api/message', messageRouter);


if(process.env.NODE_ENV === "development"){
    app.use(express.static(path.join(__dirname, "../frontend/build")));
    // if not user try to enter any url other than /api/auth or /api/message it will redirect to index.html of frontend
    app.get("*", (_, res) => {
        res.sendFile(path.join(__dirname, "../frontend", "dist", "index.html"));
    });
}



app.listen(3000, async ()=>{
    try{
        console.log('Server is running on port 3000');
        console.log("Mongo URI:", process.env.MONGO_URI);
       await connectDB();

    }
    catch(err){
        console.log(err,"error occured while running server");
    }
});





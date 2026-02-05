import express from "express";
import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        length: 6,
        required: true
    }
},{timestamps: true });

const User = mongoose.model("User", userSchema);


export default User;
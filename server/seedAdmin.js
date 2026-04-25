import mongoose from "mongoose";
import bcrypt from "bcryptjs";
import dotenv from "dotenv"
import User from "./model/User";

dotenv.config()
//load .mv file

mongoose.connect(process.env.MONGO_URI)
//connect to mongodb

const createAdmin
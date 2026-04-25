import mongoose from "mongoose";
import bcrypt from "bcryptjs";
import dotenv from "dotenv"
import User from "./model/User.js";

dotenv.config()
//load .mv file

mongoose.connect(process.env.MONGO_URI)
//connect to mongodb

const createAdmin = async () => {
      try {
            const existing = await User.findOne({ role: "admin" })
            if(existing) {
                  console.log('Admin already exists ✅');
                  return process.exit()
                  
            }

            //hash admin password 
            const hashedPassword = await bcrypt.hash("admin123", 10)

            //create admin user 

            await User.create({
                  name: "Admin", 
                  email: "admin@freelancehub.com",
                  password: hashedPassword,
                  role: "admin",
                  isVerified: true
                  // admin is already verified, no OTP needed
            })
            console.log("Admin created successfully ✅");
            console.log("Email: admin@freelancehub.com");
            console.log("Password: admin123");
            process.exit()
            
            

      } catch (error) {
            console.log("Error ❌", error.message);
            process.exit(1)
            
      }
}

createAdmin()
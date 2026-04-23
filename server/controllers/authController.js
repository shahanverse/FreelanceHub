import User from "../model/User.js"
import jwt from "jsonwebtoken"

import bcrypt from "bcryptjs"
import sendEmail from "../utils/sendEmail.js"

export const register = async (req , res) => {
      try {
            const { name, email, password, role} = req.body

            if (!name || !email || !password || !role) {
                  return res.status(400).json({
                        message: "All fields are required"
                  })
            }

            const existingUser = await User.findOne({ email })
            if (existingUser) {
                  return res.status(400).json({
                        message: "Email already registered"
                  })
            }
                  // hash the password
            const hashedPassword = await bcrypt.hash(password, 10)
            // generate otp

            const otp = Math.floor(100000 + Math.random() * 900000).toString()

            // set orp expiry

            const otpExpiry = new Date(Date.now() + 10 * 60 * 1000)

            // create user in database

            const user = await User.create({
                  name,
                  email,
                  password: hashedPassword,
                  role,
                  otp,
                  otpExpiry

            })
            // sent otp email
            await sendEmail(email, otp)

            //send response back to react 
            res.status(201).json({
                  message: "Registration successful ! Please verify your email",
                  userId: user._id
            })

      } catch (error) {
            res.status(500).json({
                  message: "Server error",
                  error: error.message
            })
      }
}

      // VERIFY OTP

      export const verifyOTP = async (req,res) => {
            try {
                  const { userId, otp } = req.body

                  const user = await User.findById(userId)
                  if(!user) {
                        return res.status(404).json({
                              message: "User not found"
                        })
                  }
            
            if (user.otp !== otp) {
                  return res.status(404).json({
                        message: "Invalid OTP"
                  })
            }

            if (user.otpExpiry < new Date()) {
                  return res.status(400).json({
                        message: "OTP expired, please register again"
                  })
            }

            user.isVerified = true
            user.otp = null
            user.otpExpiry = null
            await user.save()

            res.status(200).json({
                  message: " Email verified successfully! You can now login✅"
            })

            } catch (error) {
                  res.status(500).json({
                        message: " Server error",
                        error: error.message
                  })
            }
      }

      //login

      export const login = async (req, res) => {
            try {
                  console.log("Login hit✅");

                  const { email, password } = req.body

                  // check all fields 

                  if (!email || !password) {
                        return res.status(400).json({
                              message: "All fields are required"
                        })
                  }

                  // check if user exists

                  const user = await User.findOne({ email })
                  if (!user) {
                        return res.status(400).json({
                              message: "Invalid email or password"
                        })
                  }

                  if (!user.isVerified) {
                        return res.status(400).json({
                              message: "Please verify your email first"
                        })
                  }

                  const isPasswordCorrect = await bcrypt.compare(password, user.password)
                  if (!isPasswordCorrect) {
                        return res.status(400).json({
                              message:"Invalid email or password"
                        })
                  }

                  const token = jwt.sign(
                        { userId: user._id, role: user.role },
                        process.env.JWT_SECRET,
                        { expiresIn: "7d" }

                  ) 

                  res.status(200).json({
                        message:"Login successful ✅",
                        token,
                        user:{
                              id: user._id,
                              name: user.name,
                              email: user.email,
                              role: user.role
                        }
                  })
                  
            } catch (error) {
                  console.log("Login error ❌", error.message)
                  res.status(500).json({
                        message: "Server error",
                        error: error.message
                  })
                  
            }
      }
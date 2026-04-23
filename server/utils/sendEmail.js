// this file sends otp email to user

import nodemailer from "nodemailer";

const sendEmail = async (email, otp) => {

      const transporter = nodemailer.createTransport({
            service: "gmail",
            auth:{
                  user: process.env.EMAIL,
                  pass: process.env.EMAIL_PASS
            }
      })

      const mailOptions = {
            from: process.env.EMAIL,
            to: email,
            subject: "FreelanceHub - verify Your Email",
            html:`
                  <h2> Welcome to FreelanceHub! </h2>
                  <P> Your OTP verification code is:</p>
                  <h1 style="color: #4F46E5">${otp} </h1>
                  <p> This OTP expires in 10 minutes </P>
            `
      }
      await transporter.sendMail(mailOptions)
}

export default sendEmail
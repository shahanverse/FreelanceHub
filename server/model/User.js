import mongoose from "mongoose";

const userSchema = mongoose.Schema({
      name: {
            type: String,
            required: true,
      },
      email: {
            type: String,
            required: true,
            unique: true
      },
      password: {
            type:  String,
            required: true
      },
      role: {
            type: String,
            enum: ["admin","freelancer", "client"],
            default: "client"
      },
      isVerified: {
            type: Boolean,
            default: false
      },
      otp: {
            type: String,
            default: null
      },
      otpExpiry: {
            type: Date,
            default: null
      },
      profilePicture: {
            type: String,
            default: ""
      },
      bio: {
            type: String,
            default: ""
      },
      skills: [String],   // only for freelancers

}, { timestamps: true })

const User = mongoose.model("User", userSchema);

export default User;
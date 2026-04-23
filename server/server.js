import express from "express"
import cors from "cors"
import dotenv from "dotenv"
import { connectDB } from "./config/db.js"
import authRoutes from "./routes/authRoutes.js"
import gigRoutes from "./routes/gigRoutes.js"



dotenv.config()



const app = express()

app.use(cors({
  origin: "*",
  methods: ["GET", "POST", "PUT", "DELETE"],
  allowedHeaders: ["Content-Type", "Authorization"]
}))

app.use(express.json())

app.use("/api/auth", authRoutes)
app.use("/api/gigs", gigRoutes)

app.get("/", (req, res) => {
      console.log("Server is running ✅");
      
})

const PORT = process.env.PORT || 5000

connectDB().then(() => {
      app.listen(PORT, () => {          // app.listen starts the server
      console.log(`Server is running on port ${PORT} ✅`);
      
})
})

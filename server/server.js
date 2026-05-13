import dotenv from "dotenv"
dotenv.config()
import express from "express"
import cors from "cors"
import { connectDB } from "./config/db.js"
import authRoutes from "./routes/authRoutes.js"
import gigRoutes from "./routes/gigRoutes.js"
import orderRoutes from "./routes/orderRoutes.js"
import reviewRoutes from "./routes/reviewRoutes.js"
import adminRoutes from "./routes/adminRoutes.js"
import aiRoutes from "./routes/aiRoutes.js"






const app = express()

app.use(cors({
  origin: "*",
  methods: ["GET", "POST", "PUT", "DELETE"],
  allowedHeaders: ["Content-Type", "Authorization"]
}))

app.use(express.json())

app.use("/api/auth", authRoutes)
app.use("/api/gigs", gigRoutes)
app.use("/api/orders", orderRoutes)
app.use("/api/reviews", reviewRoutes)
app.use("/api/admin", adminRoutes)
app.use("/api/ai", aiRoutes)

app.get("/", (req, res) => {
      console.log("Server is running ✅");
      res.json({ message: "Server is running ✅" });
})

const PORT = process.env.PORT || 5000

connectDB().then(() => {
      app.listen(PORT, () => {          // app.listen starts the server
      console.log(`Server is running on port ${PORT} ✅`);
      
})
})

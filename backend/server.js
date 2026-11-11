import express from "express"
import dotenv  from "dotenv"
import cookieParser from "cookie-parser";
import cors from "cors";

import connectDB from "./config/db.js"
import authRoutes from "./routes/authRoutes.js"  
import productRoutes from "./routes/productRoutes.js"
import wishlistRoutes from "./routes/wishlistRoutes.js"
import cartRoutes from "./routes/cartRoutes.js"
import orderRoutes from "./routes/orderRoutes.js"
import reviewRoutes from "./routes/reviewRoutes.js"
import paymentRoutes from "./routes/paymentRoutes.js";

dotenv.config()

const app = express()

app.use(cors({
  origin: "http://localhost:5173",
  credentials: true
}));

app.use(express.json())

app.use(cookieParser())

connectDB()

app.use("/auth", authRoutes);
app.use("/products",productRoutes)
app.use("/wishlist",wishlistRoutes)
app.use("/cart",cartRoutes)
app.use("/orders",orderRoutes)
app.use("/review",reviewRoutes)
app.use("/payment", paymentRoutes);

app.use("/uploads", express.static("uploads"));




app.listen(process.env.PORT, ()=>{
  console.log("Server Started");
})
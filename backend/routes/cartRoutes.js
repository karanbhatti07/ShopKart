import express from "express"
import { addToCart, getCart, removeFromCart, updateCart } from "../controllers/cartController.js"
import { authMiddleware } from "../middlewares/authMiddleware.js"

const router = express.Router()

router.post("/add",authMiddleware,addToCart)
router.get("/get",authMiddleware,getCart)
router.delete("/delete/:productId",authMiddleware,removeFromCart)
router.put("/updateCart",authMiddleware,updateCart)

export default router
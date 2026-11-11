import express from "express"
import { addToWishlist, removeFromWishlist, getWishlist } from "../controllers/wishlistController.js"
import { authMiddleware } from "../middlewares/authMiddleware.js"

const router = express.Router()

router.post("/",authMiddleware,addToWishlist)
router.get("/",authMiddleware,getWishlist)
router.delete("/",authMiddleware,removeFromWishlist)
export default router
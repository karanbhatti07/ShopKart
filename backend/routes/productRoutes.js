import express from "express"
import { authMiddleware } from "../middlewares/authMiddleware.js"
import { adminMiddleware } from "../middlewares/adminMiddleware.js"
import { createproduct, getproduct, getSingleProduct, updateproduct, deleteproduct, Statustoggle } from "../controllers/productController.js"
import upload from "../middlewares/uploadmiddleware.js"

const router = express.Router() 
router.post("/createproduct",authMiddleware,adminMiddleware,upload.single("image"), createproduct)
router.get("/getproduct",getproduct)
router.get("/getSingleProduct/:id",getSingleProduct)
router.put("/updateproduct/:id",authMiddleware,adminMiddleware,updateproduct)
router.delete("/deleteproduct/:id",authMiddleware,adminMiddleware,deleteproduct)
router.put("/toggleStatus",authMiddleware,adminMiddleware,Statustoggle)
export default router;
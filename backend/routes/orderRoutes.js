import express from "express"
import { createOrder, getOrder, getSingleOrder,cancelOrder, getAllOrders, updateOrderStatus, getAdminSingleOrder } from "../controllers/orderController.js"
import { authMiddleware } from "../middlewares/authMiddleware.js"
import { adminMiddleware } from "../middlewares/adminMiddleware.js"
const router = express.Router()

router.post("/create", authMiddleware, createOrder)
router.get("/getorders",authMiddleware,getOrder)
router.put("/cancel/:id",authMiddleware,cancelOrder)


// Admin Routes
router.get("/admin/all",authMiddleware,adminMiddleware,getAllOrders)
router.put("/admin/status/:id",authMiddleware,adminMiddleware,updateOrderStatus)
router.get("/admin/:id",authMiddleware, adminMiddleware,getAdminSingleOrder)
router.get("/:id",authMiddleware, getSingleOrder)


export default router
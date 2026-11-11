import express from "express"
import { authMiddleware } from "../middlewares/authMiddleware.js"
import { createReview , getReview} from "../controllers/reviewController.js"
const router = express.Router()

router.post("/createReview",authMiddleware,createReview)
router.get("/getReview/:product",authMiddleware,getReview)
export default router;

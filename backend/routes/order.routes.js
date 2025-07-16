import express from 'express'
import { getUserOrders, placeOrder } from '../controllers/orderController.js'
import authMiddleware from '../middleware/auth.js'


const orderRouter = express.Router();


// placing order - cod 
orderRouter.post('/placeOrder', authMiddleware , placeOrder)
orderRouter.post('/user',authMiddleware,getUserOrders)

export default orderRouter;
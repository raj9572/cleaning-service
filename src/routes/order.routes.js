import express from "express";
import { createOrder, fetchAllOrders, fetchOrderDetails, orderCompleted } from "../controllers/order.controller.js";

const router = express.Router();

router.post("/create-order",createOrder)
router.get("/fetch-orders/:userId",fetchAllOrders)
router.get("/order-detail/:id",fetchOrderDetails)
router.patch("/order-completed/:id",orderCompleted)

export default router;

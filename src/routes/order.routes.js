import express from "express";
import {
  acceptOrderRequest,
  createOrder,
  fetchAllOrders,
  fetchOrderDetails,
  fetchUserAllOrders,
  fetchWorkerOrders,
  orderCompleted,
} from "../controllers/order.controller.js";

const router = express.Router();

router.post("/create-order", createOrder);
router.post("/accept-order", acceptOrderRequest);
router.get("/fetch-orders", fetchAllOrders);
router.get("/fetch-orders/:userId", fetchUserAllOrders);
router.get("/worker-orders/:workerId", fetchWorkerOrders);
router.get("/order-detail/:id", fetchOrderDetails);
router.patch("/order-completed/:id", orderCompleted);

export default router;

import express from "express";
import {
  createProduct,
  getProducts,
  getProductById,
  updateProduct,
  deleteProduct,
  getAllProducts,
  disableEnableProduct,
  getSubCategoryProduct
} from "../controllers/product.controller.js"

const router = express.Router();

router.post("/create-product", createProduct);
router.get("/getProduct", getProducts);
router.get("/getAllProduct", getAllProducts);
router.get("/product-details/:id", getProductById);
router.get("/product-disable/:id", disableEnableProduct);
router.get("/getSubCategoryProducts/:id", getSubCategoryProduct);
router.put("/update-product/:id", updateProduct);
router.delete("/delete-product/:id", deleteProduct);

export default router;

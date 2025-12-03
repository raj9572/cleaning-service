import { Router } from "express";
import { createCategory, createSubCategory, disableCategory, fetchAllCategoryansSubCategory, fetchSubCategory } from "../controllers/category.controller.js";


const router = Router()


router.post("/create-category",createCategory)
router.post("/create-subCategory",createSubCategory)
router.get("/fetchAllCategory",fetchAllCategoryansSubCategory)
router.get("/fetchSubCategory/:categoryId",fetchSubCategory)
router.get("/disableCategory/:categoryId",disableCategory)
router.get("/disableSubCategory/:subCategoryId",fetchSubCategory)

export default router
import Product from "../models/product.model.js";
import Category from "../models/category.model.js";
import SubCategory from "../models/subCategory.model.js";
import { createResponse, ErrorResponse } from "../utils/responseWrapper.js";

//! create product
export const createProduct = async (req, res) => {
  try {
    const {
      title,
      description,
      category,
      subcategory,
      images,
      price,
      discountPrice,
      quantity,
      inStock,
      onSale,
    } = req.body;

    // Validate Category exists
    const categoryExists = await Category.findOne({ key: category });
    if (!categoryExists) {
      return res.status(400).json(ErrorResponse(400, "Invalid category"));
    }

    // Validate Subcategory exists
    const subExists = await SubCategory.findOne({ key: subcategory });
    if (!subExists) {
      return res.status(400).json(ErrorResponse(400, "invalid subcategory"));
    }

    // Create Product
    const product = new Product({
      title,
      description,
      category,
      subcategory,
      images,
      price,
      discountPrice,
      quantity,
      inStock,
      onSale,
    });

    await product.save();

    res
      .status(201)
      .json(createResponse(201, product, "product create successfully"));
  } catch (error) {
    res
      .status(500)
      .json(ErrorResponse({ message: "Server Error", error: error.message }));
  }
};

//! GET ALL PRODUCTS
export const getAllProducts = async (req, res) => {
  try {
    const products = await Product.find({});

    return res.status(200).json(createResponse(200, products, {}));
  } catch (error) {
    res.status(500).json(ErrorResponse(500, "Internal server error"));
  }
};

//!SEARCH  PRODUCTS
export const getProducts = async (req, res) => {
  try {
    const { category, subCategory, search } = req.query;

    const filter = {};

    if (category) filter.category = category;
    if (subCategory) filter.subCategory = subCategory;

    // Search by title (case-insensitive)
    if (search) filter.title = { $regex: search, $options: "i" };

    const products = await Product.find(filter).populate(
      "category subCategory"
    );

    res.status(200).json(createResponse(200, products, ""));
  } catch (error) {
    res.status(500).json(ErrorResponse(500, "internal server error"));
  }
};

//! GET PRODUCT BY ID
export const getProductById = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);

    if (!product)
      return res.status(404).json(ErrorResponse(404, "Product not found"));

    res.status(200).json(createResponse(200, product, ""));
  } catch (error) {
    res.status(500).json(ErrorResponse(500, "Internal server error"));
  }
};

//! UPDATE PRODUCT
export const updateProduct = async (req, res) => {
  try {
    const updates = req.body;

    // Optional validation (if category/subcategory updated)
    if (updates.category) {
      const exists = await Category.findById(updates.category);
      if (!exists)
        return res.status(400).json(ErrorResponse(400, "Invalid Category"));
    }

    if (updates.subCategory) {
      const exists = await SubCategory.findById(updates.subCategory);
      if (!exists)
        return res.status(400).json(ErrorResponse(400, "Invalid sub category"));
    }

    const updatedProduct = await Product.findByIdAndUpdate(
      req.params.id,
      updates,
      { new: true }
    );

    if (!updatedProduct)
      return res.status(404).json(ErrorResponse(404, "product not found"));

    res
      .status(200)
      .json(
        createResponse(200, updatedProduct, "Product updated successfully")
      );
  } catch (error) {
    res.status(500).json({ message: "Server Error", error: error.message });
  }
};

//! DELETE PRODUCT
export const deleteProduct = async (req, res) => {
  try {
    const productId = req.params.id;
    const deleted = await Product.findByIdAndDelete(productId);

    if (!deleted) return res.status(404).json({ message: "Product not found" });

    res
      .status(200)
      .json(createResponse(200, {}, "product deleted succussfully"));
  } catch (error) {
    res.status(500).json(ErrorResponse(500, "internal serverl error"));
  }
};

//! DISABLE PRODUCT
export const disableEnableProduct = async (req, res) => {
  try {
    const productId = req.params.id;

    const product = await Product.findById(productId);

    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    // Toggle stock status
    product.inStock = !product.inStock;
    await product.save();

    res
      .status(200)
      .json(
        createResponse(
          200,
          product,
          `Product is ${product.inStock ? "now in stock" : "not in stock"}`
        )
      );
  } catch (error) {
    res.status(500).json(ErrorResponse(500, "internal server error"));
  }
};

//! GET SUBCATEGORY PRODUCT
export const getSubCategoryProduct = async (req, res) => {
  try {
    const subCategoryId = req.params.id;

    const subCategory = await SubCategory.findById(subCategoryId);

    if (!subCategory) {
      return res.status(404).json(ErrorResponse(404, "subcategory not found"));
    }
    const products = await Product.find({ subcategory: subCategory.key });

    res.status(200).json(createResponse(200, products, ""));
  } catch (error) {
    res.status(500).json(ErrorResponse(500, "internal server error"));
  }
};

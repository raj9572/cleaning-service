import categoryModel from "../models/category.model.js";
import subCategoryModel from "../models/subCategory.model.js";
import { createResponse, ErrorResponse } from "../utils/responseWrapper.js";

const createCategory = async (req, res) => {
  const { title, key, image } = req.body;

  if (!title || !key) {
    return res.status(400).json(ErrorResponse(400, "all field is required"));
  }

  await categoryModel.create({
    title,
    key,
    image,
  });

  return res
    .status(201)
    .json(createResponse(201, {}, "category is successfully"));
};

const fetchAllCategoryansSubCategory = async (req, res) => {
  try {
    const category = await categoryModel.find({}).populate("subCategory");

    if (!category) {
      return res.status(404).json(ErrorResponse(404, "Category Not Found"));
    }

    return res
      .status(200)
      .json(createResponse(200, category, "category found"));
  } catch (error) {
    return res.status(500).json(ErrorResponse(500, "internal server error"));
  }
};

const createSubCategory = async (req, res) => {
  const { title, image, category, key } = req.body;
  console.log(req.body);

  if (!title || !category) {
    return res.status(400).json(ErrorResponse(400, "All field  is required"));
  }

  const Category = await categoryModel.findById(category);
  // console.log(Category)

  const newSubCategory = await subCategoryModel.create({
    title,
    key,
    image,
    category: Category._id,
  });

  Category.subCategory.push(newSubCategory._id);
  Category.save();

  return res
    .status(201)
    .json(createResponse(201, {}, "subCategory is successfully"));
};

const fetchSubCategory = async (req, res) => {
  const { categoryId } = req.params;
  try {
    const subCategory = await subCategoryModel.find({ category: categoryId });

    if (!subCategory) {
      return res.status(404).json(ErrorResponse(404, "subCategory Not Found"));
    }

    return res
      .status(200)
      .json(createResponse(200, subCategory, "subCategory found"));
  } catch (error) {
    return res.status(500).json(ErrorResponse(500, "internal server error"));
  }
};

const disableCategory = async (req, res) => {
  const { categoryId } = req.params;
  try {
    const category = await categoryModel.findOne({ _id: categoryId });

    if (!category) {
      return res.status(404).json(ErrorResponse(404, "subCategory Not Found"));
    }

    category.isActive = !category.isActive;

    category.save();

    return res.status(200).json(createResponse(200, {}, "Category disable"));
  } catch (error) {
    return res.status(500).json(ErrorResponse(500, "internal server error"));
  }
};

const disableSubCategory = async (req, res) => {
  const { subCategoryId } = req.params;
  try {
    const subCategory = await subCategoryModel.findOne({ _id: subCategoryId });

    if (!subCategory) {
      return res.status(404).json(ErrorResponse(404, "subCategory Not Found"));
    }

    subCategory.isActive = !subCategory.isActive;

    subCategory.save();

    return res.status(200).json(createResponse(200, {}, "subCategory disable"));
  } catch (error) {
    return res.status(500).json(ErrorResponse(500, "internal server error"));
  }
};

export {
  createCategory,
  createSubCategory,
  fetchAllCategoryansSubCategory,
  fetchSubCategory,
  disableCategory,
  disableSubCategory,
};

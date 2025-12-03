// models/SubCategory.js
import mongoose from "mongoose";

const subCategorySchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  key:{
    type: String,
    required: true
  },
  category: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Category",
     required: true
  },
  image:String,
  isActive: {
    type: Boolean,
    default: true
  },
}, { timestamps: true });

export default mongoose.model("SubCategory", subCategorySchema);

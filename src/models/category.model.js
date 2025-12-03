// models/Category.js
import mongoose from "mongoose";

const categorySchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        unique: true
    },
    key: {
        type: String,
        unique: true
    },
    image: String,
    isActive: {
        type: Boolean,
        default: true
    },
    subCategory: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'SubCategory'
        }
    ],
    
}, { timestamps: true });

export default mongoose.model("Category", categorySchema);

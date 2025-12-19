import mongoose, { Schema } from "mongoose";

const userSchema = new Schema({

  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  },
  confirmPassword:{
    type: String,
  },
   role: {
        type: String,
        default: "CUSTOMER"
    },

}, { timestamps: true });

export const User = mongoose.model("User", userSchema);

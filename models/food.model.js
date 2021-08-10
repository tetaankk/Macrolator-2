//const mongoose = require("mongoose");
import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const foodSchema = new Schema(
  {
    email: { type: String, required: true },
    food: { type: String },
    amount: { type: Number, required: true },
    date: { type: Date, required: true },
    foodEnergy: { type: Number },
    foodCarbohydrate: { type: Number },
    foodProtein: { type: Number },
    foodFat: { type: Number },
    energy: { type: Number },
    carbohydrate: { type: Number },
    protein: { type: Number },
    fat: { type: Number },
  },
  {
    timestamps: true,
  }
);

const Food = mongoose.model("Food", foodSchema);

export default Food;

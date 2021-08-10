import express, { response } from "express";
const foodsRouter = express.Router();
import Food from "../models/food.model.js";
import User from "../models/user.model.js";
import auth from "../middleware/auth.js";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();
const jwtSecret = process.env.jwtSecret;

const getTokenFrom = (request) => {
  const authorization = request.get("authorization");
  if (authorization && authorization.toLowerCase().startsWith("bearer")) {
    return authorization.substring(7);
  }
  return null;
};

// @route GET /foods
// @desc Get all portions
// @access Private
foodsRouter.get("/", (req, res) => {
  Food.find()
    .then((foods) => res.json(foods))
    .catch((err) => res.status(400).json("Error: " + err));
});

// @route GET /foods/:id
// @desc Get portion by id
// @access Private
foodsRouter.get("/:id", (req, res) => {
  Food.findById(req.params.id)
    .then((food) => res.json(food))
    .catch((err) => res.status(400).json("Error: " + err));
});

// @route POST /foods/add
// @desc Add a new portion
// @access Private
foodsRouter.post("/add", (req, res) => {
  const token = getTokenFrom(req);
  const decodedToken = jwt.verify(token, jwtSecret);
  if (!token || !decodedToken.id) {
    return response.status(400).json({ msg: "token missing or invalid" });
  }
  console.log(decodedToken);
  const user = User.findOne({ _id: decodedToken.id });

  const newFood = new Food({
    email: decodedToken.email,
    food: req.body.food,
    amount: Number(req.body.amount),
    date: Date.parse(req.body.date),
    energy: Number(req.body.energy),
    carbohydrate: Number(req.body.carbohydrate),
    protein: Number(req.body.protein),
    fat: Number(req.body.fat),
    foodEnergy: Number(req.body.foodEnergy),
    foodCarbohydrate: Number(req.body.foodCarbohydrate),
    foodProtein: Number(req.body.foodProtein),
    foodFat: Number(req.body.foodFat),
  });

  newFood
    .save()
    .then(() => res.json("Food added!"))
    .catch((err) => res.status(400).json("Error: " + err));
});

// @route DELETE foods/:id
// @desc Delete portion
// @access Private
foodsRouter.delete("/:id", (req, res) => {
  Food.findByIdAndDelete(req.params.id)
    .then(() => res.json("Food deleted!"))
    .catch((err) => res.status(400).json("Error: " + err));
});

// @route POST /foods/:id
// @desc Eidt a certain portion by id
// @access Private
foodsRouter.post("/update/:id", (req, res) => {
  Food.findById(req.params.id)
    .then((food) => {
      food.food = req.body.food;
      food.amount = req.body.amount;
      food.date = req.body.date;
      food.energy = req.body.energy;
      food.carbohydrate = req.body.carbohydrate;
      food.protein = req.body.protein;
      food.fat = req.body.fat;
      food.foodCarbohydrate = req.body.foodCarbohydrate;
      food.foodEnergy = req.body.foodEnergy;
      food.foodProtein = req.body.foodProtein;
      food.foodFat = req.body.foodFat;
      food
        .save()
        .then(() => res.json("Food updated!"))
        .catch((err) => res.status(400).json("Error: " + err));
    })
    .catch((err) => res.status(400).json("Error: " + err));
});

export default foodsRouter;

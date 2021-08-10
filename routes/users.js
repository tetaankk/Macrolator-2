import express from "express";
const userRouter = express.Router();
import bcrypt from "bcryptjs";
import User from "../models/user.model.js";
import dotenv from "dotenv";
dotenv.config();
import jwt from "jsonwebtoken";
const jwtSecret = process.env.jwtSecret;

userRouter.get("/", (request, response) => {
  User.find()
    .then((users) => response.json(users))
    .catch((err) => response.status(400).json("Error " + err));
});

userRouter.post("/add", (request, response) => {
  const { email, password } = request.body;

  // Simple validation on both email and password
  if (!email || !password) {
    return response.status(400).json({ msg: "Please fill all fields" });
  }

  // Check if user exists already
  User.findOne({ email }).then((email) => {
    if (email) {
      return response
        .status(400)
        .json({ msg: "A user with this email already exists" });
    }
  });

  const newUser = new User({
    email: request.body.email,
    password: request.body.password,
  });

  // Create salt & hash
  bcrypt.genSalt(10, (err, salt) => {
    bcrypt.hash(newUser.password, salt, (err, hash) => {
      if (err) throw err;
      newUser.password = hash;
      newUser.save().then((user) =>
        jwt.sign(
          { id: user.id },
          jwtSecret,
          { expiresIn: 3600 },
          (err, token) => {
            if (err) throw err;
            response.json({
              token,
              user: { id: user.id },
            });
          }
        )
      );
    });
  });
});

//module.exports = userRouter;
export default userRouter;

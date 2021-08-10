import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import path from "path";
import dotenv from "dotenv";
dotenv.config();

const app = express();

app.use(cors());
app.options("*", cors());
app.use(express.json());

app.use(function (req, res, next) {
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept",
    "Access-Control-Allow-Methods",
    "GET, POST, PUT, DELETE, PATCH, OPTIONS",
    "Access-Control-Allow-Origin",
    "*",
    "Access-Control-Allow-Credentials",
    "true"
  );
  next();
});

const uri = process.env.ATLAS_URI;
mongoose.connect(uri, { useNewUrlParser: true, useCreateIndex: true });

const connection = mongoose.connection;

connection.once("open", () => {
  console.log("MongoDB database connection established successfully");
});

import authRouter from "./routes/auth.js";
import foodsRouter from "./routes/foods.js";
import usersRouter from "./routes/users.js";
import fetchRouter from "./routes/fetch.js";

app.use("/api/auth", authRouter);
app.use("/api/foods", foodsRouter);
app.use("/api/users", usersRouter);
app.use("/api/fetch", fetchRouter);

console.log("asd");

if (process.env.NODE_ENV === "production") {
  app.use(express.static("client/build"));

  app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "build", "index.html"));
  });
} /* else {
  app.get("/", (req, res) => {
    res.send("Api running...?");
  });
} */

const port = process.env.PORT || 5000;
app.listen(port, () => {
  console.log(`Server is running on port: ${port}`);
});

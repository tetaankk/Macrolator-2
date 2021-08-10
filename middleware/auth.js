//require("dotenv").config();
import dotenv from 'dotenv';
dotenv.config();
const jwtSecret = process.env.jwtSecret;
//const jwt = require("jsonwebtoken");
import jwt from 'jsonwebtoken';

function auth(request, response, next) {
  const token = request.header("x-auth-token");

  // Check for token
  if (!token)
    response.status(401).json({ msg: "No token, authorization denied" });

  try {
    // Verify token
    const decoded = jwt.verify(token, jwtSecret);
    // Add user from payload
    request.user = decoded;
  } catch (e) {
    response.status(400).json({ msg: "Token is not valid" });
  }
}

export default auth;
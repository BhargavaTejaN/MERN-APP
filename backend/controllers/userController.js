const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const User = require("../models/userModels");
require("dotenv").config();

const secreatKey = process.env.SECRET;

const createToken = (_id) => {
  return jwt.sign({ _id }, secreatKey, { expiresIn: "3d" });
};

// login route
const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.login(email, password );

    // creating a new jwt Token
    const token = createToken(user._id);

    res.status(200).json({ email, token });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// signup route
const signupUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.signup(email, password);

    // creating a new jwt Token
    const token = createToken(user._id);

    res.status(200).json({ email, token });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

module.exports = { loginUser, signupUser };

const jwt = require("jsonwebtoken");
const User = require("../models/userModels");
require("dotenv").config();

const requireAuth = async (req, res, next) => {
  // verify authentication
  const {authorization} = req.headers;

  if (!authorization) {
    res.status(401).json({ error: "Authorization Token Required" });
  }

  const token = authorization.split(" ")[1];

  try {
    const { _id } = jwt.verify(token, process.env.SECRET);

    req.user = await User.findById({ _id }).select("_id");
    next();
  } catch (error) {
    console.log("Error in requireAuth :", error);
    res.status(401).json({ error: "Request is not authorized" });
  }
};

module.exports = requireAuth;

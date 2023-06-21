const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const validator = require("validator");

const Schema = mongoose.Schema;

const userSchema = new Schema(
  {
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

// static signup method
userSchema.statics.signup = async function (email, password) {
  // validation
  if (!email || !password) {
    throw Error("All Fields Are Required");
  }

  if (!validator.isEmail(email)) {
    throw Error("Email is not valid");
  }

  if (!validator.isStrongPassword(password)) {
    throw Error("Strong Password Is Required");
  }

  const exists = await this.findOne({ email });

  if (exists) {
    throw Error("Email Is Already In Use");
  }

  const salt = await bcrypt.genSalt(10);
  const hash = await bcrypt.hash(password, salt);

  const user = await this.create({ email, password: hash });

  return user;
};

// static login method
userSchema.statics.login = async function (email, password) {
  if (!email || !password) {
    throw Error("All Fields Are Required");
  }

  // validate email 
  if (!validator.isEmail(email)) {
    throw Error("Not An Valid Email");
  }

  const user = await this.findOne({ email });

  if (!user) {
    throw Error("Email Is Not Registered");
  }

  const match = await bcrypt.compare(password, user.password);

  if (!match) {
    throw Error("Password Does Not Match!");
  }

  return user;
};

const User = mongoose.model("User", userSchema);
module.exports = User;

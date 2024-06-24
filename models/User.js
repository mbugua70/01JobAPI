const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const jwt = require("jsonwebtoken");

const { hash } = require("bcryptjs");
const bcrypt = require("bcryptjs");

const UserSchema = new Schema({
  name: {
    type: String,
    required: [true, "Please insert your name"],
    minLength: [3, "Your name is too short"],
  },
  email: {
    type: String,
    required: [true, "Please insert your email"],
    match: [
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
    ],
    unique: true,
  },
  password: {
    type: String,
    required: [true, "Please insert user password"],
    minLength: [8, "Password is less than 8 character"],
  },
});

// creating an instance method

UserSchema.methods.createToken = function () {
  return jwt.sign(
    { userId: this._id, userName: this.name },
    process.env.SECRET,
    { expiresIn: process.env.JWT_LIFETIME }
  );
};

UserSchema.methods.getName = function () {
  return this.name;
};

UserSchema.methods.comparePassword = async function (mainpassword) {
  return await bcrypt.compare(mainpassword, this.password);
};

// pre save middleware
UserSchema.pre("save", async function () {
  //    hashing the password
  const salt = await bcrypt.genSalt(15);
  this.password = await hash(this.password, salt);
});

const UserModel = mongoose.model("User", UserSchema);

module.exports = UserModel;
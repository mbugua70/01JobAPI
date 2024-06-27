const UserModel = require("../models/User");
const { StatusCodes } = require("http-status-codes");
const { BadRequestError, UnauthenticatedError } = require("../errors");

const register = async (req, res) => {
  const { name, email, password } = req.body;

  //   if (!name || !email || !password) {
  //     throw new BadRequestError("Please all the field must be filled");
  //   }

  const user = await UserModel.create({ ...req.body });
  //   const token = jwt.sign(
  //     { userId: user._id, userName: user.name },
  //     process.env.SECRET,
  //     { expiresIn: "30d" }
  //   );
  const token = user.createToken();
  res
    .status(StatusCodes.CREATED)
    .json({ user: { name: user.getName() }, token });
};

const login = async (req, res) => {
  const { email, password } = req.body;

  //   validation
  if ((!email, !password)) {
    throw new BadRequestError("Please provide email and password");
  }

  const userLogin = await UserModel.findOne({ email });

  if (!userLogin) {
    throw new UnauthenticatedError("Invalid credentials");
  }

  const isPasswordCorrect = await userLogin.comparePassword(password);

  if (!isPasswordCorrect) {
    throw new UnauthenticatedError("Invalid credentials");
  }

  const token = userLogin.createToken();
  res
    .status(StatusCodes.OK)
    .json({ user: { name: userLogin.getName() }, token });
};

module.exports = {
  register,
  login,
};

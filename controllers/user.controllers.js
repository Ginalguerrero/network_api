const { User, Thought } = require("../models");
const { StatusCodes } = require("http-status-codes");

const createUser = async (req, res) => {
  try {
    const user = await User.create(req.body);
    res.status(StatusCodes.CREATED).json(user);
  } catch (err) {
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(err);
  }
};

const getUser = async (req, res) => {
  try {
    const user = await User.findOne({ _id: req.params.userId })
      .populate("friends")
      .populate("thoughts");
    if (!user)
      res
        .status(StatusCodes.NOT_FOUND)
        .json({ error: "No user found with that ID" });
    else res.status(StatusCodes.OK).json({ user });
  } catch (err) {
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(err);
  }
};

const getUsers = async (req, res) => {
  try {
    const users = await User.find();
    res.status(StatusCodes.OK).json(users);
  } catch (err) {
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(err);
  }
};

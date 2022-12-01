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
    if (!user) {
      res
        .status(StatusCodes.NOT_FOUND)
        .json({ error: "No user found with that ID" });
    } else res.status(StatusCodes.OK).json({ user });
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

const deleteUser = async (req, res) => {
  const { userId } = req.params;
  try {
    const user = User.findOneAndRemove({ _id: userId });
    if (user) {
      try {
        await User.updateMany(
          { friends: userId, $pull: { friends: userId } },
          { new: true }
        );
        res
          .status(StatusCodes.OK)
          .json({ message: "User deleted successfully" });
      } catch (err) {
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(err);
      }
    }
  } catch (err) {}
};

const updateUser = async (req, res) => {
  try {
    const user = await User.findOneAndUpdate(
      { _id: req.params.userId },
      { $set: req.body },
      { runValidators: true, new: true }
    );
    if (!user) {
      res
        .status(StatusCodes.NOT_FOUND)
        .json({ error: "No user found with that ID" });
    } else res.status(StatusCodes.OK).json({ user });
  } catch (err){
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(err);
  }
};

const addFriend = async (req, res) => {
  const {userId, friendId} = req.params;
  try {
    const user = await User.findOneAndUpdate({_id: userId}, {$addToSet: {friends: friendId}}, {runValidators: true, new: true})
    if (!user) {
      res
        .status(StatusCodes.NOT_FOUND)
        .json({ error: "No user found with that ID" });
    } else res.status(StatusCodes.OK).json({ user });
  } catch (error) {
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(err);
  }
}

const removeFriend = async (req, res) => {
  const {userId, friendId} = req.params;
  try {
    const user = await User.findOneAndUpdate({_id: userId}, {$pull: {friends: friendId}}, {runValidators: true, new: true})
    if (!user) {
      res
        .status(StatusCodes.NOT_FOUND)
        .json({ error: "No user found with that ID" });
    } else res.status(StatusCodes.OK).json({ user });
  } catch (error) {
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(err);
  }
}

module.exports = {createUser, getUser, getUsers, deleteUser, updateUser, addFriend, removeFriend}
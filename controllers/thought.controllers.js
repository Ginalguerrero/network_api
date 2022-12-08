const Thought = require("../models/Thought.js");
const { StatusCodes } = require("http-status-codes");

const getThought = async (req, res) => {
  try {
    const thought = await Thought.findOne({ _id: req.params.thoughtId });
    console.log(thought);
    if (!thought) {
      res
        .status(StatusCodes.NOT_FOUND)
        .json({ error: "No thought found with that ID" });
    } else res.status(StatusCodes.OK).json({ thought });
  } catch (error) {
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(error);
  }
};

const getThoughts = async (req, res) => {
  try {
    const thoughts = await Thought.find();

    res.status(StatusCodes.OK).json(thoughts);
  } catch (error) {
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(error);
  }
};

const deleteThought = async (req, res) => {
  try {
    const thought = await Thought.findOneAndRemove({
      _id: req.params.thoughtId,
    });
    if (!thought) {
      res
        .status(StatusCodes.NOT_FOUND)
        .json({ error: "No thought found with that ID" });
    } else
      res
        .status(StatusCodes.OK)
        .json({ message: "Thought successfully removed" });
  } catch (error) {
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(error);
  }
};

const updateThought = async (req, res) => {
  try {
    const thought = await Thought.findOneAndUpdate(
      { _id: req.params.thoughtId },
      { $set: { thoughtText: req.body.thoughtText } },
      { runValidators: true, new: true }
    );
    if (!thought) {
      res
        .status(StatusCodes.NOT_FOUND)
        .json({ error: "No thought found with that ID" });
    } else
      res
        .status(StatusCodes.OK)
        .json({ message: "Thought successfully updated" });
  } catch (error) {
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(error);
  }
};
const createThought = async (req, res) => {
  try {
    const thought = await Thought.create(req.body).exec();
    const updatedUser = await User.findOneAndUpdate(
      { username: req.body.username },
      { $push: { thoughts: thought._id } },
      { new: true }
    );
    if (!updatedUser) {
      res
        .status(StatusCodes.NOT_FOUND)
        .json({ error: "No user found with that USERNAME" });
    } else
      res
        .status(StatusCodes.OK)
        .json({ message: "Thought successfully created" });
  } catch (error) {
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(error);
  }
};

const removeReaction = async (req, res) => {
  const { thoughtId, reactionId } = req.params;
  try {
    const thought = await Thought.findOneAndUpdate(
      { _id: thoughtId },
      { $pull: { reactions: { reactionId } } },
      { runValidators: true, new: true }
    );
    if (!thought) {
      res
        .status(StatusCodes.NOT_FOUND)
        .json({ error: "No thought found with that ID" });
    } else res.status(StatusCodes.OK).json({ thought });
  } catch (error) {
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(error);
  }
};

const createReaction = async (req, res) => {
  try {
    const thought = await Thought.findOneAndUpdate(
      { _id: req.params.thoughtId },
      { $addToSet: { reactions: req.body } },
      { runValidators: true, new: true }
    );
    if (!thought) {
      res
        .status(StatusCodes.NOT_FOUND)
        .json({ error: "No thought found with that ID" });
    } else res.status(StatusCodes.OK).json({ thought });
  } catch (error) {
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(error);
  }
};
module.exports = {
  getThought,
  getThoughts,
  deleteThought,
  updateThought,
  createThought,
  createReaction,
  removeReaction,
};

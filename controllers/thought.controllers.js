const { Thought } = require("../models");
const { StatusCodes } = require("http-status-codes");

const getThought = async (req, res) => {
  try {
    const thought = await Thought.findOne({ _id: req.param.thoughtId });
    if (!thought) {
      res
        .status(StatusCodes.NOT_FOUND)
        .json({ error: "No thought found with that ID" });
    } else res.status(StatusCodes.OK).json({ thought });
  } catch (error) {
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(err);
  }
};

const getThoughts = async (req, res) => {
  try {
    const thought = await Thought.find();
    res.status(StatusCodes.OK).json({ thought });
  } catch (error) {
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(err);
  }
};

const deleteThought = async (req, res) => {
  try {
    const thought = await Thought.findOneAndRemove({
      _id: req.param.thoughtId,
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
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(err);
  }
};

const updateThought = async (req, res) => {
  try {
    const thought = await Thought.findOneAndUpdate(
      { _id: req.param.thoughtId },
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
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(err);
  }
};
const createThought = async (req, res) => {
  try {
    const thought = await Thought.create(req.body);
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
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(err);
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
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(err);
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
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(err);
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

const dayjs = require("dayjs");
const { Schema, model } = require("mongoose");
const { schema: reactionSchema } = require("./Reaction.js");

const schema = new Schema(
  {
    thoughtId: {
      type: Schema.Types.ObjectId,
      default: () => new Types.ObjectId(),
    },
    thoughtText: {
      type: String,
      required: true,
      minLength: 1,
      maxLength: 280,
    },
    createdAt: {
      type: Date,
      default: dayjs(),
      get: (date) => date.format("MM/DD/YYYY - HH:mm"),
    },
    username: {
      type: String,
      required: true,
    },
    reactions: [reactionSchema],
  },
  {
    toJSON: {
      virtuals: true,
      getters: true,
    },
  }
);

schema.virtual("reactionCount").get(function () {
  return this.reactions.length;
});

const Thought = model("thought", schema);
module.exports = Thought;

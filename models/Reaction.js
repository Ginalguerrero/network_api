const dayjs = require("dayjs");
const { Schema, Types } = require("mongoose");

const schema = new Schema(
  {
    reactionId: {
      type: Schema.Types.ObjectId,
      default: () => new Types.ObjectId(),
    },
    reactionBody: {
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
  },
  {
    toJSON: {
      getters: true,
    }
  }
);

module.exports = { schema };

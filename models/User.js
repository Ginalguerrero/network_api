const { Schema, Types, model } = require("mongoose");

const { ObjectId } = Schema.Types;

const schema = new Schema(
  {
    _id: {
      type: Schema.Types.ObjectId,
      default: () => new Types.ObjectId(),
    },
    username: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      match: [
        /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
        "Please fill a valid email address",
      ],
    },
    friends: [{ ref: "user", type: ObjectId }],
    thoughts: [{ ref: "thought", type: ObjectId }],
  },
  {
    toJSON: {
      virtuals: true,
      getters: true,
    },
  }
);

schema.virtual("friendCount").get(function () {
  return this.friends.length;
});

const User = model("user", schema);

module.exports = User;

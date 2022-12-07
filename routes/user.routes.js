const router = require("express").Router();
const userController = require("../controllers/user.controllers");

router.route("/").get(userController.getUsers).post(userController.createUser);

router
  .route("/:userId")
  .get(userController.getUser)
  .delete(userController.deleteUser)
  .put(userController.updateUser);

router
  .route("/:userId/friends/:friendId")
  .post(userController.addFriend)
  .delete(userController.removeFriend);

module.exports = { router };

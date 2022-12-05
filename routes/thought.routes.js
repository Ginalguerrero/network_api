const router = require("express").Router();
const thoughtController = require("../controllers/thought.controllers");

router
  .route("/")
  .get(thoughtController.getThoughts)
  .post(thoughtController.createThought);

router
  .route("/:thoughtId")
  .get(thoughtController.getThought)
  .put(thoughtController.updateThought)
  .delete(thoughtController.deleteThought);

router.route("/:thoughtId/reactions").post(thoughtController.createReaction);

router
  .route("/:thoughtId/reactions/:reactionId")
  .delete(thoughtController.removeReaction);

module.exports = router;

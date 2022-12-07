const router = require("express").Router();
const { router: userRoutes } = require("./user.routes");
const { router: thoughtRoutes } = require("./thought.routes");

router.use("/users", userRoutes);
router.use("/thoughts", thoughtRoutes);

module.exports = router;

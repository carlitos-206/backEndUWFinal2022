const { Router } = require("express");
const router = Router();

router.use("/users", require("./firebaseRoutes"))
router.use("/", (req, res) => res.status(404).send("Route not found. Maybe you meant /movies"))

module.exports = router;
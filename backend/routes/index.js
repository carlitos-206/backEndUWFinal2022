const { Router } = require("express");
const router = Router();

router.use("/fires", require("./fireRoutes"))
router.use("/", (req, res) => res.status(404).send({Error: 'ROUTE NOT VALID'}))

module.exports = router;
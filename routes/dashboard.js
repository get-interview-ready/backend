const express = require("express");
const router = express.Router();
const { dashboard } = require("../controllers/dashboardController");
const auth = require("../middleware/auth");

router.route("/dashboard/:id").get(auth, dashboard);

module.exports = router;

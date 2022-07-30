const express = require("express");
const router = express.Router();
const auth = require("../middleware/auth");

const {
  createProject,
  deleteProject,
  getAllProjects,
  getProject,
  updateAnswers,
} = require("../controllers/projectController");

router.route("/createProject").post(auth, createProject);
router.route("/deleteProject").delete(auth, deleteProject);
router.route("/getAllProjects/:id").get(auth, getAllProjects);
router.route("/getProject/:id").get(auth, getProject);
router.route("/updateAnswers").patch(auth, updateAnswers);

module.exports = router;

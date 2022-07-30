const express = require("express");
const router = express.Router();
const auth = require("../middleware/auth");

const {
  createTechnicalQuestion,
  deleteTechnicalQuestion,
  getAllTechnicalQuestions,
  getTechnicalQuestion,
  updateSolution,
  updateSolutionUrl,
} = require("../controllers/technicalQuestionController");

router.route("/createTechnicalQuestion").post(auth, createTechnicalQuestion);
router.route("/deleteTechnicalQuestion").delete(auth, deleteTechnicalQuestion);
router
  .route("/getAllTechnicalQuestions/:id")
  .get(auth, getAllTechnicalQuestions);
router.route("/getTechnicalQuestion/:id").get(auth, getTechnicalQuestion);
router.route("/updateSolution").patch(auth, updateSolution);
router.route("/updateSolutionUrl").patch(auth, updateSolutionUrl);

module.exports = router;

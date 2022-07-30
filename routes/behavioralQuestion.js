const express = require("express");
const router = express.Router();
const auth = require("../middleware/auth");

const {
  createBehavioralQuestion,
  deleteBehavioralQuestion,
  getAllBehavioralQuestions,
  getBehavioralQuestion,
  updateAnswer,
} = require("../controllers/behavioralQuestionController");

router.route("/createBehavioralQuestion").post(auth, createBehavioralQuestion);
router
  .route("/deleteBehavioralQuestion")
  .delete(auth, deleteBehavioralQuestion);
router
  .route("/getAllBehavioralQuestions/:id")
  .get(auth, getAllBehavioralQuestions);

router.route("/getBehavioralQuestion/:id").get(auth, getBehavioralQuestion);

router.route("/updateAnswer").patch(auth, updateAnswer);

module.exports = router;

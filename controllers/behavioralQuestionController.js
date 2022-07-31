const internalServerError = require("../utils/internalServerError");
const { v4: uuidv4 } = require("uuid");
const connection = require("../config/database");
const {
  INSERT_BEHAVIORAL_QUESTION,
  DELETE_BEHAVIORAL_QUESTION_BY_ID,
  SELECT_ALL_BEHAVIORAL_QUESTIONS_BY_UID,
  SELECT_BEHAVIORAL_QUESTION_BY_ID,
  UPDATE_ANSWER_BY_ID,
} = require("../services/behavioralQuestionServices");

exports.createBehavioralQuestion = (req, res) => {
  const { questionId, question, answer, user_id } = req.body;

  if (!questionId || !question || !answer || !user_id) {
    return res.status(400).json({
      success: false,
      message: "Send question, question ID, question, answer and user ID",
    });
  }
  try {
    const id = uuidv4();
    const behavioralQuestion = { id, questionId, question, answer, user_id };
    connection.query(
      INSERT_BEHAVIORAL_QUESTION,
      [id, questionId, question, answer, user_id],
      (err, results) => {
        if (err) {
          return internalServerError(res);
        }
        return res.status(200).json({
          success: true,
          message: "Behavioral question successfully added.",
          behavioralQuestion,
        });
      }
    );
  } catch (err) {
    return internalServerError(res);
  }
};

exports.deleteBehavioralQuestion = (req, res) => {
  const { id } = req.body;
  if (!id) {
    return res.status(400).json({
      success: false,
      message: "Please send behavioral question ID to delete.",
    });
  }
  try {
    connection.query(DELETE_BEHAVIORAL_QUESTION_BY_ID, [id], (err, results) => {
      if (err) {
        return internalServerError(res);
      }
      if (results.affectedRows === 0) {
        return res.status(400).json({
          success: false,
          message: `Requested behavioral question does not exist.`,
        });
      }
      return res.status(200).json({
        success: true,
        message: "Behavioral question successfully deleted",
      });
    });
  } catch (err) {
    return internalServerError(res);
  }
};

exports.getAllBehavioralQuestions = (req, res) => {
  const { id } = req.params;
  if (!id) {
    return res.status(400).json({
      success: false,
      message: "Please send user ID to fetch all behavioral questions.",
    });
  }
  try {
    connection.query(
      SELECT_ALL_BEHAVIORAL_QUESTIONS_BY_UID,
      [id],
      (err, results) => {
        if (err) {
          return internalServerError(res);
        }
        return res.status(200).json({
          success: true,
          message: "Behavioral questions fetched successfully.",
          behavioralQuestions: results,
        });
      }
    );
  } catch (err) {
    return internalServerError(res);
  }
};

exports.getBehavioralQuestion = (req, res) => {
  const { id } = req.params;
  if (!id) {
    return res.status(400).json({
      success: false,
      message: "Please send behavioral question unique ID to fetch.",
    });
  }
  try {
    connection.query(SELECT_BEHAVIORAL_QUESTION_BY_ID, [id], (err, results) => {
      if (err) {
        return internalServerError(res);
      }
      return res.status(200).json({
        success: true,
        message: `Behavioral question fetched successfully.`,
        behavioralQuestion: results[0],
      });
    });
  } catch (err) {
    return internalServerError(res);
  }
};

exports.updateAnswer = (req, res) => {
  const { id, answer } = req.body;
  if (!id || !answer) {
    return res.status(400).json({
      success: false,
      message: "Please send behavioral question ID and answer.",
    });
  }
  try {
    connection.query(UPDATE_ANSWER_BY_ID, [answer, id], (err, results) => {
      if (err) {
        return internalServerError(res);
      }
      return res.status(200).json({
        success: true,
        message: "Answer successfully updated.",
      });
    });
  } catch (err) {
    return internalServerError(res);
  }
};

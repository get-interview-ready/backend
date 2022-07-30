const internalServerError = require("../utils/internalServerError");
const { v4: uuidv4 } = require("uuid");
const connection = require("../config/database");
const {
  INSERT_TECHNICAL_QUESTION,
  DELETE_TECHNICAL_QUESTION_BY_ID,
  SELECT_ALL_TECHNICAL_QUESTIONS_BY_UID,
  SELECT_TECHNICAL_QUESTION_BY_ID,
  UPDATE_SOLUTION_BY_ID,
  UPDATE_SOLUTION_URL_BY_ID,
} = require("../services/technicalQuestionServices");

exports.createTechnicalQuestion = (req, res) => {
  const { question, tech_stack, user_id } = req.body;

  if (!question || !tech_stack || !user_id) {
    return res.status(400).json({
      success: false,
      message:
        "Send technical question, tech_stack and user ID to create a technical question",
    });
  }
  try {
    const id = uuidv4();
    const technicalQuestion = { id, question, tech_stack, user_id };
    connection.query(
      INSERT_TECHNICAL_QUESTION,
      [id, question, tech_stack, user_id],
      (err, results) => {
        if (err) {
          return internalServerError(res);
        }
        return res.status(200).json({
          success: true,
          message: "Technical question successfully added.",
          technicalQuestion,
        });
      }
    );
  } catch (err) {
    return internalServerError(res);
  }
};

exports.deleteTechnicalQuestion = (req, res) => {
  const { id } = req.body;
  if (!id) {
    return res.status(400).json({
      success: false,
      message: "Please send technical question ID to delete.",
    });
  }
  try {
    connection.query(DELETE_TECHNICAL_QUESTION_BY_ID, [id], (err, results) => {
      if (err) {
        return internalServerError(res);
      }
      if (results.affectedRows === 0) {
        return res.status(400).json({
          success: false,
          message: `Requested technical question does not exist.`,
        });
      }
      return res.status(200).json({
        success: true,
        message: "technical question successfully deleted",
      });
    });
  } catch (err) {
    return internalServerError(res);
  }
};

exports.getAllTechnicalQuestions = (req, res) => {
  const { id } = req.params;
  if (!id) {
    return res.status(400).json({
      success: false,
      message: "Please send user ID to fetch all technical questions.",
    });
  }
  try {
    connection.query(
      SELECT_ALL_TECHNICAL_QUESTIONS_BY_UID,
      [id],
      (err, results) => {
        if (err) {
          return internalServerError(res);
        }
        return res.status(200).json({
          success: true,
          message: "Technical questions fetched successfully.",
          technicalQuestions: results,
        });
      }
    );
  } catch (err) {
    return internalServerError(res);
  }
};

exports.getTechnicalQuestion = (req, res) => {
  const { id } = req.params;
  if (!id) {
    return res.status(400).json({
      success: false,
      message: "Please send unique technical question ID to fetch.",
    });
  }
  try {
    connection.query(SELECT_TECHNICAL_QUESTION_BY_ID, [id], (err, results) => {
      if (err) {
        return internalServerError(res);
      }
      return res.status(200).json({
        success: true,
        message: `Technical question fetched successfully.`,
        project: results[0],
      });
    });
  } catch (err) {
    return internalServerError(res);
  }
};

exports.updateSolution = (req, res) => {
  const { id, solution } = req.body;
  if (!id || !solution) {
    return res.status(400).json({
      success: false,
      message: "Please send technical ID and solution.",
    });
  }
  try {
    connection.query(UPDATE_SOLUTION_BY_ID, [solution, id], (err, results) => {
      if (err) {
        return internalServerError(res);
      }
      return res.status(200).json({
        success: true,
        message: "Solution successfully updated.",
      });
    });
  } catch (err) {
    return internalServerError(res);
  }
};

exports.updateSolutionUrl = (req, res) => {
  const { id, url } = req.body;
  if (!id || !url) {
    return res.status(400).json({
      success: false,
      message: "Please send technical ID and solution url.",
    });
  }
  try {
    connection.query(UPDATE_SOLUTION_URL_BY_ID, [url, id], (err, results) => {
      if (err) {
        return internalServerError(res);
      }
      return res.status(200).json({
        success: true,
        message: "Solution url successfully updated.",
      });
    });
  } catch (err) {
    return internalServerError(res);
  }
};

const internalServerError = require("../utils/internalServerError");
const { v4: uuidv4 } = require("uuid");
const connection = require("../config/database");
const {
  INSERT_PROJECT,
  DELETE_PROJECT_BY_ID,
  SELECT_ALL_PROJECTS_BY_UID,
  SELECT_PROJECT_BY_ID,
  UPDATE_ANSWERS_BY_ID,
} = require("../services/projectServices");

exports.createProject = (req, res) => {
  const { name, tagline, tech_stack, user_id } = req.body;

  if (!name || !tagline || !tech_stack || !user_id) {
    return res.status(400).json({
      success: false,
      message: "Send project name, tagline, tech_stack and user ID",
    });
  }
  try {
    const id = uuidv4();
    const project = { id, name, tagline, tech_stack, user_id };
    connection.query(
      INSERT_PROJECT,
      [id, name, tagline, tech_stack, user_id],
      (err, results) => {
        if (err) {
          return internalServerError(res);
        }
        return res.status(200).json({
          success: true,
          message: "Project successfully added.",
          project,
        });
      }
    );
  } catch (err) {
    return internalServerError(res);
  }
};

exports.deleteProject = (req, res) => {
  const { id } = req.body;
  if (!id) {
    return res.status(400).json({
      success: false,
      message: "Please send project ID to delete.",
    });
  }
  try {
    connection.query(DELETE_PROJECT_BY_ID, [id], (err, results) => {
      if (err) {
        return internalServerError(res);
      }
      if (results.affectedRows === 0) {
        return res.status(400).json({
          success: false,
          message: `Requested project does not exist.`,
        });
      }
      return res.status(200).json({
        success: true,
        message: "project successfully deleted",
      });
    });
  } catch (err) {
    return internalServerError(res);
  }
};

exports.getAllProjects = (req, res) => {
  const { id } = req.params;
  if (!id) {
    return res.status(400).json({
      success: false,
      message: "Please send user ID to fetch all projects.",
    });
  }
  try {
    connection.query(SELECT_ALL_PROJECTS_BY_UID, [id], (err, results) => {
      if (err) {
        return internalServerError(res);
      }
      return res.status(200).json({
        success: true,
        message: "Projects fetched successfully.",
        projects: results,
      });
    });
  } catch (err) {
    return internalServerError(res);
  }
};

exports.getProject = (req, res) => {
  const { id } = req.params;
  if (!id) {
    return res.status(400).json({
      success: false,
      message: "Please send unique project ID to fetch.",
    });
  }
  try {
    connection.query(SELECT_PROJECT_BY_ID, [id], (err, results) => {
      if (err) {
        return internalServerError(res);
      }
      return res.status(200).json({
        success: true,
        message: `Project fetched successfully.`,
        project: results[0],
      });
    });
  } catch (err) {
    return internalServerError(res);
  }
};

exports.updateAnswers = (req, res) => {
  const { id, answers } = req.body;
  if (!id || !answers) {
    return res.status(400).json({
      success: false,
      message: "Please send project ID and answers.",
    });
  }
  try {
    connection.query(UPDATE_ANSWERS_BY_ID, [answers, id], (err, results) => {
      if (err) {
        return internalServerError(res);
      }
      return res.status(200).json({
        success: true,
        message: "Answers successfully updated.",
      });
    });
  } catch (err) {
    return internalServerError(res);
  }
};

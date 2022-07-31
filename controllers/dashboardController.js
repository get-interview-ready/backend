const connection = require("../config/database");
const internalServerError = require("../utils/internalServerError");
const { GET_STAT } = require("../services/dashboardServices");

exports.dashboard = (req, res) => {
  const { id } = req.params;
  if (!id) {
    return res.status(400).json({
      success: false,
      message: "Send user ID to get dashboard stats.",
    });
  }

  try {
    connection.query(GET_STAT, [id], (err, results) => {
      if (err) {
        return internalServerError(res);
      }
      return res.status(200).json({
        results,
      });
    });
  } catch (err) {
    return internalServerError(res);
  }
};

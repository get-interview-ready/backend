const connection = require("../config/database");
const internalServerError = require("../utils/internalServerError");
const { GET_STATS, GET_TEST_STATS } = require("../services/dashboardServices");

exports.dashboard = (req, res) => {
  const { id } = req.params;

  if (!id) {
    return res.status(400).json({
      success: false,
      message: "Send user ID to fetch dashboard stats",
    });
  }
  try {
    connection.query(GET_STATS, [id, id, id, id, id], (err, results) => {
      if (err) {
        return internalServerError(res);
      }
      const stats = results;
      connection.query(GET_TEST_STATS, [id], (err, results) => {
        if (err) {
          return internalServerError(res);
        }
        return res.status(200).json({
          success: true,
          message: "Deck created successfully",
          test_scores: results,
          stats,
        });
      });
    });
  } catch (err) {
    return internalServerError(res);
  }
};

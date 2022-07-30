const connection = require("../config/database");
const {
  INSERT_DREAM_COMPANY,
  DELETE_DREAM_COMPANY_BY_ID,
  SELECT_ALL_DREAM_COMPANIES_BY_UID,
  SELECT_DREAM_COMPANY_BY_ID,
  UPDATE_MD_TEXT_BY_ID,
  UPDATE_REFERRAL_MSG_BY_ID,
  INSERT_REFERRER,
  DELETE_REFERRER,
  SELECT_ALL_REFERRERS_BY_UID_AND_CID,
  UPDATE_REFERRER,
} = require("../services/dreamCompanyServices");
const internalServerError = require("../utils/internalServerError");
const { v4: uuidv4 } = require("uuid");

exports.createDreamCompany = (req, res) => {
  const { user_id, name } = req.body;

  if (!user_id || !name) {
    return res.status(400).json({
      success: false,
      message: "Please send dream company name & user id",
    });
  }
  try {
    const id = uuidv4();
    const dreamCompany = { id, name, user_id };
    connection.query(
      INSERT_DREAM_COMPANY,
      [id, name, user_id],
      (err, results) => {
        if (err) {
          if (err.code === "ER_DUP_ENTRY") {
            return res.status(400).json({
              success: false,
              message: `${name} already exists.`,
            });
          }
          return internalServerError(res);
        }
        return res.status(200).json({
          success: true,
          message: "Dream company successfully added",
          dreamCompany,
        });
      }
    );
  } catch (err) {
    return internalServerError(res);
  }
};

exports.deleteDreamCompany = (req, res) => {
  const { id } = req.body;
  if (!id) {
    return res.status(400).json({
      success: false,
      message: "Please send dream company ID to delete.",
    });
  }
  try {
    connection.query(DELETE_DREAM_COMPANY_BY_ID, [id], (err, results) => {
      if (err) {
        return internalServerError(res);
      }
      if (results.affectedRows === 0) {
        return res.status(400).json({
          success: false,
          message: `Requested dream company does not exist.`,
        });
      }
      return res.status(200).json({
        success: true,
        message: "Dream company successfully deleted",
      });
    });
  } catch (err) {
    return internalServerError(res);
  }
};

exports.getAllDreamCompanies = (req, res) => {
  const { id } = req.params;
  if (!id) {
    return res.status(400).json({
      success: false,
      message: "Please send user ID to fetch all dream companies.",
    });
  }
  try {
    connection.query(
      SELECT_ALL_DREAM_COMPANIES_BY_UID,
      [id],
      (err, results) => {
        if (err) {
          return internalServerError(res);
        }
        return res.status(200).json({
          success: true,
          message: "Dream companies fetched successfully.",
          dreamCompanies: results,
        });
      }
    );
  } catch (err) {
    return internalServerError(res);
  }
};

exports.getDreamCompany = (req, res) => {
  const { id } = req.params;
  if (!id) {
    return res.status(400).json({
      success: false,
      message: "Please send dream company unique ID to fetch.",
    });
  }
  try {
    connection.query(SELECT_DREAM_COMPANY_BY_ID, [id], (err, results) => {
      if (err) {
        return internalServerError(res);
      }
      return res.status(200).json({
        success: true,
        message: `${results[0].name} fetched successfully.`,
        dreamCompany: results[0],
      });
    });
  } catch (err) {
    return internalServerError(res);
  }
};

exports.updateMdText = (req, res) => {
  const { id, text } = req.body;
  if (!id || !text) {
    return res.status(400).json({
      success: false,
      message: "Please send company ID and Md Text.",
    });
  }
  try {
    connection.query(UPDATE_MD_TEXT_BY_ID, [text, id], (err, results) => {
      if (err) {
        return internalServerError(res);
      }
      return res.status(200).json({
        success: true,
        message: "Md text successfully updated.",
      });
    });
  } catch (err) {
    return internalServerError(res);
  }
};

exports.updateReferralMsg = (req, res) => {
  const { id, msg } = req.body;
  if (!id || !msg) {
    return res.status(400).json({
      success: false,
      message: "Please send company ID and Referral Message.",
    });
  }
  try {
    connection.query(UPDATE_REFERRAL_MSG_BY_ID, [msg, id], (err, results) => {
      if (err) {
        return internalServerError(res);
      }
      return res.status(200).json({
        success: true,
        message: "Referral message successfully updated.",
      });
    });
  } catch (err) {
    return internalServerError(res);
  }
};

exports.createReferrer = (req, res) => {
  const { name, link, user_id, company_id } = req.body;

  if (!name || !link || !user_id || !company_id) {
    return res.status(400).json({
      success: false,
      message:
        "Please send referrer name, referrer link, user ID and dream company ID.",
    });
  }
  try {
    const id = uuidv4();
    const referrer = { id, name, link, user_id, company_id };
    connection.query(
      INSERT_REFERRER,
      [id, name, link, user_id, company_id],
      (err, results) => {
        if (err) {
          return internalServerError(res);
        }
        return res.status(200).json({
          success: true,
          message: "Referrer successfully added",
          referrer,
        });
      }
    );
  } catch (err) {
    return internalServerError(res);
  }
};

exports.deleteReferrer = (req, res) => {
  const { id } = req.body;
  if (!id) {
    return res.status(400).json({
      success: false,
      message: "Please send referrer ID to delete.",
    });
  }
  try {
    connection.query(DELETE_REFERRER, [id], (err, results) => {
      if (err) {
        return internalServerError(res);
      }
      if (results.affectedRows === 0) {
        return res.status(400).json({
          success: false,
          message: `Requested referrer does not exist.`,
        });
      }
      return res.status(200).json({
        success: true,
        message: "Referrer successfully deleted",
      });
    });
  } catch (err) {
    return internalServerError(res);
  }
};

exports.getAllReferrers = (req, res) => {
  const { user_id, company_id } = req.query;
  if (!user_id || !company_id) {
    return res.status(400).json({
      success: false,
      message: "Please send user ID and company ID to fetch all referrers.",
    });
  }
  try {
    connection.query(
      SELECT_ALL_REFERRERS_BY_UID_AND_CID,
      [user_id, company_id],
      (err, results) => {
        if (err) {
          return internalServerError(res);
        }
        return res.status(200).json({
          success: true,
          message: "Referrers fetched successfully.",
          referrers: results,
        });
      }
    );
  } catch (err) {
    return internalServerError(res);
  }
};

exports.updateReferrer = (req, res) => {
  const { id, isContacted } = req.body;
  if (!id || !isContacted) {
    return res.status(400).json({
      success: false,
      message:
        "Send referrer ID and isContacted to successfully update contacted status.",
    });
  }
  try {
    connection.query(UPDATE_REFERRER, [isContacted, id], (err, results) => {
      if (err) {
        return internalServerError(res);
      }
      return res.status(200).json({
        success: true,
        message: "Referrer status: contacted successfully updated.",
      });
    });
  } catch (err) {
    return internalServerError(res);
  }
};

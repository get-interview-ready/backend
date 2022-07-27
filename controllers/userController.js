const connection = require("../config/database");
const {
  CREATE_USER,
  SELECT_USER_BY_EMAIL,
} = require("../services/userServices");
const bcrypt = require("bcryptjs");
const cookieToken = require("../utils/cookieToken");

exports.signup = async (req, res, next) => {
  const { full_name, email, password } = req.body;

  if (!full_name || !email || !password) {
    return res.status(400).json({
      success: false,
      message: "Please send name, email & password",
    });
    // return next();
  }

  if (password.length < 6) {
    return res.status(400).json({
      success: false,
      message: "Password should be at least 6 characters long",
    });
    // return next();
  }

  try {
    const hashedPassword = await bcrypt.hash(password, 10);

    connection.query(
      CREATE_USER,
      [full_name, email, hashedPassword],
      (err, results) => {
        if (err) {
          isDuplicateUser = true;
          return res.status(400).json({
            success: false,
            message: "User already exists",
          });
          // return next();
        }
        connection.query(SELECT_USER_BY_EMAIL, [email], (err, results) => {
          delete results[0].password;
          cookieToken(results[0], res);
        });
      }
    );

  } catch (err) {
    return res.status(500).json({
      success: false,
      message: "Internal server error. Please try again!",
    });
    // return next();
  }
};

exports.login = async (req, res, next) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({
      success: false,
      message: "Please provide email and password",
    });
    // return next();
  }

  try {
    connection.query(SELECT_USER_BY_EMAIL, [email], async (err, results) => {
      if (!results[0]) {
        return res.status(400).json({
          success: false,
          message: "Email or password doesn't match or exist",
        });
        // return next();
      }

      const isPasswordCorrect = await bcrypt.compare(
        password,
        results[0].password
      );

      if (!isPasswordCorrect) {
        return res.status(400).json({
          success: false,
          message: "Email or password doesn't match or exist",
        });
        // return next();
      }
      delete results[0].password;
      cookieToken(results[0], res);
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      message: "Internal server error. Please try again!",
    });
    // return next();
  }
};

exports.logout = async (req, res, next) => {
  res.cookie("token", null, {
    expires: new Date(Date.now()),
    httpOnly: true,
  });
  res.status(200).json({
    success: true,
    message: "logout success",
  });
};

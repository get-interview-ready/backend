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
    res.status(400).json({
      success: false,
      message: "Please send name, email & password",
    });
    // return next(new Error("Please send name, email & password"));
    return next();
  }
  try {
    const hashedPassword = await bcrypt.hash(password, 10);

    connection.query(
      CREATE_USER,
      [full_name, email, hashedPassword],
      (err, results) => {
        console.log(results);
      }
    );

    connection.query(SELECT_USER_BY_EMAIL, [email], (err, results) => {
      delete results[0].password;
      cookieToken(results[0], res);
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: "Internal server error. PLease try again!",
    });
    return next();
    // console.log(err);
    // return next(new Error(err.message));
  }
};

exports.login = async (req, res, next) => {
  const { email, password } = req.body;

  if (!email || !password) {
    res.status(400).json({
      success: false,
      message: "Please provide email and password",
    });
    return next();
    // return next(new Error("Please provide email and password"));
  }

  try {
    connection.query(SELECT_USER_BY_EMAIL, [email], async (err, results) => {
      if (!results[0]) {
        res.status(400).json({
          success: false,
          message: "Email or password doesn't match or exist",
        });
        return next();
        // return next(new Error("Email/password doesn't match or exist"));
      }

      const isPasswordCorrect = await bcrypt.compare(
        password,
        results[0].password
      );

      if (!isPasswordCorrect) {
        res.status(400).json({
          success: false,
          message: "Email or password doesn't match or exist",
        });
        return next();
        // return next(new Error("Email/password doesn't match or exist"));
      }
      delete results[0].password;
      cookieToken(results[0], res);
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: "Internal server error. PLease try again!",
    });
    return next();
    // console.log(err);
    // return next(new Error(err.message));
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

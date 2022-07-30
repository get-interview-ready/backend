const connection = require("../config/database");
const {
  CREATE_USER,
  SELECT_USER_BY_EMAIL,
} = require("../services/userServices");
const bcrypt = require("bcryptjs");
const cookieToken = require("../utils/cookieToken");
const { v4: uuidv4 } = require("uuid");
const internalServerError = require("../utils/internalServerError");

exports.signup = async (req, res, next) => {
  const { full_name, email, password } = req.body;

  if (!full_name || !email || !password) {
    return res.status(400).json({
      success: false,
      message: "Please send name, email & password",
    });
  }

  if (password.length < 6) {
    return res.status(400).json({
      success: false,
      message: "Password should be at least 6 characters long",
    });
  }

  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    const id = uuidv4();
    const user = { id, full_name, email };

    connection.query(
      CREATE_USER,
      [id, full_name, email, hashedPassword],
      (err, results) => {
        if (err) {
          return res.status(400).json({
            success: false,
            message: "User already exists",
          });
        }

        cookieToken(user, res);
      }
    );
  } catch (err) {
    return internalServerError(res);
  }
};

exports.login = async (req, res, next) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({
      success: false,
      message: "Please provide email and password",
    });
  }

  try {
    connection.query(SELECT_USER_BY_EMAIL, [email], async (err, results) => {
      if (!results[0]) {
        return res.status(400).json({
          success: false,
          message: "Email or password doesn't match or exist",
        });
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
      }
      delete results[0].password;
      cookieToken(results[0], res);
    });
  } catch (err) {
    return internalServerError(res);
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

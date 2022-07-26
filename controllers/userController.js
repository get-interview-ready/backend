// const { connection } = require("../app");
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
    return next(new Error("Please send name, email & password"));
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
    console.log(err);
    return next(new Error(err.message));
  }
};

exports.login = async (req, res, next) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return next(new Error("Please provide email and password"));
  }

  try {
    connection.query(SELECT_USER_BY_EMAIL, [email], async (err, results) => {
      if (!results[0]) {
        return next(new Error("Email/password doesn't match or exist"));
      }

      const isPasswordCorrect = await bcrypt.compare(
        password,
        results[0].password
      );

      if (!isPasswordCorrect) {
        return next(new Error("Email/password doesn't match or exist"));
      }
      delete results[0].password;
      cookieToken(results[0], res);
    });
  } catch (err) {
    console.log(err);
    return next(new Error(err.message));
  }
};

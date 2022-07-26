require("dotenv").config();
const {
  CREATE_USER,
  SELECT_USER_BY_EMAIL,
  SELECT_USER_PASSWORD_BY_PASSWORD
} = require("../services/userServices");

const connection = require('../config/database')

const execQuery = async () => {
  try {
    connection.query(
        SELECT_USER_PASSWORD_BY_PASSWORD,
      ["kedaroo@gmail.com"],
      (err, results) => {
        console.log(results);
      }
    );
  } catch (err) {
    console.log(err);
  }
};

execQuery();

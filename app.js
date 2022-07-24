require("dotenv").config();
const express = require("express");
const mysql = require("mysql2");

const app = express();

const { DATABASE_URL } = process.env;

const connection = mysql.createConnection(DATABASE_URL);

connection.connect();

app.get("/", (req, res) => {
  res.status(200).json({ message: "hello world!" });
});

module.exports = app;

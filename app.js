require("dotenv").config();
const express = require("express");
const cookieParser = require("cookie-parser");
const cors = require("cors");

const app = express();

app.use(express.json());
app.use(cookieParser());
app.use(cors());

const user = require("./routes/user");
const dreamCompany = require("./routes/dreamCompany");
const behavioralQuestion = require("./routes/behavioralQuestion");
const project = require("./routes/project");
const technicalQuestion = require("./routes/technicalQuestion");
const flashCard = require("./routes/flashCard");
const dashboard = require("./routes/dashboard");

app.use("/api/v1/", user);
app.use("/api/v1/", dashboard);
app.use("/api/v1/dreamCompanies", dreamCompany);
app.use("/api/v1/behavioralQuestions", behavioralQuestion);
app.use("/api/v1/projects", project);
app.use("/api/v1/technicalQuestions", technicalQuestion);
app.use("/api/v1/flashCards", flashCard);

app.get("/", (req, res) => {
  res.status(200).json({ message: "hello world!" });
});

exports.app = app;

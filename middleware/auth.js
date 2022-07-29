const jwt = require("jsonwebtoken");

const auth = (req, res, next) => {
  console.log(req.cookies);
  const token =
    req.cookies.token ||
    req.body.token ||
    req.header("Authorization")?.replace("Bearer ", "");

  console.log(req.cookies);
  console.log(token);
  if (!token) {
    return res.status(403).send("Auth token is missing!");
  }

  try {
    const { JWT_SECRET } = process.env;
    const decode = jwt.verify(token, JWT_SECRET);
    console.log(decode);
  } catch (err) {
    return res.status(401).send("Invalid auth token");
  }

  return next();
};

module.exports = auth;

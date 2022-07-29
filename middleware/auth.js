const jwt = require("jsonwebtoken");

const auth = (req, res, next) => {
  const token =
    req.cookies.token ||
    req.body.token ||
    req.header("Authorization")?.replace("Bearer ", "");

  if (!token) {
    return res.status(403).send("Auth token is missing!");
  }

  try {
    const { JWT_SECRET } = process.env;
    const decode = jwt.verify(token, JWT_SECRET);
  } catch (err) {
    return res.status(401).send("Invalid auth token");
  }

  return next();
};

module.exports = auth;

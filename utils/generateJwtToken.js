const jwt = require("jsonwebtoken");

const getJwtToken = (id, email) => {
  return jwt.sign(
    {
      id,
      email,
    },
    process.env.JWT_SECRET,
    {
      expiresIn: process.env.JWT_EXPIRY,
    }
  );
};

module.exports = getJwtToken;

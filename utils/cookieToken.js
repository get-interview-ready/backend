const generateJwtToken = require("./generateJwtToken");

const cookieToken = (user, res) => {
  const token = generateJwtToken(user.id, user.email);

  const { COOKIE_TIME } = process.env;

  const options = {
    expires: new Date(Date.now() + COOKIE_TIME * 24 * 60 * 60 * 1000),
    httpOnly: true,
  };
  res.status(200).cookie("token", token, options).json({
    success: true,
    token,
    user,
  });
};

module.exports = cookieToken;

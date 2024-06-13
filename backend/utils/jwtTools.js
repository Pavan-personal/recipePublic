const jwt = require('jsonwebtoken');
require("dotenv").config("../.env");

const generateJWT = async (userId) => {
  return jwt.sign(
    {
      userId: userId,
    },
    process.env.SECRET_KEY,
    { expiresIn: "340000s" }
  );
};

module.exports = {
  generateJWT,
};

const jwt = require("jsonwebtoken");

require("dotenv").config({
  path: "../.env",
});

const authorizeUser = (req, res, next) => {
  try {
    const token = req.headers.authorization.split(" ")[1];
    if (token) {
      jwt.verify(token, process.env.SECRET_KEY, (err, data) => {
        if (data) {
          req.userId = data.userId;
          next();
        } else {
          res.send({ success: false, message: "session expired!" });
          return;
        }
      });
    } else {
      res.send({ success: false, message: "signin to get access!" });
      return;
    }
  } catch (error) {
    console.log(error);
    res.send({ success: false, message: "something went wrong! 4" });
  }
};

module.exports = { authorizeUser };

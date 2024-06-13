const { Userr } = require("../models/userModel");

const userInfo = async (req, res) => {
  try {
    const user = await Userr.findById(req.userId);
    res.send({ success: true, user: user._doc });
  } catch (error) {
    console.log(error);
    res.send({ success: false, message: "something went wrong!" });
  }
};

module.exports = { userInfo };

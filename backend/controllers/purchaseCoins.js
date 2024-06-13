const { Userr } = require("../models/userModel");

const purchaseCoins = async (req, res) => {
  try {
    const { currency } = req.body;
    await Userr.findByIdAndUpdate(req.userId, {
      $inc: {
        coins: parseInt(currency) * 100,
      },
    });
    const user = await Userr.findById(req.userId);
    res.send({ success: true, message: `current coins: ${user.coins}` });
  } catch (error) {
    console.log(error);
    res.send({ success: false, message: "something went wrong!" });
  }
};

module.exports = { purchaseCoins };

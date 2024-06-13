const { Recipe } = require("../models/recipeModel");
const { Userr } = require("../models/userModel");

const addRecipe = async (req, res) => {
  try {
    const { name, description, videoURL, country } = req.body;
    const user = await Userr.findById(req.userId);
    const updatedCoins = user.coins + 1;
    await Recipe.create({
      name: name,
      description: description,
      videoURL: videoURL,
      country: country,
      photoURL: req.attachment,
      createdBy: user.email,
      likes: 0,
      purchases: 0,
      views: 0,
    });
    await Userr.findByIdAndUpdate(req.userId, {
      $set: {
        coins: updatedCoins,
      },
    });
    res.send({ success: true, message: "1 coin added!" });
  } catch (error) {
    console.log(error);
    res.send({ success: false, message: "something went wrong!" });
  }
};

module.exports = {
  addRecipe,
};

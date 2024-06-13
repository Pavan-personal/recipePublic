const { Recipe } = require("../models/recipeModel");
const { Userr } = require("../models/userModel");

const viewRecipe = async (req, res) => {
  try {
    const recipeId = req.params.id;
    const user = await Userr.findById(req.userId);
    const recipe = await Recipe.findById(recipeId);
    if (recipe.createdBy === user.email) {
      const newRecipe = await Recipe.findById(recipeId);
      res.send({
        success: true,
        message: "viewed your recipe",
        recipe: newRecipe._doc,
      });
      return;
    }
    if (user.coins < 10) {
      res.send({ success: false, message: "insufficient coins!" });
      return;
    } else {
      const recipe = await Recipe.findByIdAndUpdate(recipeId, {
        $inc: { views: 1, purchases: 1 },
      });
      await Userr.findByIdAndUpdate(req.userId, {
        $inc: { coins: -10 },
      });
      res.send({
        success: true,
        message: "viewed recipe and spent 10 coins!",
        recipe: recipe._doc,
      });
    }
  } catch (error) {
    console.log(error);
    res.send({ success: false, message: "something went wrong! 4" });
  }
};

module.exports = {
  viewRecipe,
};

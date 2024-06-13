const { Recipe } = require("../models/recipeModel");

const likeRecipe = async (req, res) => {
  try {
    const recipeId = req.params.id;
    await Recipe.findByIdAndUpdate(recipeId, {
      $inc: { likes: 1 },
    });
    res.send({ success: true, message: "reaction added!" });
  } catch (error) {
    console.log(error);
    res.send({ success: false, message: "something went wrong!" });
  }
};

module.exports = { likeRecipe };

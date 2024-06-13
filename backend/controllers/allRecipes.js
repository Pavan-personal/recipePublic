const { Recipe } = require("../models/recipeModel");

const allRecipes = async (req, res) => {
  try {
    const recipes = await Recipe.find({});
    res.send({ success: true, message: "all recipes", recipes: recipes });
  } catch (error) {
    console.log(error);
    res.send({ success: false, message: "something went wrong!" });
  }
};

module.exports = { allRecipes };

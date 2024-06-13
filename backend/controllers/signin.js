const { Recipe } = require("../models/recipeModel");
const { Userr } = require("../models/userModel");
const { generateJWT } = require("../utils/jwtTools");
const jwt = require("jsonwebtoken");

const signin = async (req, res) => {
    
  try {
    const { name, email, photoURL } = req.body;
    const exist = await Userr.findOne({ email: email });
    if (exist) {
      const token = await generateJWT(exist._id);
      const recipes = await Recipe.find({ createdBy: exist.email });
      res.send({
        success: true,
        token: token,
        user: exist._doc,
        recipes: recipes,
      });
    } else {
      const user = await Userr.create({
        name: name,
        email: email,
        photoURL: photoURL,
        coins: 50,
      });

      const token = await generateJWT(user._id);
      res.send({
        success: true,
        message: "success",
        token: token,
        user: user._doc,
      });
    }
  } catch (error) {
    console.log(error);
    res.send({ success: false, message: "something went wrong!" });
  }
};

module.exports = {
  signin,
};

const { default: mongoose } = require("mongoose");

const recipeSchema = new mongoose.Schema({
  name: String,
  description: String,
  videoURL: String,
  photoURL: String,
  country: String,
  createdBy: String,
  likes: {
    type: Number,
    default: 0,
  },
  views: {
    type: Number,
    default: 0,
  },
  purchases: {
    type: Number,
    default: 0,
  },
});

const Recipe = mongoose.model("Recipe", recipeSchema);

module.exports = {
  Recipe,
};

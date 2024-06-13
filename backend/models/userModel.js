const { default: mongoose } = require("mongoose");

const userSchema = new mongoose.Schema({
  name: String,
  email: String,
  photoURL: String,
  coins: Number,
  recipes: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Recipe",
    },
  ],
});

// const User = mongoose.model("User", userSchema);
const Userr = mongoose.model("Userr", userSchema);

module.exports = {
  Userr,
};

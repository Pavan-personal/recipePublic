const { addRecipe } = require("../controllers/addRecipe");
const { allRecipes } = require("../controllers/allRecipes");
const { likeRecipe } = require("../controllers/likeRecipe");
const { purchaseCoins } = require("../controllers/purchaseCoins");
const { signin } = require("../controllers/signin");
const { userInfo } = require("../controllers/userInfo");
const { viewRecipe } = require("../controllers/viewRecipe");
const { authorizeUser } = require("../middlewares/authorizeUser");
const { fileToUrl } = require("../middlewares/fileToUrl");

const userRoute = require("express").Router();

userRoute.post("/signin", signin);
userRoute.get("/recipes", allRecipes);
userRoute.get("/info", authorizeUser, userInfo);
userRoute.post("/add", authorizeUser, fileToUrl, addRecipe);
userRoute.post("/buy", authorizeUser, purchaseCoins);
userRoute.post("/like/:id", authorizeUser, likeRecipe);
userRoute.get("/view/:id", authorizeUser, viewRecipe);

module.exports = { userRoute };

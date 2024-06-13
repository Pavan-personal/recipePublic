const { userRoute } = require("./routes/userRoute");
const { connectToCloudinary } = require("./utils/cloudinaryTools");
const { connectDB } = require("./utils/connectDB");

const app = require("express")();
require("dotenv").config({
  path: "./.env",
});
app.use(require("cors")());
app.use(require("body-parser").json());
app.use(require("express").json());
app.use(
  require("express-fileupload")({
    useTempFiles: true,
    tempFileDir: "/tmp/",
  })
);

connectDB();
connectToCloudinary();

app.listen(process.env.PORT || 3000, () => {
  console.log("Server started on", process.env.PORT || 3000);
});

app.get("/", (req, res) => {
  res.send("Recipe app backend");
});

app.use("/user", userRoute);

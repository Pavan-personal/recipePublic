const { default: mongoose } = require("mongoose");
require("dotenv").config({
  path: "../.env",
});

const connectDB = () => {
  try {
    mongoose
      .connect(process.env.MONGODB_URI)
      .then((success) => {
        console.log(success.connection.host);
      })
      .catch((fail) => {
        console.log("Something went wrong in connecting DB");
      });
  } catch (error) {
    console.log("failed to connect the DB");
  }
};

module.exports = {
  connectDB,
};

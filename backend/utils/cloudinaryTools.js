const cloudinary = require("cloudinary").v2;
require("../.env");

const connectToCloudinary = () => {
  try {
    cloudinary.config({
      cloud_name: process.env.CLOUD_NAME,
      api_key: process.env.API_KEY,
      api_secret: process.env.API_SECRET,
    });
    console.log("connected to cloudinary");
  } catch (error) {
    console.log("unable to connect to cloudinary");
    process.exit(1);
  }
};

const uploadToCloudinary = async (file, folder,limit) => {
  return await cloudinary.uploader.upload(file.tempFilePath, {folder: folder,resource_type: "auto"})
};

module.exports = {
  connectToCloudinary,
  uploadToCloudinary
};
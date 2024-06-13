const { uploadToCloudinary } = require("../utils/cloudinaryTools");

const fileToUrl = (req, res, next) => {
  try {
    if (req.files) {
      const attachment = req.files.file;
      console.log(attachment.mimetype.split("/")[1].toLowerCase());
      const supported = ["jpeg", "png", "jpg", "mkv", "mp4", "webp"];
      if (supported.includes(attachment.mimetype.split("/")[1].toLowerCase())) {
        uploadToCloudinary(attachment, "Temporary")
          .then((success) => {
            req.attachment = success.url;
            next();
          })
          .catch((err) => {
            res.json({ success: false, message: "something went wrong!" });
            return;
          });
      } else {
        res.json({ success: false, message: "please upload a valid file" });
        return;
      }
    } else {
      next();
    }
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: "something went wrong!" });
  }
};

module.exports = {
  fileToUrl,
};

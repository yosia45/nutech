const multer = require("multer");

const storage = multer.diskStorage({
  destination: "./assets",
  filename: function (req, file, cb) {
    cb(
      null,
      file.fieldname + "-" + Date.now() + "." + file.originalname.split(".")[0]
    );
  },
});

const fileFilter = (req, file, cb) => {
  if (file.mimetype === "image/jpeg" || file.mimetype === "image/png") {
    cb(null, true);
  } else {
    cb(
      new Error("Invalid file type! Only JPEG, PNG, and GIF are allowed."),
      false
    );
  }
};

const upload = multer({ storage: storage, fileFilter: fileFilter });

module.exports = upload;

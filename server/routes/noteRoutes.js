const express = require("express");

const authMiddleware = require("../middleware/authMiddleware");

const multer = require("multer");

const {
  getNotes,
  uploadNote,
} = require("../controllers/noteController");

const router = express.Router();


// MULTER STORAGE

const storage = multer.diskStorage({

  destination: (req, file, cb) => {

    cb(null, "uploads/");

  },

  filename: (req, file, cb) => {

    cb(null, Date.now() + "-" + file.originalname);

  },

});

const upload = multer({
  storage,
});


// GET NOTES

router.get("/", getNotes);


// UPLOAD NOTE

router.post(
  "/upload",
  authMiddleware,
  upload.single("pdf"),
  uploadNote
);


module.exports = router;
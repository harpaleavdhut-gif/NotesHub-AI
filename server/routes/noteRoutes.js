const express = require("express");

const Note = require("../models/Note");

const authMiddleware = require("../middleware/authMiddleware");

const multer = require("multer");

const {
  getNotes,
  uploadNote,
} = require("../controllers/noteController");

const router = express.Router();


// STORAGE

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


// GET ALL NOTES

router.get("/", getNotes);


// MY NOTES

router.get(
  "/my-notes",
  authMiddleware,

  async (req, res) => {

    try {

      const notes = await Note.find({

        uploadedBy: req.user.id,

      });

      res.json(notes);

    } catch (error) {

      res.status(500).json({
        error: error.message,
      });

    }

  }

);


// UPLOAD

router.post(

  "/upload",

  authMiddleware,

  upload.single("pdf"),

  uploadNote

);


// DELETE NOTE

router.delete(

  "/:id",

  authMiddleware,

  async (req, res) => {

    try {

      await Note.findByIdAndDelete(
        req.params.id
      );

      res.json({
        message: "Note Deleted",
      });

    } catch (error) {

      res.status(500).json({
        error: error.message,
      });

    }

  }

);


// EDIT NOTE

router.put(

  "/:id",

  authMiddleware,

  async (req, res) => {

    try {

      const {

        title,

        subject,

        category,

      } = req.body;

      const note =
        await Note.findByIdAndUpdate(

          req.params.id,

          {
            title,
            subject,
            category,
          },

          {
            new: true,
          }

        );

      res.json(note);

    } catch (error) {

      res.status(500).json({
        error: error.message,
      });

    }

  }

);


// DOWNLOAD COUNT

router.put(

  "/download/:id",

  async (req, res) => {

    try {

      const note =
        await Note.findByIdAndUpdate(

          req.params.id,

          {
            $inc: {
              downloads: 1,
            },
          },

          {
            new: true,
          }

        );

      res.json(note);

    } catch (error) {

      res.status(500).json({
        error: error.message,
      });

    }

  }

);

module.exports = router;
const express = require("express");

const multer = require("multer");

const {
  CloudinaryStorage,
} = require("multer-storage-cloudinary");

const cloudinary = require("../config/cloudinary");

const User = require("../models/User");

const authMiddleware = require("../middleware/authMiddleware");

const router = express.Router();


// CLOUDINARY STORAGE

const storage = new CloudinaryStorage({

  cloudinary,

  params: {

    folder: "profile_images",

    allowed_formats: [
      "jpg",
      "jpeg",
      "png",
    ],

  },

});

const upload = multer({
  storage,
});


// =======================================
// UPLOAD PROFILE IMAGE
// =======================================

router.put(

  "/upload-profile/:id",

  authMiddleware,

  upload.single("profileImage"),

  async (req, res) => {

    try {

      const user =
        await User.findByIdAndUpdate(

          req.params.id,

          {
            profileImage: req.file.path,
          },

          {
            new: true,
          }

        );


      res.status(200).json({

        message:
          "Profile Image Updated",

        user,

      });

    } catch (error) {

      res.status(500).json({
        error: error.message,
      });

    }

  }

);


// =======================================
// EDIT PROFILE
// =======================================

router.put(

  "/edit-profile/:id",

  authMiddleware,

  async (req, res) => {

    try {

      const {
        name,
        email,
      } = req.body;


      const user =
        await User.findByIdAndUpdate(

          req.params.id,

          {
            name,
            email,
          },

          {
            new: true,
          }

        );


      res.status(200).json({

        message:
          "Profile Updated Successfully",

        user,

      });

    } catch (error) {

      res.status(500).json({
        error: error.message,
      });

    }

  }

);


module.exports = router;
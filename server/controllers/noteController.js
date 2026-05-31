const Note = require("../models/Note");


// GET NOTES

exports.getNotes = async (req, res) => {

  try {

    const notes = await Note.find().sort({
      createdAt: -1,
    });

    res.status(200).json(notes);

  } catch (error) {

    res.status(500).json({
      error: error.message,
    });

  }

};


// UPLOAD NOTE

exports.uploadNote = async (req, res) => {

  try {

    const {
      title,
      subject,
      category,
    } = req.body;

    const note = await Note.create({

      title,

      subject,

      category,

      pdf: req.file.filename,

      uploadedBy: req.user.id,

    });

    res.status(201).json({
      message: "Note Uploaded Successfully",
      note,
    });

  } catch (error) {

    res.status(500).json({
      error: error.message,
    });

  }

};
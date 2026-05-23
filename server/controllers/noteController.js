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
      semester,
    } = req.body;

    const pdf = req.file.filename;

    const note = await Note.create({
      title,
      subject,
      semester,
      pdf,
    });

    res.status(201).json({
      message: "Note Uploaded",
      note,
    });

  } catch (error) {

    res.status(500).json({
      error: error.message,
    });

  }

};
const mongoose = require("mongoose");

const noteSchema = new mongoose.Schema({

  title: String,

  subject: String,

  semester: Number,

  pdf: String,

}, {
  timestamps: true,
});

module.exports = mongoose.model("Note", noteSchema);
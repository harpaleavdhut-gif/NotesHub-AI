const mongoose = require("mongoose");

const noteSchema = new mongoose.Schema({

  title: {
    type: String,
    required: true,
  },

  subject: {
    type: String,
    required: true,
  },

  category: {
    type: String,
    default: "General",
  },

  pdf: {
    type: String,
    required: true,
  },

  uploadedBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },

  downloads: {
    type: Number,
    default: 0,
  },

}, {
  timestamps: true,
});

module.exports = mongoose.model(
  "Note",
  noteSchema
);
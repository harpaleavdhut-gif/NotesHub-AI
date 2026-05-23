const mongoose = require("mongoose");

const noteSchema = new mongoose.Schema({

  title:String,

  subject:String,

  semester:Number,

  pdfUrl:String,

  uploadedBy:String,

},{
  timestamps:true,
});

module.exports = mongoose.model("Note", noteSchema);
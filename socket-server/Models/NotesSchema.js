const mongoose = require("mongoose");

const NotesSchema = new mongoose.Schema({
  type: { type: String, required: true },
  title: { type: String, required: true },
  link: { type: String },
  description: { type: String },
});

module.exports = mongoose.model("Note", NotesSchema);

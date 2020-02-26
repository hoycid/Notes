const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const moment = require("moment");

const NoteSchema = new Schema({
  title: {
    type: String
  },
  description: {
    type: String
  },
  author: {
    type: String
  },
  priority: {
    type: String
  },
  dateAdded: {
    type: Date,
    default: moment().toISOString()
  },
  completed: {
    type: Boolean
  },
  dateCompleted: {
    type: Date
  }
});

module.exports = mongoose.model("Note", NoteSchema);

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Create Schema
const NoteSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
    },
    author: {
        type: String,
    },
    priority: {
        type: String,
    },
    completed: {
        type: Boolean,
    },
    dateCreated: {
        type: Date,
        default: Date.now
    },
    dateCompleted: {
        type: Date,
    }
});

module.exports = Note = mongoose.model("note", NoteSchema);
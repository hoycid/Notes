const express = require("express");
const router = express.Router();
const moment = require("moment");

// Note Model
const Note = require("../../models/Note");

// @rout    GET api/notes
// @desc    Get all notes
// @access  Public
router.get("/", (req, res) => {
  Note.find()
    .sort({ date: -1 })
    .then(notes => res.json(notes));
});

// @rout    POST api/notes
// @desc    Create a note
// @access  Public
router.post("/", (req, res) => {
  const newNote = new Note({
    title: req.body.title,
    description: req.body.description,
    author: req.body.author,
    priority: req.body.priority,
    completed: req.body.completed,
    dateCompleted: null
  });
  newNote.save().then(note => res.json(note));
});

// @rout    PUT api/notes
// @desc    set note to completed
// @access  Public
router.put("/setcomplete/:id", (req, res) => {
  Note.findOneAndUpdate(
    { _id: req.params.id },
    {
      $set: {
        dateCompleted: moment().toISOString(),
        completed: true
      }
    }
  )
    .then(note => res.json(note))
    .catch(err => res.status(404).json(err));
});

// @rout    DELETE api/notes/:id
// @desc    Delete an note
// @access  Public
router.delete("/:id", (req, res) => {
  Note.findById(req.params.id)
    .then(note => note.remove().then(() => res.json({ success: true })))
    .catch(err => res.status(404).json(err));
});

module.exports = router;

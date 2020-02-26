const express = require("express");
const routes = express.Router();

const Note = require("./models/Note");

routes.get("/", (req, res) => {
  Note.find((err, notes) => {
    if (err) {
      console.log(err);
    } else {
      res.json(notes);
    }
  });
});

routes.get("/:id", (req, res) => {
  const id = req.params.id;
  Note.findById(id, (err, note) => {
    if (err) {
      console.log(err);
    } else {
      res.json(note);
    }
  });
});

routes.post("/add", (req, res) => {
  const note = new Note(req.body);
  note
    .save()
    .then(() => {
      res.status(200).json("Note added");
    })
    .catch(err => {
      res.status(400).send("Adding new todo failed.",err);
    });
});

routes.post("/update/:id", (req, res) => {
  Note.findById(req.params.id, (err, note) => {
    if (!note) {
      res.status(404).send("Data is not found", err);
    } else {
      note.title = req.body.title;
      note.description = req.body.description;
      note.author = req.body.author;
      note.priority = req.body.priority;
      note.dateAdded = req.body.dateAdded;
      note.completed = req.body.completed;
      note.dateCompleted = req.body.dateCompleted;

      note
        .save()
        .then(() => {
          res.json("Note updated");
        })
        .catch(err => {
          res.status(400).send("Update failed!", err);
        });
    }
  });
});

routes.delete("/delete/:id", (req, res) => {
  Note.findById(req.params.id)
    .then(note => note.remove().then(() => res.json("Note deleted")))
    .catch(err => {
      res.status(400).send("Delete failed",err);
    });
});

export default routes;

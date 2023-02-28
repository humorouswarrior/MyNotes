const express = require("express");
const router = express.Router();
const fetchuser = require("../middleware/fetchuser");
const Notes = require("../models/Notes");
const { body, validationResult } = require("express-validator");

//Route 1: Get all notes using GET: "/api/notes/fetchallnotes". login required
router.get("/fetchallnotes", fetchuser, async (req, res) => {
  try {
    const notes = await Notes.find({ user: req.user.id });
    res.json(notes);
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Some error occured");
  }
});

//Route 2: Add a new note using POST: "/api/notes/addnote". login required
router.post(
  "/addnote",
  fetchuser,
  [
    //validations required
    body("title", "Enter a valid title").isLength({ min: 3 }),
    body("description", "Description must be atleast 5 characters").isLength({
      min: 5,
    }),
  ],
  async (req, res) => {
    try {
      const { title, description, tag } = req.body; //thunderclient request ki body me se.

      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }

      const note = new Notes({
        //this content will be returned
        title,
        description,
        tag,
        user: req.user.id, // user ki id from the request.
      });

      const savedNote = await note.save();
      res.json(savedNote);
    } catch (error) {
      console.error(error.message);
      res.status(500).send("Some error occured");
    }
  }
);

//Route 3: Update an existing note using PUT: "/api/notes/updatenote/:id". login required
router.put(
  "/updatenote/:id",
  fetchuser,
  [], //no validations have been put //  /:id is to make id dynamic
  async (req, res) => {
    try {
      const { title, description, tag } = req.body; //thunderclient request ki body me se.

      //create a newNote object
      const newNote = {};
      if (title) {
        newNote.title = title;
      }
      if (description) {
        newNote.description = description;
      }
      if (tag) {
        newNote.tag = tag;
      }

      //find the note to be updated and update it
      let note = await Notes.findById(req.params.id);
      if (!note) {
        return res.status(404).send("Not Found");
      } //to check if note is present
      if (note.user.toString() !== req.user.id) {
        return res.status(401).send("Not Allowed");
      } //to check if some other user (other than the owner) is trying to edit note

      note = await Notes.findOneAndUpdate(
        req.params.id,
        { $set: newNote },
        { new: true }
      );
      res.json({ note });
    } catch (error) {
      console.error(error.message);
      res.status(500).send("Some error occured");
    }
  }
);

//Route 4: Delete an existing note using DELETE: "/api/notes/deletenote/:id". login required
router.delete(
  "/deletenote/:id",
  fetchuser,
  [], //no validations have been put
  async (req, res) => {
    try {
      const { title, description, tag } = req.body; //thunderclient request ki body me se.

      //find the note to be deleted and delete it
      let note = await Notes.findById(req.params.id);
      if (!note) {
        return res.status(404).send("Not Found");
      } //to check if note is present
      if (note.user.toString() !== req.user.id) {
        return res.status(401).send("Not Allowed");
      } //to check if some other user (other than the owner) is trying to delete note

      note = await Notes.findOneAndDelete(req.params.id);
      res.json({ Success: "Note has been deleted", note: note });
    } catch (error) {
      console.error(error.message);
      res.status(500).send("Some error occured");
    }
  }
);

module.exports = router;

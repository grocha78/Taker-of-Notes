const fs = require("fs");
const router = require('express').Router();
const { v4: uuidv4 } = require("uuid");

let notesDB = require('../../db/db.json');

router.get('/api/notes', (req, res) => res.json(notesDB));
router.post('/api/notes', (req, res) => {
    req.body.id = uuidv4();
    const newNote = req.body;
    notesDB.push(newNote);

    fs.writeFileSync("./db/db.json". JSON.stringify(notesDB));
    res.json(notesDB);
});

router.delete('/notes/:id', (req, res) => {
    const id = req.params.id;
    notesDB = notesDB.filter(notes => notes.id != id);
    console.log(id)
    console.log(notesDB)
    fs.writeFileSync("./db/db.json", JSON.stringify(notesDB));
    res.json(notesDB);

});

module.exports = router;

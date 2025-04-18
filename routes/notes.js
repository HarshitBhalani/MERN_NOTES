const express = require('express')
const router = express.Router();
const Note = require('../models/Notes')

// get all the notes 
router.get('/', async (req, res) => {
    try {
        const notes = await Note.find()
        res.json(notes)
    } catch (err) {
        res.status(500).json({ message: err.message })
    }
})

// get a single note by ID
router.get('/:id', async (req, res) => {
    try {
        const note = await Note.findById(req.params.id);
        if (!note)
            return res.status(404).json({ message: 'Note not found' });
        res.json(note);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }

})

// create a note in db
router.post('/', async (req, res) => {
    const note = new Note({
        title: req.body.title,
        content: req.body.content
    })

    try {
        const newNote = await note.save();
        res.status(201).json(newNote)
    } catch (err) {
        res.status(400).json({ message: err.message })
    }
})

//update by id
router.put('/:id', async (req, res) => {
    try {
        const note = await Note.findById(req.params.id);
        if (!note)
            return res.status(404).json({ message: 'Not not found' })

        if (req.body.title)
            note.title = req.body.title
        if (req.body.content)
            note.content = req.body.content
        const updateNote = await note.save();
        res.status(200).json(updateNote);
    } catch {
        res.status(500).json({ message: err.message })
    }
})

//delete by id 
router.delete("/:id", async (req, res) => {
    try {
        const note = await Note.findById(req.params.id);
        if (!note)
            return res.status(404).json({ message: 'Note not found' })
        await note.deleteOne();
        res.json({ message: 'Note deleted' });
    } catch (err) {
        res.status(500).json({ message: err.message })
    }
});

module.exports = router;
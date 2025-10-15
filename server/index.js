const express = require('express');
const cors = require('cors');
const app = express();
const PORT = 5000;

// Middleware
app.use(cors());
app.use(express.json());

// In-memory storage for notes
let notes = [];

// Routes
app.get('/api/notes', (req, res) => {
  res.json(notes);
});

app.post('/api/notes', (req, res) => {
  const { text } = req.body;
  if (!text) return res.status(400).json({ error: 'Note text required' });

  const newNote = { id: Date.now(), text };
  notes.push(newNote);
  res.status(201).json(newNote);
});

app.delete('/api/notes/:id', (req, res) => {
  const id = Number(req.params.id);
  notes = notes.filter(note => note.id !== id);
  res.json({ message: 'Note deleted' });
});

app.put("/api/notes/:id", (req, res) => {
  const noteId = parseInt(req.params.id);
  const { text } = req.body;

  const note = notes.find((n) => n.id === noteId);
  if (!note) {
    return res.status(404).json({ error: "Note not found" });
  }

  note.text = text;
  res.json(note);
});


// Start server
app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));

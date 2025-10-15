import React, { useState } from "react";
import axios from "axios";

function App() {
  const [notes, setNotes] = useState([]);
  const [text, setText] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [notesVisible, setNotesVisible] = useState(false);
  const [editingId, setEditingId] = useState(null);

  const API_URL = "http://localhost:5000/api/notes";

  const fetchNotes = async () => {
    try {
      setLoading(true);
      const response = await axios.get(API_URL);
      setNotes(response.data);
    } catch (err) {
      setError("Failed to load notes");
    } finally {
      setLoading(false);
    }
  };

  const toggleNotes = async () => {
    if (!notesVisible) {
      await fetchNotes();
    }
    setNotesVisible(!notesVisible);
  };

  const addOrUpdateNote = async () => {
    if (!text.trim()) return;

    try {
      if (editingId) {
        // Update existing note
        const response = await axios.put(`${API_URL}/${editingId}`, { text });
        setNotes(notes.map((n) => (n.id === editingId ? response.data : n)));
        setEditingId(null);
      } else {
        // Add new note
        const response = await axios.post(API_URL, { text });
        setNotes([...notes, response.data]);
        if (!notesVisible) setNotesVisible(true);
      }
      setText("");
    } catch (err) {
      setError("Failed to save note");
    }
  };

  const deleteNote = async (id) => {
    try {
      await axios.delete(`${API_URL}/${id}`);
      setNotes(notes.filter((n) => n.id !== id));
    } catch (err) {
      setError("Failed to delete note");
    }
  };

  const startEditing = (note) => {
    setEditingId(note.id);
    setText(note.text);
  };

  return (
    <div style={{ textAlign: "center", marginTop: "40px" }}>
      <h1>Quick Notes App!!</h1>

      <div>
        <input
          type="text"
          placeholder="Write a note..."
          value={text}
          onChange={(e) => setText(e.target.value)}
          style={{
            padding: "8px",
            marginRight: "6px",
            borderRadius: "5px",
            border: "1px solid #ccc",
          }}
        />
        <button
          onClick={addOrUpdateNote}
          style={{
            padding: "8px 12px",
            backgroundColor: editingId ? "#ff9800" : "#4CAF50",
            color: "white",
            border: "none",
            borderRadius: "5px",
            cursor: "pointer",
          }}
        >
          {editingId ? "Update" : "Save"}
        </button>
      </div>

      <div style={{ marginTop: "15px" }}>
        <button
          onClick={toggleNotes}
          style={{
            padding: "8px 12px",
            backgroundColor: "#2196F3",
            color: "white",
            border: "none",
            borderRadius: "5px",
            cursor: "pointer",
          }}
        >
          {notesVisible ? "Hide Notes" : "Show All Notes"}
        </button>
      </div>

      {loading && <p>Loading...</p>}
      {error && <p style={{ color: "red" }}>{error}</p>}

      {notesVisible && (
        <ul style={{ listStyle: "none", padding: 0, marginTop: "20px" }}>
          {notes.length === 0 ? (
            <p>No notes available.</p>
          ) : (
            notes.map((note) => (
              <li
                key={note.id}
                style={{
                  marginBottom: "8px",
                  border: "1px solid #ddd",
                  padding: "6px 10px",
                  borderRadius: "5px",
                  display: "inline-block",
                  minWidth: "150px",
                }}
              >
                {note.text}{" "}
                <button
                  onClick={() => startEditing(note)}
                  style={{
                    marginLeft: "10px",
                    padding: "4px 8px",
                    backgroundColor: "#ff9800",
                    color: "white",
                    border: "none",
                    borderRadius: "5px",
                    cursor: "pointer",
                  }}
                >
                  Edit
                </button>
                <button
                  onClick={() => deleteNote(note.id)}
                  style={{
                    marginLeft: "10px",
                    padding: "4px 8px",
                    backgroundColor: "#f44336",
                    color: "white",
                    border: "none",
                    borderRadius: "5px",
                    cursor: "pointer",
                  }}
                >
                  Delete
                </button>
              </li>
            ))
          )}
        </ul>
      )}
    </div>
  );
}

export default App;

import React, { useState, useEffect } from 'react';
import ListItem from '../components/ListItem';
import { Link } from 'react-router-dom';


const NotesListPage = () => {
  let [notes, setNotes] = useState([]);

  useEffect(() => {
    getNotes();
  }, []);

  let getNotes = async () => {
    let response = await fetch('/api/notes/');
    let data = await response.json();
    setNotes(data);
  };

  return (
    <div className="page-container">
      <div className="list-container">
        {notes.map((note, index) => (
          <Link to={`/note/${note.id}`} className="list-item-link" key={index}> {/* Apply the "list-item-link" class */}
            <ListItem note={note} />
          </Link>
        ))}
      </div>
    </div>
  );
};

export default NotesListPage;

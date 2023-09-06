import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';

const NotePage = () => {
  const { id } = useParams();
  const [note, setNote] = useState('');

  const getNote = async () => {
    try {
      if (id === 'new') return
      const response = await fetch(`/api/notes/${id}`);
      const data = await response.json();
      setNote(data);
    } catch (error) {
      console.error('Error fetching note:', error);
    }
  };

// Include this code in the component where you make API requests
const csrftoken = getCookie('csrftoken');

function getCookie(name) {
  let cookieValue = null;
  if (document.cookie && document.cookie !== '') {
    const cookies = document.cookie.split(';');
    for (let i = 0; i < cookies.length; i++) {
      const cookie = cookies[i].trim();
      // Does this cookie string begin with the name we want?
      if (cookie.substring(0, name.length + 1) === name + '=') {
        cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
        break;
      }
    }
  }
  return cookieValue;
}



  
  // Parse the 'created' date string into a Date object
  const createdDate = new Date(note.created);

  // Format the date and time
  const formattedCreatedDate = createdDate.toLocaleString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: 'numeric',
    minute: 'numeric',
    second: 'numeric',
    hour12: false,
  });

  const updatedDate = new Date(note.updated);

   const formattedUpdatedDate = updatedDate.toLocaleString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: 'numeric',
    minute: 'numeric',
    second: 'numeric',
    hour12: false,
  });

  const createNote = async () => {
    fetch('/api/notes/create/', {
        method: "POST",
        headers: {
            'Content-Type': 'application/json',
            'X-CSRFToken': csrftoken, // Include the CSRF token
        },
        body: JSON.stringify(note)
    })
  }

  const updateNote = async () => {
    fetch(`/api/notes/${id}/update/`, {
        method: "PUT",
        headers: {
            'Content-Type': 'application/json',
            'X-CSRFToken': csrftoken, 
        },
        body: JSON.stringify(note)
    })
  }

  let navigate = useNavigate();

//   When the user goes back when the body of the note is empty, 
//   the note should get deleted completely
// Right now, going back is equivalent to Save Changes button
  const handleSubmit = () => {
    if(id !== 'new' && !note.body) {
        deleteNote()
    } else if(id !== 'new') {
        updateNote()
    } else if(id === 'new' && note !== null) {
        createNote()
    }
    navigate('/')
  }

  useEffect(() => {
    getNote();
  }, [id]);

  let deleteNote = async () => {
    fetch(`/api/notes/${id}/delete/`, {
        method: "DELETE",  
        headers: {
            'Content-Type': 'application/json',
            'X-CSRFToken': csrftoken, 
        }
        
    })
    navigate('/')
  }

  let getTitle = (note) => {
    if (!note.body) {
      return "";
    }
    
    let title = note.body.split('\n')[0];
    if (title.length > 45) {
      return title.slice(0, 45);
    }
    return title;
  };
  
  return (
    <div className="page-container">
      <div className="note-page">
        <h2 className="note-title">Title: {getTitle(note)}</h2>
        <textarea
  className="note-textarea"
  onChange={(e) => {
    setNote({ ...note, body: e.target.value });
  }}
  value={note?.body}
  placeholder="Write Title on this Line"
></textarea>


        {note?.body || id === 'new' ? (
          <>
          <Link to="/">
          <button className="note-button quit-button">Quit</button>

          </Link>
          
            <button className="note-button delete-button" onClick={deleteNote}>Delete Note</button>
            <button className="note-button done-button" onClick={handleSubmit}>Save Note</button>
            
            <p className="note-info">Created On: {id === 'new' ? '' : formattedCreatedDate}</p>
            <p className="note-info">Last Change: {id === 'new' ? '' : formattedUpdatedDate}</p>
            
          </>
        ) : (
          <>
           <Link to="/">
          <button className="note-button quit-button">Quit</button>

          </Link>
            <button className="note-button delete-button" onClick={handleSubmit}>Delete Empty Note</button>
            
            <p className="note-info">Created On: {formattedCreatedDate}</p>
             <p className="note-info">Last Change: {formattedUpdatedDate}</p>
             
             </>

        )}
      </div>
    </div>
  );
};

export default NotePage;
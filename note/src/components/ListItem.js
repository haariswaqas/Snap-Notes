import React from 'react';
import { Link } from 'react-router-dom';

const ListItem = ({ note }) => {
  let getTitle = (note) => {
    let title = note.body.split('\n')[0];
    if (title.length > 45) {
      return title.slice(0, 45);
    }
    return title;
  };



  let getTime = (note) => {
    return new Date(note.updated).toLocaleDateString();
  };

  return (
    <div className="list-item-container">
      <Link to={`/note/${note.id}`} className="list-item-link">
        <div className="list-item">
          <h3>{getTitle(note)}</h3>
          
          <span>Created on: {getTime(note)}</span>
        </div>
      </Link>
    </div>
  );
};

export default ListItem;

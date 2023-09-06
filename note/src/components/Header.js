import React from 'react';
import { Link } from 'react-router-dom';


const Header = () => {
    return (
        <div className="header"> {/* Apply the "header" class */}
            <h1>SNAPNOTES</h1>
            <h3>Take Quick Online Notes</h3>
            
        <span>ALL NOTES ARE PUBLIC</span>
        <br></br>
            <Link to="/note/new" className="add-note-button">
              Add Note
            </Link>
        </div>
    );
};

export default Header;

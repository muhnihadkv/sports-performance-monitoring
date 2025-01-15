import React from 'react';
import './EventResult.css';
import { Link } from 'react-router-dom';
function EventResult({ event, onPublish }) {
    return (
        <div>
        <header className="navbar1">
            <h1 className="logo1">Athletics</h1>
            <nav>
                <ul className="navbar-links1">
                    <li><Link to="/news">News</Link></li>
                    <li><Link to="/event">Events</Link></li>
                    <li><Link to="/result">Results</Link></li>
                    <li><Link to="/coaches">Coaches</Link></li>
                    <li><Link to="/athelete">Athletes</Link></li>
                    <li><Link to="/dashboard">Profile</Link></li>
                    <li><Link to="/home">Logout</Link></li>
                </ul>
            </nav>
        </header>
        <tr className="event-result">
            
      <td>{event.id}</td>
      <td>{event.eventTitle}</td>
      <td>{event.meetName}</td>
      <td>{event.status}</td>
   
                <button onClick={() => onPublish(event.id)} className="publish-button">
                    Publish Result
                </button>
           
        </tr>
        </div>
    );
}

export default EventResult;

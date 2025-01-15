import React from 'react';
import { Link } from 'react-router-dom';

const AppliedEvents = ({ appliedEvents }) => {
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
      <div className="applied-events">
        <table>
          <thead>
            <tr>
              <th>Event Name</th>
              <th>Meet Name</th>
              <th>Category</th>
              <th>Location</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {appliedEvents.map(({ event, status }) => (
              <tr key={event.eventId}>
                <td>{event.eventTitle}</td>
                <td>{event.meet.meetName}</td>
                <td>{event.category}</td>
                <td>{event.location}</td>
                <td>{status}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AppliedEvents;

import React from 'react';
import './Event.css';
import { Link } from 'react-router-dom';
import axios from 'axios';

const Event = ({ event}) => {

  const getImageSrc = () => {
    return `data:image/jpeg;base64,${event.photo}`; 
  };

  const getAuthHeader = () => {
    const token = localStorage.getItem('authToken');
    return {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    };
  };

  const handleRegister = async (eventId) => {
    try {
      const authHeader = getAuthHeader();
      const response = await axios.post(
        `http://localhost:8080/event/register?eventId=${eventId}`,
        {},
        authHeader
      );
      console.log('Registration successful:', response.data);
      alert('Registration successful!');
    } catch (error) {
      alert(error.response.data || 'Registration failed. Please try again.');
      console.error('Error registering for event:', error);
    }
  };

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
      <div className="event-card">
        <div className="event-image-container">
          <img src={getImageSrc()} alt={event.name} className="event-image" />
        </div>
        <div className="event-details">
          <h3>{event.eventTitle}</h3>
          <p>Meet: {event.meet.meetName}</p>
          <p>Category: {event.category}</p>
          <p>Date: {event.eventDate}</p>
          <p>Location: {event.location}</p>
        </div>
        <div>
          <button
            className="button-19"
            onClick={() => handleRegister(event.eventId)} 
          >
            Register
          </button>
        </div>
      </div>
    </div>
  );
};

export default Event;

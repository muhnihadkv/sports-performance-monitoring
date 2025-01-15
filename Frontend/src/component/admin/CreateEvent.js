import React, { useState } from 'react';
import axios from 'axios';
import './EventForm.css';

const CreateEvent = ({ onClose, meets }) => {
  const [eventDetails, setEventDetails] = useState({
    eventName: '',
    eventDate: '',
    meetName: '',
    category: '',
    location: '',
    image: null
  });

  
  const [selectedMeet, setSelectedMeet] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const getAuthHeader = () => {
    const token = localStorage.getItem('authToken');
    return {
      headers: {
        'Content-Type': 'multipart/form-data',
        Authorization: `Bearer ${token}`,
      },
    };
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEventDetails({
      ...eventDetails,
      [name]: value,
    });
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setEventDetails({
      ...eventDetails,
      image: file
    });
  };

  const handleMeetChange = (e) => {
    const meetName = e.target.value;
    setSelectedMeet(meetName);
    setEventDetails({
      ...eventDetails,
      meetName: meetName,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const formDataToSend = new FormData();
      formDataToSend.append('eventData', JSON.stringify(eventDetails));
      formDataToSend.append('file', eventDetails.image);
      const authHeader = getAuthHeader();

      const response = await axios.post('http://localhost:8080/event/add/admin', formDataToSend, authHeader);

      alert('Event registered successfully!');
      console.log('Event registered successfully:', response.data);
      onClose();

    } catch (error) {
      console.error('Error registering event:', error);
      alert(error.response.data || 'Error creating event. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="event-form-container">
      <form onSubmit={handleSubmit} className="event-form">
        <button type="button" className="close-button" onClick={onClose}>×</button>
        <h2>Create an Event</h2>

        <div className="form-group">
          <label htmlFor="eventName">Event Name</label>
          <input
            type="text"
            id="eventName"
            name="eventName"
            value={eventDetails.eventName}
            onChange={handleInputChange}
            required
          />
        </div>

        <div className="form-group">
          <select value={selectedMeet} onChange={handleMeetChange}>
            <option value="">Select a Meet</option>
            {meets.map(meet => (
              <option key={meet.meetId} value={meet.meetName}>
                {meet.meetName}
              </option>
            ))}
          </select>
        </div>

        <div className="form-group">
          <label htmlFor="eventDate">Event Date</label>
          <input
            type="date"
            id="eventDate"
            name="eventDate"
            value={eventDetails.eventDate}
            onChange={handleInputChange}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="category">Category</label>
          <input
            id="category"
            name="category"
            value={eventDetails.category}
            onChange={handleInputChange}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="location">Location</label>
          <input
            id="location"
            name="location"
            value={eventDetails.location}
            onChange={handleInputChange}
            required
          />
        </div>

        <div className="form-group">
          <label>Image:</label>
          <input 
            type="file" 
            name="imageFile" 
            accept="image/*" 
            onChange={handleImageChange}
          />
        </div>

        <button type="submit" className="submit-btn" disabled={isLoading}>
          {isLoading ? 'Registering...' : 'Create Event'}
        </button>
      </form>
    </div>
  );};

export default CreateEvent;

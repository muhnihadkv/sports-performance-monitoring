import React, { useState, useEffect } from 'react';
import axios from 'axios';
import CreateEvent from './CreateEvent';
import AppliedEvents from './AppliedEvents';

const ParentComponent = () => {
  const [appliedEvents, setAppliedEvents] = useState([]);

  useEffect(() => {

    const fetchEvents = async () => {
      try {
        const response = await axios.get('http://localhost:8080/event/getRegistrationsByEvent/{eventId}/admin');
        setAppliedEvents(response.data);
      } catch (error) {
        console.error('Error fetching events:', error);
      }
    };

    fetchEvents();
  }, []);

  const handleEventRegistered = (newEvent) => {
    setAppliedEvents((prevEvents) => [...prevEvents, newEvent]);
  };

  return (
    <div>
      <CreateEvent onEventRegistered={handleEventRegistered} />
      <AppliedEvents appliedEvents={appliedEvents} />
    </div>
  );
};

export default ParentComponent;

import React, { useState, useEffect } from 'react';
import EventList from './EventList';
import AppliedEvents from './AppliedEvents';
import axios from 'axios';

const TabNavigation = () => {
  const [availableEvents, setAvailableEvents] = useState([]);
  const [appliedEvents, setAppliedEvents] = useState([]);
  const [activeTab, setActiveTab] = useState('available');

  const getAuthHeader = () => {
    const token = localStorage.getItem('authToken');
    return {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    };
  };

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const authHeader = getAuthHeader();
        const response = await axios.get('http://localhost:8080/event/getAll', authHeader);
        setAvailableEvents(response.data);
      } catch (error) {
        console.error('Error fetching events:', error);
      }
    };

    const fetchAppliedEvents = async () => {
      try {
        const authHeader = getAuthHeader();
        const response = await axios.get('http://localhost:8080/event/getRegistrationsByAthlete', authHeader);
        setAppliedEvents(response.data);
      } catch (error) {
        console.error('Error fetching applied events:', error);
      }
    };

    fetchEvents();
    fetchAppliedEvents();
  }, []);

  return (
    <div className="tab-navigation">
      <br />
      <div className="tabs">
        <button
          onClick={() => setActiveTab('available')}
          className={activeTab === 'available' ? 'active' : ''}
        >
          Available Events
        </button>
        <button
          onClick={() => setActiveTab('applied')}
          className={activeTab === 'applied' ? 'active' : ''}
        >
          Applied Events
        </button>
      </div>

      {activeTab === 'available' ? (
        <EventList events={availableEvents} />
      ) : (
        <AppliedEvents appliedEvents={appliedEvents} />
      )}
    </div>
  );
};

export default TabNavigation;

import React, { useState, useEffect } from 'react';
import './Shortlist.css';
import { Link } from 'react-router-dom';
import axios from 'axios';

const getAuthHeader = () => {
  const token = localStorage.getItem('authToken');
  return {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
};

const ShortlistAthlete = () => {
  const [registrations, setRegistrations] = useState([]);
  const [activeTab, setActiveTab] = useState('pending');

  useEffect(() => {
    fetchRegistrations(activeTab);
  }, [activeTab]);

  const fetchRegistrations = async (status) => {
    try {
      const authHeader = getAuthHeader();
      const response = await axios.get(
        `http://localhost:8080/event/getRegistrationsByStatus/admin?status=${status}`,
        authHeader
      );
      setRegistrations(response.data);
    } catch (error) {
      console.error(`Error fetching ${status} registrations:`, error);
    }
  };

  const handleApprove = async (registrationId) => {
    try {
      const authHeader = getAuthHeader();
      await axios.post(
        `http://localhost:8080/event/registration/approve/${registrationId}/admin`,
        {},
        authHeader
      );
      fetchRegistrations(activeTab); // Refresh the list
    } catch (error) {
      console.error('Error approving registration:', error);
    }
  };

  const handleReject = async (registrationId) => {
    try {
      const authHeader = getAuthHeader();
      await axios.post(
        `http://localhost:8080/event/registration/reject/${registrationId}/admin`,
        {},
        authHeader
      );
      fetchRegistrations(activeTab); // Refresh the list
    } catch (error) {
      console.error('Error rejecting registration:', error);
    }
  };

  const renderRegistrationsTable = () => (
    <div className="table-container">
      <table className="table">
        <thead>
          <tr>
            <th>Event</th>
            <th>Athlete</th>
            <th>Status</th>
            <th>Date</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {registrations.map((registration) => (
            <tr key={registration.registrationId} className="table-row">
              <td>{registration.event.eventTitle}</td>
              <td>{registration.athleteName}</td>
              <td>{registration.status}</td>
              <td>{registration.registrationDate}</td>
              <td>
                {activeTab === 'pending' && (
                  <>
                    <button onClick={() => handleApprove(registration.registrationId)}>Approve</button>
                    <button onClick={() => handleReject(registration.registrationId)}>Reject</button>
                  </>
                )}
                {activeTab === 'approved' && (
                  <button onClick={() => handleReject(registration.registrationId)}>Reject</button>
                )}
                {activeTab === 'rejected' && (
                  <button onClick={() => handleApprove(registration.registrationId)}>Approve</button>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );

  return (
    <div className="container">
      <header className="navbar1">
        <h1 className="logo1">Athletics</h1>
        <nav>
          <ul className="navbar-links1">
            <li><Link to="/event">Events</Link></li>
            <li><Link to="/publish">Results</Link></li>
            <li><Link to="/coaches">Coaches</Link></li>
            <li><Link to="/athelete">Athletes</Link></li>
            <li><Link to="/admindashboard">Profile</Link></li>
            <li><Link to="/home">Logout</Link></li>
          </ul>
        </nav>
      </header>
      <h1>Shortlist Athletes</h1>

      <div className="tab-container">
        <button
          onClick={() => setActiveTab('pending')}
          className={`tab-button ${activeTab === 'pending' ? 'active' : 'inactive'}`}
        >
          Pending
        </button>
        <button
          onClick={() => setActiveTab('approved')}
          className={`tab-button ${activeTab === 'approved' ? 'active' : 'inactive'}`}
        >
          Approved
        </button>
        <button
          onClick={() => setActiveTab('rejected')}
          className={`tab-button ${activeTab === 'rejected' ? 'active' : 'inactive'}`}
        >
          Rejected
        </button>
      </div>

      {renderRegistrationsTable()}
    </div>
  );
};

export default ShortlistAthlete;

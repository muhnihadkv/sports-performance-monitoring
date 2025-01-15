import React, { useState, useEffect } from 'react';
import './Profile.css';
import axios from 'axios';
import { Link } from 'react-router-dom';
import CoachRegistrationForm from './CoachRegistration.js';
import CoachUpdateForm from './CoachUpdateForm';
import defaultProfileImage from './defaultProfileImage.jfif';

const Coaches = () => {
    const [error, setError] = useState('');
    const [CoachData, setCoachData] = useState([]);
    const [showRegistrationForm, setShowRegistrationForm] = useState(false);
    const [showUpdateForm, setShowUpdateForm] = useState(false);

    

    const handleRegister = (newCoachData) => {
        setCoachData(newCoachData);
    };

    const getAuthHeader = () => {
        const token = localStorage.getItem('authToken');
        return {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        };
    };

    const fetchCoachData = async () => {
        try {
            const authHeader = getAuthHeader();
            const response = await axios.get('http://localhost:8080/coaches/getById', authHeader);
            setCoachData(response.data);
        } catch (error) {
            if (error.response) {
              console.error('Error response:', error.response.data);
              setError(error.response.data || 'An error occurred');
              if(error.response.data === 'Coach not found'){
                alert('Please update your details');
                setShowRegistrationForm(true);
              }
          } else if (error.request) {
              console.error('Error request:', error.request);
              setError('No response received from the server');
          } else {
              console.error('Error message:', error.message);
              setError('Error in setting up the request');
          }
          }
    };

    useEffect(() => {
        fetchCoachData();
    }, []);

    const handleUpdate = (updatedCoachData) => {
        setCoachData(updatedCoachData);
        setShowUpdateForm(false);
    };

    const getImageSrc = () => {
        if (CoachData.photoUrl) {
            return `data:image/jpeg;base64,${CoachData.photoUrl}`;
        }
        return defaultProfileImage;
    };

    return (
        <div>
        <header className="navbar1">
            <h1 className="logo1">Coach</h1>
            <nav>
                <ul className="navbar-links1">
                    <li><Link to="/coaches">Profile</Link></li>
                    <li><Link to="/achievements">Achievements</Link></li>
                    <li><Link to="/requests">Requests</Link></li>
                    <li><Link to="/">Athletes</Link></li>
                    <li><Link to="/home">Logout</Link></li>
                </ul>
            </nav>
        </header>
        <div className="Coach-container">
        {showRegistrationForm ? (
                    <CoachRegistrationForm onClose={() => setShowRegistrationForm(false)} onRegister={handleRegister}/>
                ) : showUpdateForm ? (
                    <CoachUpdateForm CoachData={CoachData} onClose={() => setShowUpdateForm(false)} onUpdate={handleUpdate} />
                ) : (
            <div className="Coach-profile">
                
                <img 
                            src={getImageSrc()}
                            className="profile-image" 
                        />
                        <div className="profile-info">
                            <h2>{`${CoachData.firstName} ${CoachData.lastName}`}</h2>
                            <p>Date of Birth: {CoachData.birthDate}</p>
                            <p>Gender: {CoachData.gender}</p>
                            <p>Category: {CoachData.category}</p>
                        </div>
                    <button className="edit-button" onClick={() => setShowUpdateForm(true)}>✏️ Edit Profile</button>
                
            </div>
                )}
        </div>
        </div>
    );
};

export default Coaches;

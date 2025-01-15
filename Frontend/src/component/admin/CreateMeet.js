// src/component/admin/Modal.js

import React, { useState } from 'react';
import axios from 'axios';
import './CreateMeet.css'; // Create a CSS file for styling the modal

const CreateMeet = ({ onClose, onMeetCreated }) => {
    const [meetName, setMeetName] = useState('');
    const [error, setError] = useState(''); 

    const getAuthHeader = () => {
        const token = localStorage.getItem('authToken');
        return {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        };
    };

    const handleCreateMeet = async () => {
        try {
            setError('');
            const authHeader = getAuthHeader();
            const response = await axios.post(
                'http://localhost:8080/meet/create/admin',
                { meetName },
                authHeader
            );
            onMeetCreated(response.data);
            alert('Meet Created successfully!');
            onClose();
        } catch (error) {
            if (error.response) {
                console.error('Error response:', error.response.data);
                setError(error.response.data || 'An error occurred');
            } else if (error.request) {
                console.error('Error request:', error.request);
                setError('No response received from the server');
            } else {
                console.error('Error message:', error.message);
                setError('Error in setting up the request');
            }
        }
    };

    return (
        <div className="modal">
            <div className="modal-content">
                <button className="close" onClick={onClose}>x</button>
                <h2>Create Meet</h2>
                {error && <div className="error-message">{error}</div>}
                <input
                    type="text"
                    value={meetName}
                    onChange={(e) => setMeetName(e.target.value)}
                    placeholder="Enter meet name"
                />
                <button onClick={handleCreateMeet}>Create</button>
            </div>
        </div>
    );
};

export default CreateMeet;

import React, { useState, useEffect } from 'react';
import './Athlete.css';
import axios from 'axios';
import { Link } from 'react-router-dom';
import AthleteRegistrationForm from './athleteRegistration.js';
import AthleteUpdateForm from './AthleteUpdateForm';
import defaultProfileImage from './defaultProfileImage.jfif';

const Athlete = () => {
    const [activeTab, setActiveTab] = useState('Overview');
    const [error, setError] = useState('');
    const [athleteData, setAthleteData] = useState([]);
    const [showRegistrationForm, setShowRegistrationForm] = useState(false);
    const [showUpdateForm, setShowUpdateForm] = useState(false);

    const handleTabClick = (tab) => {
        setActiveTab(tab);
    };

    const handleRegister = (newAthleteData) => {
        setAthleteData(newAthleteData);
    };

    const getAuthHeader = () => {
        const token = localStorage.getItem('authToken');
        return {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        };
    };

    const fetchAthleteData = async () => {
        try {
            const authHeader = getAuthHeader();
            const response = await axios.get('http://localhost:8080/athletes/getAthlete', authHeader);
            setAthleteData(response.data);
        } catch (error) {
            if (error.response) {
              console.error('Error response:', error.response.data);
              setError(error.response.data || 'An error occurred');
              if(error.response.data === 'Athlete not found'){
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
        fetchAthleteData();
    }, []);

    const handleUpdate = (updatedAthleteData) => {
        setAthleteData(updatedAthleteData);
        setShowUpdateForm(false);
    };

    const getImageSrc = () => {
        if (athleteData.photoUrl) {
            return `data:image/jpeg;base64,${athleteData.photoUrl}`;
        }
        return defaultProfileImage;
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
        <div className="athlete-container">
        {showRegistrationForm ? (
                    <AthleteRegistrationForm onClose={() => setShowRegistrationForm(false)} onRegister={handleRegister}/>
                ) : showUpdateForm ? (
                    <AthleteUpdateForm athleteData={athleteData} onClose={() => setShowUpdateForm(false)} onUpdate={handleUpdate} />
                ) : (
            <div className="athlete-profile">
                <div className="profile-card">
                <img 
                            src={getImageSrc()}
                            className="profile-image" 
                        />
                        <div className="profile-info">
                            <h2>{`${athleteData.firstName} ${athleteData.lastName}`}</h2>
                            <p>Date of Birth: {athleteData.birthDate}</p>
                            <p>Gender: {athleteData.gender}</p>
                            <p>Height: {athleteData.height} cm</p>
                            <p>Weight: {athleteData.weight} kg</p>
                            <p>Category: {athleteData.category}</p>
                            <p>Coach: {athleteData.coachId ? athleteData.coachId : 'N/A'}</p>
                        </div>
                    <button className="edit-button" onClick={() => setShowUpdateForm(true)}>✏️ Edit Profile</button>
                </div>

                <div className="tabs">
                    <div className="tab-links">
                        <button 
                            className={activeTab === 'Overview' ? 'active' : ''}
                            onClick={() => handleTabClick('Overview')}
                        >Overview</button>
                        <button 
                            className={activeTab === 'Applied Events' ? 'active' : ''}
                            onClick={() => handleTabClick('Applied Events')}
                        >Applied Events</button>
                        <button 
                            className={activeTab === 'Wellness' ? 'active' : ''}
                            onClick={() => handleTabClick('Wellness')}
                        >Wellness</button>
                    </div>
                    <div className="tab-content">
                        {activeTab === 'Overview' && (
                            <div className="tab-overview">Overview content here...</div>
                        )}
                        {activeTab === 'Applied Events' && (
                            <div className="tab-applied-events">
                                <table>
                                    <thead>
                                        <tr>
                                            <th>Event ID</th>
                                            <th>Event Name</th>
                                            <th>Category</th>
                                            <th>Status</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr><td>E_00007</td><td>DiscusForce Throw</td><td>Throw</td><td>Pending</td></tr>
                                        <tr><td>E_00006</td><td>RelayChamp 4x100m</td><td>4x100m</td><td>Pending</td></tr>
                                        <tr><td>E_00001</td><td>Rapid Dash</td><td>100M</td><td>Approved</td></tr>
                                        <tr><td>E_00004</td><td>VaultKing Pole Vault</td><td>10M</td><td>Rejected</td></tr>
                                    </tbody>
                                </table>
                            </div>
                        )}
                        {activeTab === 'Wellness' && (
                            <div className="tab-wellness">Wellness content here...</div>
                        )}
                    
                      
                    <div className="filter-buttons">
                        <button 
                            className={activeTab === 'Pending' ? 'active' : ''}
                            onClick={() => handleTabClick('Pending')}
                        >Pending</button>
                        <button 
                            className={activeTab === 'Approved' ? 'active' : ''}
                            onClick={() => handleTabClick('Approved')}
                        >Approved</button>
                        <button 
                            className={activeTab === 'Rejected' ? 'active' : ''}
                            onClick={() => handleTabClick('Rejected')}
                        >Rejected</button>
                    </div>
</div>

                    <div className="tab-content">
                        {activeTab === 'Overview' && (
                            <div className="tab-table">
                                <table>
                                    <thead>
                                        <tr>
                                            <th>EVENT ID</th>
                                            <th>EVENT NAME</th>
                                            <th>CATEGORY</th>
                                            <th>STATUS</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr><td>E_00007</td><td>DiscusForce Throw</td><td>Throw</td><td>Pending</td></tr>
                                        <tr><td>E_00006</td><td>RelayChamp 4x100m</td><td>4x100m</td><td>Pending</td></tr>
                                        <tr><td>E_00001</td><td>Rapid Dash</td><td>100M</td><td>Approved</td></tr>
                                        <tr><td>E_00004</td><td>VaultKing Pole Vault</td><td>10M</td><td>Rejected</td></tr>
                                    </tbody>
                                </table>
                            </div>
                        )}
                        {activeTab === 'Pending' && (
                            <div className="tab-table">
                                <table>
                                    <thead>
                                        <tr>
                                            <th>EVENT ID</th>
                                            <th>EVENT NAME</th>
                                            <th>CATEGORY</th>
                                            <th>STATUS</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr><td>E_00007</td><td>DiscusForce Throw</td><td>Throw</td><td>Pending</td></tr>
                                        <tr><td>E_00006</td><td>RelayChamp 4x100m</td><td>4x100m</td><td>Pending</td></tr>
                                    </tbody>
                                </table>
                            </div>
                        )}
                        {activeTab === 'Approved' && (
                            <div className="tab-table">
                                <table>
                                    <thead>
                                        <tr>
                                            <th>EVENT ID</th>
                                            <th>EVENT NAME</th>
                                            <th>CATEGORY</th>
                                            <th>STATUS</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr><td>E_00001</td><td>Rapid Dash</td><td>100M</td><td>Approved</td></tr>
                                    </tbody>
                                </table>
                            </div>
                        )}
                        {activeTab === 'Rejected' && (
                            <div className="tab-table">
                                <table>
                                    <thead>
                                        <tr>
                                            <th>EVENT ID</th>
                                            <th>EVENT NAME</th>
                                            <th>CATEGORY</th>
                                            <th>STATUS</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr><td>E_00004</td><td>VaultKing Pole Vault</td><td>10M</td><td>Rejected</td></tr>
                                    </tbody>
                                </table>
                            </div>
                        )}
                    </div>
                </div>
            </div>
                )}
        </div>
        </div>
    );
};

export default Athlete;

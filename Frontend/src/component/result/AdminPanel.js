import React, { useState, useEffect } from 'react';
import EventResult from './EventResult';
import SearchBar from './SearchBar';
import apiService from '../../services/apiService';
import './AdminPanel.css';

function AdminPanel() {
    const [events, setEvents] = useState([]);
    const [searchQuery, setSearchQuery] = useState('');

    useEffect(() => {
        // Fetch events data from the backend
        apiService.getEvents().then(data => setEvents(data));
    }, []);

    const handlePublish = (eventId) => {
        apiService.publishResult(eventId)
            .then(() => alert('Result published successfully!'))
            .catch(error => alert('Error publishing result: ' + error));
    };

    const filteredEvents = events.filter(event =>
        event.eventTitle.toLowerCase().includes(searchQuery.toLowerCase())
    );

    return (
        <div className="admin-panel">
            <SearchBar searchQuery={searchQuery} setSearchQuery={setSearchQuery} />
            <table className="event-table">
                <thead>
                    <tr>
                        <th>Event ID</th>
                        <th>Event Title</th>
                        <th>Meet Name</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {filteredEvents.map(event => (
                        <EventResult key={event.id} event={event} onPublish={handlePublish} />
                    ))}
                </tbody>
            </table>
        </div>
    );
}

export default AdminPanel;

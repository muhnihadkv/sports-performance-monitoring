import React from 'react';
import { Link } from 'react-router-dom';

const AdminNavbar = () => {
    return (
        <nav className="admin-navbar">
             <nav className="navbar">
      <h1>Athletics</h1>
      <ul>
        <li><Link to="/">Dashboard</Link></li>
        <li><Link to="/news">News</Link></li>
        <li><Link to="/event">Events</Link></li>
        <li><Link to="/coaches">Coaches</Link></li>
        <li><Link to="/athelete">Athelete</Link></li>
        <li><Link to="/result">Result</Link></li>
       
        <li><Link to="/Logout" className="link logout button">Logout</Link></li>
      </ul>
    </nav>
        </nav>
    );
};

export default AdminNavbar;

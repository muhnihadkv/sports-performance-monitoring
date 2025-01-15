import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './Navbar.css';

const Navbar = () => {
    const [isAdmin, setIsAdmin] = useState(false);

    return (
        <nav className="navbar">
            <div className="navbar-left">
                <h1 className="navbar-title">Athletics</h1>
            </div>
            <div className="navbar-right">
                <ul className="navbar-links">
                    <li><Link to="/home">Home</Link></li>
                    <li><Link to="/home">About Us</Link></li>
                    <li><Link to="/home">News</Link></li>
                    <li><Link to="/result">Contact Us</Link></li>
                    {isAdmin ? (
                        <li><Link to="/admin/adminlogin" className="button">Admin Login</Link></li>
                    ) : (
                        <>
                            <li><Link to="/login" className="button">Login</Link></li>
                            <li><Link to="/register" className="button">Signup</Link></li>
                        </>
                    )}
                </ul>
            </div>
        </nav>
    );
};

export default Navbar;

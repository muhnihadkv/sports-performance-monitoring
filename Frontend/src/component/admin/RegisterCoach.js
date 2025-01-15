import React, { useState } from 'react';
import './RegisterCoach.css';
import axios from 'axios';

const RegisterCoach = ({ onClose }) => {
    const [formData, setFormData] = useState({
        email: '',
        password: '',
    });

    const [successMessage, setSuccessMessage] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [error, setError] = useState(''); 

    const togglePasswordVisibility = () => {
        setShowPassword((prevShowPassword) => !prevShowPassword);
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prevState => ({
            ...prevState,
            [name]: value,
        }));
    };

    const getAuthHeader = () => {
        const token = localStorage.getItem('authToken');
        return {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        };
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            setError('');
            setSuccessMessage('');

            const authHeader = getAuthHeader();
            await axios.post(
                'http://localhost:8080/auth/registerCoach/admin',
                formData,
                authHeader
            );
            console.log('Registering Coach:', formData);
            setSuccessMessage('Coach registered successfully!');
            alert('Coach Registered successful!');
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
        <div className="register-coach-container">
            <button className="close-button" onClick={onClose}>×</button>
            <h2>Register Coach</h2>
            {successMessage && <p className="success-message">{successMessage}</p>}
            {error && <div className="error-message">{error}</div>}
            <form onSubmit={handleSubmit} className="register-coach-form">
                <label htmlFor="email">Email</label>
                <input 
                    type="email" 
                    id="email" 
                    name="email" 
                    placeholder="Enter your email" 
                    required 
                    className="form-input"
                    value={formData.email}
                    onChange={handleChange} 
                />
                
                <label htmlFor="password">Password</label>
                <div className="password-container">
                    <input 
                        type={showPassword ? "text" : "password"}
                        id="password" 
                        name="password" 
                        placeholder="Enter your password" 
                        required 
                        className="form-input"
                        value={formData.password}
                        onChange={handleChange} 
                    />
                    <button
                        type="button"
                        onClick={togglePasswordVisibility}
                        className="toggle-password-btn"
                    >
                        {showPassword ? "Hide" : "Show"}
                    </button>
                </div>
                    
                <button type="submit" className="submit-button">Register Coach</button>
            </form>
        </div>
    );
};

export default RegisterCoach;

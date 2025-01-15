import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; 
import './Login.css'; 
import axios from 'axios';

const Login = () => {
  const navigate = useNavigate();
  
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });
  
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState(''); 
  const [message, setMessage] = useState(''); 
  
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const togglePasswordVisibility = () => {
    setShowPassword((prevShowPassword) => !prevShowPassword);
  };
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setError('');
      setMessage('');

      const response = await axios.post(
        'http://localhost:8080/auth/login',
        formData
      );


      const { role } = response.data;
      const { token } = response.data;
      localStorage.setItem('authToken', token);
      
      setMessage("Login successful"); 

      if (role === 'ADMIN') {
        navigate('/admindashboard');
      } else if (role === 'ATHLETE') {
        navigate('/athelete');
      } else if(role === 'COACH'){
        navigate('/coaches');
      }
      
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
    <div className="login-container">
      <form className="login-form" onSubmit={handleSubmit}>
        <h2 className="login-title">Login</h2>
        {error && <div className="error-message">{error}</div>}
        {message && <div className="success-message">{message}</div>}
        
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

        <button type="submit" className="submit-btn">Login</button>
      </form>
    </div>
  );
};

export default Login;

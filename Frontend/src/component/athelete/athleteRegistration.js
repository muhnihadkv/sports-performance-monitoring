import React, { useState } from 'react';
import axios from 'axios';

const AthleteRegistrationForm = ({ onClose, onRegister }) => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    birthDate: '',
    gender: 'Male', // Default value
    height: '',
    weight: '',
    category: '',
    imageFile: null,
  });
  

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleImageChange = (e) => {
    setFormData({ ...formData, imageFile: e.target.files[0] });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formDataToSend = new FormData();
    formDataToSend.append('athleteData', JSON.stringify(formData));
    formDataToSend.append('file', formData.imageFile);

    try {
      const response = await axios.post('http://localhost:8080/athletes/create', formDataToSend, {
        headers: {
          'Content-Type': 'multipart/form-data',
          Authorization: `Bearer ${localStorage.getItem('authToken')}`,
        },
      });
      alert('Registration successful!');
      console.log('Athlete registered successfully:', response.data);
      onRegister(response.data);
      onClose();
    } catch (error) {
      console.error('Error registering athlete:', error);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="coach-form">
      <label>First Name:</label>
      <input type="text" name="firstName" value={formData.firstName} onChange={handleChange} required />

      <label>Last Name:</label>
      <input type="text" name="lastName" value={formData.lastName} onChange={handleChange} required />

      <label>Birth Date:</label>
      <input type="date" name="birthDate" value={formData.birthDate} onChange={handleChange} required />

      <label>Gender:</label>
      <select name="gender" value={formData.gender} onChange={handleChange}>
        <option value="Male">Male</option>
        <option value="Female">Female</option>
      </select>

      <label>Height (cm):</label>
      <input type="number" name="height" value={formData.height} onChange={handleChange} required />

      <label>Weight (kg):</label>
      <input type="number" name="weight" value={formData.weight} onChange={handleChange} required />

      <label>Category:</label>
      <input type="text" name="category" value={formData.category} onChange={handleChange} required />

      <label>Image:</label>
      <input type="file" name="imageFile" accept="image/*" onChange={handleImageChange} />

      <button type="submit">Register Athlete</button>
    </form>
  );
};

export default AthleteRegistrationForm;

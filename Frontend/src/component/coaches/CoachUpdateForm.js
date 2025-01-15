import React, { useState, useEffect } from 'react';
import axios from 'axios';

const CoachUpdateForm = ({ CoachData, onClose, onUpdate }) => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    birthDate: '',
    gender: 'Male', // Default value
    category: '',
    imageFile: null,
  });

  useEffect(() => {
    // Pre-fill the form with existing athlete data
    if (CoachData) {
      setFormData({
        firstName: CoachData.firstName,
        lastName: CoachData.lastName,
        birthDate: CoachData.birthDate,
        gender: CoachData.gender,
        category: CoachData.category,
        imageFile: null, // Image file will be uploaded again if changed
      });
    }
  }, [CoachData]);

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
    formDataToSend.append('dto', JSON.stringify(formData));
    if (formData.imageFile) {
      formDataToSend.append('file', formData.imageFile);
    }

    try {
      const response = await axios.put('http://localhost:8080/coaches/update/coach', formDataToSend, {
        headers: {
          'Content-Type': 'multipart/form-data',
          Authorization: `Bearer ${localStorage.getItem('authToken')}`,
        },
      });
      alert('Update successful!');
      console.log('Coach updated successfully:', response.data);
      onUpdate(response.data); // Pass the updated athlete data to the parent
      onClose();
    } catch (error) {
      console.error('Error updating Coach:', error);
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

            <label>Category:</label>
            <input type="text" name="category" value={formData.category} onChange={handleChange} required />

            <label>Image:</label>
            <input type="file" name="imageFile" accept="image/*" onChange={handleImageChange} />

            <button type="submit">Update Coach</button>
          </form>
        );
      };

export default CoachUpdateForm;

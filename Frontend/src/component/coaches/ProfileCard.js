import React from 'react';
import PropTypes from 'prop-types';
import './ProfileCard.css';

const ProfileCard = ({ profile, onDelete }) => {
  if (!profile) return null; 

  return (
    
    <div className="profile-card1">
      <img src={profile.image} alt={profile.name} className="profile-image1" />
      <h3>{profile.name}</h3>
      <p>Age: {profile.age}</p>
      <p>{profile.bio}</p>
      <button className="delete-button" onClick={onDelete}>Delete</button>
    </div>
  );
};

ProfileCard.propTypes = {
  profile: PropTypes.shape({
    name: PropTypes.string,
    age: PropTypes.number,
    bio: PropTypes.string,
    image: PropTypes.string,
  }).isRequired,
  onDelete: PropTypes.func.isRequired,
};

export default ProfileCard;

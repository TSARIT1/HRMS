import React from 'react';
import { Link } from 'react-router-dom';

const ProfilePage = () => {
  return (
    <div>
      <h2>Profile Page</h2>
     
<Link to="/headera" className="button">Go to header Page</Link>      
    </div>
  );
};

export default ProfilePage;

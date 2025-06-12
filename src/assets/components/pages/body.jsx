import React, { useEffect, useState } from 'react';
import './body.css';
import { Link } from 'react-router-dom';

function Body() {
  const [greeting, setGreeting] = useState('');

  useEffect(() => {
    const hour = new Date().getHours();
    if (hour < 12) {
      setGreeting('Good Morning');
    } else if (hour < 18) {
      setGreeting('Good Afternoon');
    } else {
      setGreeting('Good Evening');
    }
  }, []);

  return (
    <div className="dashboard-wrapper">

      <div className="navigation-buttons">
        <Link to="/" className="nav-btn">Welcome</Link>
        <Link to="/dashboard" className="nav-btn">Dashboard</Link>
      </div>

      <div className="top-section">
        <div className="text-content">
          <h1>{greeting},</h1>
          <p>Let's do great things together. 🚀 🌞</p>
        </div>
        <div className="skyline">
          <img src="/blue.png" alt="Skyline" className="skyline-img" />
          <img src="/sun.webp" alt="Sun" className="sun" />
        </div>
      </div>

      <div className="favourites-section">
        <h2>My Favourites</h2>
        <div className="favourites-grid">
          <div className="favourite-card add-card">
            <button>
              <Link to="/Actions"> ➕ </Link>
            </button>
          </div>
        </div>

        <h2>Help Links</h2>
        <div className="help-links">
          <Link to=""><button>TSar It Community</button></Link>
           <Link to=""><button>Statutory Compliances</button></Link>
          <Link to=""><button>TSar ItKnowledge Centre</button></Link> 
          <Link to=""><button>Resource Centre</button></Link> 
          <Link to=""> <button>How to Videos</button></Link>
          <Link to=""><button>TSar It Academy</button></Link> 
          <Link to=""><button>TSar It FM</button></Link> 
        </div>
      </div>
    </div>
  );
}

export default Body;

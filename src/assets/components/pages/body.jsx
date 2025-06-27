import React, { useEffect, useState } from 'react';
import './body.css';
import { Link } from 'react-router-dom';
import { MdOutlineAdd } from "react-icons/md";

function Body() {
  const [greeting, setGreeting] = useState('');
  const [timeClass, setTimeClass] = useState('');

  useEffect(() => {
    const hour = new Date().getHours();
    if (hour < 12) {
      setGreeting('Good Morning');
      setTimeClass('morning');
    } else if (hour < 18) {
      setGreeting('Good Afternoon');
      setTimeClass('afternoon');
    } else {
      setGreeting('Good Evening');
      setTimeClass('evening');
    }
  }, []);

  return (
    <div className="dashboard-wrapper">

      <nav className="navigation-buttons">
        <Link to="/" className="nav-btn">Welcome</Link>
        <Link to="/dashboard" className="nav-btn">Dashboard</Link>
      </nav>

      <section className={`top-section ${timeClass}`}>
        <div className="text-content">
          <h1>{greeting},</h1>
          <p>Let's do great things together.</p>
        </div>
        <div className="skyline">
          <img src={`/sun-${timeClass}.png`} alt="City Skyline" className="skyline-img" />
          <img src={`/sun-${timeClass}.webp`} alt="Sun" className="sun" />
        </div>
      </section>

      <section className="favourites-section">
        <h2>My Favourites</h2>
        <div className="favourites-grid">
          <Link to="/add fav" className="favourite-card add-card" aria-label="Add new favourite">
            <MdOutlineAdd className="add-icon" />
          </Link>
        </div>

        <h2>Help Links</h2>
        <div className="help-links">
          <Link to=""><button>TSar It Community</button></Link>
          <Link to=""><button>Statutory Compliances</button></Link>
          <Link to=""><button>TSar ItKnowledge Centre</button></Link> 
          <Link to=""><button>Resource Centre</button></Link> 
          <Link to=""><button>How to Videos</button></Link>
          <Link to=""><button>TSar It Academy</button></Link> 
          <Link to=""><button>TSar It FM</button></Link> 
        </div>
      </section>
    </div>
  );
}

export default Body;

import React from 'react'
import { FaPrayingHands } from "react-icons/fa";
import { Link } from "react-router-dom";
import './Login.css'; // Import the CSS

function Login() {
  return (
    <div className="login-container">
      <div className="login-box">
        <h>Hello There <FaPrayingHands /></h>
        <div>
          <label>
            Login ID
            <input type='text' placeholder='Employee No'/>
          </label>
          <label>
            Password
            <input type='password' placeholder='Enter Password'/>
            <Link to="/LogoutE">Forgot Password</Link>
          </label>
        </div>
      </div>
    </div>
  )
}

export default Login

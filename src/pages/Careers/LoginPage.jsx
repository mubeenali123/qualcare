import React, { useState, useEffect } from 'react'; // Added useEffect
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom'; // Added useNavigate
import * as types from "../../redux/type";

const LoginPage = ({ onBack }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate(); // Initialize navigation
  
  // Pull token and user from auth state
  const { loading, error, token } = useSelector(state => state.auth);

  const [formData, setFormData] = useState({
    referenceId: '',
    password: ''
  });

  // ✅ REDIRECT LOGIC
  // This runs whenever the 'token' changes. If login is successful, 
  // the saga updates the store, the token appears, and this triggers.
  useEffect(() => {
    if (token) {
      navigate('/profile');
    }
  }, [token, navigate]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleLogin = () => {
    // Basic validation to prevent empty requests
    if (!formData.referenceId || !formData.password) {
      return; 
    }
    
    dispatch({
      type: types.USER_LOGIN_REQUEST,
      payload: formData
    });
  };

  return (
    <div className="login-page">
      <header className="header">
        <div className="header-container">
          <div className="logo">
            <img src="/logo.png.png" alt="QualCare Logo" />
          </div>
          <button className="home-btn" onClick={onBack}>Home</button>
          <div className="header-right">
            <div className="social-icons">
              <a href="https://facebook.com" target="_blank" rel="noopener noreferrer"><i className="fab fa-facebook-f"></i></a>
              <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer"><i className="fab fa-linkedin-in"></i></a>
              <a href="https://twitter.com" target="_blank" rel="noopener noreferrer"><i className="fab fa-twitter"></i></a>
              <a href="https://instagram.com" target="_blank" rel="noopener noreferrer"><i className="fab fa-instagram"></i></a>
            </div>
          </div>
        </div>
      </header>

      <div className="login-container centered-content mt-5 mb-5">
        <div className="login-form">
          <h2 className="text-center mb-4">Applicant Login</h2>

          {error && <div className="alert alert-danger">{error}</div>}

          <div className="form-field">
            <label className="section-label">Reference ID</label>
            <input
              type="text"
              name="referenceId"
              value={formData.referenceId}
              onChange={handleChange}
              placeholder="Enter your reference ID"
              className="form-control"
              onKeyPress={(e) => e.key === 'Enter' && handleLogin()} // Login on Enter key
            />
          </div>

          <div className="form-field mt-3">
            <label className="section-label">Password</label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="Enter your password"
              className="form-control"
              onKeyPress={(e) => e.key === 'Enter' && handleLogin()} // Login on Enter key
            />
          </div>

          <button
            type="button"
            className="btn-next mt-4"
            onClick={handleLogin}
            disabled={loading}
          >
            {loading ? "Logging in..." : "Login"}
          </button>
        </div>
      </div>

      <footer className="footer">
        <div className="footer-container">
          <div className="footer-logo">
            <img src="/ncpc-logo.jpg" alt="NCPC Member" />
          </div>
          <div className="footer-content">
            <p>QUALCARE NURSE REGISTRY INC. © 2025. All Rights Reserved.</p>
            <p>State Licensed Nurse Registry Broward County License #NR30212051</p>
            <p>Powered by MISOL | <a href="#">Terms of Service</a> & <a href="#">Privacy Policy</a></p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default LoginPage;
import React from 'react';
import './ApplicationForm.css';

const LoginPage = ({ onBack }) => {
  return (
    <div className="login-page">
      {/* Header */}
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

      {/* Login Form Container */}
      {/* Added 'centered-content' and 'my-5' (margin top and bottom) */}
      <div className="login-container centered-content mt-5 mb-5">
        <div className="login-form">
          <h2 className="text-center mb-4">Login</h2>
          
          <div className="form-field">
            <label className="section-label">Reference ID</label>
            <input
              type="text"
              name="referenceId"
              placeholder="Enter your reference ID"
              className="form-control"
            />
          </div>

          <div className="form-field mt-3">
            <label className="section-label">Password</label>
            <input
              type="password"
              name="password"
              placeholder="Enter your password"
              className="form-control"
            />
          </div>

          <button type="button" className="btn-next mt-4">
            Login
          </button>
        </div>
      </div>

      {/* Footer */}
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
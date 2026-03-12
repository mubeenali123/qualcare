import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import ProfileSidebar from './ProfileSidebar';
import * as types from "../../redux/type";

const ChangePasswordPage = ({ onBack }) => {
  const dispatch = useDispatch();
  
  // Pulling loading and status from auth reducer
  const { loading, error, successMessage } = useSelector(state => state.auth);

  const [formData, setFormData] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: ''
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleUpdate = () => {
    // Client-side validation
    if (!formData.currentPassword || !formData.newPassword) {
      alert("Please fill in all fields.");
      return;
    }

    if (formData.newPassword !== formData.confirmPassword) {
      alert("New passwords do not match!");
      return;
    }
    
    // Dispatch the request to the Saga
    dispatch({
      type: types.CHANGE_PASSWORD_REQUEST,
      payload: {
        current_password: formData.currentPassword,
        new_password: formData.newPassword
      }
    });

    // Optional: Clear fields on success logic would usually happen in a useEffect
  };

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

      {/* Main Layout Container */}
      <div className="profile-wrapper mt-5 mb-5">
        <div className="container">
          <div className="row">
            <div className="col-md-3">
              <ProfileSidebar />
            </div>
            
            <div className="col-md-9">
              {/* Right Content Card */}
              <main className="profile-content-card">
                <h2>Change Password</h2>
                <hr />

                {/* Feedback Alerts */}
                {error && <div className="alert alert-danger">{error}</div>}
                {successMessage && <div className="alert alert-success">{successMessage}</div>}

                <div className="form-grid">
                  <div className="form-field">
                    <label className="section-label">Current Password</label>
                    <input
                      type="password"
                      name="currentPassword"
                      value={formData.currentPassword}
                      onChange={handleChange}
                      placeholder="Enter current password"
                      className="form-control"
                    />
                  </div>

                  <div className="form-field">
                    <label className="section-label">New Password</label>
                    <input
                      type="password"
                      name="newPassword"
                      value={formData.newPassword}
                      onChange={handleChange}
                      placeholder="Enter new password"
                      className="form-control"
                    />
                  </div>

                  <div className="form-field">
                    <label className="section-label">Confirm New Password</label>
                    <input
                      type="password"
                      name="confirmPassword"
                      value={formData.confirmPassword}
                      onChange={handleChange}
                      placeholder="Confirm new password"
                      className="form-control"
                    />
                  </div>
                </div>

                <button 
                  type="button" 
                  className="btn-save mt-4"
                  onClick={handleUpdate}
                  disabled={loading}
                >
                  {loading ? "Updating..." : "Update Password"}
                </button>
              </main>
            </div>
          </div>
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

export default ChangePasswordPage;
import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import ProfileSidebar from './ProfileSidebar';

const ProfilePage = ({ onBack }) => {
  // 1. Pull user and application data from Redux
  const { user, application } = useSelector((state) => state.auth);

  // 2. Initialize local state with Redux data
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
  });

  // Update local state once the Redux data is available
  useEffect(() => {
    if (user) {
      setFormData({
        firstName: user.first_name || '',
        lastName: user.last_name || '',
        email: user.email || '',
      });
    }
  }, [user]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
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
              <a href="https://facebook.com" target="_blank" rel="noopener noreferrer">
                <i className="fab fa-facebook-f"></i>
              </a>
              <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer">
                <i className="fab fa-linkedin-in"></i>
              </a>
              <a href="https://twitter.com" target="_blank" rel="noopener noreferrer">
                <i className="fab fa-twitter"></i>
              </a>
              <a href="https://instagram.com" target="_blank" rel="noopener noreferrer">
                <i className="fab fa-instagram"></i>
              </a>
            </div>
          </div>
        </div>
      </header>

      <div className="profile-wrapper mt-5 mb-5">
        <div className="container">
          <div className="row">
            <div className="col-md-3">
              <ProfileSidebar />
            </div>

            <div className="col-md-9">
              <main className="profile-content-card">
                <h2>Account Details</h2>
                <hr />

{/* Profile Initial Avatar Section */}
<div className="profile-header-display d-flex align-items-center gap-3 mb-4">
  <div className="user-avatar-initials">
    {/* Grabs first initials of First and Last name */}
    {user?.first_name || user?.last_name 
      ? `${user.first_name?.[0] || ''}${user.last_name?.[0] || ''}`.toUpperCase() 
      : 'U'}
  </div>
  
  <div className="user-info-display">
    <h3 className="m-0" style={{ fontWeight: '700', color: '#333' }}>
      {user?.first_name} {user?.last_name}
    </h3>
    <p className="text-muted m-0" style={{ fontSize: '14px' }}>
      {application?.reference_id}
    </p>
  </div>
</div>

                <div className="form-grid">
                  <div className="form-field">
                    <label className="section-label">Reference ID</label>
                    <input 
                      type="text" 
                      disabled 
                      className="form-control bg-light"
                      value={application?.reference_id || "N/A"} 
                    />
                  </div>

                  <div className="form-field">
                    <label className="section-label">Email Address</label>
                    <input 
                      type="email" 
                      disabled 
                      className="form-control bg-light"
                      value={formData.email} 
                    />
                  </div>

                  <div className="form-field">
                    <label className="section-label">First Name</label>
                    <input 
                      type="text" 
                      name="firstName" 
                      value={formData.firstName}
                      onChange={handleChange}
                      placeholder="Enter first name" 
                      className="form-control"
                    />
                  </div>

                  <div className="form-field">
                    <label className="section-label">Last Name</label>
                    <input 
                      type="text" 
                      name="lastName" 
                      value={formData.lastName}
                      onChange={handleChange}
                      placeholder="Enter last name" 
                      className="form-control"
                    />
                  </div>
                </div>

                <button type="button" className="btn-save mt-4">
                  Save Changes
                </button>
              </main>
            </div>
          </div>
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

export default ProfilePage;
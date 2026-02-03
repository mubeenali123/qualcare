import React from 'react';

const ChangePasswordPage = ({ onBack }) => {
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
        <div className="profile-container">
          
          {/* Left Sidebar Card */}
          <aside className="sidebar-card">
            <ul className="sidebar-nav">
              <li>Account</li>
              <li>Applications</li>
              <li className="active">Change Password</li>
              <li className="logout-item">Logout</li>
            </ul>
          </aside>

          {/* Right Content Card */}
          <main className="profile-content-card">
            <h2>Change Password</h2>
            <hr />

            <div className="form-grid">
              <div className="form-field">
                <label className="section-label">Current Password</label>
                <input
                  type="password"
                  name="currentPassword"
                  placeholder="Enter current password"
                />
              </div>

              <div className="form-field">
                <label className="section-label">New Password</label>
                <input
                  type="password"
                  name="newPassword"
                  placeholder="Enter new password"
                />
              </div>

              <div className="form-field">
                <label className="section-label">Confirm New Password</label>
                <input
                  type="password"
                  name="confirmPassword"
                  placeholder="Confirm new password"
                />
              </div>
            </div>

            <button type="button" className="btn-save mt-4">
              Update Password
            </button>
          </main>
          
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
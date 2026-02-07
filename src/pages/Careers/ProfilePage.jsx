import React from 'react';

const ProfilePage = ({ onBack }) => {
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
             {/* Social icons here... */}
          </div>
        </div>
      </header>

      {/* Main Layout Container */}
      <div className="profile-wrapper mt-5 mb-5">
        <div className="container">
          <div className="row">

          {/* Left Sidebar Card */}
          <div className="col-md-3">

          <aside className="sidebar-card">
            <ul className="sidebar-nav">
              <li className="active">Account</li>
              <li>Applications</li>
              <li>Change Password</li>
              <li>Expiration Checklist</li>
              <li className="logout-item">Logout</li>
            </ul>
          </aside>
          </div>

<div className="col-md-9">

          {/* Right Content Card */}
          <main className="profile-content-card">
            <h2>Account Details</h2>
            <hr />

            <div className="profile-picture-section">
              <img src="/default-avatar.png" alt="Profile" className="avatar" />
              <button type="button" className="btn-upload">
                Upload Picture
              </button>
            </div>

            <div className="form-grid">
              <div className="form-field">
                <label className="section-label">Reference ID</label>
                <input type="text" name="referenceId" disabled value="QC-12345" />
              </div>

              <div className="form-field">
                <label className="section-label">First Name</label>
                <input type="text" name="firstName" placeholder="John" />
              </div>

              <div className="form-field">
                <label className="section-label">Last Name</label>
                <input type="text" name="lastName" placeholder="Doe" />
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

      {/* Footer remains at the bottom */}
      <footer className="footer">...</footer>
    </div>
  );
};

export default ProfilePage;
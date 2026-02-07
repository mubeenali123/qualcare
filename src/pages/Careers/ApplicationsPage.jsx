import React from 'react';

const ApplicationsPage = ({ onBack }) => {
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

          {/* Left Sidebar Card */}
          <div className="col-md-3">

          <aside className="sidebar-card">
            <ul className="sidebar-nav">
              <li>Account</li>
              <li className="active">Applications</li>
              <li>Change Password</li>
              <li>Expiration Checklist</li>
              <li className="logout-item">Logout</li>
            </ul>
          </aside>
          </div>
<div className="col-md-9">

          {/* Right Content Card */}
          <main className="profile-content-card">
            <h2>Applications</h2>
            <hr />

            <div className="applications-grid">
              <button type="button" className="btn-next">
                Application One
              </button>
              
              <button type="button" className="btn-next">
                Application Two
              </button>
              
              <button type="button" className="btn-next">
                Application Three
              </button>
              
              <button type="button" className="btn-next">
                Application Four
              </button>
              
              <button type="button" className="btn-next">
                Application Five
              </button>
              
              <button type="button" className="btn-next">
                Application Six
              </button>
            </div>
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

export default ApplicationsPage;
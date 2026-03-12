import React from 'react';
import ProfileSidebar from './ProfileSidebar';

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
              <ProfileSidebar />
            </div>
            <div className="col-md-9">

              {/* Right Content Card */}
              <main className="profile-content-card">
                <div class="final-application-section"><h2 class="section-title">Final Application Forms</h2><p class="section-description">Select a final application form to view</p><div class="final-app-buttons"><button class="final-app-button"><div class="button-icon"><i class="fas fa-file-contract"></i></div><div class="button-content"><h3>Final Application 1</h3><p>View form details</p></div><i class="fas fa-chevron-right"></i></button><button class="final-app-button"><div class="button-icon"><i class="fas fa-file-contract"></i></div><div class="button-content"><h3>Final Application 2</h3><p>View form details</p></div><i class="fas fa-chevron-right"></i></button><button class="final-app-button"><div class="button-icon"><i class="fas fa-file-contract"></i></div><div class="button-content"><h3>Final Application 3</h3><p>View form details</p></div><i class="fas fa-chevron-right"></i></button><button class="final-app-button"><div class="button-icon"><i class="fas fa-file-contract"></i></div><div class="button-content"><h3>Final Application 4</h3><p>View form details</p></div><i class="fas fa-chevron-right"></i></button><button class="final-app-button"><div class="button-icon"><i class="fas fa-file-contract"></i></div><div class="button-content"><h3>Final Application 5</h3><p>View form details</p></div><i class="fas fa-chevron-right"></i></button><button class="final-app-button"><div class="button-icon"><i class="fas fa-file-contract"></i></div><div class="button-content"><h3>Final Application 6</h3><p>View form details</p></div><i class="fas fa-chevron-right"></i></button></div></div>
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
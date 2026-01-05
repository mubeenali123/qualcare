import React, { useState } from 'react';
import './ApplicationForm.css';

const Step3 = ({ onNext, onPrevious, onBack, goToStep }) => {
  const [formData, setFormData] = useState({
    mondayAvailable: false,
    tuesdayAvailable: false,
    wednesdayAvailable: false,
    thursdayAvailable: false,
    fridayAvailable: false,
    saturdayAvailable: false,
    sundayAvailable: false,
    totalHours: '',
    specialRequests: ''
  });

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? checked : value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Step 3 Data:', formData);
    onNext();
  };

  const handleSave = () => {
    console.log('Step 3 Saved:', formData);
    alert('Progress saved!');
  };

  return (
    <div className="application-page">
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

      {/* Form Content */}
      <div className="form-container">

        {/* Progress Steps */}
<div className="progress-steps">
  <div className="step completed" onClick={() => goToStep(1)}>
    <div className="step-number">✓</div>
    <span className="step-label">Pre-Employment</span>
  </div>
  <div className="step completed" onClick={() => goToStep(2)}>
    <div className="step-number">✓</div>
    <span className="step-label">Education</span>
  </div>
  <div className="step active" onClick={() => goToStep(3)}>
    <div className="step-number">3</div>
    <span className="step-label">Experience</span>
  </div>
  <div className="step" onClick={() => goToStep(4)}>
    <div className="step-number">4</div>
    <span className="step-label">References</span>
  </div>
  <div className="step" onClick={() => goToStep(5)}>
    <div className="step-number">5</div>
    <span className="step-label">Skills</span>
  </div>
  <div className="step" onClick={() => goToStep(6)}>
    <div className="step-number">6</div>
    <span className="step-label">Documents</span>
  </div>
  <div className="step" onClick={() => goToStep(7)}>
    <div className="step-number">7</div>
    <span className="step-label">Review</span>
  </div>
</div>

        {/* Progress Bar */}
        <div className="progress-bar">
          <div className="progress-text">Step 3 of 7</div>
          <div className="progress-track">
            <div className="progress-fill" style={{ width: '42.85%' }}></div>
          </div>
        </div>

        <p className="required-note"><span className="required">*</span> indicates required fields</p>

        <h1 className="form-title">YOUR AVAILABILITY FOR WORK</h1>

        <form onSubmit={handleSubmit}>
          
          {/* Availability Days */}
          <div className="form-section">
            <div className="availability-grid">
              {/* Monday */}
              <div className="availability-day">
                <h4 className="day-label">Monday</h4>
                <label className="checkbox-label">
                  <input 
                    type="checkbox" 
                    name="mondayAvailable" 
                    checked={formData.mondayAvailable} 
                    onChange={handleInputChange} 
                  />
                  <span>Available</span>
                </label>
              </div>

              {/* Tuesday */}
              <div className="availability-day">
                <h4 className="day-label">Tuesday</h4>
                <label className="checkbox-label">
                  <input 
                    type="checkbox" 
                    name="tuesdayAvailable" 
                    checked={formData.tuesdayAvailable} 
                    onChange={handleInputChange} 
                  />
                  <span>Available</span>
                </label>
              </div>

              {/* Wednesday */}
              <div className="availability-day">
                <h4 className="day-label">Wednesday</h4>
                <label className="checkbox-label">
                  <input 
                    type="checkbox" 
                    name="wednesdayAvailable" 
                    checked={formData.wednesdayAvailable} 
                    onChange={handleInputChange} 
                  />
                  <span>Available</span>
                </label>
              </div>

              {/* Thursday */}
              <div className="availability-day">
                <h4 className="day-label">Thursday</h4>
                <label className="checkbox-label">
                  <input 
                    type="checkbox" 
                    name="thursdayAvailable" 
                    checked={formData.thursdayAvailable} 
                    onChange={handleInputChange} 
                  />
                  <span>Available</span>
                </label>
              </div>

              {/* Friday */}
              <div className="availability-day">
                <h4 className="day-label">Friday</h4>
                <label className="checkbox-label">
                  <input 
                    type="checkbox" 
                    name="fridayAvailable" 
                    checked={formData.fridayAvailable} 
                    onChange={handleInputChange} 
                  />
                  <span>Available</span>
                </label>
              </div>

              {/* Saturday */}
              <div className="availability-day">
                <h4 className="day-label">Saturday</h4>
                <label className="checkbox-label">
                  <input 
                    type="checkbox" 
                    name="saturdayAvailable" 
                    checked={formData.saturdayAvailable} 
                    onChange={handleInputChange} 
                  />
                  <span>Available</span>
                </label>
              </div>

              {/* Sunday */}
              <div className="availability-day">
                <h4 className="day-label">Sunday</h4>
                <label className="checkbox-label">
                  <input 
                    type="checkbox" 
                    name="sundayAvailable" 
                    checked={formData.sundayAvailable} 
                    onChange={handleInputChange} 
                  />
                  <span>Available</span>
                </label>
              </div>
            </div>
          </div>

          {/* Total Hours */}
          <div className="form-section">
            <label className="section-label">Total number of hours per week you are available to work <span className="required">*</span></label>
            <div className="form-field full-width">
              <input 
                type="text" 
                name="totalHours" 
                value={formData.totalHours} 
                onChange={handleInputChange} 
                required 
              />
            </div>
          </div>

          {/* Special Requests */}
          <div className="form-section">
            <label className="section-label">Please list any special requests or needs for a work schedule?</label>
            <div className="form-field full-width">
              <input 
                type="text" 
                name="specialRequests" 
                value={formData.specialRequests} 
                onChange={handleInputChange} 
              />
            </div>
          </div>

          {/* Submit Buttons */}
          <div className="form-actions">
            <button type="button" className="btn-previous" onClick={onPrevious}>Previous</button>
            <button type="button" className="btn-save" onClick={handleSave}>Save</button>
            <button type="submit" className="btn-next">Save and Next</button>
          </div>
        </form>
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

export default Step3;
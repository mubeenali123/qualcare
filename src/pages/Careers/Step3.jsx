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
          <div className="step" onClick={() => goToStep(8)}>
            <div className="step-number">7</div>
            <span className="step-label">Certifications Upload</span>
          </div>
  <div className="step" onClick={() => goToStep(7)}>
    <div className="step-number">8</div>
    <span className="step-label">Review</span>
  </div>
</div>

        {/* Progress Bar */}
        <div className="progress-bar">
          <div className="progress-text">Step 3 of 8</div>
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
{["monday", "tuesday", "wednesday", "thursday", "friday", "saturday", "sunday"].map((day) => (
  <div key={day} className="mb-3">
    {/* Day label */}
    <h4 className="day-label">{day.charAt(0).toUpperCase() + day.slice(1)}</h4>

    {/* Checkbox + conditional time inputs */}
    <div className="availability-day d-flex align-items-center justify-content-start gap-3">
      {/* Checkbox with label */}
      <label className="checkbox-label d-flex align-items-center gap-1 mb-0">
        <input
          type="checkbox"
          name={`${day}Available`}
          checked={formData[`${day}Available`]}
          onChange={handleInputChange}
        />
        <span>Available</span>
      </label>

      {/* Conditional start/end time inputs, inline to the right */}
      {formData[`${day}Available`] && (
        <div className="time-inputs d-flex align-items-center gap-1">
          <input
            type="time"
            name={`${day}StartTime`}
            value={formData[`${day}StartTime`] || ""}
            onChange={handleInputChange}
            className="form-control form-control-sm"
            style={{ width: "100px" }}
          />
          <span>/</span>
          <input
            type="time"
            name={`${day}EndTime`}
            value={formData[`${day}EndTime`] || ""}
            onChange={handleInputChange}
            className="form-control form-control-sm"
            style={{ width: "100px" }}
          />
        </div>
      )}
    </div>
  </div>
))}

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
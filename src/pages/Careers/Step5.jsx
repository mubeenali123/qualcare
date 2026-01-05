import React, { useState } from 'react';
import './ApplicationForm.css';

const Step5 = ({ onNext, onPrevious, onBack, goToStep }) => {
  const [formData, setFormData] = useState({
    // First Employer
    emp1FirstName: '',
    emp1MiddleName: '',
    emp1LastName: '',
    emp1JobTitle: '',
    emp1Duties: '',
    emp1Address: '',
    emp1City: '',
    emp1State: '',
    emp1Zip: '',
    emp1StartDate: '',
    emp1EndDate: '',
    emp1SupervisorFirst: '',
    emp1SupervisorMiddle: '',
    emp1SupervisorLast: '',
    emp1StartingPay: '',
    emp1EndingPay: '',
    emp1Phone: '',
    emp1Leaving: '',
    // Second Employer
    emp2FirstName: '',
    emp2MiddleName: '',
    emp2LastName: '',
    emp2JobTitle: '',
    emp2Duties: '',
    emp2Address: '',
    emp2City: '',
    emp2State: '',
    emp2Zip: '',
    emp2StartDate: '',
    emp2EndDate: '',
    emp2SupervisorFirst: '',
    emp2SupervisorMiddle: '',
    emp2SupervisorLast: '',
    emp2StartingPay: '',
    emp2EndingPay: '',
    emp2Phone: '',
    emp2Leaving: '',
    // Third Employer
    emp3FirstName: '',
    emp3MiddleName: '',
    emp3LastName: '',
    emp3JobTitle: '',
    emp3Duties: '',
    emp3Address: '',
    emp3City: '',
    emp3State: '',
    emp3Zip: '',
    emp3StartDate: '',
    emp3EndDate: '',
    emp3SupervisorFirst: '',
    emp3SupervisorMiddle: '',
    emp3SupervisorLast: '',
    emp3StartingPay: '',
    emp3EndingPay: '',
    emp3Phone: '',
    emp3Leaving: ''
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Step 5 Data:', formData);
    onNext();
  };

  const handleSave = () => {
    console.log('Step 5 Saved:', formData);
    alert('Progress saved!');
  };

  // Employer Form Component
  const EmployerForm = ({ prefix, title }) => (
    <div className="employer-section">
      <h2 className="employer-title">{title}</h2>
      
      <div className="form-section">
        <label className="section-label">Name of Employer</label>
        <div className="name-grid">
          <div className="form-field">
            <input type="text" name={`${prefix}FirstName`} value={formData[`${prefix}FirstName`]} onChange={handleInputChange} />
            <span className="field-label">First</span>
          </div>
          <div className="form-field">
            <input type="text" name={`${prefix}MiddleName`} value={formData[`${prefix}MiddleName`]} onChange={handleInputChange} />
            <span className="field-label">Middle</span>
          </div>
          <div className="form-field">
            <input type="text" name={`${prefix}LastName`} value={formData[`${prefix}LastName`]} onChange={handleInputChange} />
            <span className="field-label">Last</span>
          </div>
        </div>
      </div>

      <div className="form-section">
        <label className="section-label">Job Title</label>
        <div className="form-field full-width">
          <input type="text" name={`${prefix}JobTitle`} value={formData[`${prefix}JobTitle`]} onChange={handleInputChange} />
        </div>
      </div>

      <div className="form-section">
        <label className="section-label">Duties</label>
        <div className="form-field full-width">
          <input type="text" name={`${prefix}Duties`} value={formData[`${prefix}Duties`]} onChange={handleInputChange} />
        </div>
      </div>

      <div className="form-section">
        <label className="section-label">Address</label>
        <div className="form-field full-width">
          <input type="text" name={`${prefix}Address`} value={formData[`${prefix}Address`]} onChange={handleInputChange} />
          <span className="field-label">Street Address</span>
        </div>
        <div className="address-grid" style={{marginTop: '15px'}}>
          <div className="form-field">
            <input type="text" name={`${prefix}City`} value={formData[`${prefix}City`]} onChange={handleInputChange} />
            <span className="field-label">City</span>
          </div>
          <div className="form-field">
            <input type="text" name={`${prefix}State`} value={formData[`${prefix}State`]} onChange={handleInputChange} />
            <span className="field-label">State / Province / Region</span>
          </div>
        </div>
        <div className="form-field half-width" style={{marginTop: '15px'}}>
          <input type="text" name={`${prefix}Zip`} value={formData[`${prefix}Zip`]} onChange={handleInputChange} />
          <span className="field-label">ZIP / Postal Code</span>
        </div>
      </div>

      <div className="form-row">
        <div className="form-field">
          <label className="section-label">Dates of Employment</label>
          <span className="field-sublabel">From</span>
          <input type="date" name={`${prefix}StartDate`} value={formData[`${prefix}StartDate`]} onChange={handleInputChange} />
        </div>
        <div className="form-field">
          <label className="section-label">Dates of Employment</label>
          <span className="field-sublabel">To</span>
          <input type="date" name={`${prefix}EndDate`} value={formData[`${prefix}EndDate`]} onChange={handleInputChange} />
        </div>
      </div>

      <div className="form-section">
        <label className="section-label">Supervisor's Name</label>
        <div className="name-grid">
          <div className="form-field">
            <input type="text" name={`${prefix}SupervisorFirst`} value={formData[`${prefix}SupervisorFirst`]} onChange={handleInputChange} />
            <span className="field-label">First</span>
          </div>
          <div className="form-field">
            <input type="text" name={`${prefix}SupervisorMiddle`} value={formData[`${prefix}SupervisorMiddle`]} onChange={handleInputChange} />
            <span className="field-label">Middle</span>
          </div>
          <div className="form-field">
            <input type="text" name={`${prefix}SupervisorLast`} value={formData[`${prefix}SupervisorLast`]} onChange={handleInputChange} />
            <span className="field-label">Last</span>
          </div>
        </div>
      </div>

      <div className="form-section">
        <label className="section-label">Hourly pay or salary</label>
        <div className="form-field full-width">
          <select name={`${prefix}StartingPay`} value={formData[`${prefix}StartingPay`]} onChange={handleInputChange}>
            <option value="">Starting Pay</option>
            <option value="10-15">$10 - $15/hr</option>
            <option value="15-20">$15 - $20/hr</option>
            <option value="20-25">$20 - $25/hr</option>
            <option value="25-30">$25 - $30/hr</option>
            <option value="30+">$30+/hr</option>
          </select>
        </div>
      </div>

      <div className="form-section">
        <label className="section-label">Hourly pay or salary</label>
        <div className="form-field full-width">
          <select name={`${prefix}EndingPay`} value={formData[`${prefix}EndingPay`]} onChange={handleInputChange}>
            <option value="">Ending Pay</option>
            <option value="10-15">$10 - $15/hr</option>
            <option value="15-20">$15 - $20/hr</option>
            <option value="20-25">$20 - $25/hr</option>
            <option value="25-30">$25 - $30/hr</option>
            <option value="30+">$30+/hr</option>
          </select>
        </div>
      </div>

      <div className="form-section">
        <label className="section-label">Telephone Number</label>
        <div className="form-field full-width">
          <input type="tel" name={`${prefix}Phone`} value={formData[`${prefix}Phone`]} onChange={handleInputChange} />
        </div>
      </div>

      <div className="form-section">
        <label className="section-label">Reason for leaving</label>
        <div className="form-field full-width">
          <input type="text" name={`${prefix}Leaving`} value={formData[`${prefix}Leaving`]} onChange={handleInputChange} />
        </div>
      </div>
    </div>
  );

  return (
    <div className="application-page">
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

      <div className="form-container">
        <div className="progress-steps">
  <div className="step completed" onClick={() => goToStep(1)}>
    <div className="step-number">✓</div>
    <span className="step-label">Pre-Employment</span>
  </div>
  <div className="step completed" onClick={() => goToStep(2)}>
    <div className="step-number">✓</div>
    <span className="step-label">Education</span>
  </div>
  <div className="step completed" onClick={() => goToStep(3)}>
    <div className="step-number">✓</div>
    <span className="step-label">Experience</span>
  </div>
  <div className="step completed" onClick={() => goToStep(4)}>
    <div className="step-number">✓</div>
    <span className="step-label">References</span>
  </div>
  <div className="step active" onClick={() => goToStep(5)}>
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

        <div className="progress-bar">
          <div className="progress-text">Step 5 of 7</div>
          <div className="progress-track">
            <div className="progress-fill" style={{ width: '71.42%' }}></div>
          </div>
        </div>

        <p className="required-note"><span className="required">*</span> indicates required fields</p>

        <h1 className="form-title">EMPLOYMENT HISTORY</h1>
        <p className="form-description">List the names of employers with present or last employer listed first. Please note that we may not contact your present employer until after you have been offered an assignment. Application must account for periods of more than one month break in employment.</p>

        <form onSubmit={handleSubmit}>
          <EmployerForm prefix="emp1" title="First Employer" />
          <EmployerForm prefix="emp2" title="Second Employer" />
          <EmployerForm prefix="emp3" title="Third Employer" />

          <div className="form-actions">
            <button type="button" className="btn-previous" onClick={onPrevious}>Previous</button>
            <button type="button" className="btn-save" onClick={handleSave}>Save</button>
            <button type="submit" className="btn-next">Save and Next</button>
          </div>
        </form>
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

export default Step5;
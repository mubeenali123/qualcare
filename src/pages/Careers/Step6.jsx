import React, { useState } from 'react';
import './ApplicationForm.css';

const Step6 = ({ onNext, onPrevious, onBack, goToStep }) => {
  const [formData, setFormData] = useState({
    resume: null,
    physicalExam: null,
    tbTest: null,
    cprCard: null,
    driversLicense: null,
    socialSecurity: null,
    professionalLicense: null,
    liabilityInsurance: null,
    autoInsurance: null,
    autoRegistration: null,
    voidedCheck: null,
    certifications: null,
    ceus: null
  });

  const handleFileChange = (e) => {
    const { name, files } = e.target;
    setFormData({
      ...formData,
      [name]: files[0]
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Step 6 Data:', formData);
    onNext();
  };

  const handleSave = () => {
    console.log('Step 6 Saved:', formData);
    alert('Progress saved!');
  };

  // File Upload Component
  const FileUpload = ({ label, name, required }) => (
    <div className="file-upload-section">
      <label className="section-label">
        {label} {required && <span className="required">*</span>}
      </label>
      <div className="file-upload-field">
        <input 
          type="file" 
          name={name} 
          onChange={handleFileChange}
          accept=".pdf,.doc,.docx,.jpg,.jpeg,.png"
        />
      </div>
      <span className="file-note">Max. file size: 32 MB.</span>
    </div>
  );

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
  <div className="step completed" onClick={() => goToStep(3)}>
    <div className="step-number">✓</div>
    <span className="step-label">Experience</span>
  </div>
  <div className="step completed" onClick={() => goToStep(4)}>
    <div className="step-number">✓</div>
    <span className="step-label">References</span>
  </div>
  <div className="step completed" onClick={() => goToStep(5)}>
    <div className="step-number">✓</div>
    <span className="step-label">Skills</span>
  </div>
  <div className="step active" onClick={() => goToStep(6)}>
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
          <div className="progress-text">Step 6 of 7</div>
          <div className="progress-track">
            <div className="progress-fill" style={{ width: '85.71%' }}></div>
          </div>
        </div>

        <p className="required-note"><span className="required">*</span> indicates required fields</p>

        <h1 className="form-title">DOCUMENT UPLOADS</h1>

        <form onSubmit={handleSubmit}>
          
          <FileUpload 
            label="Resume" 
            name="resume" 
            required={true} 
          />

          <FileUpload 
            label="Physical Examination (within the past 6 months)" 
            name="physicalExam" 
            required={false} 
          />

          <FileUpload 
            label="Negative PPD or Chest X-Ray result (within the past 12 months)" 
            name="tbTest" 
            required={false} 
          />

          <FileUpload 
            label="CPR or ALS/BLS card" 
            name="cprCard" 
            required={false} 
          />

          <FileUpload 
            label="Driver's License" 
            name="driversLicense" 
            required={false} 
          />

          <FileUpload 
            label="Social Security Card" 
            name="socialSecurity" 
            required={false} 
          />

          <FileUpload 
            label="Professional License (RN, LPN, CNA)" 
            name="professionalLicense" 
            required={false} 
          />

          <FileUpload 
            label="Liability Insurance (if applicable)" 
            name="liabilityInsurance" 
            required={false} 
          />

          <FileUpload 
            label="Automobile Insurance (if applicable)" 
            name="autoInsurance" 
            required={false} 
          />

          <FileUpload 
            label="Automobile Registration (if applicable)" 
            name="autoRegistration" 
            required={false} 
          />

          <FileUpload 
            label="Voided check" 
            name="voidedCheck" 
            required={false} 
          />

          <FileUpload 
            label="Certifications (e.g. Med. Tech, IV certification)" 
            name="certifications" 
            required={false} 
          />

          <FileUpload 
            label="CEU's (HIV/AIDS, Domestic Violence, Alzheimer's)" 
            name="ceus" 
            required={false} 
          />

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

export default Step6;
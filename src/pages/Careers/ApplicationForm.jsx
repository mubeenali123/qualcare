import { useState } from 'react';
import './ApplicationForm.css';
import { useDispatch } from "react-redux";
import * as types from '../../redux/type';
const ApplicationForm = ({ onBack, onNext, goToStep }) => {
    const dispatch = useDispatch();

  const [formData, setFormData] = useState({
    firstName: '',
    middleName: '',
    lastName: '',
    streetAddress: '',
    city: '',
    state: '',
    zipCode: '',
    ssn: '',
    phone: '',
    legalEligibility: '',
    email: '',
    positionDesired: '',
    wageDesired: '',
    dateOfBirth: '',
    felonyConviction: '',
    startDate: '',
    isOver18: ''
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

const handleNext = (e) => {
  e.preventDefault();

  dispatch({
    type: types.SAVE_PRE_EMPLOYMENT,
    payload: formData
  });

  dispatch({
    type: types.SUBMIT_APPLICATION_REQUEST,
    payload: {
      step: "pre_employment",
      data: formData
    }
  });

  onNext();
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
      {/* Form Content */}
      <div className="form-container">

        {/* Progress Steps */}
        <div className="progress-steps">
          <div className="step active" onClick={() => goToStep(1)}>
            <div className="step-number">1</div>
            <span className="step-label">Pre-Employment</span>
          </div>
          <div className="step" onClick={() => goToStep(2)}>
            <div className="step-number">2</div>
            <span className="step-label">Education</span>
          </div>
          <div className="step" onClick={() => goToStep(3)}>
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
            <span className="step-label">Certification Upload</span>
          </div>
          <div className="step" onClick={() => goToStep(7)}>
            <div className="step-number">8</div>
            <span className="step-label">Review</span>
          </div>
        </div>

        {/* Progress Bar */}
        <div className="progress-bar">
          <div className="progress-text">Step 1 of 8</div>
          <div className="progress-track">
            <div className="progress-fill" style={{ width: '14.28%' }}></div>
          </div>
        </div>

        <p className="required-note"><span className="required">*</span> indicates required fields</p>

        <h1 className="form-title">PRE-EMPLOYMENT REQUIREMENTS</h1>

        <form onSubmit={handleNext}>
          {/* Name Fields */}
          <div className="form-section">
            <label className="section-label">Name <span className="required">*</span></label>
            <div className="name-grid">
              <div className="form-field">
                <input
                  type="text"
                  name="firstName"
                  value={formData.firstName}
                  onChange={handleInputChange}
                  required
                />
                <span className="field-label">First</span>
              </div>
              <div className="form-field">
                <input
                  type="text"
                  name="middleName"
                  value={formData.middleName}
                  onChange={handleInputChange}
                />
                <span className="field-label">Middle</span>
              </div>
              <div className="form-field">
                <input
                  type="text"
                  name="lastName"
                  value={formData.lastName}
                  onChange={handleInputChange}
                  required
                />
                <span className="field-label">Last</span>
              </div>
            </div>
          </div>

          {/* Address Fields */}
          <div className="form-section">
            <label className="section-label">Address <span className="required">*</span></label>
            <div className="form-field full-width">
              <input
                type="text"
                name="streetAddress"
                value={formData.streetAddress}
                onChange={handleInputChange}
                required
              />
              <span className="field-label">Street Address</span>
            </div>
            <div className="address-grid">
              <div className="form-field">
                <input
                  type="text"
                  name="city"
                  value={formData.city}
                  onChange={handleInputChange}
                  required
                />
                <span className="field-label">City</span>
              </div>
              <div className="form-field">
                <input
                  type="text"
                  name="state"
                  value={formData.state}
                  onChange={handleInputChange}
                  required
                />
                <span className="field-label">State / Province / Region</span>
              </div>
            </div>
            <div className="form-field half-width">
              <input
                type="text"
                name="zipCode"
                value={formData.zipCode}
                onChange={handleInputChange}
                required
              />
              <span className="field-label">ZIP / Postal Code</span>
            </div>
          </div>

          {/* SSN and Phone */}
          <div className="form-row">
            <div className="form-field">
              <label className="section-label">Social Security Number <span className="required">*</span></label>
              <input
                type="text"
                name="ssn"
                value={formData.ssn}
                onChange={handleInputChange}
                required
              />
            </div>
            <div className="form-field">
              <label className="section-label">Phone Number <span className="required">*</span></label>
              <input
                type="tel"
                name="phone"
                value={formData.phone}
                onChange={handleInputChange}
                required
              />
            </div>
          </div>

          {/* Legal Eligibility */}
          <div className="form-section">
            <label className="section-label">
              If hired can you provide evidence of legal eligibility to work in the United States? <span className="required">*</span>
            </label>
            <div className="radio-group">
              <label className="radio-label">
                <input
                  type="radio"
                  name="legalEligibility"
                  value="yes"
                  checked={formData.legalEligibility === 'yes'}
                  onChange={handleInputChange}
                  required
                />
                <span>Yes</span>
              </label>
              <label className="radio-label">
                <input
                  type="radio"
                  name="legalEligibility"
                  value="no"
                  checked={formData.legalEligibility === 'no'}
                  onChange={handleInputChange}
                />
                <span>No</span>
              </label>
            </div>
          </div>

          {/* Email and Position */}
          <div className="form-row">
            <div className="form-field">
              <label className="section-label">Email <span className="required">*</span></label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                required
              />
            </div>
            <div className="form-field">
              <label className="section-label">Position Desired <span className="required">*</span></label>
              <input
                type="text"
                name="positionDesired"
                value={formData.positionDesired}
                onChange={handleInputChange}
                required
              />
            </div>
          </div>

          {/* Wage and DOB */}
          <div className="form-row">
            <div className="form-field">
              <label className="section-label">Wage/Salary Desired <span className="required">*</span></label>
              <input
                type="text"
                name="wageDesired"
                value={formData.wageDesired}
                onChange={handleInputChange}
                required
              />
            </div>
            <div className="form-field">
              <label className="section-label">Date of Birth <span className="required">*</span></label>
              <input
                type="date"
                name="dateOfBirth"
                value={formData.dateOfBirth}
                onChange={handleInputChange}
                required
              />
            </div>
          </div>

          {/* Felony Question */}
          <div className="form-section">
            <label className="section-label felony-label">
              Have you EVER been convicted of a felony, or a misdemeanor involving any violent act, use or possession of a weapon, or theft, forgery, act of dishonesty for which the record has not been sealed or expunged, or do you have such a case pending? <span className="required">*</span>
            </label>
            <div className="radio-group">
              <label className="radio-label">
                <input
                  type="radio"
                  name="felonyConviction"
                  value="yes"
                  checked={formData.felonyConviction === 'yes'}
                  onChange={handleInputChange}
                  required
                />
                <span>Yes</span>
              </label>
              <label className="radio-label">
                <input
                  type="radio"
                  name="felonyConviction"
                  value="no"
                  checked={formData.felonyConviction === 'no'}
                  onChange={handleInputChange}
                />
                <span>No</span>
              </label>
            </div>
          </div>

          {/* Start Date */}
          <div className="form-section">
            <label className="section-label">Date you can begin work? <span className="required">*</span></label>
            <div className="form-field half-width">
              <input
                type="date"
                name="startDate"
                value={formData.startDate}
                onChange={handleInputChange}
                required
              />
            </div>
          </div>

          {/* Age Verification */}
          <div className="form-section">
            <label className="section-label">Are you 18 years or older? <span className="required">*</span></label>
            <div className="radio-group">
              <label className="radio-label">
                <input
                  type="radio"
                  name="isOver18"
                  value="yes"
                  checked={formData.isOver18 === 'yes'}
                  onChange={handleInputChange}
                  required
                />
                <span>Yes</span>
              </label>
              <label className="radio-label">
                <input
                  type="radio"
                  name="isOver18"
                  value="no"
                  checked={formData.isOver18 === 'no'}
                  onChange={handleInputChange}
                />
                <span>No</span>
              </label>
            </div>
            <p className="form-note">If under 18 years of age, you will be required to submit a birth certificate and signed parental consent form as required by the Department of Labor.</p>
          </div>

          {/* Submit Buttons */}
          <div className="form-actions">
            <button type="button" className="btn-save">Save</button>
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

export default ApplicationForm;
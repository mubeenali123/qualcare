import { useState } from 'react';
import './ApplicationForm.css';
import { useDispatch, useSelector } from 'react-redux';
import * as types from '../../redux/type';
import { useEffect } from 'react';

const Step2 = ({ onNext, onPrevious, onBack, goToStep }) => {
  const dispatch = useDispatch();
  const referenceId = localStorage.getItem('applicationReferenceId');
  const { loading, error, education: savedData } = useSelector(state => state.applicationReducer);
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    highSchoolName: '',
    highSchoolCity: '',
    highSchoolState: '',
    highSchoolGraduate: '',
    collegeName: '',
    collegeCity: '',
    collegeState: '',
    collegeGraduate: '',
    degree: '',
    major: '',
    certificate: '',
    currentlyEnrolled: '',
    skills: ''
  });
  useEffect(() => {
    if (referenceId) {
      dispatch({
        type: types.FETCH_EDUCATION_DATA_REQUEST,
        payload: referenceId
      });
    }
  }, [dispatch, referenceId]);

  // Update form when saved data is loaded
  useEffect(() => {
    if (savedData && Object.keys(savedData).length > 0) {
      setFormData(prev => ({
        ...prev,
        ...savedData
      }));
    }
  }, [savedData]);
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

const handleSubmit = (e) => {
  e.preventDefault();

  dispatch({
    type: types.SAVE_EDUCATION,
    payload: formData
  });

  dispatch({
    type: types.SUBMIT_APPLICATION_REQUEST,
    payload: {
      referenceId,
      step: "education",
      data: formData
    }
  });

  // onNext();
  setSubmitted(true);
};

useEffect(() => {
    if (submitted && !loading && !error) {
      onNext();
    }
  }, [loading, error, submitted]);
  const handleSave = () => {
    console.log('Step 2 Saved:', formData);
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
  <div className="step active" onClick={() => goToStep(2)}>
    <div className="step-number">2</div>
    <span className="step-label">Education</span>
  </div>
  <div className="step" onClick={() => goToStep(3)}>
    <div className="step-number">3</div>
    <span className="step-label">Availability</span>
  </div>
  <div className="step" onClick={() => goToStep(4)}>
    <div className="step-number">4</div>
    <span className="step-label">References</span>
  </div>
  <div className="step" onClick={() => goToStep(5)}>
    <div className="step-number">5</div>
    <span className="step-label">Employment History</span>
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
          <div className="progress-text">Step 2 of 8</div>
          <div className="progress-track">
            <div className="progress-fill" style={{ width: '28.5%' }}></div>
          </div>
        </div>

        <p className="required-note"><span className="required">*</span> indicates required fields</p>

        <h1 className="form-title">EDUCATION</h1>

        <form onSubmit={handleSubmit}>
          
          {/* High School Section */}
          <div className="form-section">
            <label className="section-label">Name of high school attended <span className="required">*</span></label>
            <div className="form-field full-width">
              <input 
                type="text" 
                name="highSchoolName" 
                value={formData.highSchoolName} 
                onChange={handleInputChange} 
                required 
              />
            </div>
          </div>

          <div className="form-section">
            <label className="section-label">City and State <span className="required">*</span></label>
            <div className="address-grid-2">
              <div className="form-field">
                <input 
                  type="text" 
                  name="highSchoolCity" 
                  value={formData.highSchoolCity} 
                  onChange={handleInputChange} 
                  required 
                />
                <span className="field-label">City</span>
              </div>
              <div className="form-field">
                <input 
                  type="text" 
                  name="highSchoolState" 
                  value={formData.highSchoolState} 
                  onChange={handleInputChange} 
                  required 
                />
                <span className="field-label">State / Province / Region</span>
              </div>
            </div>
          </div>

          <div className="form-section">
            <label className="section-label">Did you Graduate?</label>
            <div className="radio-group">
              <label className="radio-label">
                <input 
                  type="radio" 
                  name="highSchoolGraduate" 
                  value="yes" 
                  checked={formData.highSchoolGraduate === 'yes'} 
                  onChange={handleInputChange} 
                />
                <span>Yes</span>
              </label>
              <label className="radio-label">
                <input 
                  type="radio" 
                  name="highSchoolGraduate" 
                  value="no" 
                  checked={formData.highSchoolGraduate === 'no'} 
                  onChange={handleInputChange} 
                />
                <span>No</span>
              </label>
            </div>
          </div>

          <hr className="section-divider" />

          {/* College Section */}
          <div className="form-section">
            <label className="section-label">Name of College or technical school</label>
            <div className="form-field full-width">
              <input 
                type="text" 
                name="collegeName" 
                value={formData.collegeName} 
                onChange={handleInputChange} 
              />
            </div>
          </div>

          <div className="form-section">
            <label className="section-label">City and State</label>
            <div className="address-grid-2">
              <div className="form-field">
                <input 
                  type="text" 
                  name="collegeCity" 
                  value={formData.collegeCity} 
                  onChange={handleInputChange} 
                />
                <span className="field-label">City</span>
              </div>
              <div className="form-field">
                <input 
                  type="text" 
                  name="collegeState" 
                  value={formData.collegeState} 
                  onChange={handleInputChange} 
                />
                <span className="field-label">State / Province / Region</span>
              </div>
            </div>
          </div>

          <div className="form-section">
            <label className="section-label">Did you Graduate?</label>
            <div className="radio-group">
              <label className="radio-label">
                <input 
                  type="radio" 
                  name="collegeGraduate" 
                  value="yes" 
                  checked={formData.collegeGraduate === 'yes'} 
                  onChange={handleInputChange} 
                />
                <span>Yes</span>
              </label>
              <label className="radio-label">
                <input 
                  type="radio" 
                  name="collegeGraduate" 
                  value="no" 
                  checked={formData.collegeGraduate === 'no'} 
                  onChange={handleInputChange} 
                />
                <span>No</span>
              </label>
            </div>
          </div>

          <div className="form-section">
            <div className="name-grid">
              <div className="form-field">
                <label className="section-label">Degree</label>
                <input 
                  type="text" 
                  name="degree" 
                  value={formData.degree} 
                  onChange={handleInputChange} 
                />
              </div>
              <div className="form-field">
                <label className="section-label">Major</label>
                <input 
                  type="text" 
                  name="major" 
                  value={formData.major} 
                  onChange={handleInputChange} 
                />
              </div>
              <div className="form-field">
                <label className="section-label">Certificate/Diploma</label>
                <input 
                  type="text" 
                  name="certificate" 
                  value={formData.certificate} 
                  onChange={handleInputChange} 
                />
              </div>
            </div>
          </div>

          <div className="form-section">
            <label className="section-label">Are you presently enrolled in School?</label>
            <div className="radio-group">
              <label className="radio-label">
                <input 
                  type="radio" 
                  name="currentlyEnrolled" 
                  value="yes" 
                  checked={formData.currentlyEnrolled === 'yes'} 
                  onChange={handleInputChange} 
                />
                <span>Yes</span>
              </label>
              <label className="radio-label">
                <input 
                  type="radio" 
                  name="currentlyEnrolled" 
                  value="no" 
                  checked={formData.currentlyEnrolled === 'no'} 
                  onChange={handleInputChange} 
                />
                <span>No</span>
              </label>
            </div>
          </div>

          <div className="form-section">
            <label className="section-label">List any job-related skills or accomplishments, including military service</label>
            <div className="form-field full-width">
              <textarea 
                name="skills" 
                value={formData.skills} 
                onChange={handleInputChange} 
                rows="5" 
                placeholder="Enter your skills and accomplishments..."
              ></textarea>
            </div>
          </div>

          {/* Submit Buttons */}
          <div className="form-actions">
            <button type="button" className="btn-previous" onClick={onPrevious}>Previous</button>
            <button type="button" className="btn-save" onClick={handleSave}>Save</button>
            <button type="submit" className="btn-next">{loading ? 'Saving...' : 'Save and Next'}</button>
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

export default Step2;
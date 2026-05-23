import  { useState } from 'react';
import './ApplicationForm.css';
import { useDispatch, useSelector } from "react-redux";
import * as types from '../../redux/type';
import { useEffect } from 'react';

const Step4 = ({ onNext, onPrevious, onBack, goToStep }) => {
  const dispatch = useDispatch();
  const referenceId = localStorage.getItem('applicationReferenceId');
const { loading, error, references: savedData } = useSelector(state => state.applicationReducer);
  const [submitted, setSubmitted] = useState(false);

  const [formData, setFormData] = useState({
    // Employer 1
    employer1Name: '',
    employer1Last: '',
    employer1City: '',
    employer1Worked: '',
    employer1Phone: '',
    // Employer 2
    employer2Name: '',
    employer2Last: '',
    employer2City: '',
    employer2Worked: '',
    employer2Phone: '',
    // Employer 3
    employer3Name: '',
    employer3Last: '',
    employer3City: '',
    employer3Worked: '',
    employer3Phone: ''
  });
useEffect(() => {
  if (referenceId) {
    dispatch({
      type: types.FETCH_REFERENCES_DATA_REQUEST,
      payload: referenceId
    });
  }
}, [dispatch, referenceId]);

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

  if (!referenceId) {
    alert("Application session expired. Please restart.");
    return;
  }

  dispatch({
    type: types.SAVE_REFERENCES,
    payload: formData
  });

  dispatch({
    type: types.SUBMIT_APPLICATION_REQUEST,
    payload: {
      referenceId,
      step: "references",
      data: formData
    }
  });

  onNext();
  setSubmitted(true);
};

useEffect(() => {
    if (submitted && !loading && !error) {
      onNext();
    }
  }, [loading, error, submitted]);

const handleSave = () => {
  if (!referenceId) {
    alert("Application session expired. Please restart.");
    return;
  }

  dispatch({
    type: types.SAVE_REFERENCES,
    payload: formData
  });

  dispatch({
    type: types.SUBMIT_APPLICATION_REQUEST,
    payload: {
      referenceId,
      step: "references",
      data: formData
    }
  });

  alert("Progress saved!");
};



  return (
    <div className="application-page">
      {/* Header */}
      <header className="header">
        <div className="header-container">
          <div className="logo">
            <img src="/logo.png" alt="QualCare Logo" />
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
          <div className="step active" onClick={() => goToStep(4)}>
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
          <div className="progress-text">Step 4 of 8</div>
          <div className="progress-track">
            <div className="progress-fill" style={{ width: '57.14%' }}></div>
          </div>
        </div>

        <p className="required-note"><span className="required">*</span> indicates required fields</p>

        <h1 className="form-title">GIVE THREE REFERENCES WHO ARE NOT FORMER EMPLOYERS WHO WE MAY CONTACT</h1>

        <form onSubmit={handleSubmit}>

          {/* Employer Sections 1–3 */}
          {[1, 2].map(num => (
            <div className="employer-section" key={num}>
              <h2 className="employer-number">{num}</h2>

              <div className="form-section">
                <label className="section-label">Name</label>
                <div className="address-grid">
                  <div className="form-field">
                    <input
                      type="text"
                      name={`employer${num}Name`}
                      value={formData[`employer${num}Name`]}
                      onChange={handleInputChange}
                    />
                    <span className="field-label">First</span>
                  </div>
                  <div className="form-field">
                    <input
                      type="text"
                      name={`employer${num}Last`}
                      value={formData[`employer${num}Last`]}
                      onChange={handleInputChange}
                    />
                    <span className="field-label">Last</span>
                  </div>
                                  <div className="form-field">
                  <input
                    type="text"
                    name={`employer${num}City`}
                    value={formData[`employer${num}City`]}
                    onChange={handleInputChange}
                  />
                </div>
                </div>
              </div>


              <div className="form-section">
                <label className="section-label">How do you know them, and for how long?</label>
                <div className="form-field full-width">
                  <input
                    type="text"
                    name={`employer${num}Worked`}
                    value={formData[`employer${num}Worked`]}
                    onChange={handleInputChange}
                  />
                </div>
              </div>

<div className="form-section">
  <label className="section-label">Phone Number</label>
  <div className="form-field full-width">
    <input
      type="tel"
      name={`employer${num}Phone`}
      value={formData[`employer${num}Phone`]}
      onChange={handleInputChange}
      pattern="[0-9]{10}"
      maxLength={10}
      required
    />
  </div>
</div>
            </div>
          ))}

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

export default Step4;

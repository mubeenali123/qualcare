import React, { useState } from 'react';
import './ApplicationForm.css';
import './AvailabilitySection.css';
import ModernTimePicker from '../../components/ModernTimePicker';
import * as types from '../../redux/type';
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from 'react';

const Step3 = ({ onNext, onPrevious, onBack, goToStep }) => {
  const dispatch = useDispatch();
  const referenceId = localStorage.getItem('applicationReferenceId');
const { loading, error, availability: savedData } = useSelector(state => state.applicationReducer);
  const [submitted, setSubmitted] = useState(false);

const [formData, setFormData] = useState({
  mondayAvailable: false,
  mondayStartTime: '',
  mondayEndTime: '',

  tuesdayAvailable: false,
  tuesdayStartTime: '',
  tuesdayEndTime: '',

  wednesdayAvailable: false,
  wednesdayStartTime: '',
  wednesdayEndTime: '',

  thursdayAvailable: false,
  thursdayStartTime: '',
  thursdayEndTime: '',

  fridayAvailable: false,
  fridayStartTime: '',
  fridayEndTime: '',

  saturdayAvailable: false,
  saturdayStartTime: '',
  saturdayEndTime: '',

  sundayAvailable: false,
  sundayStartTime: '',
  sundayEndTime: '',

  totalHours: '',
  specialRequests: ''
});

useEffect(() => {
  if (referenceId) {
    dispatch({
      type: types.FETCH_AVAILABILITY_DATA_REQUEST,
      payload: referenceId
    });
  }
}, [dispatch, referenceId]);

// Update form when data loads
useEffect(() => {
  if (savedData && Object.keys(savedData).length > 0) {
    setFormData(prev => ({
      ...prev,
      ...savedData
    }));
  }
}, [savedData]);
const handleInputChange = (e) => {
  const { name, value, type, checked } = e.target;

  if (type === 'checkbox') {
    setFormData(prev => ({
      ...prev,
      [name]: checked,
      ...(checked === false && {
        [`${name.replace('Available', 'StartTime')}`]: '',
        [`${name.replace('Available', 'EndTime')}`]: ''
      })
    }));
  } else {
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  }
};


const handleSubmit = (e) => {
  e.preventDefault();

  dispatch({
    type: types.SAVE_AVAILABILITY,
    payload: formData
  });

  if (referenceId) {
    dispatch({
      type: types.SUBMIT_APPLICATION_REQUEST,
      payload: {
        referenceId,
        step: "availability",
        data: formData
      }
    });
  }

  onNext();
};

const handleSave = () => {
  dispatch({
    type: types.SAVE_AVAILABILITY,
    payload: formData
  });

  if (referenceId) {
    dispatch({
      type: types.SUBMIT_APPLICATION_REQUEST,
      payload: {
        referenceId,
        step: "availability",
        data: formData
      }
    });
  }

  alert("Progress saved!");
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
          <div className="progress-text">Step 3 of 8</div>
          <div className="progress-track">
            <div className="progress-fill" style={{ width: '42.85%' }}></div>
          </div>
        </div>

        <p className="required-note"><span className="required">*</span> indicates required fields</p>

        <h1 className="form-title">YOUR AVAILABILITY FOR WORK</h1>

        <form onSubmit={handleSubmit}>
          
          {/* Availability Days */}
          {/* Availability Days */}
          <div className="form-section availability-container">
            <div className="availability-grid-layout">
              {["monday", "tuesday", "wednesday", "thursday", "friday", "saturday", "sunday"].map((day) => {
                const isAvailable = Boolean(formData[`${day}Available`]);
                const dayName = day.charAt(0).toUpperCase() + day.slice(1);

                return (
                  <div
                    key={day}
                    className={`availability-day-card ${isAvailable ? 'is-expanded' : 'is-compact'}`}
                  >
                    <div className="availability-day-info">
                      <h4 className="availability-day-name">{dayName}</h4>
                      <label className="availability-checkbox-label">
                        <input
                          type="checkbox"
                          name={`${day}Available`}
                          checked={isAvailable}
                          onChange={handleInputChange}
                          className="availability-checkbox-input"
                        />
                        {isAvailable ? (
                          <span className="availability-status-checked">
                            <span className="availability-check-symbol">&#10004;</span> Available
                          </span>
                        ) : (
                          <span className="availability-status-unchecked">
                            <span className="availability-square-symbol"></span> Available
                          </span>
                        )}
                      </label>
                    </div>

                    {isAvailable && (
                      <div className="availability-time-controls">
                        <div className="availability-time-block">
                          <label className="availability-time-label">From</label>
                          <ModernTimePicker
                            name={`${day}StartTime`}
                            value={formData[`${day}StartTime`]}
                            onChange={handleInputChange}
                          />
                        </div>

                        <div className="availability-time-block">
                          <label className="availability-time-label">To</label>
                          <ModernTimePicker
                            name={`${day}EndTime`}
                            value={formData[`${day}EndTime`]}
                            onChange={handleInputChange}
                          />
                        </div>
                      </div>
                    )}
                  </div>
                );
              })}
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
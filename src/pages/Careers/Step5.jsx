import { useState } from 'react';
import './ApplicationForm.css';
import { useDispatch } from "react-redux";
import * as types from '../../redux/type';
import { useSelector } from 'react-redux';
import { useEffect } from 'react';

// 1. FIXED: EmployerForm is now outside. No more jumping/scrolling!
const EmployerForm = ({ prefix, title, formData, handleInputChange }) => (
  <div className="employer-section">
    <h2 className="employer-title">{title}</h2>

    {/* Employer Name */}
    <div className="form-section">
      <label className="section-label">Name of Employer</label>
        {['Name'].map(part => (
          <div className="form-field full-width" key={part}>
            <input
              type="text"
              name={`${prefix}${part}Name`}
              value={formData[`${prefix}${part}Name`] || ''}
              onChange={handleInputChange}
            />
            <span className="field-label">{part}</span>
          </div>
        ))}
    </div>

    {/* Job Title */}
    <div className="form-section">
      <label className="section-label">Job Title</label>
      <div className="form-field full-width">
        <input type="text" name={`${prefix}JobTitle`} value={formData[`${prefix}JobTitle`] || ''} onChange={handleInputChange} />
      </div>
    </div>
    <div className="form-section">
      <label className="section-label">Business/Organization Name</label>
      <div className="form-field full-width">
        <input type="text" name={`${prefix}BusinessName`} value={formData[`${prefix}BusinessName`] || ''} onChange={handleInputChange} />
      </div>
    </div>
    {/* Duties */}
    <div className="form-section">
      <label className="section-label">Duties</label>
      <div className="form-field full-width">
        <input type="text" name={`${prefix}Duties`} value={formData[`${prefix}Duties`] || ''} onChange={handleInputChange} />
      </div>
    </div>

    {/* Address */}
    <div className="form-section">
      <label className="section-label">Address</label>
      <div className="form-field full-width">
        <input type="text" name={`${prefix}Address`} value={formData[`${prefix}Address`] || ''} onChange={handleInputChange} />
        <span className="field-label">Street Address</span>
      </div>
      <div className="address-grid" style={{ marginTop: '15px' }}>
        <div className="form-field">
          <input type="text" name={`${prefix}City`} value={formData[`${prefix}City`] || ''} onChange={handleInputChange} />
          <span className="field-label">City</span>
        </div>
        <div className="form-field">
          <input type="text" name={`${prefix}State`} value={formData[`${prefix}State`] || ''} onChange={handleInputChange} />
          <span className="field-label">State / Province / Region</span>
        </div>
              <div className="form-field">
        <input type="text" name={`${prefix}Zip`} value={formData[`${prefix}Zip`] || ''} onChange={handleInputChange} />
        <span className="field-label">ZIP / Postal Code</span>
      </div>
      </div>

    </div>

    {/* Dates of Employment */}
    <div className="form-row">
      <div className="form-field">
        <label className="section-label">Dates of Employment</label>
        <span className="field-sublabel">From</span>
        <input
  type="date"
  name={`${prefix}StartDate`}
  value={formData[`${prefix}StartDate`] || ''}
  onChange={handleInputChange}
/>
      </div>
      <div className="form-field">
        <label className="section-label">Dates of Employment</label>
        <span className="field-sublabel">To</span>
        <input
  type="date"
  name={`${prefix}EndDate`}
  value={formData[`${prefix}EndDate`] || ''}
  onChange={handleInputChange}
/>
      </div>
    </div>

    {/* Supervisor */}
    <div className="form-section">
      <label className="section-label">Supervisor's Name</label>
      <div className="name-grid">
        {['First', 'Middle', 'Last'].map(part => (
          <div className="form-field" key={part}>
            <input
              type="text"
              name={`${prefix}Supervisor${part}`}
              value={formData[`${prefix}Supervisor${part}`] || ''}
              onChange={handleInputChange}
            />
            <span className="field-label">{part}</span>
          </div>
        ))}
      </div>
    </div>

    {/* Pay */}
    {['StartingPay', 'EndingPay'].map(payType => (
      <div className="form-section" key={payType}>
        <label className="section-label">Hourly pay or salary</label>
        <div className="form-field full-width">
          <select name={`${prefix}${payType}`} value={formData[`${prefix}${payType}`] || ''} onChange={handleInputChange}>
            <option value="">Select {payType}</option>
            <option value="10-15">$10 - $15/hr</option>
            <option value="15-20">$15 - $20/hr</option>
            <option value="20-25">$20 - $25/hr</option>
            <option value="25-30">$25 - $30/hr</option>
            <option value="30+">$30+/hr</option>
          </select>
        </div>
      </div>
    ))}

    {/* Phone */}
<div className="form-section">
  <label className="section-label">Telephone Number</label>
  <div className="form-field full-width">
    <input
      type="tel"
      name={`${prefix}Phone`}
      value={formData[`${prefix}Phone`] || ''}
      onChange={handleInputChange}
      pattern="[0-9]{10}"
      maxLength={10}
      title="Phone number must be exactly 10 digits"
    />
  </div>
</div>

    {/* Leaving Reason */}
    <div className="form-section">
      <label className="section-label">Reason for leaving</label>
      <div className="form-field full-width">
        <input type="text" name={`${prefix}Leaving`} value={formData[`${prefix}Leaving`] || ''} onChange={handleInputChange} />
      </div>
    </div>
  </div>
);

const Step5 = ({ onNext, onPrevious, onBack, goToStep }) => {
  const dispatch = useDispatch();
  const referenceId = localStorage.getItem('applicationReferenceId');
const { loading, error, experience: savedData } = useSelector(state => state.applicationReducer);

  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    emp1FirstName: '', emp1MiddleName: '', emp1LastName: '',
    emp1JobTitle: '', emp1Duties: '', emp1Address: '', emp1City: '',
    emp1State: '', emp1Zip: '', emp1StartDate: '', emp1EndDate: '',
    emp1SupervisorFirst: '', emp1SupervisorMiddle: '', emp1SupervisorLast: '',
    emp1StartingPay: '', emp1EndingPay: '', emp1Phone: '', emp1Leaving: '',
    emp2FirstName: '', emp2MiddleName: '', emp2LastName: '',
    emp2JobTitle: '', emp2Duties: '', emp2Address: '', emp2City: '',
    emp2State: '', emp2Zip: '', emp2StartDate: '', emp2EndDate: '',
    emp2SupervisorFirst: '', emp2SupervisorMiddle: '', emp2SupervisorLast: '',
    emp2StartingPay: '', emp2EndingPay: '', emp2Phone: '', emp2Leaving: '',
    emp3FirstName: '', emp3MiddleName: '', emp3LastName: '',
    emp3JobTitle: '', emp3Duties: '', emp3Address: '', emp3City: '',
    emp3State: '', emp3Zip: '', emp3StartDate: '', emp3EndDate: '',
    emp3SupervisorFirst: '', emp3SupervisorMiddle: '', emp3SupervisorLast: '',
    emp3StartingPay: '', emp3EndingPay: '', emp3Phone: '', emp3Leaving: ''
  });
useEffect(() => {
  if (referenceId) {
    dispatch({
      type: types.FETCH_EXPERIENCE_DATA_REQUEST,
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
  const { name, value, type } = e.target;

  if (type === "date") {
    const isValid = /^\d{4}-\d{2}-\d{2}$/.test(value);

    setFormData(prev => ({
      ...prev,
      [name]: isValid ? value : prev[name]
    }));

    return;
  }

  setFormData(prev => ({
    ...prev,
    [name]: value
  }));
};

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!referenceId) { alert("Application session expired."); return; }
    dispatch({ type: types.SAVE_EXPERIENCE, payload: formData });
    dispatch({ type: types.SUBMIT_APPLICATION_REQUEST, payload: { referenceId, step: "experience", data: formData } });
    onNext();
    setSubmitted(true);
  };

  const handleSave = () => {
    if (!referenceId) { alert("Application session expired."); return; }
    dispatch({ type: types.SAVE_EXPERIENCE, payload: formData });
    dispatch({ type: types.SUBMIT_APPLICATION_REQUEST, payload: { referenceId, step: "experience", data: formData } });
        setSubmitted(true);

  };
useEffect(() => {
    if (submitted && !loading && !error) {
      onNext();
    }
  }, [loading, error, submitted]);
  return (
    <div className="application-page">
      <header className="header">
        <div className="header-container">
          <div className="logo"><img src="/logo.png.png" alt="QualCare Logo" /></div>
          <button className="home-btn" onClick={onBack}>Home</button>
        </div>
      </header>

      <div className="form-container">
        <div className="progress-steps">
          {['Pre-Employment', 'Education', 'Availability', 'References', 'Employment History', 'Documents', 'Certifications Upload', 'Review'].map((label, idx) => {
            const stepNum = idx + 1;
            const isActive = stepNum === 5;
            const isCompleted = stepNum < 5;
            return (
              <div key={label} className={`step ${isActive ? 'active' : ''} ${isCompleted ? 'completed' : ''}`} onClick={() => goToStep(stepNum)}>
                <div className="step-number">{isCompleted ? '✓' : stepNum}</div>
                <span className="step-label">{label}</span>
              </div>
            );
          })}
        </div>

        <div className="progress-bar">
          <div className="progress-text">Step 5 of 8</div>
          <div className="progress-track"><div className="progress-fill" style={{ width: '71.42%' }}></div></div>
        </div>

        <h1 className="form-title">EMPLOYMENT HISTORY</h1>

        <form onSubmit={handleSubmit}>
          {/* 2. FIXED: Passing props to the external component */}
          <EmployerForm prefix="emp1" title="First Employer" formData={formData} handleInputChange={handleInputChange} />
          <EmployerForm prefix="emp2" title="Second Employer" formData={formData} handleInputChange={handleInputChange} />

          <div className="form-actions">
            <button type="button" className="btn-previous" onClick={onPrevious}>Previous</button>
            <button type="button" className="btn-save" onClick={handleSave}>Save</button>
            <button type="submit" className="btn-next">{loading ? 'Saving...' : 'Next Step'}</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Step5;
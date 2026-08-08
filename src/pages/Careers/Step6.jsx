import React, { useState } from 'react';
import './ApplicationForm.css';
import { useDispatch, useSelector } from "react-redux";
import * as types from '../../redux/type';
import { useEffect } from 'react';

const Step6 = ({ onNext, onPrevious, onBack, goToStep }) => {
const dispatch = useDispatch();
  const referenceId = localStorage.getItem('applicationReferenceId');
const { loading, error, documents: savedData } = useSelector(state => state.applicationReducer);
  const [submitted, setSubmitted] = useState(false);

  const [formData, setFormData] = useState({
    physicalExam: null,
    physicalExamExpiry: '',
    cprCard: null,
    cprExpiry: '',
    driversLicense: null,
    driversLicenseExpiry: '',
    professionalLicense: null,
    professionalLicenseExpiry: '',
    liabilityInsurance: null,
    liabilityInsuranceExpiry: '',
    autoInsurance: null,
    autoInsuranceExpiry: '',
    workAuthorization: null,
    workAuthorizationExpiry: '',
    backgroundScreening: null,
    backgroundScreeningExpiry: '',
    palmBeachBadge: null,
    palmBeachBadgeExpiry: '',

    hivCertificate: null,
    domesticViolence: null,
    alzheimersCertificate: null,
    alzheimersTraining: null,
    hipaa: null,
    osha: null,
    medicationCertificate: null,
    communicationTraining: null,
    patientRights: null,
    medicalRecords: null,
    medicalErrors: null,
    floridaLaws: null
  });
useEffect(() => {
  if (referenceId) {
    dispatch({
      type: types.FETCH_DOCUMENTS_DATA_REQUEST,
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
const handleFileChange = (e) => {
  const { name, files } = e.target;

  setFormData(prev => ({
    ...prev,
    [name]: files?.length ? files[0] : null
  }));
};

const handleExpiryChange = (e) => {
  const { name, value } = e.target;

  setFormData(prev => ({
    ...prev,
    [name]: value
  }));
};
useEffect(() => {
    if (submitted && !loading && !error) {
      onNext();
    }
  }, [loading, error, submitted]);
// In Step6.js - Updated FileUpload component
const FileUpload = React.memo(
  ({ label, name, expiryName, formData, onFileChange, onExpiryChange }) => {
    return (
      <div className="file-upload-section">
        <label className="section-label">{label}</label>

        <div className="file-upload-field">
          <input
            type="file"
            name={name}
            onChange={onFileChange}
            accept=".pdf,.doc,.docx,.jpg,.jpeg,.png,image/*"
            // Remove capture attribute and use multiple options
          />
        </div>

{formData[name] && (
  <div className="file-selected">
    <span>
      Selected: <strong>{formData[name]?.name || formData[name]}</strong>
          <button
      type="button"
      className="remove-file-btn"
      onClick={() => onFileChange({ target: { name, files: [] } })}
    >
      ×
    </button>
    </span>


  </div>
)}

        {expiryName && formData[name] && (
          <div className="form-field half-width">
            <label className="section-label">
              Expiration Date <span className="required">*</span>
            </label>
            <input
              type="date"
              name={expiryName}
              value={formData[expiryName]}
              onChange={onExpiryChange}
              required
            />
          </div>
        )}

        <span className="file-note">Max. file size: 32 MB.</span>
      </div>
    );
  }
);



const handleSubmit = (e) => {
  e.preventDefault();

  if (!referenceId) {
    alert("Application session expired. Please restart.");
    return;
  }

  dispatch({
    type: types.SAVE_DOCUMENTS,
    payload: formData
  });

  const submissionData = new FormData();

  submissionData.append("referenceId", referenceId);
  submissionData.append("step", "documents");

  Object.keys(formData).forEach(key => {
    if (formData[key] !== null && formData[key] !== "") {
      submissionData.append(key, formData[key]);
    }
  });

  dispatch({
    type: types.SUBMIT_APPLICATION_REQUEST,
    payload: submissionData
  });

   goToStep(8);
       setSubmitted(true);

};



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
    <span className="step-label">Availability</span>
  </div>
  <div className="step completed" onClick={() => goToStep(4)}>
    <div className="step-number">✓</div>
    <span className="step-label">References</span>
  </div>
  <div className="step completed" onClick={() => goToStep(5)}>
    <div className="step-number">5</div>
    <span className="step-label">Employment History</span>
  </div>
  <div className="step active" onClick={() => goToStep(6)}>
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

        <div className="progress-bar">
          <div className="progress-text">Step 6 of 7</div>
          <div className="progress-track">
            <div className="progress-fill" style={{ width: '71.42%' }}></div>
          </div>
        </div>
        <h1 className="form-title">DOCUMENT UPLOADS</h1>

<form onSubmit={handleSubmit}>
  <FileUpload
    label="Physical Examination (3–6 months)"
    name="physicalExam"
    expiryName="physicalExamExpiry"
    formData={formData}
    onFileChange={handleFileChange}
    onExpiryChange={handleExpiryChange}
    useCamera={true}
  />

  <FileUpload
    label="CPR Card"
    name="cprCard"
    expiryName="cprExpiry"
    formData={formData}
    onFileChange={handleFileChange}
    onExpiryChange={handleExpiryChange}
    useCamera={true}
  />

  <FileUpload
    label="Driver’s License"
    name="driversLicense"
    expiryName="driversLicenseExpiry"
    formData={formData}
    onFileChange={handleFileChange}
    onExpiryChange={handleExpiryChange}
    useCamera={true}
  />

  <FileUpload
    label="Professional License (RN/LPN/CNA)"
    name="professionalLicense"
    expiryName="professionalLicenseExpiry"
    formData={formData}
    onFileChange={handleFileChange}
    onExpiryChange={handleExpiryChange}
    useCamera={true}
  />

  <FileUpload
    label="Liability Insurance"
    name="liabilityInsurance"
    expiryName="liabilityInsuranceExpiry"
    formData={formData}
    onFileChange={handleFileChange}
    onExpiryChange={handleExpiryChange}
    useCamera={true}
  />

  <FileUpload
    label="Auto Insurance"
    name="autoInsurance"
    expiryName="autoInsuranceExpiry"
    formData={formData}
    onFileChange={handleFileChange}
    onExpiryChange={handleExpiryChange}
    useCamera={true}
  />

  <FileUpload
    label="Work Authorization"
    name="workAuthorization"
    expiryName="workAuthorizationExpiry"
    formData={formData}
    onFileChange={handleFileChange}
    onExpiryChange={handleExpiryChange}
    useCamera={true}
  />

  <FileUpload
    label="Level 2 Background Screening"
    name="backgroundScreening"
    expiryName="backgroundScreeningExpiry"
    formData={formData}
    onFileChange={handleFileChange}
    onExpiryChange={handleExpiryChange}
    useCamera={true}
  />

  <FileUpload
    label="Palm Beach County ID Badge (HHA Only)"
    name="palmBeachBadge"
    expiryName="palmBeachBadgeExpiry"
    formData={formData}
    onFileChange={handleFileChange}
    onExpiryChange={handleExpiryChange}
    useCamera={true}
  />

  {/* NO EXPIRY DOCS */}

  <FileUpload label="HIV/AIDS Certificate" name="hivCertificate" formData={formData} onFileChange={handleFileChange} useCamera={true}/>
  <FileUpload label="Domestic Violence Certificate" name="domesticViolence" formData={formData} onFileChange={handleFileChange} useCamera={true}/>
  <FileUpload label="Alzheimer/Dementia Certificate" name="alzheimersCertificate" formData={formData} onFileChange={handleFileChange} useCamera={true}/>
  <FileUpload label="1 Hour Alzheimer Training" name="alzheimersTraining" formData={formData} onFileChange={handleFileChange} useCamera={true}/>
  <FileUpload label="HIPAA Update" name="hipaa" formData={formData} onFileChange={handleFileChange} useCamera={true}/>
  <FileUpload label="OSHA Update" name="osha" formData={formData} onFileChange={handleFileChange} useCamera={true}/>
  <FileUpload label="Self Administered Medication Certificate" name="medicationCertificate" formData={formData} onFileChange={handleFileChange} useCamera={true}/>
  <FileUpload label="Communicating with Cognitively Impaired Patients" name="communicationTraining" formData={formData} onFileChange={handleFileChange} useCamera={true}/>
  <FileUpload label="Patient Rights" name="patientRights" formData={formData} onFileChange={handleFileChange} useCamera={true}/>
  <FileUpload label="Medical Records Documentation" name="medicalRecords" formData={formData} onFileChange={handleFileChange} useCamera={true}/>
  <FileUpload label="Medical Errors Update" name="medicalErrors" formData={formData} onFileChange={handleFileChange} useCamera={true}/>
  <FileUpload label="Florida Laws & Rules" name="floridaLaws" formData={formData} onFileChange={handleFileChange} useCamera={true}/>

  <div className="form-actions">
    <button type="button" className="btn-previous" onClick={onPrevious}>
      Previous
    </button>
    <button type="button" className="btn-save" onClick={handleSubmit}>Save</button>
            <button type="submit" className="btn-next">{loading ? 'Saving...' : 'Save and Next'}</button>

  </div>
</form>

      </div>
    </div>
  );
};

export default Step6;

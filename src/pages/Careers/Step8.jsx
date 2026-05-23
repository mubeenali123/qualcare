import React, { useState } from 'react';
import './ApplicationForm.css';
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from 'react';
import * as types from '../../redux/type';

const Step8 = ({ onNext, onPrevious, onBack, goToStep }) => {
  const dispatch = useDispatch();
  const referenceId = localStorage.getItem('applicationReferenceId');
  const savedData = useSelector(state => state.applicationReducer.certification);

  const [formData, setFormData] = useState({
    domesticViolence: null,
    domesticViolenceExpiry: '',
    alzheimersDementia: null,
    alzheimersDementiaExpiry: '',
    oneHourAlzheimers: null,
    oneHourAlzheimersExpiry: '',
    hivAids: null,
    hivAidsExpiry: '',
    hipaaUpdate: null,
    hipaaUpdateExpiry: '',
    oshaUpdate: null,
    oshaUpdateExpiry: '',
    selfAdministeredMedication: null,
    selfAdministeredMedicationExpiry: '',
    communicatingCognitivelyImpaired: null,
    communicatingCognitivelyImpairedExpiry: '',
    patientRights: null,
    patientRightsExpiry: '',
    medicalRecordsDocumentation: null,
    medicalRecordsDocumentationExpiry: '',
    medicalErrorsUpdate: null,
    medicalErrorsUpdateExpiry: '',
    floridaLawsRules: null,
    floridaLawsRulesExpiry: '',
    professionalLiabilityInsurance: null,
    professionalLiabilityInsuranceExpiry: ''
  });
  useEffect(() => {
    if (referenceId) {
      dispatch({
        type: types.FETCH_CERTIFICATION_DATA_REQUEST,
        payload: referenceId
      });
    }
  }, [dispatch, referenceId]);

  // Update form when saved data is loaded from Redux
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
      [name]: files[0]
    }));
  };

  const handleExpiryChange = (e) => {
    const { name, value } = e.target;

    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const FileUpload = React.memo(
    ({ label, name, expiryName, formData, onFileChange, onExpiryChange, useCamera }) => {
      return (
        <div className="file-upload-section">
          <label className="section-label">{label}</label>

          <div className="file-upload-field">
            <input
              type="file"
              name={name}
              onChange={onFileChange}
              accept=".pdf,.doc,.docx,.jpg,.jpeg,.png"
              {...(useCamera ? { capture: "environment" } : {})}
            />
          </div>

          {formData[name] && (
            <p className="file-selected">
              Selected: <strong>{formData[name].name}</strong>
            </p>
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

  const submissionData = new FormData();
  submissionData.append("referenceId", referenceId);
  submissionData.append("step", "certifications");

  Object.entries(formData).forEach(([key, value]) => {
    if (value) submissionData.append(key, value);
  });

  dispatch({
    type: "SUBMIT_APPLICATION_REQUEST",
    payload: submissionData
  });

   goToStep(7);
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
            <span className="step-label">Experience</span>
          </div>
          <div className="step completed" onClick={() => goToStep(4)}>
            <div className="step-number">✓</div>
            <span className="step-label">References</span>
          </div>
          <div className="step completed" onClick={() => goToStep(5)}>
            <div className="step-number">5</div>
            <span className="step-label">Skills</span>
          </div>
          <div className="step completed" onClick={() => goToStep(6)}>
            <div className="step-number">6</div>
            <span className="step-label">Documents</span>
          </div>
          <div className="step active" onClick={() => goToStep(8)}>
            <div className="step-number">7</div>
            <span className="step-label">Certifications Upload</span>
          </div>
          <div className="step" onClick={() => goToStep(7)}>
            <div className="step-number">8</div>
            <span className="step-label">Review</span>
          </div>
        </div>

        <div className="progress-bar">
          <div className="progress-text">Step 7 of 8</div>
          <div className="progress-track">
            <div className="progress-fill" style={{ width: '71.42%' }}></div>
          </div>
        </div>
        <h1 className="form-title">CERTIFICATION UPLOADS</h1>

        <form onSubmit={handleSubmit}>
          {/* All certifications WITH expiration dates */}
          
          <FileUpload
            label="Domestic Violence 2hr Certificate"
            name="domesticViolence"
            expiryName="domesticViolenceExpiry"
            formData={formData}
            onFileChange={handleFileChange}
            onExpiryChange={handleExpiryChange}
            useCamera={true}
          />

          <FileUpload
            label="Alzheimer's/Dementia 3hr Certificate"
            name="alzheimersDementia"
            expiryName="alzheimersDementiaExpiry"
            formData={formData}
            onFileChange={handleFileChange}
            onExpiryChange={handleExpiryChange}
            useCamera={true}
          />

          <FileUpload
            label="1 Hour Alzheimer's Training - Elder Affairs of Florida"
            name="oneHourAlzheimers"
            expiryName="oneHourAlzheimersExpiry"
            formData={formData}
            onFileChange={handleFileChange}
            onExpiryChange={handleExpiryChange}
            useCamera={true}
          />

          <FileUpload
            label="HIV/AIDS 4+r Certificate"
            name="hivAids"
            expiryName="hivAidsExpiry"
            formData={formData}
            onFileChange={handleFileChange}
            onExpiryChange={handleExpiryChange}
            useCamera={true}
          />

          <FileUpload
            label="HIPAA Update 4hr Certificate"
            name="hipaaUpdate"
            expiryName="hipaaUpdateExpiry"
            formData={formData}
            onFileChange={handleFileChange}
            onExpiryChange={handleExpiryChange}
            useCamera={true}
          />

          <FileUpload
            label="OSHA Update 4hr Certificate/2hr Certificate"
            name="oshaUpdate"
            expiryName="oshaUpdateExpiry"
            formData={formData}
            onFileChange={handleFileChange}
            onExpiryChange={handleExpiryChange}
            useCamera={true}
          />

          <FileUpload
            label="Self-Administered Medication 2hr Certificate"
            name="selfAdministeredMedication"
            expiryName="selfAdministeredMedicationExpiry"
            formData={formData}
            onFileChange={handleFileChange}
            onExpiryChange={handleExpiryChange}
            useCamera={true}
          />

          <FileUpload
            label="Communicating Cognitively Impaired Patients (CNAs)"
            name="communicatingCognitivelyImpaired"
            expiryName="communicatingCognitivelyImpairedExpiry"
            formData={formData}
            onFileChange={handleFileChange}
            onExpiryChange={handleExpiryChange}
            useCamera={true}
          />

          <FileUpload
            label="Patient Rights 2hrs (CNAs)"
            name="patientRights"
            expiryName="patientRightsExpiry"
            formData={formData}
            onFileChange={handleFileChange}
            onExpiryChange={handleExpiryChange}
            useCamera={true}
          />

          <FileUpload
            label="Medical Records Documentation 2hrs(CNAs)"
            name="medicalRecordsDocumentation"
            expiryName="medicalRecordsDocumentationExpiry"
            formData={formData}
            onFileChange={handleFileChange}
            onExpiryChange={handleExpiryChange}
            useCamera={true}
          />

          <FileUpload
            label="Medical Errors Update 2hrs(CNAs, LPN, RN)"
            name="medicalErrorsUpdate"
            expiryName="medicalErrorsUpdateExpiry"
            formData={formData}
            onFileChange={handleFileChange}
            onExpiryChange={handleExpiryChange}
            useCamera={true}
          />

          <FileUpload
            label="Florida laws and rules (LPN, RN, HHA and CNA)"
            name="floridaLawsRules"
            expiryName="floridaLawsRulesExpiry"
            formData={formData}
            onFileChange={handleFileChange}
            onExpiryChange={handleExpiryChange}
            useCamera={true}
          />

          <FileUpload
            label="Professional Liability Insurance (see office for online application)"
            name="professionalLiabilityInsurance"
            expiryName="professionalLiabilityInsuranceExpiry"
            formData={formData}
            onFileChange={handleFileChange}
            onExpiryChange={handleExpiryChange}
            useCamera={true}
          />

          <div className="form-actions">
            <button type="button" className="btn-previous" onClick={onPrevious}>
              Previous
            </button>
            <button type="submit" className="btn-next">
              Save and Next
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Step8;
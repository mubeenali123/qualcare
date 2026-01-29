import React, { useState } from 'react';
import './ApplicationForm.css';

const Step6 = ({ onNext, onPrevious, onBack, goToStep }) => {
  const [formData, setFormData] = useState({
    resume: null,
    physicalExam: null,
    physicalExamExpiry: '',
    tbTest: null,
    cprCard: null,
    cprExpiry: '',
    driversLicense: null,
    driversLicenseExpiry: '',
    socialSecurity: null,
    professionalLicense: null,
    professionalLicenseExpiry: '',
    liabilityInsurance: null,
    liabilityInsuranceExpiry: '',
    autoInsurance: null,
    autoInsuranceExpiry: '',
    autoRegistration: null,
    voidedCheck: null,

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
            {...(useCamera ? { capture: "environment" } : {})} // Enable camera capture if useCamera is true
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
    console.log('Step 6 Data:', formData);
    onNext();
  };

  return (
    <div className="application-page">
      <header className="header">
        <div className="header-container">
          <div className="logo">
            <img src="/logo.png.png" alt="QualCare Logo" />
          </div>
          <button className="home-btn" onClick={onBack}>Home</button>
        </div>
      </header>

      <div className="form-container">
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
    <button type="submit" className="btn-next">
      Save and Next
    </button>
  </div>
</form>

      </div>
    </div>
  );
};

export default Step6;

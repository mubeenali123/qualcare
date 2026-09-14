// components/Admin/FinalApplicationView3.jsx
import React, { useState } from 'react';
import { base_url } from "../components/config";

const FinalApplicationView3 = ({ data }) => {
  const [currentStep, setCurrentStep] = useState(1);

  const steps = [
    "License / Certification",
    "CPR Certification",
    "Driver's License",
    "Social Security Card",
    "Proof of U.S. Residency",
    "Auto Insurance",
    "Liability Insurance",
    "Signatures"
  ];

  const progressWidth = (currentStep / steps.length) * 100;

  // Helper to get step data
  const getStepData = (stepName) => {
    return data?.[stepName] || {};
  };

  // Helper to get file URL
  const getFileUrl = (stepData) => {
    console.log(stepData);
    console.log('getFileUrl called');
    if (stepData?.sharepoint_url) {
      return stepData.sharepoint_url;
    }
    if (stepData?.local_path) {
      return `${base_url}/storage/${stepData.local_path}`;
    }
    return null;
  };

  // Helper to get signature from step data
  const getSignature = (stepName) => {
    const stepData = data?.[stepName];
    if (stepData?.signature?.sharepoint_url) {
      return stepData.signature.sharepoint_url;
    }
    if (stepData?.signature?.local_path) {
      return `${base_url}/storage/${stepData.signature.local_path}`;
    }
    return null;
  };

const getFileDisplay = (stepName, label) => {
  const stepData = getStepData(stepName);
  const fileUrl = getFileUrl(stepData);

  console.log('Checking stepData and fileUrl as well.');
  console.log(stepData);
  console.log(fileUrl);

  if (fileUrl) {
    const fileName = stepData?.file_name || stepName;
    const isPdf = fileName?.toLowerCase().includes('.pdf');

    return (
      <div className="file-display">
        <a href={fileUrl} target="_blank" rel="noopener noreferrer" className="btn btn-link">
          <i className={`fas ${isPdf ? 'fa-file-pdf' : 'fa-file-image'}`}></i>
          View {label}
        </a>
      </div>
    );
  }

  return <p className="text-muted">No file uploaded</p>;
};

  const signatureData = getStepData('doc_guidelines_signature');
  const contractorSignature = getSignature('doc_guidelines_signature');
  const registrySignature = getSignature('doc_guidelines_signature');

  // Helper to get status for progress steps
  const getStepStatus = (stepNumber) => {
    const stepNameMap = {
      1: 'doc_license_certification',
      2: 'doc_cpr',
      3: 'doc_drivers_license',
      4: 'doc_ss_card',
      5: 'doc_proof_residency',
      6: 'doc_auto_insurance',
      7: 'doc_liability_insurance',
      8: 'doc_guidelines_signature',
    };
    const stepName = stepNameMap[stepNumber];
    if (stepName && data?.[stepName] && Object.keys(data[stepName]).length > 0) {
      return 'complete';
    }
    return stepNumber === 1 ? 'in_progress' : '';
  };

  return (
    <div className="application-page final-application">
      <div className="form-container">
        {/* Progress Steps */}
        <div className="progress-steps">
          {steps.map((label, index) => {
            const stepNumber = index + 1;
            const status = getStepStatus(stepNumber);
            return (
              <div
                key={stepNumber}
                className={`step ${stepNumber === currentStep ? 'active' : ''} ${status === 'complete' ? 'completed' : ''}`}
                onClick={() => setCurrentStep(stepNumber)}
                role="button"
              >
                <div className="step-number">
                  {status === 'complete' ? '✓' : stepNumber}
                </div>
                <span className="step-label">{label}</span>
              </div>
            );
          })}
        </div>

        {/* Step progress bar */}
        <div className="progress-bar">
          <div className="progress-text">Step {currentStep} of {steps.length}</div>
          <div className="progress-track">
            <div className="progress-fill" style={{ width: `${progressWidth}%` }}></div>
          </div>
        </div>

        {/* Step 1: License / Certification */}
        {currentStep === 1 && (
          <div className="form-section">
            <h1 className="form-title">Document Upload</h1>
            <div className="form-note">
              <p>Please upload a copy of your <b>LICENSE / CERTIFICATION</b>.</p>
            </div>
            <div className="row">
              <div className="form-field col-md-12">
                <label className="section-label">LICENSE / CERTIFICATION</label>
                {getFileDisplay('doc_license_certification', 'License / Certification')}
              </div>
            </div>
          </div>
        )}

        {/* Step 2: CPR Certification */}
        {currentStep === 2 && (
          <div className="form-section">
            <h1 className="form-title">Document Upload</h1>
            <div className="form-note">
              <p>Please upload a copy of your <b>CPR CERTIFICATION</b>.</p>
            </div>
            <div className="row">
              <div className="form-field col-md-12">
                <label className="section-label">CPR CERTIFICATION</label>
                {getFileDisplay('doc_cpr', 'CPR Certification')}
              </div>
            </div>
          </div>
        )}

        {/* Step 3: Driver's License */}
        {currentStep === 3 && (
          <div className="form-section">
            <h1 className="form-title">Document Upload</h1>
            <div className="form-note">
              <p>Please upload a copy of your <b>DRIVER'S LICENSE</b>.</p>
            </div>
            <div className="row">
              <div className="form-field col-md-12">
                <label className="section-label">DRIVER'S LICENSE</label>
                {getFileDisplay('doc_drivers_license', "Driver's License")}
              </div>
            </div>
          </div>
        )}

        {/* Step 4: Social Security Card */}
        {currentStep === 4 && (
          <div className="form-section">
            <h1 className="form-title">Document Upload</h1>
            <div className="form-note">
              <p>Please upload a copy of your <b>SOCIAL SECURITY CARD</b>.</p>
            </div>
            <div className="row">
              <div className="form-field col-md-12">
                <label className="section-label">SOCIAL SECURITY CARD</label>
                {getFileDisplay('doc_ss_card', 'Social Security Card')}
              </div>
            </div>
          </div>
        )}

        {/* Step 5: Proof of U.S. Residency */}
        {currentStep === 5 && (
          <div className="form-section">
            <h1 className="form-title">Document Upload</h1>
            <div className="form-note">
              <p>Please upload a copy of your <b>PROOF OF U.S. RESIDENCY</b>.</p>
            </div>
            <div className="row">
              <div className="form-field col-md-12">
                <label className="section-label">PROOF OF U.S. RESIDENCY</label>
                {getFileDisplay('doc_proof_residency', 'Proof of U.S. Residency')}
              </div>
            </div>
          </div>
        )}

        {/* Step 6: Auto Insurance */}
        {currentStep === 6 && (
          <div className="form-section">
            <h1 className="form-title">Document Upload</h1>
            <div className="form-note">
              <p>Please upload a copy of your <b>AUTO INSURANCE</b>.</p>
            </div>
            <div className="row">
              <div className="form-field col-md-12">
                <label className="section-label">AUTO INSURANCE</label>
                {getFileDisplay('doc_auto_insurance', 'Auto Insurance')}
              </div>
            </div>
          </div>
        )}

        {/* Step 7: Liability Insurance */}
        {currentStep === 7 && (
          <div className="form-section">
            <h1 className="form-title">Document Upload</h1>
            <div className="form-note">
              <p>Please upload a copy of your <b>PROFESSIONAL LIABILITY INSURANCE</b>.</p>
            </div>
            <div className="row">
              <div className="form-field col-md-12">
                <label className="section-label">PROFESSIONAL LIABILITY INSURANCE</label>
                {getFileDisplay('doc_liability_insurance', 'Professional Liability Insurance')}
              </div>
            </div>
          </div>
        )}

        {/* Step 8: Signatures */}
        {currentStep === 8 && (
          <>
            <div className="form-section">
              <h1 className="form-title">DOCUMENT GUIDELINES</h1>
              <p className="form-note">
                I hereby confirm that all uploaded documents are authentic, valid, and belong to me. 
                I understand that any falsified documents may result in immediate termination of this agreement.
              </p>
            </div>

            <div className="form-section">
              <h1 className="form-title">Independent Contractor:</h1>
              <div className="row">
                <div className="form-field col-md-6">
                  <label className="section-label">Printed Name:</label>
                  <input type="text" value={signatureData.printedName || ''} readOnly className="form-control" style={{ backgroundColor: '#f5f5f5' }} />
                </div>
                <div className="form-field col-md-6">
                  <label className="section-label">Title:</label>
                  <input type="text" value={signatureData.title || ''} readOnly className="form-control" style={{ backgroundColor: '#f5f5f5' }} />
                </div>
              </div>
              <div className="row">
                <div className="form-field col-md-6">
                  <label className="section-label">Signature:</label>
                  {contractorSignature ? (
                    <img src={contractorSignature} alt="Contractor Signature" style={{ maxWidth: '300px', border: '1px solid #ddd', padding: '10px' }} />
                  ) : (
                    <p className="text-muted">No signature provided</p>
                  )}
                </div>
                <div className="form-field col-md-6">
                  <label className="section-label">Date:</label>
                  <input type="date" value={signatureData.date || ''} readOnly className="form-control" style={{ backgroundColor: '#f5f5f5' }} />
                </div>
              </div>
            </div>

            <div className="form-section">
              <h1 className="form-title">Qualcare Nurse Registry Inc.:</h1>
              <div className="row">
                <div className="form-field col-md-6">
                  <label className="section-label">Printed Name:</label>
                  <input type="text" value={signatureData.registryPrintedName || ''} readOnly className="form-control" style={{ backgroundColor: '#f5f5f5' }} />
                </div>
                <div className="form-field col-md-6">
                  <label className="section-label">Title:</label>
                  <input type="text" value={signatureData.registryTitle || ''} readOnly className="form-control" style={{ backgroundColor: '#f5f5f5' }} />
                </div>
              </div>
              <div className="row">
                <div className="form-field col-md-6">
                  <label className="section-label">Signature:</label>
                  {registrySignature ? (
                    <img src={registrySignature} alt="Registry Signature" style={{ maxWidth: '300px', border: '1px solid #ddd', padding: '10px' }} />
                  ) : (
                    <p className="text-muted">No signature provided</p>
                  )}
                </div>
                <div className="form-field col-md-6">
                  <label className="section-label">Date:</label>
                  <input type="date" value={signatureData.registryDate || ''} readOnly className="form-control" style={{ backgroundColor: '#f5f5f5' }} />
                </div>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default FinalApplicationView3;
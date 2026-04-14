// components/Admin/FinalApplicationView4.jsx
import React, { useState } from 'react';
import { base_url } from "../components/config";

const FinalApplicationView4 = ({ data }) => {
  const [currentStep, setCurrentStep] = useState(1);

  const steps = [
    "Employment Health Release",
    "Vaccination Informed Consent"
  ];

  const progressWidth = (currentStep / steps.length) * 100;

  // Helper to get step data
  const getStepData = (stepName) => {
    return data?.[stepName]?.formData || {};
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

  const healthReleaseData = getStepData('health_release');
  const vaccinationData = getStepData('vaccination_consent');

  const noticeSignature = getSignature('health_release');
  const declineSignature = getSignature('vaccination_consent');

  // Helper to get status for progress steps
  const getStepStatus = (stepNumber) => {
    const stepNameMap = {
      1: 'health_release',
      2: 'vaccination_consent',
    };
    const stepName = stepNameMap[stepNumber];
    if (stepName && data?.[stepName]?.formData && Object.keys(data[stepName].formData).length > 0) {
      return 'complete';
    }
    return stepNumber === 1 ? 'in_progress' : '';
  };

  return (
    <div className="application-page final-application">
<div className="form-container" style={{ padding: "0px" }}>
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

        {/* Step 1: Employment Health Release */}
        {currentStep === 1 && (
          <>
            <div className="form-section">
              <h1 className="form-title">EMPLOYMENT HEALTH RELEASE: DENIAL OF T.B. SIGNS AND SYMPTOMS</h1>
              
              <div className="row">
                <div className="form-field col-md-12">
                  <label className="section-label">PRINTED NAME</label>
                  <input type="text" value={healthReleaseData.healthReleaseName || ''} readOnly className="form-control" style={{ backgroundColor: '#f5f5f5' }} />
                </div>
              </div>

              <div className="form-field">
                <label className="section-label">HAVE YOU EVER HAD TUBERCULOSIS?</label>
                <div className="radio-group">
                  <label className="radio-label">
                    <input type="radio" checked={healthReleaseData.hadTB === 'yes'} readOnly disabled /> <span>YES</span>
                  </label>
                  <label className="radio-label">
                    <input type="radio" checked={healthReleaseData.hadTB === 'no'} readOnly disabled /> <span>NO</span>
                  </label>
                </div>
              </div>

              <div className="form-field mb-2">
                <label className="section-label">IF YES, PLEASE EXPLAIN (DATE, CIRCUMSTANCES, TREATMENT):</label>
                <textarea value={healthReleaseData.tbExplanation || ''} readOnly className="form-control" rows="3" style={{ backgroundColor: '#f5f5f5' }} />
              </div>

              <div className="row">
                <div className="form-field col-md-6">
                  <label className="section-label">HAVE YOU EVER HAD THE BCG VACCINE?</label>
                  <div className="radio-group">
                    <label className="radio-label"><input type="radio" checked={healthReleaseData.hadBCG === 'yes'} readOnly disabled /> <span>YES</span></label>
                    <label className="radio-label"><input type="radio" checked={healthReleaseData.hadBCG === 'no'} readOnly disabled /> <span>NO</span></label>
                  </div>
                </div>
                <div className="form-field col-md-6">
                  <label className="section-label">YEAR RECEIVED</label>
                  <input type="text" value={healthReleaseData.bcgYear || ''} readOnly className="form-control" style={{ backgroundColor: '#f5f5f5' }} />
                </div>
              </div>

              <div className="form-note">
                <p><b>THE EARLY SIGNS AND SYMPTOMS OF TUBERCULOSIS ARE:</b> Cough, Night Sweats, Fever, Loss of Weight, Loss of Appetite, Coughing Blood.</p>
              </div>

              <div className="form-field">
                <label className="section-label">DO YOU CURRENTLY HAVE ANY OF THE SYMPTOMS MENTIONED ABOVE? IF YES WHICH ONE:</label>
                <input type="text" value={healthReleaseData.currentTBSymptoms || ''} readOnly className="form-control" style={{ backgroundColor: '#f5f5f5' }} />
              </div>
            </div>

            <div className="form-section">
              <h1 className="form-title">APPLICANT NOTICE</h1>
              <div className="form-note">
                <p>This is a notice to all potential Per Diem Independent Contractors of <b>QUALCARE NURSE REGISTRY</b> that to inform that the Registry does not provide full time employment and cannot guarantee 40 hours of employment per week to any of our Per Diem Independent Contractors.</p>
                <p>When service begins between a Client and Per Diem Independent Contractor, and the assignment has been accepted, the Registry expects the Per Diem Independent Contractor to show up for the case and complete the accepted hours. A no show or failure to notify the office of an absence is a reason for immediate termination.</p>
              </div>

              <div className="row mt-4">
                <div className="form-field col-md-12">
                  <label className="section-label">SIGNATURE</label>
                  {noticeSignature ? (
                    <img src={noticeSignature} alt="Notice Signature" style={{ maxWidth: '300px', border: '1px solid #ddd', padding: '10px' }} />
                  ) : (
                    <p className="text-muted">No signature provided</p>
                  )}
                </div>
              </div>
              <div className="row">
                <div className="form-field col-md-6">
                  <label className="section-label">TITLE</label>
                  <input type="text" value={healthReleaseData.noticeTitle || ''} readOnly className="form-control" style={{ backgroundColor: '#f5f5f5' }} />
                </div>
                <div className="form-field col-md-6">
                  <label className="section-label">DATE</label>
                  <input type="date" value={healthReleaseData.noticeDate || ''} readOnly className="form-control" style={{ backgroundColor: '#f5f5f5' }} />
                </div>
              </div>
            </div>
          </>
        )}

        {/* Step 2: Vaccination Informed Consent */}
        {currentStep === 2 && (
          <>
            <div className="form-section">
              <h1 className="form-title">HEPATITIS B VACCINATION – INFORMED CONSENT</h1>

              <p className="form-note">
                I understand that due to my risk of occupational exposure to blood or other potentially
                infectious material, I may be at risk of acquiring Hepatitis B virus (HBV) infection.
                I have read the information concerning the Hepatitis B vaccine and I am aware of the
                availability and benefit that such vaccination provides in the prevention of infection
                with Hepatitis B virus.
              </p>

              <p className="form-note">
                I understand the benefits and risks of Hepatitis B vaccination and have had the opportunity
                to ask questions. I understand that:
              </p>

              <p className="form-note">1. The vaccination will be administered in a series of three (3) doses.</p>
              <p className="form-note">2. The second dose is given one month later and the third dose six (6) months after the first.</p>
              <p className="form-note">3. The vaccine is 90–95% effective in developing immunity.</p>
              <p className="form-note">4. The duration of immunity is unknown and may require a booster.</p>
              <p className="form-note">5. The vaccine only protects against Hepatitis B virus.</p>
              <p className="form-note">6. Minor side effects may include soreness at injection site, low-grade fever, malaise, or nausea.</p>

              <div className="form-field">
                <label className="section-label">Full Name (Requesting Vaccination)</label>
                <input type="text" value={vaccinationData.vaccineRequestName || ''} readOnly className="form-control" style={{ backgroundColor: '#f5f5f5' }} />
              </div>

              <p className="form-note">I request vaccination with Hepatitis B vaccine.</p>

              <div className="form-field">
                <label className="section-label">Pregnant</label>
                <div className="radio-group">
                  <label className="radio-label"><input type="radio" checked={vaccinationData.pregnant === 'yes'} readOnly disabled /> Yes</label>
                  <label className="radio-label"><input type="radio" checked={vaccinationData.pregnant === 'no'} readOnly disabled /> No</label>
                </div>
              </div>

              <div className="form-field">
                <label className="section-label">Allergies</label>
                <div className="radio-group">
                  <label className="radio-label"><input type="radio" checked={vaccinationData.allergies === 'yes'} readOnly disabled /> Yes</label>
                  <label className="radio-label"><input type="radio" checked={vaccinationData.allergies === 'no'} readOnly disabled /> No</label>
                </div>
              </div>

              <div className="form-field">
                <label className="section-label">Date Vaccinated – Dose 1</label>
                <input type="date" value={vaccinationData.dose1Date || ''} readOnly className="form-control" style={{ backgroundColor: '#f5f5f5' }} />
              </div>

              <div className="form-field">
                <label className="section-label">Date Vaccinated – Dose 2</label>
                <input type="date" value={vaccinationData.dose2Date || ''} readOnly className="form-control" style={{ backgroundColor: '#f5f5f5' }} />
              </div>

              <div className="form-field">
                <label className="section-label">Date Vaccinated – Dose 3</label>
                <input type="date" value={vaccinationData.dose3Date || ''} readOnly className="form-control" style={{ backgroundColor: '#f5f5f5' }} />
              </div>

              <div className="form-field">
                <label className="section-label">Lot Number – Dose 1</label>
                <input type="text" value={vaccinationData.lotNumber1 || ''} readOnly className="form-control" style={{ backgroundColor: '#f5f5f5' }} />
              </div>

              <div className="form-field">
                <label className="section-label">Lot Number – Dose 2</label>
                <input type="text" value={vaccinationData.lotNumber2 || ''} readOnly className="form-control" style={{ backgroundColor: '#f5f5f5' }} />
              </div>

              <div className="form-field">
                <label className="section-label">Lot Number – Dose 3</label>
                <input type="text" value={vaccinationData.lotNumber3 || ''} readOnly className="form-control" style={{ backgroundColor: '#f5f5f5' }} />
              </div>
            </div>

            <div className="form-section">
              <h1 className="form-title">HEPATITIS B VACCINE DECLINATION</h1>

              <p className="form-note">
                I acknowledge that I have read the above information and understand that I may be at
                increased risk of exposure or development of Hepatitis B infection. I choose not to
                receive the Hepatitis B vaccine at this time.
              </p>

              <div className="form-field">
                <label className="section-label">Full Name (Declining Vaccination)</label>
                <input type="text" value={vaccinationData.declineName || ''} readOnly className="form-control" style={{ backgroundColor: '#f5f5f5' }} />
              </div>

              <div className="row mt-4 align-items-center">
                <div className="col-md-6">
                  <label className="section-label">Signature</label>
                  {declineSignature ? (
                    <img src={declineSignature} alt="Decline Signature" style={{ maxWidth: '300px', border: '1px solid #ddd', padding: '10px' }} />
                  ) : (
                    <p className="text-muted">No signature provided</p>
                  )}
                </div>
                <div className="form-field col-md-6">
                  <label className="section-label">Date</label>
                  <input type="date" value={vaccinationData.declineDate || ''} readOnly className="form-control" style={{ backgroundColor: '#f5f5f5' }} />
                </div>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default FinalApplicationView4;
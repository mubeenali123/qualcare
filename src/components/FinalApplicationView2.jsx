// components/Admin/FinalApplicationView2.jsx
import React, { useState } from 'react';
import { base_url } from "../components/config";

const FinalApplicationView2 = ({ data }) => {
  const [currentStep, setCurrentStep] = useState(1);

  const steps = [
    "Contractor Agreement",
    "Background Screening",
    "Attestation Compliance",
    "Contractor Guidelines",
    "Contractor Orientation",
    "Neglect Exploitation"
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

  const contractorAgreementData = getStepData('contractor_agreement');
  const contractorGuidelinesData = getStepData('contractor_guidelines');
  const contractorOrientationData = getStepData('contractor_orientation');
  const neglectExploitationData = getStepData('neglect_exploitation');

  const contractorSignature = getSignature('contractor_guidelines');
  const registrySignature = getSignature('contractor_guidelines');
  const finalSignature = getSignature('contractor_orientation');
  const caregiverSignature = getSignature('neglect_exploitation');

  // Helper to get status for progress steps
  const getStepStatus = (stepNumber) => {
    const stepNameMap = {
      1: 'contractor_agreement',
      4: 'contractor_guidelines',
      5: 'contractor_orientation',
      6: 'neglect_exploitation',
    };
    const stepName = stepNameMap[stepNumber];
    if (stepName && data?.[stepName]?.formData && Object.keys(data[stepName].formData).length > 0) {
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

        {/* Step 1: Contractor Agreement */}
        {currentStep === 1 && (
          <>
            <div className="form-section">
              <h1 className="form-title">PER DIEM INDEPENDENT CONTRACTOR AGREEMENT</h1>
              <p className="form-note">
                On this day of (“Effective Date”), an agreement is made between
                <b> QUALCARE NURSE REGISTRY</b>, a nurse registry licensed under Florida
                Statutes 400.506, located at 7941 West Oakland Park Blvd, Suite 304,
                Lauderdale, FL 33319 and 100 E. Linton Blvd., Ste 116B, Delray Beach, FL
                33483 hereinafter referred to as “the Registry”...
              </p>

              <div className="row">
                <div className="form-field col-md-2">
                  <label className="section-label">DAY</label>
                  <input type="text" value={contractorAgreementData.perDiemEffectiveDay || ''} readOnly className="form-control" style={{ backgroundColor: '#f5f5f5' }} />
                </div>
                <div className="form-field col-md-4">
                  <label className="section-label">MONTH</label>
                  <input type="text" value={contractorAgreementData.perDiemEffectiveMonth || ''} readOnly className="form-control" style={{ backgroundColor: '#f5f5f5' }} />
                </div>
                <div className="form-field col-md-2">
                  <label className="section-label">YEAR</label>
                  <input type="text" value={contractorAgreementData.perDiemEffectiveYear || ''} readOnly className="form-control" style={{ backgroundColor: '#f5f5f5' }} />
                </div>
                <div className="form-field col-md-4">
                  <label className="section-label">CONTRACTOR PRINTED NAME</label>
                  <input type="text" value={contractorAgreementData.perDiemContractorName || ''} readOnly className="form-control" style={{ backgroundColor: '#f5f5f5' }} />
                </div>
              </div>
            </div>

            <div className="form-section">
              <h1 className="form-title">1. PAYMENT FOR SERVICES</h1>
              <div className="form-field col-md-6">
                <label className="section-label">POSITION / PROFESSIONAL TITLE</label>
                <input type="text" value={contractorAgreementData.perDiemPosition || ''} readOnly className="form-control" style={{ backgroundColor: '#f5f5f5' }} />
              </div>
            </div>
          </>
        )}

        {/* Step 2: Background Screening - Static Content */}
        {currentStep === 2 && (
          <>
            <div className="form-section">
              <h1 className="form-title">3. BACKGROUND SCREENING</h1>
              <p className="form-note">Per Diem Independent Contractor agrees that as a condition of this Agreement that he/she must clear a Level II Criminal Background screening through the Agency for Health Care Administration, as well as a national Sex Offender Registry Screening.</p>
              <p className="form-note">Per Diem Independent Contractor agrees to bear the cost associated with any Background Screening.</p>
            </div>
            <div className="form-section">
              <h1 className="form-title">4. DRUG SCREENING</h1>
              <p className="form-note">Per Diem Independent Contractor agrees that his/her acceptance of this agreement is contingent upon the submission of a negative 10 panel drug screen result...</p>
            </div>
            <div className="form-section">
              <h1 className="form-title">5. COMMUNICABLE DISEASE</h1>
              <p className="form-note">Per Diem Independent Contractor agrees to provide documentation of a health screening...</p>
            </div>
            <div className="form-section">
              <h1 className="form-title">6. INSURANCE</h1>
              <p className="form-note">Per Diem Independent Contractor shall maintain all required insurances...</p>
            </div>
          </>
        )}

        {/* Step 3: Attestation Compliance - Static Content */}
        {currentStep === 3 && (
          <>
            <div className="form-section">
              <h1 className="form-title">7. TRANSPORTATION</h1>
              <p className="form-note">Per Diem Independent Contractor agrees to provide and maintain his/her reliable transportation.</p>
            </div>
            <div className="form-section">
              <h1 className="form-title">8. SELF EMPLOYMENT</h1>
              <p className="form-note">I hereby represent and affirm that I have established myself as a self-employed independent contractor...</p>
            </div>
            <div className="form-section">
              <h1 className="form-title">9. TOOLS AND SUPPLIES</h1>
              <p className="form-note">Per Diem Independent Contractor agrees to provide his/her own equipment...</p>
            </div>
            <div className="form-section">
              <h1 className="form-title">10. CONFIDENTIALITY</h1>
              <p className="form-note">Per Diem Independent Contractor shall maintain and preserve the confidentiality...</p>
            </div>
            <div className="form-section">
              <h1 className="form-title">11. PATIENT VISIT NOTES AND WEEKLY INVOICE</h1>
              <p className="form-note">Per Diem Independent Contractor shall be responsible for creating, updating...</p>
            </div>
            <div className="form-section">
              <h1 className="form-title">12. TERM, RENEWAL AND TERMINATION</h1>
              <p className="form-note">This Agreement shall begin at the time both parties signatures are affixed...</p>
            </div>
          </>
        )}

        {/* Step 4: Contractor Guidelines */}
        {currentStep === 4 && (
          <>
            <div className="form-section">
              <h1 className="form-title">PER DIEM INDEPENDENT CONTRACTOR GUIDELINES</h1>
              <p className="form-note">Per Diem Independent Contractor acknowledges receipt of and agrees to abide by all of the terms...</p>
            </div>

            <div className="form-section">
              <h1 className="form-title">Per Diem Independent Contractor:</h1>
              <div className="row">
                <div className="form-field col-md-6">
                  <label className="section-label">Printed Name:</label>
                  <input type="text" value={contractorGuidelinesData.contractorPrintedName || ''} readOnly className="form-control" style={{ backgroundColor: '#f5f5f5' }} />
                </div>
                <div className="form-field col-md-6">
                  <label className="section-label">Title:</label>
                  <input type="text" value={contractorGuidelinesData.contractorTitle || ''} readOnly className="form-control" style={{ backgroundColor: '#f5f5f5' }} />
                </div>
              </div>
              <div className="row">
                <div className="form-field col-md-6">
                  <label className="section-label">Signature:</label>
                  {contractorSignature ? (
                    <img src={contractorSignature} alt="Contractor Signature" style={{ maxWidth: '300px', border: '1px solid #ddd', padding: '10px' }} />
                  ) : (
                    <p className="text-muted">No signature</p>
                  )}
                </div>
                <div className="form-field col-md-6">
                  <label className="section-label">Date:</label>
                  <input type="date" value={contractorGuidelinesData.contractorDate || ''} readOnly className="form-control" style={{ backgroundColor: '#f5f5f5' }} />
                </div>
              </div>
            </div>

            <div className="form-section">
              <h1 className="form-title">Qualcare Nurse Registry Inc.:</h1>
              <div className="row">
                <div className="form-field col-md-6">
                  <label className="section-label">Printed Name:</label>
                  <input type="text" value={contractorGuidelinesData.registryPrintedName || ''} readOnly className="form-control" style={{ backgroundColor: '#f5f5f5' }} />
                </div>
                <div className="form-field col-md-6">
                  <label className="section-label">Title:</label>
                  <input type="text" value={contractorGuidelinesData.registryTitle || ''} readOnly className="form-control" style={{ backgroundColor: '#f5f5f5' }} />
                </div>
              </div>
              <div className="row">
                <div className="form-field col-md-6">
                  <label className="section-label">Signature:</label>
                  {registrySignature ? (
                    <img src={registrySignature} alt="Registry Signature" style={{ maxWidth: '300px', border: '1px solid #ddd', padding: '10px' }} />
                  ) : (
                    <p className="text-muted">No signature</p>
                  )}
                </div>
                <div className="form-field col-md-6">
                  <label className="section-label">Date:</label>
                  <input type="date" value={contractorGuidelinesData.registryDate || ''} readOnly className="form-control" style={{ backgroundColor: '#f5f5f5' }} />
                </div>
              </div>
            </div>
          </>
        )}

        {/* Step 5: Contractor Orientation */}
        {currentStep === 5 && (
          <>
            <div className="form-section">
              <h1 className="form-title">INDEPENDENT CONTRACTOR ORIENTATION</h1>
              <div className="row">
                <div className="form-field col-md-6">
                  <label className="section-label">Independent Contractor Name</label>
                  <input type="text" value={contractorOrientationData.contractorName || ''} readOnly className="form-control" style={{ backgroundColor: '#f5f5f5' }} />
                </div>
                <div className="form-field col-md-6">
                  <label className="section-label">Witness</label>
                  <input type="text" value={contractorOrientationData.witnessName || ''} readOnly className="form-control" style={{ backgroundColor: '#f5f5f5' }} />
                </div>
              </div>
              <div className="row">
                <div className="form-field col-md-6">
                  <label className="section-label">Date</label>
                  <input type="date" value={contractorOrientationData.contractorDate || ''} readOnly className="form-control" style={{ backgroundColor: '#f5f5f5' }} />
                </div>
                <div className="form-field col-md-6">
                  <label className="section-label">Date</label>
                  <input type="date" value={contractorOrientationData.witnessDate || ''} readOnly className="form-control" style={{ backgroundColor: '#f5f5f5' }} />
                </div>
              </div>
            </div>

            <div className="form-section">
              <h1 className="form-title">59A-18.007: REGISTERED NURSE AND LICENSED PRACTICAL NURSE.</h1>
              <div className="row">
                <div className="form-field col-md-4">
                  <label className="section-label">Independent Contractor Name</label>
                  <input type="text" value={contractorOrientationData.finalContractorName || ''} readOnly className="form-control" style={{ backgroundColor: '#f5f5f5' }} />
                </div>
                <div className="form-field col-md-4">
                  <label className="section-label">Signature</label>
                  {finalSignature ? (
                    <img src={finalSignature} alt="Final Signature" style={{ maxWidth: '300px', border: '1px solid #ddd', padding: '10px' }} />
                  ) : (
                    <p className="text-muted">No signature</p>
                  )}
                </div>
                <div className="form-field col-md-4">
                  <label className="section-label">Date</label>
                  <input type="date" value={contractorOrientationData.finalContractorDate || ''} readOnly className="form-control" style={{ backgroundColor: '#f5f5f5' }} />
                </div>
              </div>
            </div>
          </>
        )}

        {/* Step 6: Neglect Exploitation */}
        {currentStep === 6 && (
          <div className="form-section">
            <h1 className="form-title">ABUSE, NEGLECT AND EXPLOITATION</h1>
            
            <p className="form-note">Click the words below that mean "ABUSE" to you. <i>(check all)</i></p>
            <div className="checkbox-group">
              <label className="checkbox-label">
                <input type="checkbox" checked={neglectExploitationData.physical || false} readOnly disabled />
                <span>Physical</span>
              </label>
              <label className="checkbox-label">
                <input type="checkbox" checked={neglectExploitationData.verbalEmotional || false} readOnly disabled />
                <span>Verbal Emotional</span>
              </label>
              <label className="checkbox-label">
                <input type="checkbox" checked={neglectExploitationData.mentalAbuse || false} readOnly disabled />
                <span>Mental Abuse</span>
              </label>
              <label className="checkbox-label">
                <input type="checkbox" checked={neglectExploitationData.abandonment || false} readOnly disabled />
                <span>Abandonment</span>
              </label>
              <label className="checkbox-label">
                <input type="checkbox" checked={neglectExploitationData.exploitation || false} readOnly disabled />
                <span>Exploitation</span>
              </label>
            </div>

            <p className="form-note">2. I am aware that I must report abused, neglected and/or exploited?</p>
            <div className="radio-group">
              <label className="radio-label">
                <span>YES</span>
                <input type="radio" checked={neglectExploitationData.mustReport === 'yes'} readOnly disabled />
              </label>
              <label className="radio-label">
                <span>NO</span>
                <input type="radio" checked={neglectExploitationData.mustReport === 'no'} readOnly disabled />
              </label>
            </div>

            <p className="form-note">3. How would you report an incident of abuse, neglect and/or exploitation?</p>
            <div className="radio-group">
              <label className="radio-label">
                <span>YES</span>
                <input type="radio" checked={neglectExploitationData.howToReport === 'yes'} readOnly disabled />
              </label>
              <label className="radio-label">
                <span>NO</span>
                <input type="radio" checked={neglectExploitationData.howToReport === 'no'} readOnly disabled />
              </label>
            </div>

            <div className="form-field col-md-12">
              <label className="section-label">Caregiver Name:</label>
              <input type="text" value={neglectExploitationData.caregiverName || ''} readOnly className="form-control" style={{ backgroundColor: '#f5f5f5' }} />
            </div>

            <div className="row">
              <div className="form-field col-md-6">
                <label className="section-label">Signature:</label>
                {caregiverSignature ? (
                  <img src={caregiverSignature} alt="Caregiver Signature" style={{ maxWidth: '300px', border: '1px solid #ddd', padding: '10px' }} />
                ) : (
                  <p className="text-muted">No signature</p>
                )}
              </div>
              <div className="form-field col-md-6">
                <label className="section-label">Date:</label>
                <input type="date" value={neglectExploitationData.date || ''} readOnly className="form-control" style={{ backgroundColor: '#f5f5f5' }} />
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default FinalApplicationView2;
// components/Admin/FinalApplicationView5.jsx
import React, { useState } from 'react';
import { base_url } from "../components/config";

const FinalApplicationView5 = ({ data }) => {
  const [currentStep, setCurrentStep] = useState(1);

  const steps = [
    "HR Folder Checklist",
    "Employee Application",
    "Employee Application",
    "Reference Check",
    "PayCheck Policy",
    "Company Disciplinary",
    "Safety And Policy",
    "Patient Abandonment",
    "Confidentiality Statement",
    "Contractor Agreement",
    "Discrimination Policy",
    "Health Questionnaire",
    "Infection Control",
    "Policy Statement"
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

  const hrChecklistData = getStepData('hr_checklist');
  const employeePart1Data = getStepData('employee_application_part1');
  const employeePart2Data = getStepData('employee_application_part2');
  const referenceCheckData = getStepData('reference_check');
  const paycheckPolicyData = getStepData('paycheck_policy');
  const disciplinaryData = getStepData('disciplinary_action');
  const safetyPolicyData = getStepData('safety_policy');
  const patientAbandonmentData = getStepData('patient_abandonment');
  const confidentialityData = getStepData('confidentiality_statement');
  const contractorAgreementData = getStepData('contractor_agreement_final5');
  const nonDiscriminationData = getStepData('non_discrimination');
  const healthQuestionnaireData = getStepData('health_questionnaire');
  const infectionControlData = getStepData('infection_control');
  const policyStatementData = getStepData('policy_statement');

  const referenceSignature = getSignature('reference_check');
  const paycheckSignature = getSignature('paycheck_policy');
  const disciplinarySignature = getSignature('disciplinary_action');
  const safetySignature = getSignature('safety_policy');
  const patientSignature = getSignature('patient_abandonment');
  const confidentialitySignature = getSignature('confidentiality_statement');
  const contractorSignature = getSignature('contractor_agreement_final5');
  const nonDiscriminationSignature = getSignature('non_discrimination');
  const healthSignature = getSignature('health_questionnaire');
  const infectionSignature = getSignature('infection_control');
  const policySignature = getSignature('policy_statement');

  // Helper to get status for progress steps
  const getStepStatus = (stepNumber) => {
    const stepNameMap = {
      1: 'hr_checklist',
      2: 'employee_application_part1',
      3: 'employee_application_part2',
      4: 'reference_check',
      5: 'paycheck_policy',
      6: 'disciplinary_action',
      7: 'safety_policy',
      8: 'patient_abandonment',
      9: 'confidentiality_statement',
      10: 'contractor_agreement_final5',
      11: 'non_discrimination',
      12: 'health_questionnaire',
      13: 'infection_control',
      14: 'policy_statement',
    };
    const stepName = stepNameMap[stepNumber];
    if (stepName && data?.[stepName]?.formData && Object.keys(data[stepName].formData).length > 0) {
      return 'complete';
    }
    return stepNumber === 1 ? 'in_progress' : '';
  };

  // Helper to render checklist items
  const renderChecklist = (items, prefix, dataObj) => {
    return items.map((item, idx) => (
      <div className="d-flex align-items-center mb-2" key={idx}>
        <label className="form-check form-check-inline mb-0">
          <input type="checkbox" checked={dataObj[`${prefix}_${idx}`] || false} readOnly disabled />
        </label>
        <div className="flex-grow-1" style={{ borderBottom: '1px solid #ccc' }}>
          <p className="form-note mb-0 py-1">{item}</p>
        </div>
      </div>
    ));
  };

  const docItems = [
    "Application Form with ALL SIGNATURES",
    "Liability Insurance",
    "Orientation Form:",
    "RN/ LPN/CAN License",
    "HHA Certification:",
    "Social Security Card:",
    "Driver’s License",
    "Auto Insurance",
    "Voter's Card, Alien Card, US Passport, US Birth Certificate, Work Authorization",
    "CPR Card (American Heart Association, American Red Cross, or Health & Safety Institute)",
    "Physical Certificate done within the last 3-6 months stating \"Free from Communicable Diseases\" Yearly",
    "Level 2 Background Screening",
    "Palm Beach County ID Badge (HHA Only)"
  ];

  const inserviceItems = [
    "Domestic Violence 2hr Certificate",
    "Alzheimer’s/Dementia 3hr Certificate",
    "1 Hour Alzheimer’s Training",
    "HIV/AIDS 4hr Certificate",
    "HIPPA Update 4hr Certificate",
    "OSHA Update 4hr Certificate/2hr Certificate",
    "Self-Administered Medication 2hr Certificate",
    "Communications Cognitively Impaired Patients (CNAs)",
    "Patient Rights 2hrs (CNAs)",
    "Medical Records Documentation 2hrs(CNAs)",
    "Medical Errors Update 2hrs(CNA, LPN, RN)",
    "Florida laws and rules (LPN, RN, HHA and CNA)",
    "Professional Liability Insurance",
    "Federal Tax EIN"
  ];

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

        {/* Step 1: HR Folder Checklist */}
        {currentStep === 1 && (
          <div className="form-section">
            <h1 className="form-title">INDEPENDENT CONTRACTOR HR FOLDER CHECKLIST</h1>
            
            <div className="row mb-4">
              <div className="form-field col-md-8">
                <label className="section-label">Contractor's Name:</label>
                <input type="text" value={hrChecklistData.hr_contractor_name || ''} readOnly className="form-control" style={{ backgroundColor: '#f5f5f5' }} />
              </div>
              <div className="col-md-4 d-flex align-items-end justify-content-around pb-2">
                {['RN', 'LPN', 'CNA', 'HHA'].map((role) => (
                  <label key={role} className="form-check form-check-inline">
                    <input type="checkbox" checked={hrChecklistData[`hr_role_${role}`] || false} readOnly disabled />
                    <span className="form-check-label">{role}</span>
                  </label>
                ))}
              </div>
            </div>

            <h3 className="section-header-small" style={{ borderBottom: '2px solid #000', marginBottom: '15px' }}>Documents</h3>
            {renderChecklist(docItems, 'hr_doc', hrChecklistData)}

            <h3 className="section-header-small mt-4" style={{ borderBottom: '2px solid #000', marginBottom: '15px' }}>In-Services</h3>
            {renderChecklist(inserviceItems, 'hr_inservice', hrChecklistData)}
          </div>
        )}

        {/* Step 2: Employee Application Part 1 - Personal Information */}
        {currentStep === 2 && (
          <>
            <div className="form-section">
              <h1 className="form-title">PERSONAL INFORMATION:</h1>
              <div className="row">
                <div className="form-field col-md-3"><label className="section-label">NAME (LAST)</label><input type="text" value={employeePart1Data.lastName || ''} readOnly className="form-control" style={{ backgroundColor: '#f5f5f5' }} /></div>
                <div className="form-field col-md-3"><label className="section-label">NAME (FIRST)</label><input type="text" value={employeePart1Data.firstName || ''} readOnly className="form-control" style={{ backgroundColor: '#f5f5f5' }} /></div>
                <div className="form-field col-md-3"><label className="section-label">DOB</label><input type="date" value={employeePart1Data.dob || ''} readOnly className="form-control" style={{ backgroundColor: '#f5f5f5' }} /></div>
                <div className="form-field col-md-3"><label className="section-label">SSN</label><input type="text" value={employeePart1Data.ssn || ''} readOnly className="form-control" style={{ backgroundColor: '#f5f5f5' }} /></div>
              </div>
              <div className="row">
                <div className="form-field col-md-3"><label className="section-label">PRESENT ADDRESS</label><input type="text" value={employeePart1Data.presentAddress || ''} readOnly className="form-control" style={{ backgroundColor: '#f5f5f5' }} /></div>
                <div className="form-field col-md-3"><label className="section-label">CITY</label><input type="text" value={employeePart1Data.presentCity || ''} readOnly className="form-control" style={{ backgroundColor: '#f5f5f5' }} /></div>
                <div className="form-field col-md-3"><label className="section-label">STATE</label><input type="text" value={employeePart1Data.presentState || ''} readOnly className="form-control" style={{ backgroundColor: '#f5f5f5' }} /></div>
                <div className="form-field col-md-3"><label className="section-label">ZIP</label><input type="text" value={employeePart1Data.presentZip || ''} readOnly className="form-control" style={{ backgroundColor: '#f5f5f5' }} /></div>
              </div>
              <div className="row">
                <div className="form-field col-md-4"><label className="section-label">HOME PHONE</label><input type="text" value={employeePart1Data.homePhone || ''} readOnly className="form-control" style={{ backgroundColor: '#f5f5f5' }} /></div>
                <div className="form-field col-md-4"><label className="section-label">CELL #</label><input type="text" value={employeePart1Data.cellPhone || ''} readOnly className="form-control" style={{ backgroundColor: '#f5f5f5' }} /></div>
                <div className="form-field col-md-4"><label className="section-label">OTHER #</label><input type="text" value={employeePart1Data.otherPhone || ''} readOnly className="form-control" style={{ backgroundColor: '#f5f5f5' }} /></div>
              </div>
              <div className="form-row">
                <div className="form-field"><label className="section-label">EMAIL</label><input type="email" value={employeePart1Data.email || ''} readOnly className="form-control" style={{ backgroundColor: '#f5f5f5' }} /></div>
                <div className="form-field"><label className="section-label">REFERRED BY</label><input type="text" value={employeePart1Data.referredBy || ''} readOnly className="form-control" style={{ backgroundColor: '#f5f5f5' }} /></div>
              </div>
            </div>

            <div className="form-section">
              <h1 className="form-title">CONTRACT POSITION DESIRED:</h1>
              <div className="mb-3">
                {['positionRN', 'positionLPN', 'positionCNA', 'positionHHA', 'positionCompanion'].map(pos => (
                  <label key={pos} className="form-check form-check-inline">
                    <input type="checkbox" checked={employeePart1Data[pos] || false} readOnly disabled />
                    <span className="form-check-label">{pos.replace('position', '').toUpperCase()}</span>
                  </label>
                ))}
              </div>
              <div className="row">
                <div className="form-field col-md-6"><label className="section-label">DATE YOU CAN START</label><input type="date" value={employeePart1Data.dateCanStart || ''} readOnly className="form-control" style={{ backgroundColor: '#f5f5f5' }} /></div>
                <div className="form-field col-md-6"><label className="section-label">CONTRACT COMPENSATION DESIRED</label><input type="text" value={employeePart1Data.contractCompensation || ''} readOnly className="form-control" style={{ backgroundColor: '#f5f5f5' }} /></div>
              </div>
              <div className="row">
                <div className="form-field col-md-4"><label className="section-label">LICENSE/CERTIFICATE #</label><input type="text" value={employeePart1Data.licenseNumber || ''} readOnly className="form-control" style={{ backgroundColor: '#f5f5f5' }} /></div>
                <div className="form-field col-md-4"><label className="section-label">LICENSE EXPIRATION DATE</label><input type="date" value={employeePart1Data.licenseExpiration || ''} readOnly className="form-control" style={{ backgroundColor: '#f5f5f5' }} /></div>
              </div>
              <div className="form-row">
                <div className="form-field"><label className="section-label">ARE YOU EMPLOYED/CONTRACTED NOW?</label><input type="text" value={employeePart1Data.employedNow || ''} readOnly className="form-control" style={{ backgroundColor: '#f5f5f5' }} /></div>
                <div className="form-field"><label className="section-label">MAY WE INQUIRE?</label><input type="text" value={employeePart1Data.mayInquire || ''} readOnly className="form-control" style={{ backgroundColor: '#f5f5f5' }} /></div>
              </div>
            </div>

            <div className="form-section">
              <h1 className="form-title">IN CASE OF EMERGENCY:</h1>
              <div className="form-row">
                <div className="form-field"><label className="section-label">NAME</label><input type="text" value={employeePart1Data.emergencyName || ''} readOnly className="form-control" style={{ backgroundColor: '#f5f5f5' }} /></div>
                <div className="form-field"><label className="section-label">RELATIONSHIP</label><input type="text" value={employeePart1Data.emergencyRelationship || ''} readOnly className="form-control" style={{ backgroundColor: '#f5f5f5' }} /></div>
              </div>
              <div className="row">
                <div className="form-field col-md-4"><label className="section-label">ADDRESS</label><input type="text" value={employeePart1Data.emergencyAddress || ''} readOnly className="form-control" style={{ backgroundColor: '#f5f5f5' }} /></div>
                <div className="form-field col-md-4"><label className="section-label">PHONE</label><input type="text" value={employeePart1Data.emergencyPhone || ''} readOnly className="form-control" style={{ backgroundColor: '#f5f5f5' }} /></div>
                <div className="form-field col-md-4"><label className="section-label">ALT. PHONE</label><input type="text" value={employeePart1Data.emergencyAltPhone || ''} readOnly className="form-control" style={{ backgroundColor: '#f5f5f5' }} /></div>
              </div>
            </div>
          </>
        )}

        {/* Step 3: Employee Application Part 2 - Experience, Education, Availability */}
        {currentStep === 3 && (
          <>
            <div className="form-section">
              <h1 className="form-title">EXPERIENCE:</h1>
              <div className="row">
                {['expAlzheimers', 'expStroke', 'expCatheter', 'expDementia', 'expHIV', 'expWheelchair',
                  'expBedridden', 'expLiftingPatients', 'expBrokenHip', 'expBypassSurgery', 'expFeedingTubes',
                  'expBreathingTreatments', 'expHearingVision', 'expCancer', 'expDiabeticDiet', 'expKosherDiet',
                  'expLowSaltDiet', 'expDehydration', 'expConstipation', 'expIncontinence', 'expHeartProblems'].map(exp => (
                  <div key={exp} className="col-md-4 form-check mb-2">
                    <input type="checkbox" checked={employeePart2Data[exp] || false} readOnly disabled />
                    <label className="form-check-label">{exp.replace('exp', '').toUpperCase()}</label>
                  </div>
                ))}
              </div>
            </div>

            <div className="form-section">
              <h1 className="form-title">WORK AVAILABILITY:</h1>
              <div className="form-row d-flex align-items-center gap-5">
                <div><strong>Weekdays:</strong> Live In: <input type="radio" checked={employeePart2Data.liveInWeekdays || false} readOnly disabled /> Live Out: <input type="radio" checked={employeePart2Data.liveOutWeekdays || false} readOnly disabled /></div>
                <div><strong>Weekends:</strong> Live In: <input type="radio" checked={employeePart2Data.liveInWeekends || false} readOnly disabled /> Live Out: <input type="radio" checked={employeePart2Data.liveOutWeekends || false} readOnly disabled /></div>
              </div>
              <div className="form-row mb-3">
                <div className="form-field col-md-4"><label className="section-label">Driver's License</label><input type="text" value={employeePart2Data.driversLicense || ''} readOnly className="form-control" style={{ backgroundColor: '#f5f5f5' }} /></div>
                <div className="form-field col-md-4"><label className="section-label">Own Car</label><input type="text" value={employeePart2Data.ownCar || ''} readOnly className="form-control" style={{ backgroundColor: '#f5f5f5' }} /></div>
              </div>
              <div className="mb-3">
                <label className="section-label">Availability Schedule</label>
                {['fullTime', 'partTime', 'days', 'nights'].map(schedule => (
                  <label key={schedule} className="form-check form-check-inline">
                    <input type="checkbox" checked={employeePart2Data[schedule] || false} readOnly disabled />
                    <span className="form-check-label">{schedule.toUpperCase()}</span>
                  </label>
                ))}
              </div>
            </div>

            <div className="form-section">
              <h1 className="form-title">REFERENCES - PERSONAL:</h1>
              {[1, 2, 3].map(i => (
                <div className="row mb-2" key={i}>
                  <div className="form-field col-md-3"><input type="text" value={employeePart2Data[`ref${i}Name`] || ''} readOnly className="form-control" style={{ backgroundColor: '#f5f5f5' }} placeholder="Name" /></div>
                  <div className="form-field col-md-3"><input type="text" value={employeePart2Data[`ref${i}Address`] || ''} readOnly className="form-control" style={{ backgroundColor: '#f5f5f5' }} placeholder="Address" /></div>
                  <div className="form-field col-md-2"><input type="text" value={employeePart2Data[`ref${i}Phone`] || ''} readOnly className="form-control" style={{ backgroundColor: '#f5f5f5' }} placeholder="Phone" /></div>
                  <div className="form-field col-md-2"><input type="text" value={employeePart2Data[`ref${i}Business`] || ''} readOnly className="form-control" style={{ backgroundColor: '#f5f5f5' }} placeholder="Business" /></div>
                  <div className="form-field col-md-2"><input type="text" value={employeePart2Data[`ref${i}Years`] || ''} readOnly className="form-control" style={{ backgroundColor: '#f5f5f5' }} placeholder="Yrs Known" /></div>
                </div>
              ))}
            </div>

            <div className="form-section">
              <h1 className="form-title">EDUCATION:</h1>
              {['grammarSchool', 'highSchool', 'college'].map(school => (
                <div className="row mb-2" key={school}>
                  <div className="form-field col-md-3"><input type="text" value={employeePart2Data[`${school}Name`] || ''} readOnly className="form-control" style={{ backgroundColor: '#f5f5f5' }} placeholder="Name" /></div>
                  <div className="form-field col-md-3"><input type="text" value={employeePart2Data[`${school}Location`] || ''} readOnly className="form-control" style={{ backgroundColor: '#f5f5f5' }} placeholder="Location" /></div>
                  <div className="form-field col-md-2"><input type="text" value={employeePart2Data[`${school}Years`] || ''} readOnly className="form-control" style={{ backgroundColor: '#f5f5f5' }} placeholder="Years" /></div>
                  <div className="form-field col-md-2"><input type="text" value={employeePart2Data[`${school}Graduated`] || ''} readOnly className="form-control" style={{ backgroundColor: '#f5f5f5' }} placeholder="Graduated" /></div>
                  <div className="form-field col-md-2"><input type="text" value={employeePart2Data[`${school}Subject`] || ''} readOnly className="form-control" style={{ backgroundColor: '#f5f5f5' }} placeholder="Subject" /></div>
                </div>
              ))}
            </div>

            <div className="form-section">
              <h1 className="form-title">FORMER CONTRACT EMPLOYERS:</h1>
              {[0, 1, 2, 3].map(i => (
                <div className="row mb-2" key={i}>
                  <div className="form-field col-md-2"><input type="date" value={employeePart2Data[`employer${i}From`] || ''} readOnly className="form-control" style={{ backgroundColor: '#f5f5f5' }} placeholder="From" /></div>
                  <div className="form-field col-md-2"><input type="date" value={employeePart2Data[`employer${i}To`] || ''} readOnly className="form-control" style={{ backgroundColor: '#f5f5f5' }} placeholder="To" /></div>
                  <div className="form-field col-md-3"><input type="text" value={employeePart2Data[`employer${i}Name`] || ''} readOnly className="form-control" style={{ backgroundColor: '#f5f5f5' }} placeholder="Employer" /></div>
                  <div className="form-field col-md-2"><input type="text" value={employeePart2Data[`employer${i}Earnings`] || ''} readOnly className="form-control" style={{ backgroundColor: '#f5f5f5' }} placeholder="Earnings" /></div>
                  <div className="form-field col-md-1"><input type="text" value={employeePart2Data[`employer${i}Position`] || ''} readOnly className="form-control" style={{ backgroundColor: '#f5f5f5' }} placeholder="Position" /></div>
                  <div className="form-field col-md-2"><input type="text" value={employeePart2Data[`employer${i}Reason`] || ''} readOnly className="form-control" style={{ backgroundColor: '#f5f5f5' }} placeholder="Reason" /></div>
                </div>
              ))}
            </div>

            <div className="form-section">
              <h1 className="form-title">CURRENT AVAILABILITY:</h1>
              {['monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday', 'sunday'].map(day => (
                <div className="row mb-2" key={day}>
                  <div className="form-field col-md-2"><span>{day.charAt(0).toUpperCase() + day.slice(1)}</span></div>
                  <div className="form-field col-md-3"><input type="time" value={employeePart2Data[`${day}From`] || ''} readOnly className="form-control" style={{ backgroundColor: '#f5f5f5' }} /></div>
                  <div className="form-field col-md-3"><input type="time" value={employeePart2Data[`${day}To`] || ''} readOnly className="form-control" style={{ backgroundColor: '#f5f5f5' }} /></div>
                  <div className="form-field col-md-4"><input type="text" value={employeePart2Data[`${day}Overnight`] || ''} readOnly className="form-control" style={{ backgroundColor: '#f5f5f5' }} placeholder="Overnight?" /></div>
                </div>
              ))}
            </div>
          </>
        )}

        {/* Step 4: Reference Check */}
        {currentStep === 4 && (
          <div className="form-section">
            <h1 className="form-title">REFERENCE CHECK FORM</h1>
            <div className="row mb-2">
              <div className="form-field col-md-4"><label className="section-label">Last Manager</label><input type="text" value={referenceCheckData.lastManager || ''} readOnly className="form-control" style={{ backgroundColor: '#f5f5f5' }} /></div>
              <div className="form-field col-md-4"><label className="section-label">Date</label><input type="date" value={referenceCheckData.referenceDate || ''} readOnly className="form-control" style={{ backgroundColor: '#f5f5f5' }} /></div>
              <div className="form-field col-md-4"><label className="section-label">Organization</label><input type="text" value={referenceCheckData.organization || ''} readOnly className="form-control" style={{ backgroundColor: '#f5f5f5' }} /></div>
            </div>
            <div className="form-field mb-2"><label className="section-label">Address</label><input type="text" value={referenceCheckData.address || ''} readOnly className="form-control" style={{ backgroundColor: '#f5f5f5' }} /></div>
            <div className="row mb-2">
              <div className="form-field col-md-6"><label className="section-label">Phone</label><input type="text" value={referenceCheckData.phone || ''} readOnly className="form-control" style={{ backgroundColor: '#f5f5f5' }} /></div>
              <div className="form-field col-md-6"><label className="section-label">Fax</label><input type="text" value={referenceCheckData.fax || ''} readOnly className="form-control" style={{ backgroundColor: '#f5f5f5' }} /></div>
            </div>
            <div className="form-field mb-2"><label className="section-label">Position Applied</label><input type="text" value={referenceCheckData.positionApplied || ''} readOnly className="form-control" style={{ backgroundColor: '#f5f5f5' }} /></div>
            
            <div className="form-section">
              <h2 className="form-title">Section 1 – Applicant Signature</h2>
              {referenceSignature ? <img src={referenceSignature} alt="Signature" style={{ maxWidth: '300px', border: '1px solid #ddd', padding: '10px' }} /> : <p className="text-muted">No signature</p>}
            </div>

            <div className="form-section">
              <h2 className="form-title">Section 2 – Office Use Only</h2>
              <div className="row mb-2">
                <div className="form-field col-md-4"><label className="section-label">From</label><input type="date" value={referenceCheckData.lengthFrom || ''} readOnly className="form-control" style={{ backgroundColor: '#f5f5f5' }} /></div>
                <div className="form-field col-md-4"><label className="section-label">To</label><input type="date" value={referenceCheckData.lengthTo || ''} readOnly className="form-control" style={{ backgroundColor: '#f5f5f5' }} /></div>
                <div className="form-field col-md-4"><label className="section-label">Capacity</label><input type="text" value={referenceCheckData.rn || ''} readOnly className="form-control" style={{ backgroundColor: '#f5f5f5' }} /></div>
              </div>
              <div className="form-field mb-2"><label className="section-label">Reason for leaving</label><input type="text" value={referenceCheckData.reasonLeaving || ''} readOnly className="form-control" style={{ backgroundColor: '#f5f5f5' }} /></div>
              <div className="form-field mb-2"><label className="section-label">Eligible for rehire?</label><input type="text" value={referenceCheckData.eligibleRehire || ''} readOnly className="form-control" style={{ backgroundColor: '#f5f5f5' }} /></div>
              <div className="row mb-2">
                {['abilityFollowInstructions', 'professionalDress', 'willingnessResponsibility', 'skillsProficiency', 'overallPerformance', 'reliabilityAttendance', 'teamwork', 'qualityOfWork', 'jobKnowledge'].map(attr => (
                  <div className="form-field col-md-4" key={attr}><label className="section-label">{attr.replace(/([A-Z])/g, ' $1').trim()}</label><input type="text" value={referenceCheckData[attr] || ''} readOnly className="form-control" style={{ backgroundColor: '#f5f5f5' }} /></div>
                ))}
              </div>
              <div className="form-field mb-2"><label className="section-label">Additional Comments</label><textarea value={referenceCheckData.additionalComments || ''} readOnly className="form-control" style={{ backgroundColor: '#f5f5f5' }} rows="3" /></div>
              <div className="row mb-2">
                <div className="form-field col-md-4"><label className="section-label">Printed Name</label><input type="text" value={referenceCheckData.printName || ''} readOnly className="form-control" style={{ backgroundColor: '#f5f5f5' }} /></div>
                <div className="form-field col-md-4"><label className="section-label">Date</label><input type="date" value={referenceCheckData.dateSignature || ''} readOnly className="form-control" style={{ backgroundColor: '#f5f5f5' }} /></div>
                <div className="form-field col-md-4"><label className="section-label">Position/Title</label><input type="text" value={referenceCheckData.positionTitle || ''} readOnly className="form-control" style={{ backgroundColor: '#f5f5f5' }} /></div>
              </div>
            </div>
          </div>
        )}

        {/* Steps 5-14 would continue similarly... */}
        {/* For brevity, I'll show the pattern for remaining steps */}

        {/* Step 5: Paycheck Policy */}
        {currentStep === 5 && (
          <div className="form-section">
            <h1 className="form-title">PAYCHECK POLICY</h1>
            <div className="form-field"><label className="section-label">Preference</label><input type="text" value={paycheckPolicyData.paycheckPreference || ''} readOnly className="form-control" style={{ backgroundColor: '#f5f5f5' }} /></div>
            <div className="form-field"><label className="section-label">Mail Name</label><input type="text" value={paycheckPolicyData.paycheckMailName || ''} readOnly className="form-control" style={{ backgroundColor: '#f5f5f5' }} /></div>
            <div className="form-field"><label className="section-label">Mail Address</label><input type="text" value={paycheckPolicyData.paycheckMailAddress || ''} readOnly className="form-control" style={{ backgroundColor: '#f5f5f5' }} /></div>
            <div className="form-field"><label className="section-label">Mail City</label><input type="text" value={paycheckPolicyData.paycheckMailCity || ''} readOnly className="form-control" style={{ backgroundColor: '#f5f5f5' }} /></div>
            <div className="form-field"><label className="section-label">Mail Zip</label><input type="text" value={paycheckPolicyData.paycheckMailZip || ''} readOnly className="form-control" style={{ backgroundColor: '#f5f5f5' }} /></div>
            <div className="form-field"><label className="section-label">Acknowledgement Name</label><input type="text" value={paycheckPolicyData.acknowledgementName || ''} readOnly className="form-control" style={{ backgroundColor: '#f5f5f5' }} /></div>
            <div className="form-field"><label className="section-label">Title</label><input type="text" value={paycheckPolicyData.paycheckPolicyTitle || ''} readOnly className="form-control" style={{ backgroundColor: '#f5f5f5' }} /></div>
            <div className="form-field"><label className="section-label">Date</label><input type="date" value={paycheckPolicyData.paycheckPolicyDate || ''} readOnly className="form-control" style={{ backgroundColor: '#f5f5f5' }} /></div>
            {paycheckSignature && <img src={paycheckSignature} alt="Signature" style={{ maxWidth: '300px', border: '1px solid #ddd', padding: '10px' }} />}
          </div>
        )}

        {/* Step 6: Disciplinary Action */}
        {currentStep === 6 && (
          <div className="form-section">
            <h1 className="form-title">COMPANY DISCIPLINARY ACTION</h1>
            <div className="form-field"><label className="section-label">Title</label><input type="text" value={disciplinaryData.disciplinaryTitle || ''} readOnly className="form-control" style={{ backgroundColor: '#f5f5f5' }} /></div>
            <div className="form-field"><label className="section-label">Date</label><input type="date" value={disciplinaryData.disciplinaryDate || ''} readOnly className="form-control" style={{ backgroundColor: '#f5f5f5' }} /></div>
            {disciplinarySignature && <img src={disciplinarySignature} alt="Signature" style={{ maxWidth: '300px', border: '1px solid #ddd', padding: '10px' }} />}
          </div>
        )}

        {/* Step 7: Safety Policy */}
        {currentStep === 7 && (
          <div className="form-section">
            <h1 className="form-title">SAFETY POLICY</h1>
            <div className="form-field"><label className="section-label">Title</label><input type="text" value={safetyPolicyData.safetyPolicyTitle || ''} readOnly className="form-control" style={{ backgroundColor: '#f5f5f5' }} /></div>
            <div className="form-field"><label className="section-label">Date</label><input type="date" value={safetyPolicyData.safetyPolicyDate || ''} readOnly className="form-control" style={{ backgroundColor: '#f5f5f5' }} /></div>
            {safetySignature && <img src={safetySignature} alt="Signature" style={{ maxWidth: '300px', border: '1px solid #ddd', padding: '10px' }} />}
          </div>
        )}

        {/* Step 8: Patient Abandonment / Dress Code */}
        {currentStep === 8 && (
          <div className="form-section">
            <h1 className="form-title">PATIENT ABANDONMENT & DRESS CODE</h1>
            <div className="form-field"><label className="section-label">Title</label><input type="text" value={patientAbandonmentData.dressCodeTitle || ''} readOnly className="form-control" style={{ backgroundColor: '#f5f5f5' }} /></div>
            <div className="form-field"><label className="section-label">Date</label><input type="date" value={patientAbandonmentData.dressCodeDate || ''} readOnly className="form-control" style={{ backgroundColor: '#f5f5f5' }} /></div>
            {patientSignature && <img src={patientSignature} alt="Signature" style={{ maxWidth: '300px', border: '1px solid #ddd', padding: '10px' }} />}
          </div>
        )}

        {/* Step 9: Confidentiality Statement */}
        {currentStep === 9 && (
          <div className="form-section">
            <h1 className="form-title">CONFIDENTIALITY STATEMENT</h1>
            <div className="form-field"><label className="section-label">Date</label><input type="date" value={confidentialityData.confidentialityStatementDate || ''} readOnly className="form-control" style={{ backgroundColor: '#f5f5f5' }} /></div>
            {confidentialitySignature && <img src={confidentialitySignature} alt="Signature" style={{ maxWidth: '300px', border: '1px solid #ddd', padding: '10px' }} />}
          </div>
        )}

        {/* Step 10: Contractor Agreement */}
        {currentStep === 10 && (
          <div className="form-section">
            <h1 className="form-title">CONTRACTOR AGREEMENT</h1>
            <div className="form-field"><label className="section-label">Date</label><input type="date" value={contractorAgreementData.contractorAgreementDate || ''} readOnly className="form-control" style={{ backgroundColor: '#f5f5f5' }} /></div>
            {contractorSignature && <img src={contractorSignature} alt="Signature" style={{ maxWidth: '300px', border: '1px solid #ddd', padding: '10px' }} />}
          </div>
        )}

        {/* Step 11: Non-Discrimination Policy */}
        {currentStep === 11 && (
          <div className="form-section">
            <h1 className="form-title">NON-DISCRIMINATION POLICY</h1>
            <div className="form-field"><label className="section-label">Date</label><input type="date" value={nonDiscriminationData.nonDiscriminationDate || ''} readOnly className="form-control" style={{ backgroundColor: '#f5f5f5' }} /></div>
            {nonDiscriminationSignature && <img src={nonDiscriminationSignature} alt="Signature" style={{ maxWidth: '300px', border: '1px solid #ddd', padding: '10px' }} />}
          </div>
        )}

        {/* Step 12: Health Questionnaire */}
        {currentStep === 12 && (
          <div className="form-section">
            <h1 className="form-title">HEALTH QUESTIONNAIRE</h1>
            <div className="row mb-3">
              <div className="form-field col-md-3"><label className="section-label">Contractor Name</label><input type="text" value={healthQuestionnaireData.contractorNameHealth || ''} readOnly className="form-control" style={{ backgroundColor: '#f5f5f5' }} /></div>
              <div className="form-field col-md-3"><label className="section-label">SSN</label><input type="text" value={healthQuestionnaireData.contractorSSN || ''} readOnly className="form-control" style={{ backgroundColor: '#f5f5f5' }} /></div>
              <div className="form-field col-md-3"><label className="section-label">Height</label><input type="text" value={healthQuestionnaireData.healthHeight || ''} readOnly className="form-control" style={{ backgroundColor: '#f5f5f5' }} /></div>
              <div className="form-field col-md-3"><label className="section-label">Weight</label><input type="text" value={healthQuestionnaireData.healthWeight || ''} readOnly className="form-control" style={{ backgroundColor: '#f5f5f5' }} /></div>
            </div>
            <div className="form-field"><label className="section-label">Title</label><input type="text" value={healthQuestionnaireData.healthTitle || ''} readOnly className="form-control" style={{ backgroundColor: '#f5f5f5' }} /></div>
            <div className="form-field"><label className="section-label">Date</label><input type="date" value={healthQuestionnaireData.healthDate || ''} readOnly className="form-control" style={{ backgroundColor: '#f5f5f5' }} /></div>
            {healthSignature && <img src={healthSignature} alt="Signature" style={{ maxWidth: '300px', border: '1px solid #ddd', padding: '10px' }} />}
          </div>
        )}

        {/* Step 13: Infection Control */}
        {currentStep === 13 && (
          <div className="form-section">
            <h1 className="form-title">INFECTION CONTROL</h1>
            <div className="form-field"><label className="section-label">Title</label><input type="text" value={infectionControlData.infectionControlTitle || ''} readOnly className="form-control" style={{ backgroundColor: '#f5f5f5' }} /></div>
            <div className="form-field"><label className="section-label">Date</label><input type="date" value={infectionControlData.infectionControlDate || ''} readOnly className="form-control" style={{ backgroundColor: '#f5f5f5' }} /></div>
            {infectionSignature && <img src={infectionSignature} alt="Signature" style={{ maxWidth: '300px', border: '1px solid #ddd', padding: '10px' }} />}
          </div>
        )}

        {/* Step 14: Policy Statement */}
        {currentStep === 14 && (
          <div className="form-section">
            <h1 className="form-title">POLICY STATEMENT</h1>
            <div className="form-field"><label className="section-label">Title</label><input type="text" value={policyStatementData.policyTitle || ''} readOnly className="form-control" style={{ backgroundColor: '#f5f5f5' }} /></div>
            <div className="form-field"><label className="section-label">Date</label><input type="date" value={policyStatementData.policyDate || ''} readOnly className="form-control" style={{ backgroundColor: '#f5f5f5' }} /></div>
            {policySignature && <img src={policySignature} alt="Signature" style={{ maxWidth: '300px', border: '1px solid #ddd', padding: '10px' }} />}
          </div>
        )}
      </div>
    </div>
  );
};

export default FinalApplicationView5;
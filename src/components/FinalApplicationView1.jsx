// components/Admin/FinalApplicationView1.jsx
import React, { useState } from 'react';
import { base_url } from "../components/config";

const FinalApplicationView1 = ({ data }) => {
  const [currentStep, setCurrentStep] = useState(1);

  const steps = [
    "Eligibility Verification",
    "Taxpayer Identification",
    "Attestation Compliance",
    "Attestation Offenses",
    "Background Screening",
    "Employee Attestation",
    "Policy Acknowledge",
    "Background Attestation",
    "Patient Abandonment",
    "Charges Offenses",
    "Charges Offenses",
    "Charges Offenses",
    "Check Authorization",
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

  const w9Data = getStepData('final_w9');
  const attestationData = getStepData('final_attest_compliance');
  const bgScreeningData = getStepData('final_bg_screening');
  const employeeAttestData = getStepData('final_employee_attest');
  const policyAckData = getStepData('final_policy_ack');
  const bgAttestData = getStepData('final_bg_attest');
  const patientAbandonData = getStepData('final_patient_abandon');
  const bgAuthData = getStepData('final_bg_auth');

  const w9Signature = getSignature('final_w9');
  const employeeAttestSignature = getSignature('final_employee_attest');
  const policyAckSignature = getSignature('final_policy_ack');
  const patientAbandonSignature = getSignature('final_patient_abandon');
  const bgAuthSignature = getSignature('final_bg_auth');

  // Helper to get status for progress steps
  const getStepStatus = (stepNumber) => {
    // This would come from formProgress in real implementation
    // For now, check if step data exists
    const stepNameMap = {
      2: 'final_w9',
      3: 'final_attest_compliance',
      5: 'final_bg_screening',
      6: 'final_employee_attest',
      7: 'final_policy_ack',
      8: 'final_bg_attest',
      9: 'final_patient_abandon',
      13: 'final_bg_auth',
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

        {/* Step 1: Eligibility Verification (PDF) */}
        {currentStep === 1 && (
          <div style={{ height: '100vh', width: '100%', backgroundColor: '#ffffff', display: 'flex', justifyContent: 'center', alignItems: 'flex-start', overflow: 'auto' }}>
            {data?.final_eligibility?.pdfFieldData ? (
              <div className="form-section">
                <h1 className="form-title">Eligibility Verification - PDF Data</h1>
                <pre style={{ backgroundColor: '#f5f5f5', padding: '15px', borderRadius: '5px', overflow: 'auto' }}>
                  {JSON.stringify(data.final_eligibility.pdfFieldData, null, 2)}
                </pre>
              </div>
            ) : (
              <p className="text-muted">No eligibility data available</p>
            )}
          </div>
        )}

        {/* Step 2: W-9 Form */}
        {currentStep === 2 && (
          <>
            <div className="form-section" style={{ border: '3px solid #000', padding: '0' }}>
              <div className="row" style={{ margin: '0', alignItems: 'stretch' }}>
                <div className="col-md-2" style={{ padding: '12px 10px', borderRight: '2px solid #000' }}>
                  <p className="form-note" style={{ margin: '0', fontSize: '13px', lineHeight: '1.2' }}>Form <b style={{ fontSize: '30px', color: '#000' }}>W-9</b></p>
                  <p className="form-note" style={{ margin: '5px 0 0 0', fontSize: '11px', lineHeight: '1.2' }}>(Rev. March 2024)</p>
                  <p className="form-note" style={{ margin: '10px 0 0 0', fontSize: '11px', lineHeight: '1.3' }}>Department of the Treasury<br />Internal Revenue Service</p>
                </div>
                <div className="col-md-8 text-center" style={{ padding: '15px 20px', borderRight: '2px solid #000' }}>
                  <h1 className="form-title text-center" style={{ fontSize: '22px', fontWeight: 'bold', margin: '0 0 8px 0' }}>Request for Taxpayer<br />Identification Number and Certification</h1>
                  <p className="form-note" style={{ margin: '8px 0 0 0', fontSize: '15px' }}>Go to <b><i>www.irs.gov/FormW9</i></b> for instructions and the latest information.</p>
                </div>
                <div className="col-md-2" style={{ padding: '15px 10px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <p className="form-note" style={{ margin: '0', fontSize: '20px', lineHeight: '1.3', textAlign: 'center', color: '#000' }}><b>Give form to the requester. Do not send to the IRS.</b></p>
                </div>
              </div>
            </div>

            <div className="form-section" style={{ border: '3px solid #000', borderTop: 'none', padding: '8px 12px', backgroundColor: '#fff' }}>
              <p className="form-note" style={{ margin: '0', lineHeight: '1.3' }}><b>Before you begin.</b> For guidance related to the purpose of Form W-9, see <i>Purpose of Form</i>, below. <b>Print or type.</b></p>
            </div>

            <div className="form-section" style={{ border: '3px solid #000', borderTop: 'none', padding: '0' }}>
              <div style={{ borderBottom: '2px solid #000', padding: '10px 12px' }}>
                <div className="form-field" style={{ marginBottom: '10px' }}>
                  <label className="section-label"><b>1</b>&nbsp;&nbsp;Name of entity/individual</label>
                  <input type="text" value={w9Data.w9Name || ''} readOnly className="form-control" style={{ backgroundColor: '#f5f5f5' }} />
                </div>
                <div className="form-field">
                  <label className="section-label"><b>2</b>&nbsp;&nbsp;Business name/disregarded entity name</label>
                  <input type="text" value={w9Data.businessName || ''} readOnly className="form-control" style={{ backgroundColor: '#f5f5f5' }} />
                </div>
              </div>

              <div className="row" style={{ margin: '0' }}>
                <div className="col-md-8" style={{ padding: '12px', borderRight: '2px solid #000' }}>
                  <label className="section-label"><b>3a</b>&nbsp;&nbsp;Federal tax classification</label>
                  <div style={{ marginTop: '10px' }}>
                    <p><strong>Selected:</strong> {w9Data.taxClass || 'Not specified'}</p>
                    {w9Data.llcClassification && <p><strong>LLC Classification:</strong> {w9Data.llcClassification}</p>}
                  </div>
                </div>
                <div className="col-md-4" style={{ padding: '12px' }}>
                  <label className="section-label"><b>4</b>&nbsp;&nbsp;Exemptions</label>
                  <p><strong>Exempt payee code:</strong> {w9Data.exemptPayee || 'N/A'}</p>
                  <p><strong>FATCA code:</strong> {w9Data.fatcaCode || 'N/A'}</p>
                </div>
              </div>

              <div className="row" style={{ margin: '0', borderTop: '2px solid #000' }}>
                <div className="col-md-8" style={{ padding: '12px', borderRight: '2px solid #000' }}>
                  <div className="form-field">
                    <label className="section-label"><b>5</b>&nbsp;&nbsp;Address</label>
                    <input type="text" value={w9Data.w9Address || ''} readOnly className="form-control" style={{ backgroundColor: '#f5f5f5' }} />
                  </div>
                  <div className="form-field" style={{ marginTop: '10px' }}>
                    <label className="section-label"><b>6</b>&nbsp;&nbsp;City, state, and ZIP code</label>
                    <input type="text" value={w9Data.w9CityStateZip || ''} readOnly className="form-control" style={{ backgroundColor: '#f5f5f5' }} />
                  </div>
                </div>
                <div className="col-md-4" style={{ padding: '12px' }}>
                  <label className="section-label">Requester's name and address</label>
                  <textarea readOnly value={w9Data.requesterAddress || ''} className="form-control" style={{ backgroundColor: '#f5f5f5', minHeight: '80px' }} />
                </div>
              </div>

              <div className="form-field" style={{ borderTop: '2px solid #000', padding: '12px' }}>
                <label className="section-label"><b>7</b>&nbsp;&nbsp;Account number(s)</label>
                <input type="text" value={w9Data.accountNumbers || ''} readOnly className="form-control" style={{ backgroundColor: '#f5f5f5' }} />
              </div>
            </div>

            <div className="form-section" style={{ border: '3px solid #000', borderTop: 'none', padding: '0' }}>
              <div style={{ backgroundColor: '#000', color: '#fff', padding: '6px 12px' }}>
                <h1 className="form-title" style={{ fontWeight: 'bold', margin: '0', color: '#fff' }}>Part I &nbsp;&nbsp;&nbsp; Taxpayer Identification Number (TIN)</h1>
              </div>
              <div style={{ padding: '12px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '15px', flexWrap: 'wrap' }}>
                  <div style={{ flex: '1', minWidth: '280px', border: '2px solid #000', padding: '10px' }}>
                    <label className="section-label" style={{ fontWeight: 'bold' }}>Social security number</label>
                    <div style={{ display: 'flex', gap: '8px', alignItems: 'center', marginTop: '8px' }}>
                      <input type="text" value={w9Data.ssn1 || ''} readOnly style={{ width: '60px', border: '1px solid #ccc', padding: '6px', textAlign: 'center', backgroundColor: '#f5f5f5' }} />
                      <span>–</span>
                      <input type="text" value={w9Data.ssn2 || ''} readOnly style={{ width: '45px', border: '1px solid #ccc', padding: '6px', textAlign: 'center', backgroundColor: '#f5f5f5' }} />
                      <span>–</span>
                      <input type="text" value={w9Data.ssn3 || ''} readOnly style={{ width: '70px', border: '1px solid #ccc', padding: '6px', textAlign: 'center', backgroundColor: '#f5f5f5' }} />
                    </div>
                  </div>
                  <div style={{ fontSize: '13px', fontWeight: 'bold' }}>or</div>
                  <div style={{ flex: '1', minWidth: '280px', border: '2px solid #000', padding: '10px' }}>
                    <label className="section-label" style={{ fontWeight: 'bold' }}>Employer identification number</label>
                    <div style={{ display: 'flex', gap: '8px', alignItems: 'center', marginTop: '8px' }}>
                      <input type="text" value={w9Data.ein1 || ''} readOnly style={{ width: '45px', border: '1px solid #ccc', padding: '6px', textAlign: 'center', backgroundColor: '#f5f5f5' }} />
                      <span>–</span>
                      <input type="text" value={w9Data.ein2 || ''} readOnly style={{ width: '110px', border: '1px solid #ccc', padding: '6px', textAlign: 'center', backgroundColor: '#f5f5f5' }} />
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="form-section" style={{ border: '3px solid #000', borderTop: 'none', padding: '0' }}>
              <div style={{ backgroundColor: '#000', color: '#fff', padding: '6px 12px' }}>
                <h1 className="form-title" style={{ fontWeight: 'bold', margin: '0', color: '#fff' }}>Part II &nbsp;&nbsp;&nbsp; Certification</h1>
              </div>
              <div style={{ padding: '12px' }}>
                <div className="row" style={{ margin: '0' }}>
                  <div className="col-md-1" style={{ padding: '0', borderRight: '2px solid #000', textAlign: 'center' }}>
                    <div style={{ fontWeight: 'bold', padding: '20px 5px 0 5px' }}><b>Sign<br />Here</b></div>
                  </div>
                  <div className="col-md-7" style={{ padding: '0 15px' }}>
                    <label className="section-label" style={{ fontWeight: 'bold' }}>Signature of U.S. person</label>
                    {w9Signature ? (
                      <div className="signature-display">
                        <img src={w9Signature} alt="Signature" style={{ maxWidth: '300px', border: '1px solid #ddd', padding: '10px' }} />
                      </div>
                    ) : (
                      <p className="text-muted">No signature provided</p>
                    )}
                  </div>
                  <div className="form-field col-md-4" style={{ padding: '0 0 0 15px' }}>
                    <label className="section-label" style={{ fontWeight: 'bold' }}>Date</label>
                    <input type="date" value={w9Data.w9SignDate || ''} readOnly className="form-control" style={{ backgroundColor: '#f5f5f5' }} />
                  </div>
                </div>
              </div>
            </div>

            <div className="form-section" style={{ border: '3px solid #000', borderTop: 'none', padding: '15px' }}>
              <h1 className="form-title" style={{ fontSize: '22px', fontWeight: 'bold', margin: '0 0 12px 0' }}>General Instructions</h1>
              <p className="form-note">Section references are to the Internal Revenue Code unless otherwise noted.</p>
            </div>
          </>
        )}

        {/* Step 3: Attestation Compliance */}
        {currentStep === 3 && (
          <div className="attestation-compliance-container">
            <div className="row align-items-center mb-4">
              <div className="col-md-8 col-12 text-center text-md-start mb-3 mb-md-0">
                <img src="/images/2.png" alt="Agency for Health Care Administration" className="img-fluid" style={{ maxWidth: "120px" }} />
              </div>
              <div className="col-md-4 col-12 text-center">
                <h1 className="form-title mb-0 text-center" style={{ fontSize: "24px", fontWeight: "bold" }}>ATTESTATION OF COMPLIANCE</h1>
                <h2 className="form-subtitle" style={{ fontSize: "20px" }}>with Background Screening Requirements</h2>
              </div>
            </div>

            <hr style={{ borderTop: '2px solid #000' }} />

            <div className="form-table mb-4" style={{ border: '1px solid #000' }}>
              <div className="row m-0 border-bottom border-dark">
                <div className="col-4 p-2 border-right border-dark bg-light"><b>Employee/Contractor Name:</b></div>
                <div className="col-8 p-2">{attestationData.attestationEmployeeName || 'Not provided'}</div>
              </div>
              <div className="row m-0 border-bottom border-dark">
                <div className="col-4 p-2 border-right border-dark bg-light"><b>Health Care Provider/ Employer Name:</b></div>
                <div className="col-8 p-2">{attestationData.attestationEmployerName || 'Not provided'}</div>
              </div>
              <div className="row m-0">
                <div className="col-4 p-2 border-right border-dark bg-light"><b>Address of Health Care Provider:</b></div>
                <div className="col-8 p-2">{attestationData.attestationProviderAddress || 'Not provided'}</div>
              </div>
            </div>

            <div className="row mt-3" style={{ fontSize: '12px' }}>
              <div className="col-md-6 border-right border-secondary">
                <p><b><u>Criminal offenses found in section 435.04, F.S.</u></b></p>
                <p><b>(a) Section 393.135, relating to sexual misconduct...</b></p>
                <p><b>(b) Section 394.4593, relating to sexual misconduct...</b></p>
                <p><b>(c) Section 415.111, relating to adult abuse, neglect...</b></p>
                <p><b>(d) Section 777.04, relating to attempts, solicitation...</b></p>
                <p><b>(e) Section 782.04, relating to murder.</b></p>
              </div>
              <div className="col-md-6">
                <p><b>(f) Section 782.07, relating to manslaughter...</b></p>
                <p><b>(g) Section 782.071, relating to vehicular homicide.</b></p>
                <p><b>(h) Section 782.09, relating to killing of an unborn quick child...</b></p>
                <p><b>(i) Chapter 784, relating to assault, battery (felony).</b></p>
                <p><b>(j) Section 784.011, relating to assault (minor victim).</b></p>
                <p><b>(k) Section 784.03, relating to battery (minor victim).</b></p>
                <p><b>(l) Section 787.01, relating to kidnapping.</b></p>
              </div>
            </div>
          </div>
        )}

        {/* Step 4: Attestation Offenses - Static Content */}
        {currentStep === 4 && (
          <div className="form-section">
            <div className="row">
              <div className="col-md-6">
                <p className="form-note"><b>(m) Section 787.02, relating to false imprisonment.</b></p>
                <p className="form-note"><b>(n) Section 787.025, relating to luring or enticing a child.</b></p>
                <p className="form-note"><b>(o) Section 787.04(2), relating to taking, enticing, or removing a child beyond state limits...</b></p>
                <p className="form-note"><b>(p) Section 787.04(3), relating to carrying a child beyond state lines...</b></p>
                <p className="form-note"><b>(q) Section 790.115(1), relating to exhibiting firearms or weapons within 1,000 feet of a school.</b></p>
                <p className="form-note"><b>(r) Section 790.115(2)(b), relating to possessing weapons on school property.</b></p>
                <p className="form-note"><b>(s) Section 794.011, relating to sexual battery.</b></p>
                <p className="form-note"><b>(t) Former s. 794.041, relating to prohibited acts of persons in familial or custodial authority.</b></p>
                <p className="form-note"><b>(u) Section 794.05, relating to unlawful sexual activity with certain minors.</b></p>
                <p className="form-note"><b>(v) Chapter 796, relating to prostitution.</b></p>
                <p className="form-note"><b>(w) Section 798.02, relating to lewd and lascivious behavior.</b></p>
                <p className="form-note"><b>(x) Chapter 800, relating to lewdness and indecent exposure.</b></p>
                <p className="form-note"><b>(y) Section 806.01, relating to arson.</b></p>
                <p className="form-note"><b>(z) Section 810.02, relating to burglary.</b></p>
                <p className="form-note"><b>(aa) Section 810.14, relating to voyeurism, if the offense is a felony.</b></p>
                <p className="form-note"><b>(bb) Section 810.145, relating to video voyeurism, if the offense is a felony.</b></p>
                <p className="form-note"><b>(cc) Chapter 812, relating to theft, robbery, and related crimes, if the offense is a felony.</b></p>
                <p className="form-note"><b>(dd) Section 817.563, relating to fraudulent sale of controlled substances, only if the offense was a felony.</b></p>
                <p className="form-note"><b>(ee) Section 825.102, relating to abuse, aggravated abuse, or neglect of an elderly person or disabled adult.</b></p>
                <p className="form-note"><b>(ff) Section 825.1025, relating to lewd or lascivious offenses committed upon or in the presence of an elderly person or disabled adult.</b></p>
                <p className="form-note"><b>(gg) Section 825.103, relating to exploitation of an elderly person or disabled adult, if the offense was a felony.</b></p>
              </div>
              <div className="col-md-6">
                <p className="form-note"><b>(hh) Section 826.04, relating to incest.</b></p>
                <p className="form-note"><b>(ii) Section 827.03, relating to child abuse, aggravated child abuse, or neglect of a child.</b></p>
                <p className="form-note"><b>(jj) Section 827.04, relating to contributing to the delinquency or dependency of a child.</b></p>
                <p className="form-note"><b>(kk) Former s. 827.05, relating to negligent treatment of children.</b></p>
                <p className="form-note"><b>(ll) Section 827.071, relating to sexual performance by a child.</b></p>
                <p className="form-note"><b>(mm) Section 843.01, relating to resisting arrest with violence.</b></p>
                <p className="form-note"><b>(nn) Section 843.025, relating to depriving a law enforcement officer means of protection.</b></p>
                <p className="form-note"><b>(oo) Section 843.12, relating to aiding in an escape.</b></p>
                <p className="form-note"><b>(pp) Section 843.13, relating to aiding in the escape of juvenile inmates.</b></p>
                <p className="form-note"><b>(qq) Chapter 847, relating to obscene literature.</b></p>
                <p className="form-note"><b>(rr) Section 874.05(1), relating to encouraging or recruiting another to join a criminal gang.</b></p>
                <p className="form-note"><b>(ss) Chapter 893, relating to drug abuse prevention and control, only if the offense was a felony.</b></p>
                <p className="form-note"><b>(tt) Section 916.1075, relating to sexual misconduct with certain forensic clients.</b></p>
                <p className="form-note"><b>(uu) Section 944.35(3), relating to inflicting cruel or inhuman treatment on an inmate.</b></p>
                <p className="form-note"><b>(vv) Section 944.40, relating to escape.</b></p>
                <p className="form-note"><b>(ww) Section 944.46, relating to harboring, concealing, or aiding an escaped prisoner.</b></p>
                <p className="form-note"><b>(xx) Section 944.47, relating to introduction of contraband into a correctional facility.</b></p>
                <p className="form-note"><b>(yy) Section 985.701, relating to sexual misconduct in juvenile justice programs.</b></p>
                <p className="form-note"><b>(zz) Section 985.711, relating to contraband introduced into detention facilities.</b></p>
              </div>
            </div>
          </div>
        )}

        {/* Step 5: Background Screening */}
        {currentStep === 5 && (
          <>
            <div className="form-section">
              <h1 className="section-label"><u><b>Criminal offenses found in section 408.809(4), F.S.</b></u></h1>
              <div className="row mt-2">
                <div className="col-md-6">
                  <p className="form-note"><b>(a) Any authorizing statutes, if the offense was a felony.</b></p>
                  <p className="form-note"><b>(b) This chapter, if the offense was a felony.</b></p>
                  <p className="form-note"><b>(c) Section 409.920, relating to Medicaid provider fraud.</b></p>
                  <p className="form-note"><b>(d) Section 409.9201, relating to Medicaid fraud.</b></p>
                  <p className="form-note"><b>(e) Section 741.28, relating to domestic violence.</b></p>
                  <p className="form-note"><b>(f) Section 777.04, relating to attempts, solicitation...</b></p>
                  <p className="form-note"><b>(g) Section 817.034, relating to fraudulent acts through mail...</b></p>
                  <p className="form-note"><b>(h) Section 817.234, relating to false and fraudulent insurance claims.</b></p>
                  <p className="form-note"><b>(i) Section 817.481, relating to obtaining goods by using a false credit card...</b></p>
                  <p className="form-note"><b>(j) Section 817.50, relating to fraudulently obtaining goods from a health care provider.</b></p>
                  <p className="form-note"><b>(k) Section 817.505, relating to patient brokering.</b></p>
                  <p className="form-note"><b>(l) Section 817.568, relating to criminal use of personal identification information.</b></p>
                </div>
                <div className="col-md-6">
                  <p className="form-note"><b>(m) Section 817.60, relating to obtaining a credit card through fraudulent means.</b></p>
                  <p className="form-note"><b>(n) Section 817.61, relating to fraudulent use of credit cards...</b></p>
                  <p className="form-note"><b>(o) Section 831.01, relating to forgery.</b></p>
                  <p className="form-note"><b>(p) Section 831.02, relating to uttering forged instruments.</b></p>
                  <p className="form-note"><b>(q) Section 831.07, relating to forging bank bills, checks...</b></p>
                  <p className="form-note"><b>(r) Section 831.09, relating to uttering forged bank bills...</b></p>
                  <p className="form-note"><b>(s) Section 831.30, relating to fraud in obtaining medicinal drugs.</b></p>
                  <p className="form-note"><b>(t) Section 831.31, relating to counterfeit controlled substances...</b></p>
                  <p className="form-note"><b>(u) Section 895.03, relating to racketeering.</b></p>
                  <p className="form-note"><b>(v) Section 896.101, relating to the Florida Money Laundering Act.</b></p>
                </div>
              </div>
            </div>

            <div className="form-section border p-3">
              <div className="row mb-3">
                <div className="col-12">
                  <label className="checkbox-label d-flex align-items-start">
                    <input type="checkbox" checked={bgScreeningData.exemptionAHCA || false} readOnly disabled />
                    <span className="ms-2"><b>I have been granted an Exemption from Disqualification through AHCA.</b></span>
                  </label>
                  {bgScreeningData.ahcaDecisionDate && (
                    <div className="form-field mt-2 d-flex">
                      <i className="me-2 mb-2">Date of Decision:</i>
                      <span>{bgScreeningData.ahcaDecisionDate}</span>
                    </div>
                  )}
                </div>
              </div>
              <div className="row">
                <div className="col-12">
                  <label className="checkbox-label d-flex align-items-start">
                    <input type="checkbox" checked={bgScreeningData.exemptionDOH || false} readOnly disabled />
                    <span className="ms-2"><b>I have been granted an Exemption from Disqualification through the Florida Department of Health.</b></span>
                  </label>
                  {bgScreeningData.dohDecisionDate && (
                    <div className="form-field mt-2 d-flex">
                      <i className="me-2 mb-2">Date of Decision:</i>
                      <span>{bgScreeningData.dohDecisionDate}</span>
                    </div>
                  )}
                </div>
              </div>
            </div>

            <div className="form-section border p-3 mt-4">
              <h5>Prior Level 2 screening information:</h5>
              <div className="row mt-3">
                <div className="form-field col-md-12 d-flex">
                  <label className="section-label mb-0">Purpose of Prior Screening:</label>
                  <span className="ms-2">{bgScreeningData.priorScreeningPurpose || 'Not provided'}</span>
                </div>
              </div>
              <div className="row mt-2">
                <div className="form-field col-md-6 d-flex">
                  <label className="section-label me-2 mb-0">Screening conducted by:</label>
                  <span>{bgScreeningData.screeningAgencyName || 'Not provided'}</span>
                </div>
                <div className="form-field col-md-6 d-flex">
                  <label className="section-label me-2 mb-0">Date of Prior Screening:</label>
                  <span>{bgScreeningData.priorScreeningDate || 'Not provided'}</span>
                </div>
              </div>
              <div className="row mt-3">
                <div className="col-md-6">
                  <label className="checkbox-label"><input type="checkbox" checked={bgScreeningData.agencyAHCA || false} readOnly disabled /><span className="ms-2">AHCA</span></label>
                  <label className="checkbox-label"><input type="checkbox" checked={bgScreeningData.agencyDOH || false} readOnly disabled /><span className="ms-2">DOH</span></label>
                  <label className="checkbox-label"><input type="checkbox" checked={bgScreeningData.agencyAPD || false} readOnly disabled /><span className="ms-2">APD</span></label>
                </div>
                <div className="col-md-6">
                  <label className="checkbox-label"><input type="checkbox" checked={bgScreeningData.agencyDOEA || false} readOnly disabled /><span className="ms-2">DOEA</span></label>
                  <label className="checkbox-label"><input type="checkbox" checked={bgScreeningData.agencyDFS || false} readOnly disabled /><span className="ms-2">DFS</span></label>
                  <label className="checkbox-label"><input type="checkbox" checked={bgScreeningData.agencyDCF || false} readOnly disabled /><span className="ms-2">DCF</span></label>
                </div>
              </div>
            </div>
          </>
        )}

        {/* Step 6: Employee Attestation */}
        {currentStep === 6 && (
          <div style={{ fontFamily: 'Arial, sans-serif', padding: '20px', color: '#333' }}>
            <h2 style={{ fontSize: '22px', fontWeight: '500', marginBottom: '20px' }} className='form-title'>Attestation</h2>
            <div className="form-section" style={{ marginBottom: '40px' }}>
              <p style={{ lineHeight: '1.8', fontSize: '16px', color: '#555', fontStyle: 'italic' }}>
                Under penalty of perjury, I, <strong>{employeeAttestData.finalAttestName || '_____________'}</strong>,
                hereby swear or affirm that I meet the requirements for qualifying for employment...
              </p>
            </div>
            <div className="form-section">
              <div className="row align-items-end">
                <div className="col-md-6" style={{ marginBottom: '20px' }}>
                  <label style={{ display: 'block', fontSize: '14px', fontWeight: '700' }}>Employee/Contractor Signature</label>
                  {employeeAttestSignature ? (
                    <img src={employeeAttestSignature} alt="Signature" style={{ maxWidth: '300px', border: '1px solid #ddd', padding: '10px' }} />
                  ) : (
                    <p className="text-muted">No signature</p>
                  )}
                </div>
                <div className="col-md-3" style={{ marginBottom: '20px' }}>
                  <label style={{ display: 'block', fontSize: '14px', fontWeight: '700' }}>Title</label>
                  <input type="text" value={employeeAttestData.finalAttestTitle || ''} readOnly className="form-control" style={{ backgroundColor: '#f5f5f5' }} />
                </div>
                <div className="col-md-3" style={{ marginBottom: '20px' }}>
                  <label style={{ display: 'block', fontSize: '14px', fontWeight: '700' }}>Date</label>
                  <input type="date" value={employeeAttestData.finalAttestDate || ''} readOnly className="form-control" style={{ backgroundColor: '#f5f5f5' }} />
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Step 7: Policy Acknowledge */}
        {currentStep === 7 && (
          <>
            <div className="form-section text-center">
              <h1 className="form-title">PRIVACY POLICY ACKNOWLEDGEMENT FORM</h1>
            </div>
            <div className="form-section">
              <p className="form-note mb-4">I acknowledge that I have received a copy of the privacy policies...</p>
            </div>
            <div className="form-section mt-4">
              <div className="form-field mb-5">
                <label className="form-note">Employee/Contractor Name (Printed)</label>
                <input type="text" value={policyAckData.privacyPrintedName || ''} readOnly className="form-control" style={{ backgroundColor: '#f5f5f5' }} />
              </div>
              <div className='col-md-6'>
                <label className="form-note">Employee/Contractor Signature</label>
                {policyAckSignature ? (
                  <img src={policyAckSignature} alt="Signature" style={{ maxWidth: '300px', border: '1px solid #ddd', padding: '10px' }} />
                ) : (
                  <p className="text-muted">No signature</p>
                )}
              </div>
              <div className="form-field mb-4">
                <label className="form-note">Date</label>
                <input type="date" value={policyAckData.privacyDate || ''} readOnly className="form-control" style={{ backgroundColor: '#f5f5f5' }} />
              </div>
            </div>
          </>
        )}

{/* Step 8: Background Attestation / DOEA */}
{currentStep === 8 && (
  <div className="doea-form-container" style={{ maxWidth: '900px', margin: 'auto', color: '#000', padding: '20px' }}>
    <div className="doea-header" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', marginBottom: '20px' }}>
      <div className="doea-logo">
        <img src="../../images/0.jpg" alt="Elder Affairs Florida" style={{ height: '160px' }} />
      </div>
    </div>

    <div style={{ textAlign: 'center', marginBottom: '20px' }}>
      <h1 style={{ fontSize: '18px', margin: 0, fontWeight: 'bold' }}>DEPARTMENT OF ELDER AFFAIRS BACKGROUND SCREENING</h1>
    </div>

    <h2 style={{ fontSize: '16px', textAlign: 'center', marginBottom: '20px', fontWeight: 'bold' }}>ATTESTATION OF COMPLIANCE – APPLICANT</h2>

    <p style={{ fontSize: '15px', marginBottom: '20px' }} className='text-center'>
      This form is required by all applicants to comply with section 435.05(2), F.S., which states:
    </p>

    <div style={{ textAlign: 'center', padding: '0 40px', marginBottom: '30px' }}>
      <p style={{ fontWeight: 'bold', lineHeight: '1.5' }}>
        Every applicant for employment or volunteer services must attest, subject to penalty of perjury, to meeting the requirements for employment or other services pursuant to this chapter and agreeing to inform the employer or designated individual immediately if arrested for any of the disqualifying offenses while employed or providing services.
      </p>
    </div>

    <div style={{ border: '1px solid #000' }}>
      <div style={{ borderBottom: '1px solid #000', padding: '10px' }}>
        <label style={{ display: 'block', fontSize: '13px', fontWeight: 'bold', marginBottom: '5px' }}>TYPE OF PERSONAL IDENTIFICATION PROVIDED:</label>
        <input type="text" value={bgAttestData.doeaIdType || ''} readOnly className="form-control" style={{ backgroundColor: '#f5f5f5' }} />
      </div>

      <div style={{ borderBottom: '1px solid #000', padding: '10px' }}>
        <label style={{ display: 'block', fontSize: '13px', fontWeight: 'bold', marginBottom: '5px' }}>APPLICANT (first name, middle name, last name):</label>
        <input type="text" value={bgAttestData.doeaApplicantName || ''} readOnly className="form-control" style={{ backgroundColor: '#f5f5f5' }} />
      </div>

      <div style={{ borderBottom: '1px solid #000', padding: '10px' }}>
        <label style={{ display: 'block', fontSize: '13px', fontWeight: 'bold', marginBottom: '5px' }}>POSITION APPLIED:</label>
        <input type="text" value={bgAttestData.doeaPosition || ''} readOnly className="form-control" style={{ backgroundColor: '#f5f5f5' }} />
      </div>

      <div style={{ padding: '10px' }}>
        <label style={{ display: 'block', fontSize: '13px', fontWeight: 'bold', marginBottom: '5px' }}>EMPLOYER:</label>
        <input type="text" value={bgAttestData.doeaEmployer || ''} readOnly className="form-control" style={{ backgroundColor: '#f5f5f5' }} />
        <p style={{ fontSize: '14px', fontWeight: 'bold', marginTop: '10px', marginBottom: 0 }}>
          It is the Employer’s responsibility to verify the authenticity and accuracy of any document provided for identification.
        </p>
      </div>
    </div>

    <div style={{ border: '2px solid #002e5d', padding: '20px', marginTop: '25px' }}>
      <p style={{ fontSize: '14px', fontWeight: 'bold', marginBottom: '15px' }}>
        IF YOU ARE CLAIMING AN EXCEPTION TO BACKGROUND SCREENING, PURSUANT TO SECTION 430.0402(2) FLORIDA STATUTES, PROVIDE SUPPORTING DOCUMENTATION. Check one:
      </p>
      <div className="row">
        <div className="col-md-6 mb-3">
          <span style={{ fontSize: '14px' }}>Volunteer under 20 hours:</span>
          <input type="text" value={bgAttestData.doeaVolunteerHours || ''} readOnly className="form-control" style={{ width: '100px', display: 'inline-block', marginLeft: '10px', backgroundColor: '#f5f5f5' }} />
        </div>
        <div className="col-md-6 mb-3">
          <span style={{ fontSize: '14px' }}>License Exception:</span>
          <input type="text" value={bgAttestData.doeaLicenseException || ''} readOnly className="form-control" style={{ width: '100px', display: 'inline-block', marginLeft: '10px', backgroundColor: '#f5f5f5' }} />
        </div>
        <div className="col-12">
          <span style={{ fontSize: '14px' }}>Type of License:</span>
          <input type="text" value={bgAttestData.doeaLicenseType || ''} readOnly className="form-control" style={{ width: '300px', display: 'inline-block', marginLeft: '10px', backgroundColor: '#f5f5f5' }} />
        </div>
      </div>
    </div>
  </div>
)}

{/* Step 9: Patient Abandonment */}
{currentStep === 9 && (
  <div className="doea-form-container" style={{ maxWidth: '900px', margin: 'auto', color: '#000', padding: '20px' }}>
    <div style={{ border: '1px solid #000', padding: '15px', marginBottom: '30px' }}>
      <p style={{ fontSize: '14px', fontWeight: 'bold', marginBottom: '15px', textTransform: 'uppercase', lineHeight: '1.4' }}>
        IF THE APPLICANT HAS RECEIVED AN EXEMPTION FOR A DISQUALIFYING OFFENSE,
        PLEASE STATE WHICH AGENCY AND PROVIDE A COPY OF THE LETTER(S) GRANTING
        THAT EXEMPTION.
      </p>
      <div style={{ display: 'flex', alignItems: 'flex-end', marginBottom: '10px' }}>
        <label style={{ fontSize: '14px', whiteSpace: 'nowrap', marginRight: '10px' }}>Agency/Date</label>
        <input type="text" value={patientAbandonData.doeaExemptionAgencyDate || ''} readOnly className="form-control" style={{ flex: 1, backgroundColor: '#f5f5f5' }} />
      </div>
      <div style={{ display: 'flex', alignItems: 'flex-end' }}>
        <label style={{ fontSize: '14px', whiteSpace: 'nowrap', marginRight: '10px' }}>If more than one Agency, please list:</label>
        <input type="text" value={patientAbandonData.doeaExemptionMultipleAgencies || ''} readOnly className="form-control" style={{ flex: 1, backgroundColor: '#f5f5f5' }} />
      </div>
    </div>

    <div style={{ border: '1px solid #000', padding: '15px', textAlign: 'center', marginBottom: '40px' }}>
      <p style={{ margin: 0, fontSize: '15px', fontWeight: 'bold', lineHeight: '1.4' }}>
        ALL APPLICANTS FOR THIS POSITION SHOULD REVIEW THE FOLLOWING<br />
        LIST OF OFFENSES BEFORE SIGNING THE ATTESTATION.
      </p>
    </div>

    <h2 style={{ fontSize: '18px', textAlign: 'center', marginBottom: '30px', fontWeight: 'bold', letterSpacing: '1px' }}>ATTESTATION</h2>

    <div style={{ marginBottom: '20px', lineHeight: '1.8' }}>
      <span style={{ fontSize: '16px', fontWeight: 'bold' }}>UNDER PENALTY OF PERJURY, I,</span>
      <input type="text" value={patientAbandonData.doeaFinalAffiantName || ''} readOnly className="form-control" style={{ display: 'inline-block', width: '60%', marginLeft: '10px', backgroundColor: '#f5f5f5' }} />
      <span style={{ fontSize: '16px' }}>,</span>
    </div>

    <p style={{ fontSize: '15px', lineHeight: '1.6', marginBottom: '40px' }}>
      hereby swear or affirm that I meet the requirements for qualifying for employment or service provider
      pursuant to the background screening standards set forth in Chapter 435 and Section 430.0402
      of the Florida Statutes. In addition, I have no current charges pending and I understand that I must
      immediately inform my employer or designee if arrested for any of the following disqualifying
      offenses throughout the time I am employed or otherwise providing services with this employer.
    </p>

    <div className="row" style={{ marginBottom: '40px' }}>
      <div className="col-md-7">
        <div style={{ position: 'relative', borderBottom: '1px solid #000' }}>
          {patientAbandonSignature ? (
            <img src={patientAbandonSignature} alt="Signature" style={{ maxWidth: '100%', height: '80px', objectFit: 'contain' }} />
          ) : (
            <p className="text-muted" style={{ padding: '30px 10px' }}>No signature provided</p>
          )}
        </div>
        <label style={{ display: 'block', fontSize: '14px', marginTop: '8px' }}>Applicant Signature</label>
      </div>
      <div className="col-md-1"></div>
      <div className="col-md-4">
        <input type="date" value={patientAbandonData.doeaAttestationDate || ''} readOnly className="form-control" style={{ height: '80px', backgroundColor: '#f5f5f5' }} />
        <label style={{ display: 'block', fontSize: '14px', marginTop: '8px' }}>Date</label>
      </div>
    </div>

    <div style={{ marginBottom: '40px' }}>
      <p style={{ fontSize: '15px', margin: 0 }}>
        <strong>NOTE TO EMPLOYER:</strong><br />
        Once the Attestation is signed, maintain it within the Applicant’s file.
      </p>
    </div>
  </div>
)}

{/* Step 10: Charges Offenses 1 */}
{currentStep === 10 && (
  <div className="doea-form-container" style={{ maxWidth: '900px', margin: 'auto', color: '#000', padding: '20px' }}>
    <div style={{ border: '1px solid #000', marginBottom: '20px' }}>
      <div style={{ display: 'flex', backgroundColor: '#ffff00', borderBottom: '1px solid #000' }}>
        <div style={{ width: '20%', padding: '10px', borderRight: '1px solid #000', fontWeight: 'bold', fontSize: '12px', textAlign: 'center' }}>
          FLORIDA STATUTE
          <span style={{ fontWeight: 'normal', fontSize: '10px' }}>(or any similar statute of another jurisdiction)</span>
        </div>
        <div style={{ width: '80%', padding: '10px', fontSize: '11px', lineHeight: '1.3' }}>
          <strong style={{ fontSize: '13px' }}>CHARGE/OFFENSE</strong><br />
          No person subject to the provisions of this section has an arrest awaiting final disposition for, has been
          found guilty of, regardless of adjudication, or entered a plea of nolo contendere (no contest) or guilty
          to, or has been adjudicated delinquent...
        </div>
      </div>
      {[
        { statute: "39.205", offense: "Relating to the failure to report child abuse, abandonment, or neglect." },
        { statute: "393.135", offense: "Relating to sexual misconduct with certain developmentally disabled clients..." },
        { statute: "394.4593", offense: "Relating to sexual misconduct with certain mental health patients..." },
        { statute: "409.920*", offense: "Relating to Medicaid provider fraud." },
        { statute: "409.9201*", offense: "Relating to Medicaid fraud." },
        { statute: "414.39", offense: "Relating to Fraud, if the offense was a felony." },
        { statute: "415.111", offense: "Relating to abuse, neglect, or exploitation of a vulnerable adult." },
        { statute: "741.28**", offense: "Relating to domestic violence." },
        { statute: "777.04", offense: "Relating to attempts, solicitation, and conspiracy..." },
        { statute: "782.04", offense: "Relating to murder." },
        { statute: "782.07", offense: "Relating to manslaughter..." },
        { statute: "782.071", offense: "Relating to vehicular homicide." },
        { statute: "782.09", offense: "Relating to the killing of an unborn child by injury to the mother." },
        { statute: "784 – All", offense: "All of Chapter 784 offenses relating to assault, battery, and culpable negligence, if offense was a felony." },
        { statute: "784.011", offense: "Relating to assault, if the victim of the offence was a minor." },
        { statute: "784.021", offense: "Relating to aggravated assault." },
        { statute: "784.03", offense: "Relating to battery, if the victim of the offence was a minor." },
        { statute: "784.045", offense: "Relating to aggravated battery." },
        { statute: "784.075", offense: "Relating to battery on staff of a detention facility..." },
        { statute: "787.01", offense: "Relating to kidnapping." },
        { statute: "787.02", offense: "Relating to false imprisonment." },
        { statute: "787.025", offense: "Relating to luring or enticing a child." },
        { statute: "787.04(2)", offense: "Relating to taking a child beyond state limits..." },
        { statute: "787.04(3)", offense: "Relating to carrying a child beyond state lines..." },
        { statute: "787.06", offense: "Relating to human trafficking." },
        { statute: "787.07", offense: "Relating to human smuggling." },
        { statute: "790.115(1)", offense: "Relating to exhibiting firearms or weapons within 1,000 feet of a school." }
      ].map((item, index) => (
        <div key={index} style={{ display: 'flex', borderBottom: index === 26 ? 'none' : '1px solid #000', minHeight: '30px' }}>
          <div style={{ width: '20%', padding: '4px 10px', borderRight: '1px solid #000', fontSize: '13px' }}>
            {item.statute}
          </div>
          <div style={{ width: '80%', padding: '4px 10px', fontSize: '13px' }}>
            {item.offense}
          </div>
        </div>
      ))}
    </div>
  </div>
)}

{/* Step 11: Charges Offenses 2 */}
{currentStep === 11 && (
  <div className="doea-form-container" style={{ maxWidth: '900px', margin: 'auto', color: '#000', padding: '20px' }}>
    <div style={{ border: '1px solid #000', marginBottom: '20px' }}>
      {[
        { statute: "790.115(2)(b)", offense: "Relating to possessing weapons on school property." },
        { statute: "794.011", offense: "Relating to sexual battery." },
        { statute: "794.041", offense: "Relating to prohibited acts of persons in familial or custodial authority." },
        { statute: "794.05", offense: "Relating to unlawful sexual activity with certain minors." },
        { statute: "794.08", offense: "Relating to female genital mutilation." },
        { statute: "796 – All", offense: "All Chapter 796 offenses relating to prostitution." },
        { statute: "798.02", offense: "Relating to lewd and lascivious behavior." },
        { statute: "800 – All", offense: "All Chapter 800 relating to lewdness and indecent exposure..." },
        { statute: "806.01", offense: "Relating to arson." },
        { statute: "810.02", offense: "Relating to burglary." },
        { statute: "810.14", offense: "Relating to voyeurism, if the offense is a felony." },
        { statute: "810.145", offense: "Relating to video voyeurism, if the offense is a felony." },
        { statute: "812 – All", offense: "All Chapter 812 offenses relating to theft, robbery, and related crimes, if the offense was a felony." },
        { statute: "817.034*", offense: "Relating to fraudulent acts through mail, wire, radio..." },
        { statute: "817.234*", offense: "Relating to false and fraudulent insurance claims." },
        { statute: "817.505*", offense: "Relating to patient brokering." },
        { statute: "817.563", offense: "Relating to fraudulent sale of controlled substances, only if the offense was a felony." },
        { statute: "817.568*", offense: "Relating to criminal use of personal identification information." },
        { statute: "817.60*", offense: "Relating to obtaining a credit card through fraudulent means." },
        { statute: "817.61*", offense: "Relating to fraudulent use of credit cards, if the offense was a felony." },
        { statute: "825.102", offense: "Relating to abuse, aggravated abuse, or neglect of an elderly person or disabled adult." },
        { statute: "825.1025", offense: "Relating to lewd or lascivious offenses committed upon an elderly person..." },
        { statute: "825.103", offense: "Relating to exploitation of an elderly person or disabled adult, if the offense was a felony." },
        { statute: "826.04", offense: "Relating to incest." },
        { statute: "827.03", offense: "Relating to child abuse, aggravated child abuse, or neglect of a child." },
        { statute: "827.04", offense: "Relating to contributing to the delinquency or dependency of a child." },
        { statute: "827.05", offense: "Relating to negligent treatment of children." },
        { statute: "827.071", offense: "Relating to sexual performance by a child." },
        { statute: "831.311", offense: "Relating to counterfeit-resistant prescription blanks..." },
        { statute: "831.01*", offense: "Relating to forgery." }
      ].map((item, index) => (
        <div key={index} style={{ display: 'flex', borderBottom: index === 30 ? 'none' : '1px solid #000', minHeight: '30px' }}>
          <div style={{ width: '20%', padding: '4px 10px', borderRight: '1px solid #000', fontSize: '13px' }}>
            {item.statute}
          </div>
          <div style={{ width: '80%', padding: '4px 10px', fontSize: '13px' }}>
            {item.offense}
          </div>
        </div>
      ))}
    </div>
  </div>
)}

{/* Step 12: Charges Offenses 3 */}
{currentStep === 12 && (
  <div className="doea-form-container" style={{ maxWidth: '900px', margin: 'auto', color: '#000', padding: '20px' }}>
    <div style={{ border: '1px solid #000', marginBottom: '20px' }}>
      {[
        { statute: "831.02*", offense: "Relating to uttering forged instruments." },
        { statute: "831.07*", offense: "Relating to forging bank bills, checks, drafts, or promissory notes." },
        { statute: "831.09*", offense: "Relating to uttering forged bank bills, checks." },
        { statute: "836.10", offense: "Relating to written or electronic threats to kill, do bodily injury, or conduct a mass shooting..." },
        { statute: "843.01", offense: "Relating to resisting arrest with violence." },
        { statute: "843.025", offense: "Relating to depriving a law enforcement officer means of protection." },
        { statute: "843.12", offense: "Relating to aiding in an escape." },
        { statute: "843.13", offense: "Relating to aiding in the escape of juvenile inmates." },
        { statute: "847 – All", offense: "All Chapter 847 offenses relating to obscene literature." },
        { statute: "859.01", offense: "Relating to poisoning food or water." },
        { statute: "873.01", offense: "Relating to the prohibition on the purchase or sale of human organs and tissue." },
        { statute: "874.05", offense: "Relating to encouraging or recruiting another to join a criminal gang." },
        { statute: "893 – All", offense: "All Chapter 893 offenses (all drug related offenses) relating to drug abuse prevention and control..." },
        { statute: "916.1075", offense: "Relating to sexual misconduct with certain forensic clients..." },
        { statute: "944.35(3)", offense: "Relating to inflicting cruel or inhuman treatment on an inmate..." },
        { statute: "944.40", offense: "Relating to escape." },
        { statute: "944.46", offense: "Relating to harboring, concealing, or aiding an escaped prisoner." },
        { statute: "944.47", offense: "Relating to introduction of contraband into a correctional facility." },
        { statute: "985.701", offense: "Relating to sexual misconduct in juvenile justice programs." },
        { statute: "985.711", offense: "Relating to contraband introduced into detention facilities." }
      ].map((item, index) => (
        <div key={index} style={{ display: 'flex', borderBottom: index === 19 ? 'none' : '1px solid #000', minHeight: '30px' }}>
          <div style={{ width: '20%', padding: '4px 10px', borderRight: '1px solid #000', fontSize: '13px' }}>
            {item.statute}
          </div>
          <div style={{ width: '80%', padding: '4px 10px', fontSize: '13px' }}>
            {item.offense}
          </div>
        </div>
      ))}
    </div>
    <div style={{ marginTop: '10px', marginBottom: '20px' }}>
      <p style={{ fontSize: '12px', margin: '2px 0' }}>* These offenses are disqualifying only if the applicant is working with the Medicaid program.</p>
      <p style={{ fontSize: '12px', margin: '2px 0' }}>** These offenses are disqualifying only if the applicant is working with children or the elderly.</p>
    </div>
  </div>
)}

        {/* Step 13: Background Authorization */}
        {currentStep === 13 && (
          <>
            <div className="form-section">
              <h1 className="form-title">BACKGROUND CHECK AUTHORIZATION</h1>
              <p className="form-note">I voluntarily consent to and authorize QUALCARE NURSE REGISTRY...</p>
            </div>
            <div className="form-section">
              <div className="row align-items-center">
                <div className="form-field col-md-6">
                  <label className="section-label">SIGNATURE</label>
                  {bgAuthSignature ? (
                    <img src={bgAuthSignature} alt="Signature" style={{ maxWidth: '300px', border: '1px solid #ddd', padding: '10px' }} />
                  ) : (
                    <p className="text-muted">No signature</p>
                  )}
                </div>
                <div className="form-field col-md-3">
                  <label className="section-label">TITLE</label>
                  <input type="text" value={bgAuthData.backgroundTitle || ''} readOnly className="form-control" style={{ backgroundColor: '#f5f5f5' }} />
                </div>
                <div className="form-field col-md-3">
                  <label className="section-label">DATE</label>
                  <input type="date" value={bgAuthData.backgroundDate || ''} readOnly className="form-control" style={{ backgroundColor: '#f5f5f5' }} />
                </div>
              </div>
            </div>
            <div className="form-section">
              <div className="form-field">
                <label className="section-label">OTHER NAMES UNDER WHICH PREVIOUSLY EMPLOYED</label>
                <input type="text" value={bgAuthData.previousNames || ''} readOnly className="form-control" style={{ backgroundColor: '#f5f5f5' }} />
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default FinalApplicationView1;
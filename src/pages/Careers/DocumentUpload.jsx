import React, { useState } from 'react';
import { AlertCircle, CheckCircle, Clock, Upload, X } from 'lucide-react';

// STEP 6: DOCUMENT UPLOAD COMPONENT
const DocumentUpload = ({ onBack, onNext, goToStep }) => {
  const [documents, setDocuments] = useState({});

  const requiredDocuments = [
    { id: 'application_form', name: 'Application Form with ALL SIGNATURES', requiresExpiry: false },
    { id: 'liability_insurance', name: 'Liability Insurance', requiresExpiry: true },
    { id: 'orientation_form', name: 'Orientation Form', requiresExpiry: false },
    { id: 'rn_lpn_license', name: 'RN/LPN/CNA License', requiresExpiry: true },
    { id: 'hha_certification', name: 'HHA Certification', requiresExpiry: false },
    { id: 'ssn_card', name: 'Social Security Card', requiresExpiry: false },
    { id: 'drivers_license', name: 'Driver\'s License', requiresExpiry: true },
    { id: 'auto_insurance', name: 'Auto Insurance', requiresExpiry: true },
    { id: 'identity_document', name: 'Voter\'s Card, Alien Card, US Passport, US Birth Certificate, Work Authorization', requiresExpiry: true },
    { id: 'cpr_card', name: 'CPR Card (American Heart Association, American Red Cross, or Health & Safety Institute)', requiresExpiry: true },
    { id: 'physical_certificate', name: 'Physical Certificate done within the last 3-6 months stating "Free from Communicable Diseases" Yearly', requiresExpiry: true },
    { id: 'background_screening', name: 'Level 2 Background Screening', requiresExpiry: true },
    { id: 'pb_county_badge', name: 'Palm Beach County ID Badge (HHA Only)', requiresExpiry: true },
    { id: 'domestic_violence', name: 'Domestic Violence 2hr Certificate', requiresExpiry: true },
    { id: 'alzheimer_dementia', name: 'Alzheimer\'s/Dementia 3hr Certificate', requiresExpiry: true },
    { id: 'alzheimer_training', name: '1 Hour Alzheimer\'s Training - Elder Affairs of Florida', requiresExpiry: true },
    { id: 'hiv_aids', name: 'HIV/AIDS 4hr Certificate', requiresExpiry: true },
    { id: 'hipaa_update', name: 'HIPAA Update 4hr Certificate', requiresExpiry: true },
    { id: 'osha_update', name: 'OSHA Update 4hr Certificate/2hr Certificate', requiresExpiry: true },
    { id: 'medication_cert', name: 'Self-Administered Medication 2hr Certificate', requiresExpiry: true },
    { id: 'cognitive_communication', name: 'Communications Cognitively Impaired Patients (CNAs)', requiresExpiry: true },
    { id: 'patient_rights', name: 'Patient Rights 2hrs (CNAs)', requiresExpiry: true },
    { id: 'medical_records', name: 'Medical Records Documentation 2hrs(CNAs)', requiresExpiry: true },
    { id: 'medical_errors', name: 'Medical Errors Update 2hrs(CNA, LPN, RN)', requiresExpiry: true },
    { id: 'fl_laws_rules', name: 'Florida laws and rules (LPN, RN, HHA and CNA)', requiresExpiry: true },
    { id: 'prof_liability', name: 'Professional Liability Insurance (see office for online application)', requiresExpiry: true },
    { id: 'federal_tax_ein', name: 'Federal Tax EIN (Employer Identification Number not required) Must have paper from IRS', requiresExpiry: false }
  ];

  const handleFileUpload = (docId, file) => {
    if (file) {
      setDocuments({
        ...documents,
        [docId]: {
          ...documents[docId],
          file: file,
          fileName: file.name,
          uploadDate: new Date().toISOString()
        }
      });
    }
  };

  const handleExpiryChange = (docId, expiryDate) => {
    setDocuments({
      ...documents,
      [docId]: {
        ...documents[docId],
        expiryDate: expiryDate
      }
    });
  };

  const handleRemoveFile = (docId) => {
    const newDocs = { ...documents };
    delete newDocs[docId];
    setDocuments(newDocs);
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
          <div className="step" onClick={() => goToStep(1)}>
            <div className="step-number">1</div>
            <span className="step-label">Pre-Employment</span>
          </div>
          <div className="step" onClick={() => goToStep(2)}>
            <div className="step-number">2</div>
            <span className="step-label">Education</span>
          </div>
          <div className="step" onClick={() => goToStep(3)}>
            <div className="step-number">3</div>
            <span className="step-label">Experience</span>
          </div>
          <div className="step" onClick={() => goToStep(4)}>
            <div className="step-number">4</div>
            <span className="step-label">References</span>
          </div>
          <div className="step" onClick={() => goToStep(5)}>
            <div className="step-number">5</div>
            <span className="step-label">Skills</span>
          </div>
          <div className="step active" onClick={() => goToStep(6)}>
            <div className="step-number">6</div>
            <span className="step-label">Documents</span>
          </div>
          <div className="step" onClick={() => goToStep(7)}>
            <div className="step-number">7</div>
            <span className="step-label">Review</span>
          </div>
        </div>

        <div className="progress-bar">
          <div className="progress-text">Step 6 of 7</div>
          <div className="progress-track">
            <div className="progress-fill" style={{ width: '85.71%' }}></div>
          </div>
        </div>

        <p className="required-note"><span className="required">*</span> indicates required fields</p>

        <h1 className="form-title">DOCUMENT UPLOAD</h1>

        <div style={{ marginBottom: '2rem' }}>
          {requiredDocuments.map((doc) => (
            <div key={doc.id} style={{ 
              marginBottom: '1.5rem', 
              padding: '1rem', 
              border: '1px solid #ddd', 
              borderRadius: '8px',
              backgroundColor: '#fff'
            }}>
              <label style={{ 
                display: 'block', 
                fontWeight: 'bold', 
                marginBottom: '0.75rem',
                fontSize: '14px'
              }}>
                {doc.name} <span className="required">*</span>
              </label>
              
              <div style={{ display: 'flex', gap: '1rem', alignItems: 'flex-start', flexWrap: 'wrap' }}>
                <div style={{ flex: '1', minWidth: '250px' }}>
                  <input
                    type="file"
                    onChange={(e) => handleFileUpload(doc.id, e.target.files[0])}
                    style={{ width: '100%' }}
                    accept=".pdf,.jpg,.jpeg,.png,.doc,.docx"
                  />
                  {documents[doc.id]?.fileName && (
                    <div style={{ 
                      marginTop: '0.5rem', 
                      padding: '0.5rem',
                      backgroundColor: '#d4edda',
                      borderRadius: '4px',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between'
                    }}>
                      <span style={{ color: '#155724', fontSize: '13px', display: 'flex', alignItems: 'center' }}>
                        ✓ {documents[doc.id].fileName}
                      </span>
                      <button
                        type="button"
                        onClick={() => handleRemoveFile(doc.id)}
                        style={{
                          background: 'transparent',
                          border: 'none',
                          color: '#721c24',
                          cursor: 'pointer',
                          fontSize: '18px',
                          padding: '0 5px'
                        }}
                      >
                        ×
                      </button>
                    </div>
                  )}
                </div>

                {doc.requiresExpiry && documents[doc.id]?.file && (
                  <div style={{ width: '200px' }}>
                    <label style={{ 
                      display: 'block', 
                      fontSize: '13px', 
                      fontWeight: '600',
                      marginBottom: '0.25rem' 
                    }}>
                      Expiration Date <span className="required">*</span>
                    </label>
                    <input
                      type="date"
                      value={documents[doc.id]?.expiryDate || ''}
                      onChange={(e) => handleExpiryChange(doc.id, e.target.value)}
                      style={{ 
                        padding: '0.5rem',
                        border: '1px solid #ccc',
                        borderRadius: '4px',
                        width: '100%'
                      }}
                      required
                    />
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>

        <div className="form-actions">
          <button type="button" className="btn-save" onClick={onBack}>Back</button>
          <button type="button" className="btn-next" onClick={onNext}>Save and Next</button>
        </div>
      </div>

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

// ADMIN CHECKLIST VIEW
const AdminChecklist = ({ applicantName = "John Doe", applicantId = "APP-2025-001" }) => {
  // Sample data - in real app, this would come from database
  const [documents] = useState({
    application_form: { uploaded: true, fileName: 'application.pdf' },
    liability_insurance: { uploaded: true, expiryDate: '2025-12-31', fileName: 'liability.pdf' },
    orientation_form: { uploaded: true, fileName: 'orientation.pdf' },
    rn_lpn_license: { uploaded: true, expiryDate: '2025-06-15', fileName: 'license.pdf' },
    hha_certification: { uploaded: false },
    ssn_card: { uploaded: true, fileName: 'ssn.pdf' },
    drivers_license: { uploaded: false },
    auto_insurance: { uploaded: true, expiryDate: '2025-03-20', fileName: 'auto_ins.pdf' },
    identity_document: { uploaded: false },
    cpr_card: { uploaded: true, expiryDate: '2025-02-10', fileName: 'cpr.pdf' },
    physical_certificate: { uploaded: false },
    background_screening: { uploaded: true, expiryDate: '2025-11-30', fileName: 'background.pdf' },
    pb_county_badge: { uploaded: false },
    domestic_violence: { uploaded: true, expiryDate: '2026-01-15', fileName: 'dv_cert.pdf' },
    alzheimer_dementia: { uploaded: false },
    alzheimer_training: { uploaded: true, expiryDate: '2025-08-25', fileName: 'alz_training.pdf' },
    hiv_aids: { uploaded: false },
    hipaa_update: { uploaded: true, expiryDate: '2025-12-01', fileName: 'hipaa.pdf' },
    osha_update: { uploaded: false },
    medication_cert: { uploaded: true, expiryDate: '2025-09-10', fileName: 'med_cert.pdf' },
    cognitive_communication: { uploaded: false },
    patient_rights: { uploaded: true, expiryDate: '2025-07-18', fileName: 'patient_rights.pdf' },
    medical_records: { uploaded: false },
    medical_errors: { uploaded: true, expiryDate: '2024-12-05', fileName: 'med_errors.pdf' },
    fl_laws_rules: { uploaded: false },
    prof_liability: { uploaded: true, expiryDate: '2025-12-31', fileName: 'prof_liab.pdf' },
    federal_tax_ein: { uploaded: true, fileName: 'tax_ein.pdf' }
  });

  const requiredDocuments = [
    { id: 'application_form', name: 'Application Form with ALL SIGNATURES', requiresExpiry: false },
    { id: 'liability_insurance', name: 'Liability Insurance', requiresExpiry: true },
    { id: 'orientation_form', name: 'Orientation Form', requiresExpiry: false },
    { id: 'rn_lpn_license', name: 'RN/LPN/CNA License', requiresExpiry: true },
    { id: 'hha_certification', name: 'HHA Certification', requiresExpiry: false },
    { id: 'ssn_card', name: 'Social Security Card', requiresExpiry: false },
    { id: 'drivers_license', name: 'Driver\'s License', requiresExpiry: true },
    { id: 'auto_insurance', name: 'Auto Insurance', requiresExpiry: true },
    { id: 'identity_document', name: 'Voter\'s Card, Alien Card, US Passport, US Birth Certificate, Work Authorization', requiresExpiry: true },
    { id: 'cpr_card', name: 'CPR Card (AHA, Red Cross, or HSI)', requiresExpiry: true },
    { id: 'physical_certificate', name: 'Physical Certificate (within last 3-6 months)', requiresExpiry: true },
    { id: 'background_screening', name: 'Level 2 Background Screening', requiresExpiry: true },
    { id: 'pb_county_badge', name: 'Palm Beach County ID Badge (HHA Only)', requiresExpiry: true },
    { id: 'domestic_violence', name: 'Domestic Violence 2hr Certificate', requiresExpiry: true },
    { id: 'alzheimer_dementia', name: 'Alzheimer\'s/Dementia 3hr Certificate', requiresExpiry: true },
    { id: 'alzheimer_training', name: '1 Hour Alzheimer\'s Training', requiresExpiry: true },
    { id: 'hiv_aids', name: 'HIV/AIDS 4hr Certificate', requiresExpiry: true },
    { id: 'hipaa_update', name: 'HIPAA Update 4hr Certificate', requiresExpiry: true },
    { id: 'osha_update', name: 'OSHA Update Certificate', requiresExpiry: true },
    { id: 'medication_cert', name: 'Self-Administered Medication 2hr Certificate', requiresExpiry: true },
    { id: 'cognitive_communication', name: 'Communications Cognitively Impaired Patients', requiresExpiry: true },
    { id: 'patient_rights', name: 'Patient Rights 2hrs (CNAs)', requiresExpiry: true },
    { id: 'medical_records', name: 'Medical Records Documentation 2hrs', requiresExpiry: true },
    { id: 'medical_errors', name: 'Medical Errors Update 2hrs', requiresExpiry: true },
    { id: 'fl_laws_rules', name: 'Florida Laws and Rules', requiresExpiry: true },
    { id: 'prof_liability', name: 'Professional Liability Insurance', requiresExpiry: true },
    { id: 'federal_tax_ein', name: 'Federal Tax EIN', requiresExpiry: false }
  ];

  const isExpiringSoon = (expiryDate) => {
    if (!expiryDate) return false;
    const today = new Date();
    const expiry = new Date(expiryDate);
    const daysUntilExpiry = Math.ceil((expiry - today) / (1000 * 60 * 60 * 24));
    return daysUntilExpiry <= 30 && daysUntilExpiry >= 0;
  };

  const isExpired = (expiryDate) => {
    if (!expiryDate) return false;
    const today = new Date();
    const expiry = new Date(expiryDate);
    return expiry < today;
  };

  const missingDocs = requiredDocuments.filter(doc => !documents[doc.id]?.uploaded);
  const expiringSoonDocs = requiredDocuments.filter(doc => 
    documents[doc.id]?.uploaded && doc.requiresExpiry && isExpiringSoon(documents[doc.id]?.expiryDate)
  );
  const expiredDocs = requiredDocuments.filter(doc => 
    documents[doc.id]?.uploaded && doc.requiresExpiry && isExpired(documents[doc.id]?.expiryDate)
  );

  return (
    <div style={{ minHeight: '100vh', backgroundColor: '#f5f5f5', padding: '2rem' }}>
      <div style={{ maxWidth: '1400px', margin: '0 auto' }}>
        <div style={{ backgroundColor: '#fff', padding: '2rem', borderRadius: '8px', marginBottom: '2rem' }}>
          <h1 style={{ fontSize: '2rem', fontWeight: 'bold', marginBottom: '0.5rem' }}>
            Admin - Document Checklist
          </h1>
          <h2 style={{ fontSize: '1.25rem', color: '#666', marginBottom: '0' }}>
            Applicant: {applicantName} | ID: {applicantId}
          </h2>
        </div>

        {/* Alert Summary */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '1rem', marginBottom: '2rem' }}>
          <div style={{ 
            backgroundColor: '#fff3cd', 
            borderLeft: '4px solid #dc3545', 
            padding: '1.5rem', 
            borderRadius: '8px',
            boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
              <div style={{ fontSize: '2.5rem' }}>⚠️</div>
              <div>
                <p style={{ fontWeight: 'bold', color: '#721c24', margin: '0 0 0.5rem 0' }}>
                  MISSING DOCUMENTS
                </p>
                <p style={{ fontSize: '2.5rem', fontWeight: 'bold', color: '#dc3545', margin: 0 }}>
                  {missingDocs.length}
                </p>
              </div>
            </div>
          </div>

          <div style={{ 
            backgroundColor: '#f8d7da', 
            borderLeft: '4px solid #bd2130', 
            padding: '1.5rem', 
            borderRadius: '8px',
            boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
              <div style={{ fontSize: '2.5rem' }}>🚨</div>
              <div>
                <p style={{ fontWeight: 'bold', color: '#721c24', margin: '0 0 0.5rem 0' }}>
                  EXPIRED DOCUMENTS
                </p>
                <p style={{ fontSize: '2.5rem', fontWeight: 'bold', color: '#bd2130', margin: 0 }}>
                  {expiredDocs.length}
                </p>
              </div>
            </div>
          </div>

          <div style={{ 
            backgroundColor: '#fff3cd', 
            borderLeft: '4px solid #ffc107', 
            padding: '1.5rem', 
            borderRadius: '8px',
            boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
              <div style={{ fontSize: '2.5rem' }}>⏰</div>
              <div>
                <p style={{ fontWeight: 'bold', color: '#856404', margin: '0 0 0.5rem 0' }}>
                  EXPIRING SOON (30 days)
                </p>
                <p style={{ fontSize: '2.5rem', fontWeight: 'bold', color: '#ffc107', margin: 0 }}>
                  {expiringSoonDocs.length}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Missing Documents */}
        {missingDocs.length > 0 && (
          <div style={{ 
            backgroundColor: '#fff', 
            borderRadius: '8px', 
            marginBottom: '2rem',
            boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
            overflow: 'hidden'
          }}>
            <div style={{ 
              backgroundColor: '#dc3545', 
              color: '#fff', 
              padding: '1rem 1.5rem',
              display: 'flex',
              alignItems: 'center',
              gap: '0.5rem'
            }}>
              <span style={{ fontSize: '1.5rem' }}>⚠️</span>
              <h3 style={{ fontSize: '1.25rem', fontWeight: 'bold', margin: 0 }}>
                MISSING DOCUMENTS - IMMEDIATE ACTION REQUIRED
              </h3>
            </div>
            <div style={{ padding: '1.5rem' }}>
              <ul style={{ margin: 0, padding: 0, listStyle: 'none' }}>
                {missingDocs.map(doc => (
                  <li key={doc.id} style={{ 
                    padding: '0.75rem', 
                    marginBottom: '0.5rem',
                    backgroundColor: '#f8d7da',
                    borderRadius: '4px',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.5rem',
                    fontWeight: '600',
                    color: '#721c24'
                  }}>
                    <span style={{ fontSize: '1.25rem' }}>⚠️</span>
                    {doc.name}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        )}

        {/* Expired Documents */}
        {expiredDocs.length > 0 && (
          <div style={{ 
            backgroundColor: '#fff', 
            borderRadius: '8px', 
            marginBottom: '2rem',
            boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
            overflow: 'hidden'
          }}>
            <div style={{ 
              backgroundColor: '#bd2130', 
              color: '#fff', 
              padding: '1rem 1.5rem',
              display: 'flex',
              alignItems: 'center',
              gap: '0.5rem'
            }}>
              <span style={{ fontSize: '1.5rem' }}>🚨</span>
              <h3 style={{ fontSize: '1.25rem', fontWeight: 'bold', margin: 0 }}>
                EXPIRED DOCUMENTS - RENEWAL REQUIRED
              </h3>
            </div>
            <div style={{ padding: '1.5rem' }}>
              <ul style={{ margin: 0, padding: 0, listStyle: 'none' }}>
                {expiredDocs.map(doc => (
                  <li key={doc.id} style={{ 
                    padding: '0.75rem', 
                    marginBottom: '0.5rem',
                    backgroundColor: '#f8d7da',
                    borderRadius: '4px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between'
                  }}>
                    <span style={{ fontWeight: '600', color: '#721c24', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                      <span style={{ fontSize: '1.25rem' }}>🚨</span>
                      {doc.name}
                    </span>
                    <span style={{ color: '#dc3545', fontSize: '0.9rem', fontWeight: 'bold' }}>
                      Expired: {new Date(documents[doc.id].expiryDate).toLocaleDateString()}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        )}

        {/* Expiring Soon */}
        {expiringSoonDocs.length > 0 && (
          <div style={{ 
            backgroundColor: '#fff', 
            borderRadius: '8px', 
            marginBottom: '2rem',
            boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
            overflow: 'hidden'
          }}>
            <div style={{ 
              backgroundColor: '#ffc107', 
              color: '#000', 
              padding: '1rem 1.5rem',
              display: 'flex',
              alignItems: 'center',
              gap: '0.5rem'
            }}>
              <span style={{ fontSize: '1.5rem' }}>⏰</span>
              <h3 style={{ fontSize: '1.25rem', fontWeight: 'bold', margin: 0 }}>
                DOCUMENTS EXPIRING SOON (Within 30 Days)
              </h3>
            </div>
            <div style={{ padding: '1.5rem' }}>
              <ul style={{ margin: 0, padding: 0, listStyle: 'none' }}>
                {expiringSoonDocs.map(doc => (
                  <li key={doc.id} style={{ 
                    padding: '0.75rem', 
                    marginBottom: '0.5rem',
                    backgroundColor: '#fff3cd',
                    borderRadius: '4px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between'
                  }}>
                    <span style={{ fontWeight: '600', color: '#856404', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                      <span style={{ fontSize: '1.25rem' }}>⏰</span>
                      {doc.name}
                    </span>
                    <span style={{ color: '#856404', fontSize: '0.9rem', fontWeight: 'bold' }}>
                      Expires: {new Date(documents[doc.id].expiryDate).toLocaleDateString()}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        )}

        {/* Complete Checklist */}
        <div style={{ 
          backgroundColor: '#fff', 
          borderRadius: '8px',
          boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
          overflow: 'hidden'
        }}>
          <div style={{ 
            backgroundColor: '#007bff', 
            color: '#fff', 
            padding: '1rem 1.5rem'
          }}>
            <h3 style={{ fontSize: '1.25rem', fontWeight: 'bold', margin: 0 }}>
              Complete Document Checklist
            </h3>
          </div>
          <div style={{ overflowX: 'auto' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse' }}>
              <thead>
                <tr style={{ backgroundColor: '#f8f9fa', borderBottom: '2px solid #dee2e6' }}>
                  <th style={{ padding: '1rem', textAlign: 'left', fontWeight: 'bold' }}>Document Name</th>
                  <th style={{ padding: '1rem', textAlign: 'left', fontWeight: 'bold' }}>Status</th>
                  <th style={{ padding: '1rem', textAlign: 'left', fontWeight: 'bold' }}>Expiration Date</th>
                  <th style={{ padding: '1rem', textAlign: 'left', fontWeight: 'bold' }}>File Name</th>
                </tr>
              </thead>
              <tbody>
                {requiredDocuments.map(doc => {
                  const docData = documents[doc.id];
                  const uploaded = docData?.uploaded;
                  const expired = uploaded && doc.requiresExpiry && isExpired(docData?.expiryDate);
                  const expiringSoon = uploaded && doc.requiresExpiry && isExpiringSoon(docData?.expiryDate);

                  return (
                    <tr key={doc.id} style={{ borderBottom: '1px solid #dee2e6' }}>
                      <td style={{ padding: '1rem' }}>{doc.name}</td>
                      <td style={{ padding: '1rem' }}>
                        {uploaded ? (
                          expired ? (
                            <span style={{ color: '#dc3545', fontWeight: 'bold', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                              🚨 EXPIRED
                            </span>
                          ) : expiringSoon ? (
                            <span style={{ color: '#ffc107', fontWeight: 'bold', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                              ⏰ Expiring Soon
                            </span>
                          ) : (
                            <span style={{ color: '#28a745', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                              ✓ Uploaded
                            </span>
                          )
                        ) : (
                          <span style={{ color: '#dc3545', fontWeight: 'bold', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                            ⚠️ MISSING
                          </span>
                        )}
                      </td>
                      <td style={{ padding: '1rem' }}>
                        {uploaded && doc.requiresExpiry && docData?.expiryDate ? (
                          <span style={{ 
                            color: expired ? '#dc3545' : expiringSoon ? '#ffc107' : '#000',
                            fontWeight: (expired || expiringSoon) ? 'bold' : 'normal'
                          }}>
                            {new Date(docData.expiryDate).toLocaleDateString()}
                          </span>
                        ) : (
                          <span style={{ color: '#6c757d' }}>—</span>
                        )}
                      </td>
                      <td style={{ padding: '1rem' }}>
                        {uploaded && docData?.fileName ? (
                          <span style={{ color: '#007bff', fontSize: '0.9rem' }}>{docData.fileName}</span>
                        ) : (
                          <span style={{ color: '#6c757d' }}>—</span>
                        )}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

// Export both components
export { DocumentUpload, AdminChecklist };
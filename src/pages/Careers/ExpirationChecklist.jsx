import React, { useState } from 'react';
import './ExpirationChecklist.css';

const ExpirationChecklist = ({ onBack }) => {
  // Static data for demonstration - In real implementation, this would come from the backend/database
  const [documents] = useState([
    // Documents from Step 6
    {
      id: 1,
      name: 'Physical Examination (3-6 months)',
      category: 'Documents',
      uploaded: true,
      expiryDate: '2026-04-15',
      fileName: 'physical_exam_2025.pdf',
      uploadDate: '2025-10-20'
    },
    {
      id: 2,
      name: 'CPR Card',
      category: 'Documents',
      uploaded: true,
      expiryDate: '2026-03-01',
      fileName: 'cpr_card.pdf',
      uploadDate: '2025-11-05'
    },
    {
      id: 3,
      name: "Driver's License",
      category: 'Documents',
      uploaded: true,
      expiryDate: '2028-12-15',
      fileName: 'drivers_license.jpg',
      uploadDate: '2025-10-18'
    },
    {
      id: 4,
      name: 'Professional License (RN/LPN/CNA)',
      category: 'Documents',
      uploaded: false,
      expiryDate: null,
      fileName: null,
      uploadDate: null
    },
    {
      id: 5,
      name: 'Liability Insurance',
      category: 'Documents',
      uploaded: true,
      expiryDate: '2026-02-20',
      fileName: 'liability_insurance.pdf',
      uploadDate: '2025-11-10'
    },
    {
      id: 6,
      name: 'Auto Insurance',
      category: 'Documents',
      uploaded: true,
      expiryDate: '2026-06-30',
      fileName: 'auto_insurance.pdf',
      uploadDate: '2025-12-01'
    },
    {
      id: 7,
      name: 'Work Authorization',
      category: 'Documents',
      uploaded: true,
      expiryDate: '2027-01-15',
      fileName: 'work_auth.pdf',
      uploadDate: '2025-10-25'
    },
    {
      id: 8,
      name: 'Level 2 Background Screening',
      category: 'Documents',
      uploaded: true,
      expiryDate: '2026-10-10',
      fileName: 'background_screening.pdf',
      uploadDate: '2025-10-10'
    },
    {
      id: 9,
      name: 'Palm Beach County ID Badge (HHA Only)',
      category: 'Documents',
      uploaded: true,
      expiryDate: '2026-08-20',
      fileName: 'palm_beach_badge.jpg',
      uploadDate: '2025-11-15'
    },

    // Certifications from Step 8
    {
      id: 10,
      name: 'Domestic Violence 2hr Certificate',
      category: 'Certifications',
      uploaded: true,
      expiryDate: '2026-02-28',
      fileName: 'domestic_violence_cert.pdf',
      uploadDate: '2025-11-20'
    },
    {
      id: 11,
      name: "Alzheimer's/Dementia 3hr Certificate",
      category: 'Certifications',
      uploaded: true,
      expiryDate: '2026-05-10',
      fileName: 'alzheimers_cert.pdf',
      uploadDate: '2025-12-05'
    },
    {
      id: 12,
      name: "1 Hour Alzheimer's Training - Elder Affairs of Florida",
      category: 'Certifications',
      uploaded: false,
      expiryDate: null,
      fileName: null,
      uploadDate: null
    },
    {
      id: 13,
      name: 'HIV/AIDS 4+r Certificate',
      category: 'Certifications',
      uploaded: true,
      expiryDate: '2026-03-15',
      fileName: 'hiv_aids_cert.pdf',
      uploadDate: '2025-11-12'
    },
    {
      id: 14,
      name: 'HIPAA Update 4hr Certificate',
      category: 'Certifications',
      uploaded: true,
      expiryDate: '2026-02-10',
      fileName: 'hipaa_update.pdf',
      uploadDate: '2025-10-30'
    },
    {
      id: 15,
      name: 'OSHA Update 4hr Certificate/2hr Certificate',
      category: 'Certifications',
      uploaded: true,
      expiryDate: '2026-07-22',
      fileName: 'osha_update.pdf',
      uploadDate: '2025-12-10'
    },
    {
      id: 16,
      name: 'Self-Administered Medication 2hr Certificate',
      category: 'Certifications',
      uploaded: true,
      expiryDate: '2026-04-05',
      fileName: 'medication_cert.pdf',
      uploadDate: '2025-11-25'
    },
    {
      id: 17,
      name: 'Communicating Cognitively Impaired Patients (CNAs)',
      category: 'Certifications',
      uploaded: true,
      expiryDate: '2026-06-18',
      fileName: 'communication_training.pdf',
      uploadDate: '2025-12-15'
    },
    {
      id: 18,
      name: 'Patient Rights 2hrs (CNAs)',
      category: 'Certifications',
      uploaded: false,
      expiryDate: null,
      fileName: null,
      uploadDate: null
    },
    {
      id: 19,
      name: 'Medical Records Documentation 2hrs(CNAs)',
      category: 'Certifications',
      uploaded: true,
      expiryDate: '2026-05-25',
      fileName: 'medical_records_doc.pdf',
      uploadDate: '2025-11-28'
    },
    {
      id: 20,
      name: 'Medical Errors Update 2hrs(CNAs, LPN, RN)',
      category: 'Certifications',
      uploaded: true,
      expiryDate: '2026-03-08',
      fileName: 'medical_errors.pdf',
      uploadDate: '2025-12-01'
    },
    {
      id: 21,
      name: 'Florida laws and rules (LPN, RN, HHA and CNA)',
      category: 'Certifications',
      uploaded: true,
      expiryDate: '2026-08-14',
      fileName: 'florida_laws.pdf',
      uploadDate: '2025-12-08'
    },
    {
      id: 22,
      name: 'Professional Liability Insurance',
      category: 'Certifications',
      uploaded: true,
      expiryDate: '2026-02-15',
      fileName: 'prof_liability_insurance.pdf',
      uploadDate: '2025-11-18'
    }
  ]);

  // Warning threshold in days (this would be configurable by admin in real implementation)
  const WARNING_THRESHOLD_DAYS = 60; // Show warning 60 days before expiry

  // Calculate status for each document
  const getDocumentStatus = (doc) => {
    if (!doc.uploaded) {
      return {
        status: 'missing',
        label: 'Missing',
        class: 'status-missing',
        icon: '❌',
        daysUntilExpiry: null
      };
    }

    if (!doc.expiryDate) {
      return {
        status: 'valid',
        label: 'Uploaded',
        class: 'status-valid',
        icon: '✅',
        daysUntilExpiry: null
      };
    }

    const today = new Date();
    const expiry = new Date(doc.expiryDate);
    const diffTime = expiry - today;
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

    if (diffDays < 0) {
      return {
        status: 'expired',
        label: 'Expired',
        class: 'status-expired',
        icon: '❌',
        daysUntilExpiry: diffDays
      };
    }

    if (diffDays <= WARNING_THRESHOLD_DAYS) {
      return {
        status: 'expiring',
        label: `Expiring in ${diffDays} days`,
        class: 'status-expiring',
        icon: '⚠️',
        daysUntilExpiry: diffDays
      };
    }

    return {
      status: 'valid',
      label: 'Valid',
      class: 'status-valid',
      icon: '✅',
      daysUntilExpiry: diffDays
    };
  };

  // Format date for display
  const formatDate = (dateString) => {
    if (!dateString) return 'N/A';
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
      year: 'numeric', 
      month: 'short', 
      day: 'numeric' 
    });
  };

  // Group documents by category
  const documentsByCategory = documents.reduce((acc, doc) => {
    if (!acc[doc.category]) {
      acc[doc.category] = [];
    }
    acc[doc.category].push({
      ...doc,
      statusInfo: getDocumentStatus(doc)
    });
    return acc;
  }, {});

  // Calculate summary stats
  const totalDocs = documents.length;
  const uploadedDocs = documents.filter(d => d.uploaded).length;
  const missingDocs = documents.filter(d => !d.uploaded).length;
  const expiringDocs = documents.filter(d => {
    const status = getDocumentStatus(d);
    return status.status === 'expiring';
  }).length;
  const expiredDocs = documents.filter(d => {
    const status = getDocumentStatus(d);
    return status.status === 'expired';
  }).length;

  return (
    <div className="login-page">
      {/* Header */}
      <header className="header">
        <div className="header-container">
          <div className="logo">
            <img src="/logo.png.png" alt="QualCare Logo" />
          </div>
          <button className="home-btn" onClick={onBack}>Home</button>
          <div className="header-right">
            <div className="social-icons">
              <a href="https://facebook.com" target="_blank" rel="noopener noreferrer">
                <i className="fab fa-facebook-f"></i>
              </a>
              <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer">
                <i className="fab fa-linkedin-in"></i>
              </a>
              <a href="https://twitter.com" target="_blank" rel="noopener noreferrer">
                <i className="fab fa-twitter"></i>
              </a>
              <a href="https://instagram.com" target="_blank" rel="noopener noreferrer">
                <i className="fab fa-instagram"></i>
              </a>
            </div>
          </div>
        </div>
      </header>

      {/* Main Layout Container */}
      <div className="profile-wrapper mt-5 mb-5">
        <div className="container">
          <div className="row">
<div className="col-md-3">

          {/* Left Sidebar Card */}
          <aside className="sidebar-card">
            <ul className="sidebar-nav">
              <li>Account</li>
              <li>Applications</li>
              <li>Change Password</li>
              <li className="active">Expiration Checklist</li>
              <li className="logout-item">Logout</li>
            </ul>
          </aside>
</div>
<div className="col-md-9">

          {/* Right Content Card */}
          <main className="profile-content-card expiration-checklist">
            <h2>Document & Certification Expiration Checklist</h2>
            <hr />

            {/* Summary Cards */}
            <div className="summary-cards">
              <div className="summary-card total">
                <div className="card-icon">📄</div>
                <div className="card-content">
                  <h3>{totalDocs}</h3>
                  <p>Total Documents</p>
                </div>
              </div>

              <div className="summary-card uploaded">
                <div className="card-icon">✅</div>
                <div className="card-content">
                  <h3>{uploadedDocs}</h3>
                  <p>Uploaded</p>
                </div>
              </div>

              <div className="summary-card missing">
                <div className="card-icon">❌</div>
                <div className="card-content">
                  <h3>{missingDocs}</h3>
                  <p>Missing</p>
                </div>
              </div>

              <div className="summary-card expiring">
                <div className="card-icon">⚠️</div>
                <div className="card-content">
                  <h3>{expiringDocs}</h3>
                  <p>Expiring Soon</p>
                </div>
              </div>

              {expiredDocs > 0 && (
                <div className="summary-card expired">
                  <div className="card-icon">🚫</div>
                  <div className="card-content">
                    <h3>{expiredDocs}</h3>
                    <p>Expired</p>
                  </div>
                </div>
              )}
            </div>

            {/* Warning Notice */}
            {(expiringDocs > 0 || expiredDocs > 0 || missingDocs > 0) && (
              <div className="warning-notice">
                <span className="warning-icon">⚠️</span>
                <div className="warning-content">
                  {expiredDocs > 0 && <span> {expiredDocs} document(s) expired.</span>}
                  {expiringDocs > 0 && <span> {expiringDocs} document(s) expiring soon.</span>}
                  {missingDocs > 0 && <span> {missingDocs} document(s) missing.</span>}
                </div>
              </div>
            )}

            {Object.entries(documentsByCategory).map(([category, docs]) => (
              <div key={category} className="category-section">
                <h3 className="category-title">
                  {category}
                </h3>

                <div className="documents-table">
                  <table>
                    <thead>
                      <tr>
                        <th>Status</th>
                        <th>Document Name</th>
                        <th>Expiry Date</th>
                      </tr>
                    </thead>
                    <tbody>
                      {docs.map((doc) => (
                        <tr key={doc.id} className={doc.statusInfo.class}>
                          <td>
                            <div className="status-badge">
                              <span className="status-icon">{doc.statusInfo.icon}</span>
                              <span className="status-text">{doc.statusInfo.label}</span>
                            </div>
                          </td>
                          <td className="doc-name">{doc.name}</td>
                          <td className="expiry-date">
                            {doc.expiryDate ? (
                              <div>
                                <div className="date">{formatDate(doc.expiryDate)}</div>
                                {doc.statusInfo.daysUntilExpiry > 0 && (
                                  <div className="days-remaining">
                                    ({doc.statusInfo.daysUntilExpiry} days)
                                  </div>
                                )}
                              </div>
                            ) : (
                              <span className="no-expiry">No Expiry</span>
                            )}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            ))}
          </main>
</div>

          </div>
          
        </div>
      </div>

      {/* Footer */}
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

export default ExpirationChecklist;
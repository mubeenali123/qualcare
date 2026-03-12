import React, { useMemo, useState } from 'react';
import { useSelector } from 'react-redux';
import './ExpirationChecklist.css';
import ProfileSidebar from './ProfileSidebar';

const ExpirationChecklist = ({ onBack }) => {
  const { application, loading } = useSelector((state) => state.auth);

  // --- Modal State ---
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [activeDoc, setActiveDoc] = useState(null);
  const [uploadData, setUploadData] = useState({ file: null, expiry: '' });

  // Helper to calculate status
  const getDocumentStatus = (expiryDate, isUploaded) => {
    const WARNING_THRESHOLD_DAYS = 60;
    if (!isUploaded) {
      return { label: 'Missing', class: 'status-missing', icon: '❌', status: 'missing' };
    }
    if (!expiryDate) {
      return { label: 'Valid', class: 'status-valid', icon: '✅', status: 'valid' };
    }

    const today = new Date();
    const expiry = new Date(expiryDate);
    const diffDays = Math.ceil((expiry - today) / (1000 * 60 * 60 * 24));

    if (diffDays < 0) return { label: 'Expired', class: 'status-expired', icon: '❌', status: 'expired' };
    if (diffDays <= WARNING_THRESHOLD_DAYS) return { label: `Expiring in ${diffDays} days`, class: 'status-expiring', icon: '⚠️', status: 'expiring' };
    
    return { label: 'Valid', class: 'status-valid', icon: '✅', status: 'valid' };
  };

  const docMapping = {
    documents: {
      physicalExam: 'Physical Examination',
      cprCard: 'CPR Card',
      driversLicense: "Driver's License",
      socialSecurity: "Social Security Card", 
      workAuthorization: 'Work Authorization (I-9 / Passport)',
      professionalLicense: 'Professional License (RN/LPN/CNA)',
      liabilityInsurance: 'Liability Insurance',
      autoInsurance: 'Auto Insurance',
      backgroundScreening: 'Level 2 Background Screening',
      palmBeachBadge: 'Palm Beach County ID Badge',
    },
    certifications: {
      domesticViolence: 'Domestic Violence 2hr',
      alzheimersDementia: "Alzheimer's/Dementia 3hr",
      oneHourAlzheimers: "1 Hour Alzheimer's Training",
      hivAids: 'HIV/AIDS Certificate',
      hipaaUpdate: 'HIPAA Update',
      oshaUpdate: 'OSHA Update',
      selfAdministeredMedication: 'Self-Administered Medication',
      communicatingCognitivelyImpaired: 'Communicating Cognitively Impaired',
      patientRights: 'Patient Rights',
      medicalRecordsDocumentation: 'Medical Records Documentation',
      medicalErrorsUpdate: 'Medical Errors Update',
      floridaLawsRules: 'Florida Laws and Rules',
      professionalLiabilityInsurance: 'Professional Liability Insurance'
    }
  };

  const processedData = useMemo(() => {
    if (!application || !application.meta) {
      return { categories: { Documents: [], Certifications: [] }, stats: { total: 0, uploaded: 0, missing: 0, expiring: 0, expired: 0 } };
    }

    const { documents, certifications } = application.meta;
    const categories = { Documents: [], Certifications: [] };
    let stats = { total: 0, uploaded: 0, missing: 0, expiring: 0, expired: 0 };

    const updateStats = (status) => {
      stats.total++;
      if (status === 'missing') stats.missing++;
      else stats.uploaded++;
      if (status === 'expiring') stats.expiring++;
      if (status === 'expired') stats.expired++;
    };

    // Process helper
    const processItems = (source, mapping, categoryName) => {
      Object.keys(mapping).forEach(key => {
        const expiry = source?.[`${key}Expiry`];
        const file = source?.[key]; 
        const statusInfo = getDocumentStatus(expiry, !!file);
        
        categories[categoryName].push({ 
          key,
          name: mapping[key], 
          expiry: expiry || 'N/A', 
          statusInfo 
        });
        updateStats(statusInfo.status);
      });
    };

    processItems(documents, docMapping.documents, 'Documents');
    processItems(certifications, docMapping.certifications, 'Certifications');

    return { categories, stats };
  }, [application]);

  const handleOpenModal = (doc, category) => {
    setActiveDoc({ ...doc, category });
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setUploadData({ file: null, expiry: '' });
  };

  const handleSaveUpload = () => {
    if (!uploadData.file || !uploadData.expiry) {
      alert("Please provide both a file and an expiry date.");
      return;
    }
    // Logic for dispatching to backend goes here
    handleCloseModal();
  };

  if (loading) return <div className="p-5 text-center">Loading checklist...</div>;

  return (
    <div className="login-page">
      <header className="header">
        <div className="header-container">
          <div className="logo"><img src="/logo.png.png" alt="QualCare Logo" /></div>
          <button className="home-btn" onClick={onBack}>Home</button>
        </div>
      </header>

      <div className="profile-wrapper mt-5 mb-5">
        <div className="container">
          <div className="row">
            <div className="col-md-3"><ProfileSidebar /></div>
            <div className="col-md-9">
              <main className="profile-content-card expiration-checklist">
                <h2>Document Expiration Checklist</h2>
                <p className="text-muted mb-4">Update documents that are missing, expired, or nearing expiration.</p>
                <hr />

                <div className="summary-cards">
                  <div className="summary-card total"><h3>{processedData.stats.total}</h3><p>Total</p></div>
                  <div className="summary-card uploaded"><h3>{processedData.stats.uploaded}</h3><p>Uploaded</p></div>
                  <div className="summary-card missing"><h3>{processedData.stats.missing}</h3><p>Missing</p></div>
                  <div className="summary-card expiring"><h3>{processedData.stats.expiring}</h3><p>Expiring</p></div>
                </div>

                {Object.entries(processedData.categories).map(([category, docs]) => (
                  <div key={category} className="category-section">
                    <h3 className="category-title">{category}</h3>
                    <div className="documents-table">
                      <table>
                        <thead>
                          <tr>
                            <th>Status</th>
                            <th>Document Name</th>
                            <th>Expiry Date</th>
                            <th className="text-center">Action</th>
                          </tr>
                        </thead>
                        <tbody>
                          {docs.map((doc, index) => (
                            <tr key={index} className={doc.statusInfo.class}>
                              <td>
                                <div className="status-badge">
                                  <span>{doc.statusInfo.icon}</span> {doc.statusInfo.label}
                                </div>
                              </td>
                              <td className="doc-name">{doc.name}</td>
                              <td className="expiry-date">{doc.expiry || 'N/A'}</td>
                              <td className="text-center">
                                {/* Only show update button if document is NOT valid/green */}
                                {doc.statusInfo.status !== 'valid' ? (
                                  <button 
                                    className="btn-next" 
                                    onClick={() => handleOpenModal(doc, category)}
                                  >
                                    {doc.statusInfo.status === 'missing' ? 'Upload' : 'Swap'}
                                  </button>
                                ) : (
                                  <span className="text-success small"></span>
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

      {/* --- Interactive Modal with Z-Index fix --- */}
      {isModalOpen && (
        <div className="modal-overlay" onClick={handleCloseModal}>
          <div className="modal-content card p-4" onClick={(e) => e.stopPropagation()}>
            <div className="d-flex justify-content-between align-items-center mb-3">
              <h3 className="mb-0">Update {activeDoc?.name}</h3>
              <button className="btn-close" onClick={handleCloseModal}></button>
            </div>
            <p className="text-muted small">Select your new document and its expiration date.</p>
            <hr />
            
            <div className="form-group mb-3">
              <label className="fw-bold mb-1">New File (PDF/Image)</label>
              <input 
                type="file" 
                className="form-control"
                onChange={(e) => setUploadData({...uploadData, file: e.target.files[0]})}
              />
            </div>

            <div className="form-group mb-3">
              <label className="fw-bold mb-1">New Expiry Date</label>
              <input 
                type="date" 
                className="form-control"
                value={uploadData.expiry}
                onChange={(e) => setUploadData({...uploadData, expiry: e.target.value})}
              />
            </div>

            <div className="d-flex justify-content-end gap-2 mt-4">
              <button className="btn btn-light" onClick={handleCloseModal}>Cancel</button>
              <button className="btn-save" onClick={handleSaveUpload}>Save Changes</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ExpirationChecklist;
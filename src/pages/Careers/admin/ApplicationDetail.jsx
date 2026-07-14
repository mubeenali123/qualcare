import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import { base_url } from '../../../components/config';
import * as types from '../../../redux/type';
import FinalApplicationView1 from '../../../components/FinalApplicationView1';
import FinalApplicationView2 from '../../../components/FinalApplicationView2';
import FinalApplicationView3 from '../../../components/FinalApplicationView3';
import FinalApplicationView4 from '../../../components/FinalApplicationView4';
import FinalApplicationView5 from '../../../components/FinalApplicationView5';

const ApplicationDetail = () => {
  const FINAL_FORMS = [
    { id: 1, name: "Background Check & Regulatory Compliance" },
    { id: 2, name: "Contractor Agreement, Duties & Compliance" },
    { id: 3, name: "Licenses, Certifications & Insurance Verification" },
    { id: 4, name: "Employee Health & Medical Clearance" },
    { id: 5, name: "Application, Screening & Acknowledgements" },
  ];
  const isExpired = (date) => new Date(date) < new Date();
  const [previewUrl, setPreviewUrl] = useState(null);
  const handlePreview = (sharepointUrl) => {
    // Office viewer requires the URL to be public-facing or accessible via a sharing link
    const encodedUrl = encodeURIComponent(sharepointUrl);
    const officeViewerUrl = `https://view.officeapps.live.com/op/view.aspx?src=${encodedUrl}`;
    setPreviewUrl(officeViewerUrl);
  };
  const { id } = useParams();
  const handleApprove = () => {
    if (window.confirm('Are you sure you want to approve this application?')) {
      dispatch({
        type: types.APPROVE_APPLICATION_REQUEST,
        payload: id
      });
    }
  };

  const handleReject = () => {
    if (window.confirm('Are you sure you want to reject this application?')) {
      dispatch({
        type: types.REJECT_APPLICATION_REQUEST,
        payload: id
      });
    }
  };
  const dispatch = useDispatch();
  const [viewMode, setViewMode] = useState('initial');
  const [newNote, setNewNote] = useState('');
  const [notePriority, setNotePriority] = useState('medium'); // ADD THIS

  const notes = useSelector(state => state.applicationReducer?.notes || []);
  const noteSuccess = useSelector(state => state.applicationReducer?.noteSuccess || null);
  const [activeStep, setActiveStep] = useState(1);
  const [loading, setLoading] = useState(true);
  const [applicationData, setApplicationData] = useState(null);
  const [finalAppData, setFinalAppData] = useState({});
  const [selectedFinalApp, setSelectedFinalApp] = useState(null);
  const [finalAppLoading, setFinalAppLoading] = useState(false);
      const [showRevisionModal, setShowRevisionModal] = useState(false);
    const [revisionReason, setRevisionReason] = useState('');
    const [revisionSubmitting, setRevisionSubmitting] = useState(false);
  const statusLogs = useSelector(state => state.applicationReducer?.statusLogs || []);
  const tabletSendSuccess = useSelector(state => state.applicationReducer?.tabletSendSuccess);
  const tabletSendError = useSelector(state => state.applicationReducer?.tabletSendError);
  const resendEmailLoading = useSelector(state => state.applicationReducer?.resendEmailLoading);
  const resendEmailSuccess = useSelector(state => state.applicationReducer?.resendEmailSuccess);
  const resendEmailError = useSelector(state => state.applicationReducer?.resendEmailError);
    const revisionLoading = useSelector(state => state.applicationReducer?.revisionLoading);
    const revisionSuccess = useSelector(state => state.applicationReducer?.revisionSuccess);
    const revisionError = useSelector(state => state.applicationReducer?.revisionError);
    //  const handleRequestRevision = async () => {
    //     if (!revisionReason.trim()) {
    //         alert('Please provide a reason for the revision request');
    //         return;
    //     }
        
    //     if (revisionReason.trim().length < 10) {
    //         alert('Please provide a detailed reason (at least 10 characters)');
    //         return;
    //     }
        
    //     setRevisionSubmitting(true);
        
    //     try {
    //         await dispatch({
    //             type: types.REQUEST_REVISION_REQUEST,
    //             payload: {
    //                 id: id,
    //                 revision_reason: revisionReason
    //             }
    //         });
            
    //         setShowRevisionModal(false);
    //         setRevisionReason('');
            
    //         // Refresh application details
    //         fetchApplicationDetails();
            
    //     } catch (error) {
    //         console.error('Error requesting revision:', error);
    //     } finally {
    //         setRevisionSubmitting(false);
    //     }
    // };
  const handleResendEmail = () => {
    if (window.confirm('📧 Resend approval email to applicant?\n\nThis will trigger the Power Automate flow to send the email again.')) {
      dispatch({
        type: types.RESEND_EMAIL_REQUEST,
        payload: id
      });
    }
  };
  useEffect(() => {
    if (tabletSendSuccess) {
      // Update local state when API succeeds
      setApplicationData(prevData => ({
        ...prevData,
        details: {
          ...prevData.details,
          sent_to_tablet: true,
          tablet_sent_at: new Date().toISOString()
        }
      }));

      alert('✅ Application details sent to office tablet successfully!');
    }

    if (tabletSendError) {
      alert('❌ Failed to send to tablet: ' + tabletSendError);
    }
  }, [tabletSendSuccess, tabletSendError]);
  const fetchFinalApplicationData = async (formType) => {
    setFinalAppLoading(true);
    try {
      const referenceId = applicationData?.details?.reference_id;
      if (!referenceId) return;

      const response = await axios.get(`${base_url}/applications-final-data/${referenceId}`);
      setFinalAppData(response.data);
      setSelectedFinalApp(formType);
    } catch (error) {
      console.error('Error fetching final application data:', error);
    } finally {
      setFinalAppLoading(false);
    }
  };


  useEffect(() => {
    if (viewMode === 'logs') {
      dispatch({
        type: types.FETCH_STATUS_LOGS_REQUEST,
        payload: id
      });
    }
  }, [viewMode, id]);
  useEffect(() => {
    fetchApplicationDetails();
    if (viewMode === 'notes') {
      dispatch({
        type: types.FETCH_APPLICATION_NOTES_REQUEST,
        payload: id
      });
    }
  }, [id, viewMode]);
  useEffect(() => {
    if (noteSuccess) {
      alert(noteSuccess);
      setNewNote('');
    }
  }, [noteSuccess]);

  const handleAddNote = (e) => {
    e.preventDefault();
    if (!newNote.trim()) {
      alert('Please enter a note');
      return;
    }

    dispatch({
      type: types.ADD_APPLICATION_NOTE_REQUEST,
      payload: {
        applicationId: id,
        note: newNote,
        priority: notePriority, // ADD THIS
        admin_user: 'Admin' // Replace with actual admin username from auth
      }
    });
  };
  const getPriorityIcon = (priority) => {
    switch (priority?.toLowerCase()) {
      case 'urgent':
        return { icon: 'fas fa-exclamation-circle', color: '#ef4444', label: 'Urgent' };
      case 'high':
        return { icon: 'fas fa-circle', color: '#ef4444', label: 'High' };
      case 'medium':
        return { icon: 'fas fa-circle', color: '#f59e0b', label: 'Medium' };
      case 'low':
        return { icon: 'fas fa-circle', color: '#10b981', label: 'Low' };
      default:
        return { icon: 'fas fa-circle', color: '#6b7280', label: 'Normal' };
    }
  };
  const handleDeleteNote = (noteId) => {
    if (window.confirm('Are you sure you want to delete this note?')) {
      dispatch({
        type: types.DELETE_APPLICATION_NOTE_REQUEST,
        payload: {
          noteId,
          applicationId: id
        }
      });
    }
  };
  const fetchApplicationDetails = async () => {
    try {
      setLoading(true);
      const response = await axios.get(`${base_url}/admin/applications/${id}`);

      // Format the data from backend
      const formattedData = {
        details: response.data.details,
        preEmployment: response.data.steps.pre_employment?.data || {},
        education: response.data.steps.education?.data || {},
        availability: response.data.steps.availability?.data || {},
        references: response.data.steps.references?.data || {},
        experience: response.data.steps.experience?.data || {},
        documents: response.data.steps.documents || {},
        review: response.data.steps.review?.data || {}
      };

      setApplicationData(formattedData);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching application:', error);
      setLoading(false);
    }
  };

  // Update handleFinalApplicationClick
  const handleFinalApplicationClick = (formNumber) => {
    const formTypeMap = {
      1: 'final',
      2: 'final_2',
      3: 'final_3',
      4: 'final_4',
      5: 'final_5',
    };
    fetchFinalApplicationData(formTypeMap[formNumber]);
  };

  if (loading) {
    return (
      <div className="loading-container">
        <i className="fas fa-spinner fa-spin"></i>
        <p>Loading application details...</p>
      </div>
    );
  }

  if (!applicationData) {
    return (
      <div className="error-container">
        <i className="fas fa-exclamation-circle"></i>
        <p>Application not found</p>
      </div>
    );
  }
  const getStatusColor = (status) => {
    switch (status?.toLowerCase()) {
      case 'approved':
        return 'status-approved';
      case 'rejected':
        return 'status-rejected';
      case 'pending':
        return 'status-pending';
      case 'under review':
        return 'status-review';
      default:
        return 'status-default';
    }
  };

  const getStatusIcon = (status) => {
    switch (status?.toLowerCase()) {
      case 'approved':
        return 'fas fa-check-circle';
      case 'rejected':
        return 'fas fa-times-circle';
      case 'pending':
        return 'fas fa-clock';
      case 'under review':
        return 'fas fa-eye';
      default:
        return 'fas fa-circle';
    }
  };

  const getStatusBadgeClass = (status) => {
    switch (status?.toLowerCase()) {
      case 'approved':
        return 'status-approved';
      case 'rejected':
        return 'status-rejected';
      case 'pending':
        return 'status-pending';
      case 'under review':
        return 'status-review';
      default:
        return '';
    }
  };
  // CHECK DOCUMENTS (STEP 6)
  const isDocumentsIncomplete = () => {
    const docs = applicationData?.documents;
    if (!docs) return true;

    const requiredDocs = [
      'physicalExam',
      'cprCard',
      'driversLicense',
      'professionalLicense',
      'liabilityInsurance',
      'autoInsurance',
      'workAuthorization',
      'backgroundScreening',
      'palmBeachBadge'
    ];

    return requiredDocs.some(doc => !docs[doc]?.local_path);
  };

  // GENERIC STEP CHECK
  const isStepIncomplete = (stepNum) => {
    if (!applicationData) return false;

    switch (stepNum) {
      case 1:
        return !applicationData.preEmployment?.firstName;

      case 2:
        return !applicationData.education?.highSchoolName;

      case 3:
        return !applicationData.availability?.totalHours;

      case 4:
        return !applicationData.references?.employer1Name;

      case 5:
        return !applicationData.experience?.emp1FirstName;

      case 6:
        return isDocumentsIncomplete();

      case 7:
        return !applicationData.review?.signature;

      default:
        return false;
    }
  };

  const handleSendToTablet = async () => {
    if (window.confirm(`📧 Send application details to office tablet?\n\nThis will notify the tablet at the office to prepare for applicant ${applicationData.details.first_name} ${applicationData.details.last_name}'s login.`)) {
      dispatch({
        type: types.SEND_TO_TABLET_REQUEST,
        payload: {
          referenceId: applicationData.details.reference_id,
          applicantId: applicationData.details.id
        }
      });
    }
  };
  return (
    <>
      <div className="page-header">
        <div>
          <h2>Application Details - #{id?.padStart(4, '0')}</h2>
          <p>View complete application submission</p>
          {/* Show revision status if applicable */}
                    {applicationData?.details?.status === 'revision_requested' && (
                        <div className="revision-notice">
                            <i className="fas fa-edit"></i>
                            <span>
                                Revision Requested (v{applicationData.details.revision_count + 1})
                                {applicationData.details.revision_reason && (
                                    <span className="revision-reason">
                                        Reason: {applicationData.details.revision_reason}
                                    </span>
                                )}
                            </span>
                        </div>
                    )}
        </div>
        <div className="action-buttons-header">
          {/* Send to Tablet Button - Available for approved applications */}
          {applicationData?.details?.status === "approved" && (
            <button
              className="btn-send-tablet"
              onClick={handleSendToTablet}
              disabled={applicationData?.details?.sent_to_tablet}
            >
              <i className="fas fa-tablet-alt"></i>
              {applicationData?.details?.sent_to_tablet ? 'Sent to Tablet' : 'Send to Tablet'}
            </button>
          )}
          {applicationData?.details?.status === "approved" && (
            <button
              className="btn-resend-email"
              onClick={handleResendEmail}
              disabled={resendEmailLoading}
            >
              {resendEmailLoading ? (
                <i className="fas fa-spinner fa-spin"></i>
              ) : (
                <i className="fas fa-envelope"></i>
              )}
              {resendEmailLoading ? 'Sending...' : 'Resend Email'}
            </button>
          )}

          {applicationData?.details?.status === "pending" && (
            <>
              <button className="btn-approve" onClick={handleApprove}>
                <i className="fas fa-check-circle"></i> Approve
              </button>

              <button className="btn-reject" onClick={handleReject}>
                <i className="fas fa-times-circle"></i> Reject
              </button>
              {/* <button 
                                className="btn-revision"
                                onClick={() => setShowRevisionModal(true)}
                            >
                                <i className="fas fa-edit"></i> Request Revision
                            </button> */}
            </>
          )}
 {/* {applicationData?.details?.status === "revision_requested" && (
                        <button 
                            className="btn-revision"
                            onClick={() => setShowRevisionModal(true)}
                        >
                            <i className="fas fa-edit"></i> Update Revision
                        </button>
                    )} */}
          {applicationData?.details?.status === "approved" && (
            <button className="btn-approve" disabled>
              <i className="fas fa-check-circle"></i> Approved
            </button>
          )}

          {applicationData?.details?.status === "rejected" && (
            <button className="btn-reject" disabled>
              <i className="fas fa-times-circle"></i> Rejected
            </button>
          )}
        </div>
      </div>
      {/* View Mode Tabs */}
      <div className="view-mode-tabs">
        <button
          className={`tab-button ${viewMode === 'initial' ? 'active' : ''}`}
          onClick={() => setViewMode('initial')}
        >
          <i className="fas fa-file-alt"></i> View Initial Form
        </button>
        <button
          className={`tab-button ${viewMode === 'final' ? 'active' : ''}`}
          onClick={() => setViewMode('final')}
        >
          <i className="fas fa-file-contract"></i> View Final Application
        </button>
        <button
          className={`tab-button ${viewMode === 'notes' ? 'active' : ''}`}
          onClick={() => setViewMode('notes')}
        >
          <i className="fas fa-sticky-note"></i> Internal Notes & Comments
        </button>
        <button
          className={`tab-button ${viewMode === 'logs' ? 'active' : ''}`}
          onClick={() => setViewMode('logs')}
        >
          <i className="fas fa-history"></i> Status History
        </button>
      </div>

      {/* INITIAL FORM VIEW */}
      {viewMode === 'initial' && (
        <>
          {/* Step Navigation */}
          <div className="application-detail-nav">
            <div className="progress-steps">
              {[
                { num: 1, label: 'Pre-Employment' },
                { num: 2, label: 'Education' },
                { num: 3, label: 'Availability' },
                { num: 4, label: 'References' },
                { num: 5, label: 'Experience' },
                { num: 6, label: 'Documents' },
                { num: 7, label: 'Review' }
              ].map(step => {
                const isWarning = isStepIncomplete(step.num);

                return (
                  <div
                    key={step.num}
                    className={`step 
        ${activeStep === step.num ? 'active' : 'completed'} 
        ${isWarning ? 'warning' : ''}
      `}
                    onClick={() => setActiveStep(step.num)}
                  >
                    <div className="step-number">
                      {activeStep > step.num ? '✓' : step.num}
                    </div>
                    <span className="step-label">{step.label}</span>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Application Content */}
          <div className="application-detail-content">
            {/* STEP 1 - PRE-EMPLOYMENT */}
            {activeStep === 1 && (
              <div className="detail-step">
                <h1 className="form-title">PRE-EMPLOYMENT REQUIREMENTS</h1>

                <div className="form-section">
                  <label className="section-label">Name</label>
                  <div className="name-grid">
                    <div className="form-field">
                      <input
                        type="text"
                        value={applicationData.preEmployment.firstName || ''}
                        readOnly
                      />
                      <span className="field-label">First</span>
                    </div>
                    <div className="form-field">
                      <input
                        type="text"
                        value={applicationData.preEmployment.middleName || ''}
                        readOnly
                      />
                      <span className="field-label">Middle</span>
                    </div>
                    <div className="form-field">
                      <input
                        type="text"
                        value={applicationData.preEmployment.lastName || ''}
                        readOnly
                      />
                      <span className="field-label">Last</span>
                    </div>
                  </div>
                </div>

                <div className="form-section">
                  <label className="section-label">Address</label>

                  <div className="address-grid">
                    <div className="form-field">
                      <input
                        type="text"
                        value={applicationData.preEmployment.streetAddress || ''}
                        readOnly
                      />
                      <span className="field-label">Street Address</span>
                    </div>
                    <div className="form-field">
                      <input
                        type="text"
                        value={applicationData.preEmployment.city || ''}
                        readOnly
                      />
                      <span className="field-label">City</span>
                    </div>
                    <div className="form-field">
                      <input
                        type="text"
                        value={applicationData.preEmployment.state || ''}
                        readOnly
                      />
                      <span className="field-label">State / Province / Region</span>
                    </div>
                    <div className="form-field">
                      <input
                        type="text"
                        value={applicationData.preEmployment.zipCode || ''}
                        readOnly
                      />
                      <span className="field-label">ZIP / Postal Code</span>
                    </div>
                  </div>

                </div>

                <div className="form-row">
                  <div className="form-field">
                    <label className="section-label">Social Security Number</label>
                    <input
                      type="text"
                      value={applicationData.preEmployment.ssn || ''}
                      readOnly
                    />
                  </div>
                  <div className="form-field">
                    <label className="section-label">Phone Number</label>
                    <input
                      type="text"
                      value={applicationData.preEmployment.phone || ''}
                      readOnly
                    />
                  </div>
                </div>

                <div className="form-section">
                  <label className="section-label">
                    If hired can you provide evidence of legal eligibility to work in the United States?
                  </label>
                  <div className="radio-group">
                    <label className="radio-label">
                      <input
                        type="radio"
                        checked={applicationData.preEmployment.legalEligibility === 'yes'}
                        readOnly
                      />
                      <span>Yes</span>
                    </label>
                    <label className="radio-label">
                      <input
                        type="radio"
                        checked={applicationData.preEmployment.legalEligibility === 'no'}
                        readOnly
                      />
                      <span>No</span>
                    </label>
                  </div>
                </div>

                <div className="form-row">
                  <div className="form-field">
                    <label className="section-label">Email</label>
                    <input
                      type="email"
                      value={applicationData.preEmployment.email || ''}
                      readOnly
                    />
                  </div>
                  <div className="form-field">
                    <label className="section-label">Position Desired</label>
                    <input
                      type="text"
                      value={applicationData.preEmployment.positionDesired || ''}
                      readOnly
                    />
                  </div>
                </div>

                <div className="form-row">
                  <div className="form-field">
                    <label className="section-label">Wage/Salary Desired</label>
                    <input
                      type="text"
                      value={applicationData.preEmployment.wageDesired || ''}
                      readOnly
                    />
                  </div>
                  <div className="form-field">
                    <label className="section-label">Date of Birth</label>
                    <input
                      type="date"
                      value={applicationData.preEmployment.dateOfBirth || ''}
                      readOnly
                    />
                  </div>
                </div>

                <div className="form-section">
                  <label className="section-label">
                    Have you EVER been convicted of a felony?
                  </label>
                  <div className="radio-group">
                    <label className="radio-label">
                      <input
                        type="radio"
                        checked={applicationData.preEmployment.felonyConviction === 'yes'}
                        readOnly
                      />
                      <span>Yes</span>
                    </label>
                    <label className="radio-label">
                      <input
                        type="radio"
                        checked={applicationData.preEmployment.felonyConviction === 'no'}
                        readOnly
                      />
                      <span>No</span>
                    </label>
                  </div>
                </div>

                <div className="form-section">
                  <label className="section-label">Date you can begin work?</label>
                  <div className="form-field half-width">
                    <input
                      type="date"
                      value={applicationData.preEmployment.startDate || ''}
                      readOnly
                    />
                  </div>
                </div>

                <div className="form-section">
                  <label className="section-label">Are you 18 years or older?</label>
                  <div className="radio-group">
                    <label className="radio-label">
                      <input
                        type="radio"
                        checked={applicationData.preEmployment.isOver18 === 'yes'}
                        readOnly
                      />
                      <span>Yes</span>
                    </label>
                    <label className="radio-label">
                      <input
                        type="radio"
                        checked={applicationData.preEmployment.isOver18 === 'no'}
                        readOnly
                      />
                      <span>No</span>
                    </label>
                  </div>
                </div>
              </div>
            )}

            {/* STEP 2 - EDUCATION */}
            {activeStep === 2 && (
              <div className="detail-step">
                <h1 className="form-title">EDUCATION</h1>

                <div className="form-section">
                  <label className="section-label">Name of high school attended</label>
                  <div className="form-field full-width">
                    <input
                      type="text"
                      value={applicationData.education.highSchoolName || ''}
                      readOnly
                    />
                  </div>
                </div>

                <div className="form-section">
                  <label className="section-label">City and State</label>
                  <div className="address-grid">
                    <div className="form-field">
                      <input
                        type="text"
                        value={applicationData.education.highSchoolCity || ''}
                        readOnly
                      />
                      <span className="field-label">City</span>
                    </div>
                    <div className="form-field">
                      <input
                        type="text"
                        value={applicationData.education.highSchoolState || ''}
                        readOnly
                      />
                      <span className="field-label">State / Province / Region</span>
                    </div>
                  </div>
                </div>

                <div className="form-section">
                  <label className="section-label">Did you Graduate?</label>
                  <div className="radio-group">
                    <label className="radio-label">
                      <input
                        type="radio"
                        checked={applicationData.education.highSchoolGraduate === 'yes'}
                        readOnly
                      />
                      <span>Yes</span>
                    </label>
                    <label className="radio-label">
                      <input
                        type="radio"
                        checked={applicationData.education.highSchoolGraduate === 'no'}
                        readOnly
                      />
                      <span>No</span>
                    </label>
                  </div>
                </div>

                <hr className="section-divider" />

                <div className="form-section">
                  <label className="section-label">Name of College or technical school</label>
                  <div className="form-field full-width">
                    <input
                      type="text"
                      value={applicationData.education.collegeName || ''}
                      readOnly
                    />
                  </div>
                </div>

                <div className="form-section">
                  <label className="section-label">City and State</label>
                  <div className="address-grid">
                    <div className="form-field">
                      <input
                        type="text"
                        value={applicationData.education.collegeCity || ''}
                        readOnly
                      />
                      <span className="field-label">City</span>
                    </div>
                    <div className="form-field">
                      <input
                        type="text"
                        value={applicationData.education.collegeState || ''}
                        readOnly
                      />
                      <span className="field-label">State / Province / Region</span>
                    </div>
                  </div>
                </div>

                <div className="form-section">
                  <label className="section-label">Did you Graduate?</label>
                  <div className="radio-group">
                    <label className="radio-label">
                      <input
                        type="radio"
                        checked={applicationData.education.collegeGraduate === 'yes'}
                        readOnly
                      />
                      <span>Yes</span>
                    </label>
                    <label className="radio-label">
                      <input
                        type="radio"
                        checked={applicationData.education.collegeGraduate === 'no'}
                        readOnly
                      />
                      <span>No</span>
                    </label>
                  </div>
                </div>

                <div className="form-section">
                  <div className="name-grid">
                    <div className="form-field">
                      <label className="section-label">Degree</label>
                      <input
                        type="text"
                        value={applicationData.education.degree || ''}
                        readOnly
                      />
                    </div>
                    <div className="form-field">
                      <label className="section-label">Major</label>
                      <input
                        type="text"
                        value={applicationData.education.major || ''}
                        readOnly
                      />
                    </div>
                    <div className="form-field">
                      <label className="section-label">Certificate/Diploma</label>
                      <input
                        type="text"
                        value={applicationData.education.certificate || ''}
                        readOnly
                      />
                    </div>
                  </div>
                </div>

                <div className="form-section">
                  <label className="section-label">Are you presently enrolled in School?</label>
                  <div className="radio-group">
                    <label className="radio-label">
                      <input
                        type="radio"
                        checked={applicationData.education.currentlyEnrolled === 'yes'}
                        readOnly
                      />
                      <span>Yes</span>
                    </label>
                    <label className="radio-label">
                      <input
                        type="radio"
                        checked={applicationData.education.currentlyEnrolled === 'no'}
                        readOnly
                      />
                      <span>No</span>
                    </label>
                  </div>
                </div>

                <div className="form-section">
                  <label className="section-label">List any job-related skills or accomplishments</label>
                  <div className="form-field full-width">
                    <textarea
                      value={applicationData.education.skills || ''}
                      readOnly
                      rows="5"
                    ></textarea>
                  </div>
                </div>
              </div>
            )}

            {/* STEP 3 - AVAILABILITY */}
            {activeStep === 3 && (
              <div className="detail-step">
                <h1 className="form-title">YOUR AVAILABILITY FOR WORK</h1>

                <div className="form-section">
                  <div className="availability-grid">
                    {['monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday', 'sunday'].map((day) => (
                      <div key={day} className="mb-3">
                        <h4 className="day-label">{day.charAt(0).toUpperCase() + day.slice(1)}</h4>
                        <div className="availability-day d-flex align-items-center justify-content-start gap-3">
                          <label className="checkbox-label d-flex align-items-center gap-1 mb-0">
                            <input
                              type="checkbox"
                              checked={applicationData.availability[`${day}Available`] || false}
                              readOnly
                            />
                            <span>Available</span>
                          </label>

                          {applicationData.availability[`${day}Available`] && (
                            <div className="time-inputs d-flex align-items-center gap-1">
                              <input
                                type="time"
                                value={applicationData.availability[`${day}StartTime`] || ''}
                                readOnly
                                className="form-control form-control-sm"
                                style={{ width: "100px" }}
                              />
                              <span>/</span>
                              <input
                                type="time"
                                value={applicationData.availability[`${day}EndTime`] || ''}
                                readOnly
                                className="form-control form-control-sm"
                                style={{ width: "100px" }}
                              />
                            </div>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="form-section">
                  <label className="section-label">Total number of hours per week you are available to work</label>
                  <div className="form-field full-width">
                    <input
                      type="text"
                      value={applicationData.availability.totalHours || ''}
                      readOnly
                    />
                  </div>
                </div>

                <div className="form-section">
                  <label className="section-label">Please list any special requests or needs for a work schedule?</label>
                  <div className="form-field full-width">
                    <input
                      type="text"
                      value={applicationData.availability.specialRequests || ''}
                      readOnly
                    />
                  </div>
                </div>
              </div>
            )}

            {/* STEP 4 - REFERENCES */}
            {activeStep === 4 && (
              <div className="detail-step">
                <h1 className="form-title">GIVE THREE REFERENCES</h1>

                {[1, 2].map(num => (
                  <div className="employer-section" key={num}>
                    <h2 className="employer-number">{num}</h2>

                    <div className="form-section">
                      <label className="section-label">Name</label>
                      <div className="address-grid">
                        <div className="form-field">
                          <input
                            type="text"
                            value={applicationData.references[`employer${num}Name`] || ''}
                            readOnly
                          />
                          <span className="field-label">First</span>
                        </div>
                        <div className="form-field">
                          <input
                            type="text"
                            value={applicationData.references[`employer${num}Last`] || ''}
                            readOnly
                          />
                          <span className="field-label">Last</span>
                        </div>
                      </div>
                    </div>

                    <div className="form-section">
                      <label className="section-label">City/State</label>
                      <div className="form-field full-width">
                        <input
                          type="text"
                          value={applicationData.references[`employer${num}City`] || ''}
                          readOnly
                        />
                      </div>
                    </div>

                    <div className="form-section">
                      <label className="section-label">How do you know them, and for how long?</label>
                      <div className="form-field full-width">
                        <input
                          type="text"
                          value={applicationData.references[`employer${num}Worked`] || ''}
                          readOnly
                        />
                      </div>
                    </div>

                    <div className="form-section">
                      <label className="section-label">Phone Number</label>
                      <div className="form-field full-width">
                        <input
                          type="tel"
                          value={applicationData.references[`employer${num}Phone`] || ''}
                          readOnly
                        />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* STEP 5 - EXPERIENCE */}
            {activeStep === 5 && (
              <div className="detail-step">
                <h1 className="form-title">EMPLOYMENT HISTORY</h1>

                {['emp1', 'emp2'].map((prefix, index) => {
                  const title = ['First Employer', 'Second Employer'][index];

                  return (
                    <div className="employer-section" key={prefix}>
                      <h2 className="employer-title">{title}</h2>

                      <div className="form-section">
                        <label className="section-label">Name of Employer</label>
                        <div className="form-field full-width">
                          {['Name'].map(part => (
                            <div className="form-field" key={part}>
                              <input
                                type="text"
                                value={applicationData.experience[`${prefix}${part}Name`] || ''}
                                readOnly
                              />
                              <span className="field-label">{part}</span>
                            </div>
                          ))}
                        </div>
                      </div>

                      <div className="form-section">
                        <label className="section-label">Job Title</label>
                        <div className="form-field full-width">
                          <input
                            type="text"
                            value={applicationData.experience[`${prefix}JobTitle`] || ''}
                            readOnly
                          />
                        </div>
                      </div>
                      <div className="form-section">
                        <label className="section-label">Business/Organization Name</label>
                        <div className="form-field full-width">
                          <input
                            type="text"
                            value={applicationData.experience[`${prefix}BusinessName`] || ''}
                            readOnly
                          />
                        </div>
                      </div>

                      <div className="form-section">
                        <label className="section-label">Duties</label>
                        <div className="form-field full-width">
                          <input
                            type="text"
                            value={applicationData.experience[`${prefix}Duties`] || ''}
                            readOnly
                          />
                        </div>
                      </div>

                      <div className="form-section">
                        <label className="section-label">Address</label>
                        <div className="form-field full-width">
                          <input
                            type="text"
                            value={applicationData.experience[`${prefix}Address`] || ''}
                            readOnly
                          />
                          <span className="field-label">Street Address</span>
                        </div>
                        <div className="address-grid" style={{ marginTop: '15px' }}>
                          <div className="form-field">
                            <input
                              type="text"
                              value={applicationData.experience[`${prefix}City`] || ''}
                              readOnly
                            />
                            <span className="field-label">City</span>
                          </div>
                          <div className="form-field">
                            <input
                              type="text"
                              value={applicationData.experience[`${prefix}State`] || ''}
                              readOnly
                            />
                            <span className="field-label">State / Province / Region</span>
                          </div>
                        </div>
                        <div className="form-field half-width" style={{ marginTop: '15px' }}>
                          <input
                            type="text"
                            value={applicationData.experience[`${prefix}Zip`] || ''}
                            readOnly
                          />
                          <span className="field-label">ZIP / Postal Code</span>
                        </div>
                      </div>

                      <div className="form-row">
                        <div className="form-field">
                          <label className="section-label">Dates of Employment</label>
                          <span className="field-sublabel">From</span>
                          <input
                            type="date"
                            value={applicationData.experience[`${prefix}StartDate`] || ''}
                            readOnly
                          />
                        </div>
                        <div className="form-field">
                          <label className="section-label">Dates of Employment</label>
                          <span className="field-sublabel">To</span>
                          <input
                            type="date"
                            value={applicationData.experience[`${prefix}EndDate`] || ''}
                            readOnly
                          />
                        </div>
                      </div>

                      <div className="form-section">
                        <label className="section-label">Supervisor's Name</label>
                        <div className="name-grid">
                          {['First', 'Middle', 'Last'].map(part => (
                            <div className="form-field" key={part}>
                              <input
                                type="text"
                                value={applicationData.experience[`${prefix}Supervisor${part}`] || ''}
                                readOnly
                              />
                              <span className="field-label">{part}</span>
                            </div>
                          ))}
                        </div>
                      </div>

                      {['StartingPay', 'EndingPay'].map(payType => (
                        <div className="form-section" key={payType}>
                          <label className="section-label">Hourly pay or salary - {payType.replace('Pay', '')}</label>
                          <div className="form-field full-width">
                            <select
                              value={applicationData.experience[`${prefix}${payType}`] || ''}
                              disabled
                            >
                              <option value="">Select {payType}</option>
                              <option value="10-15">$10 - $15/hr</option>
                              <option value="15-20">$15 - $20/hr</option>
                              <option value="20-25">$20 - $25/hr</option>
                              <option value="25-30">$25 - $30/hr</option>
                              <option value="30+">$30+/hr</option>
                            </select>
                          </div>
                        </div>
                      ))}

                      <div className="form-section">
                        <label className="section-label">Telephone Number</label>
                        <div className="form-field full-width">
                          <input
                            type="tel"
                            value={applicationData.experience[`${prefix}Phone`] || ''}
                            readOnly
                          />
                        </div>
                      </div>

                      <div className="form-section">
                        <label className="section-label">Reason for leaving</label>
                        <div className="form-field full-width">
                          <input
                            type="text"
                            value={applicationData.experience[`${prefix}Leaving`] || ''}
                            readOnly
                          />
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}

            {/* STEP 6 - DOCUMENTS */}
            {activeStep === 6 && (
              <div className="detail-step">
                <h1 className="form-title">DOCUMENT UPLOADS</h1>

                {[
                  { label: 'Physical Examination', name: 'physicalExam', expiry: 'physicalExamExpiry' },
                  { label: 'CPR Card', name: 'cprCard', expiry: 'cprExpiry' },
                  { label: "Driver's License", name: 'driversLicense', expiry: 'driversLicenseExpiry' },
                  { label: 'Professional License', name: 'professionalLicense', expiry: 'professionalLicenseExpiry' },
                  { label: 'Liability Insurance', name: 'liabilityInsurance', expiry: 'liabilityInsuranceExpiry' },
                  { label: 'Auto Insurance', name: 'autoInsurance', expiry: 'autoInsuranceExpiry' },
                  { label: 'Work Authorization', name: 'workAuthorization', expiry: 'workAuthorizationExpiry' },
                  { label: 'Background Screening', name: 'backgroundScreening', expiry: 'backgroundScreeningExpiry' },
                  { label: 'Palm Beach Badge', name: 'palmBeachBadge', expiry: 'palmBeachBadgeExpiry' }
                ].map(doc => (
                  <div className="file-upload-section" key={doc.name}>
                    <label className="section-label">{doc.label}</label>
                    {applicationData.documents[doc.name]?.local_path ? (
                      <>
                        <div className="document-file">
                          <i className="fas fa-file-pdf"></i>
                          <a href={applicationData.documents[doc.name]?.sharepoint_url || `${base_url}/storage/${applicationData.documents[doc.name]?.local_path}`}
                            target="_blank"
                            rel="noopener noreferrer">
                            {doc.label} (View in SharePoint)
                          </a>
                        </div>
                        {applicationData.documents[doc.expiry] && (
                          <div className="form-field half-width">
                            <label className="section-label">Expiration Date</label>
                            <input
                              type="date"
                              className={isExpired(applicationData.documents[doc.expiry]) ? 'text-danger' : ''}
                              value={applicationData.documents[doc.expiry] || ''}
                              readOnly
                            />
                          </div>
                        )}
                      </>
                    ) : (
                      <p className="field-value text-muted">Not uploaded</p>
                    )}
                  </div>
                ))}

                <hr className="section-divider" />

                {[
                  { label: 'HIV/AIDS Certificate', name: 'hivCertificate' },
                  { label: 'Domestic Violence Certificate', name: 'domesticViolence' },
                  { label: 'Alzheimer/Dementia Certificate', name: 'alzheimersCertificate' },
                  { label: '1 Hour Alzheimer Training', name: 'alzheimersTraining' },
                  { label: 'HIPAA Update', name: 'hipaa' },
                  { label: 'OSHA Update', name: 'osha' },
                  { label: 'Medication Certificate', name: 'medicationCertificate' },
                  { label: 'Communication Training', name: 'communicationTraining' },
                  { label: 'Patient Rights', name: 'patientRights' },
                  { label: 'Medical Records', name: 'medicalRecords' },
                  { label: 'Medical Errors', name: 'medicalErrors' },
                  { label: 'Florida Laws & Rules', name: 'floridaLaws' }
                ].map(doc => (
                  <div className="file-upload-section" key={doc.name}>
                    <label className="section-label">{doc.label}</label>
                    {applicationData.documents[doc.name]?.local_path ? (
                      <div className="document-file">
                        <i className="fas fa-file-pdf"></i>
                        <a href={applicationData.documents[doc.name]?.sharepoint_url || `${base_url}/storage/${applicationData.documents[doc.name]?.local_path}`}
                          target="_blank"
                          rel="noopener noreferrer">
                          {doc.label} (View in SharePoint)
                        </a>
                      </div>
                    ) : (
                      <p className="field-value text-muted">Not uploaded</p>
                    )}
                  </div>
                ))}
              </div>
            )}
            {previewUrl && (
              <div className="preview-modal-overlay" onClick={() => setPreviewUrl(null)}>
                <div className="preview-modal-content" onClick={e => e.stopPropagation()}>
                  <button className="close-preview" onClick={() => setPreviewUrl(null)}>×</button>
                  <iframe
                    src={previewUrl}
                    width="100%"
                    height="600px"
                    frameBorder="0"
                    title="Document Preview"
                  >
                    This browser does not support PDFs. Please download the PDF to view it:
                    <a href={previewUrl}>Download PDF</a>
                  </iframe>
                </div>
              </div>
            )}
            {/* STEP 7 - REVIEW/SIGNATURE */}
            {activeStep === 7 && (
              <div className="detail-step">
                <h1 className="form-title">REVIEW & SIGNATURE</h1>

                <div className="form-section">
                  <label className="section-label">Agreement</label>
                  <div className="agreement-checkbox">
                    <label className="checkbox-label">
                      <input
                        type="checkbox"
                        checked={applicationData.review?.agreeStatements || false}
                        readOnly
                      />
                      <span><strong>I have read, understand, and agree to the above statements</strong></span>
                    </label>
                  </div>
                </div>

                <div className="signature-section">
                  <label className="section-label">Signature</label>
                  {applicationData.review?.signature ? (
                    <div className="signature-display">
                      <img src={applicationData.review.signature} alt="Applicant Signature" />
                    </div>
                  ) : (
                    <p className="field-value text-muted">No signature</p>
                  )}
                </div>

                <div className="form-section">
                  <label className="section-label">Date</label>
                  <div className="form-field half-width">
                    <input
                      type="date"
                      value={applicationData.review?.signatureDate || ''}
                      readOnly
                    />
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Navigation Buttons */}
          <div className="detail-navigation">
            {activeStep > 1 && (
              <button
                className="btn-previous"
                onClick={() => setActiveStep(activeStep - 1)}
              >
                <i className="fas fa-arrow-left"></i> Previous
              </button>
            )}
            {activeStep < 7 && (
              <button
                className="btn-next"
                onClick={() => setActiveStep(activeStep + 1)}
              >
                Next
              </button>
            )}
          </div>
        </>
      )}

      {/* FINAL APPLICATION VIEW */}
      {/* FINAL APPLICATION VIEW */}
      {viewMode === 'final' && (
        <div className="final-application-section">
          {!selectedFinalApp ? (
            <>
              <h2 className="section-title">Final Application Forms</h2>
              <p className="section-description">Select a final application form to view</p>
              <div className="final-app-buttons">
                {FINAL_FORMS.map((form) => (
                  <button
                    key={form.id}
                    className="final-app-button"
                    onClick={() => handleFinalApplicationClick(form.id)}
                  >
                    <div className="button-icon">
                      <i className="fas fa-file-contract"></i>
                    </div>
                    <div className="button-content">
                      {/* Displays the actual name you provided */}
                      <h3>{form.name}</h3>
                      <p>View form details</p>
                    </div>
                    <i className="fas fa-chevron-right"></i>
                  </button>
                ))}
              </div>
            </>
          ) : (
            <>
              <button
                className="btn-back mb-3"
                onClick={() => setSelectedFinalApp(null)}
                style={{ background: 'none', border: 'none', color: '#4361ee', cursor: 'pointer' }}
              >
                <i className="fas fa-arrow-left"></i> Back to Final Applications
              </button>
              {finalAppLoading ? (
                <div className="text-center p-5">
                  <div className="spinner-border text-primary" role="status">
                    <span className="visually-hidden">Loading...</span>
                  </div>
                  <p className="mt-3">Loading application data...</p>
                </div>
              ) : (
                <>
                  {selectedFinalApp === 'final' && <FinalApplicationView1 data={finalAppData} />}
                  {selectedFinalApp === 'final_2' && <FinalApplicationView2 data={finalAppData} />}
                  {selectedFinalApp === 'final_3' && <FinalApplicationView3 data={finalAppData} />}
                  {selectedFinalApp === 'final_4' && <FinalApplicationView4 data={finalAppData} />}
                  {selectedFinalApp === 'final_5' && <FinalApplicationView5 data={finalAppData} />}



                </>
              )}
            </>
          )}
        </div>
      )}

      {viewMode === 'notes' && (
        <div className="notes-section">
          <h2 className="section-title">Internal Notes & Comments</h2>
          <p className="section-description">Add internal notes and comments for this application</p>

          {/* Add Note Form */}
          <form onSubmit={handleAddNote} className="add-note-form">
            <textarea
              value={newNote}
              onChange={(e) => setNewNote(e.target.value)}
              placeholder="Write a note or comment..."
              rows="4"
              className="note-textarea"
            />

            {/* Priority Selector */}
            <div className="note-priority-selector">
              <label className="priority-label">Priority Level:</label>
              <div className="priority-options">
                <button
                  type="button"
                  className={`priority-option ${notePriority === 'low' ? 'active' : ''}`}
                  onClick={() => setNotePriority('low')}
                >
                  <i className="fas fa-circle" style={{ color: '#10b981' }}></i>
                  Low
                </button>
                <button
                  type="button"
                  className={`priority-option ${notePriority === 'medium' ? 'active' : ''}`}
                  onClick={() => setNotePriority('medium')}
                >
                  <i className="fas fa-circle" style={{ color: '#f59e0b' }}></i>
                  Medium
                </button>
                <button
                  type="button"
                  className={`priority-option ${notePriority === 'high' ? 'active' : ''}`}
                  onClick={() => setNotePriority('high')}
                >
                  <i className="fas fa-circle" style={{ color: '#ef4444' }}></i>
                  High
                </button>
                <button
                  type="button"
                  className={`priority-option ${notePriority === 'urgent' ? 'active' : ''}`}
                  onClick={() => setNotePriority('urgent')}
                >
                  <i className="fas fa-exclamation-circle" style={{ color: '#ef4444' }}></i>
                  Urgent
                </button>
              </div>
            </div>

            <button type="submit" className="btn-add-note">
              <i className="fas fa-plus-circle"></i> Add Note
            </button>
          </form>

          {/* Notes List */}
          <div className="notes-list">
            {notes.length > 0 ? (
              notes.map(note => {
                const priorityInfo = getPriorityIcon(note.priority);
                return (
                  <div key={note.id} className={`note-card priority-${note.priority}`}>
                    <div className="note-header">
                      <div className="note-author">
                        <i className="fas fa-user-circle"></i>
                        <span>{note.admin_user}</span>
                        {/* Priority Badge */}
                        <span className="note-priority-badge" style={{ marginLeft: '10px' }}>
                          <i className={priorityInfo.icon} style={{ color: priorityInfo.color }}></i>
                          <span style={{ color: priorityInfo.color, fontWeight: 600 }}>
                            {priorityInfo.label}
                          </span>
                        </span>
                      </div>
                      <div className="note-meta">
                        <span className="note-date">
                          {new Date(note.created_at).toLocaleString()}
                        </span>
                        <button
                          className="btn-delete-note"
                          onClick={() => handleDeleteNote(note.id)}
                        >
                          <i className="fas fa-trash"></i>
                        </button>
                      </div>
                    </div>
                    <div className="note-content">
                      {note.note}
                    </div>
                  </div>
                );
              })
            ) : (
              <div className="no-notes">
                <i className="fas fa-inbox"></i>
                <p>No notes yet. Add your first note above.</p>
              </div>
            )}
          </div>
        </div>
      )}
      {/* STATUS LOGS VIEW */}
      {viewMode === 'logs' && (
        <div className="logs-section">
          <h2 className="section-title">Status History</h2>
          <p className="section-description">Complete timeline of application status changes</p>

          {/* Status Timeline */}
          <div className="status-timeline">
            {statusLogs.length > 0 ? (
              statusLogs.map((log, index) => (
                <div key={log.id} className="timeline-item">
                  <div className="timeline-marker">
                    <div className={`timeline-dot ${getStatusColor(log.to_status)}`}>
                      <i className={getStatusIcon(log.to_status)}></i>
                    </div>
                    {index !== statusLogs.length - 1 && (
                      <div className="timeline-line"></div>
                    )}
                  </div>
                  <div className="timeline-content">
                    <div className="timeline-header">
                      <div className="timeline-status">
                        <span className={`status-badge ${getStatusBadgeClass(log.to_status)}`}>
                          {log.to_status}
                        </span>
                        {log.from_status && (
                          <>
                            <i className="fas fa-arrow-left" style={{ margin: '0 10px', color: '#9ca3af' }}></i>
                            <span className="status-badge status-old">
                              {log.from_status}
                            </span>
                          </>
                        )}
                      </div>
                      <span className="timeline-date">
                        {new Date(log.created_at).toLocaleString()}
                      </span>
                    </div>
                    {log.changed_by && (
                      <p className="timeline-user">
                        <i className="fas fa-user"></i> Changed by: <strong>{log.changed_by}</strong>
                      </p>
                    )}
                    {log.notes && (
                      <p className="timeline-notes">
                        <i className="fas fa-comment"></i> {log.notes}
                      </p>
                    )}
                  </div>
                </div>
              ))
            ) : (
              <div className="no-logs">
                <i className="fas fa-clock"></i>
                <p>No status changes recorded yet</p>
              </div>
            )}
          </div>
        </div>
      )}
       {/* Revision Modal */}
            {showRevisionModal && (
                <div className="modal-overlay" onClick={() => setShowRevisionModal(false)}>
                    <div className="modal-content" onClick={e => e.stopPropagation()}>
                        <div className="modal-header">
                            <h3>
                                <i className="fas fa-edit"></i> 
                                Request Application Revision
                            </h3>
                            <button 
                                className="modal-close"
                                onClick={() => setShowRevisionModal(false)}
                            >
                                ×
                            </button>
                        </div>
                        
                        <div className="modal-body">
                            <p className="revision-info">
                                <i className="fas fa-info-circle"></i>
                                This will send a revision request to the applicant. 
                                They will be able to make changes and resubmit.
                            </p>
                            
                            {applicationData?.details?.revision_count > 0 && (
                                <div className="revision-history">
                                    <i className="fas fa-history"></i>
                                    This will be revision #{applicationData.details.revision_count + 1}
                                </div>
                            )}
                            
                            <div className="form-group">
                                <label htmlFor="revisionReason">
                                    Revision Reason <span className="required">*</span>
                                </label>
                                <textarea
                                    id="revisionReason"
                                    className="form-control"
                                    value={revisionReason}
                                    onChange={(e) => setRevisionReason(e.target.value)}
                                    placeholder="Please describe what needs to be corrected or updated..."
                                    rows="5"
                                />
                                <small className="form-text text-muted">
                                    Be specific about what needs to be changed. 
                                    Minimum 10 characters required.
                                </small>
                                <div className="character-count">
                                    {revisionReason.length} / 1000 characters
                                    {revisionReason.length < 10 && revisionReason.length > 0 && (
                                        <span className="text-warning">
                                            (Need at least 10 characters)
                                        </span>
                                    )}
                                </div>
                            </div>
                            
                            <div className="form-group">
                                <label className="revision-checklist-label">
                                    <i className="fas fa-check-circle"></i>
                                    Common issues to check:
                                </label>
                                <ul className="revision-checklist">
                                    <li>☐ Document quality (blurry/illegible)</li>
                                    <li>☐ Missing required documents</li>
                                    <li>☐ Incorrect or incomplete information</li>
                                    <li>☐ Expired certifications/licenses</li>
                                    <li>☐ Missing signatures</li>
                                </ul>
                            </div>
                        </div>
                        
                        <div className="modal-footer">
                            <button
                                className="btn-cancel"
                                onClick={() => setShowRevisionModal(false)}
                            >
                                Cancel
                            </button>
                            <button
                                className="btn-send-revision"
                                onClick={handleRequestRevision}
                                disabled={revisionSubmitting || revisionReason.length < 10}
                            >
                                {revisionSubmitting ? (
                                    <>
                                        <i className="fas fa-spinner fa-spin"></i> 
                                        Sending...
                                    </>
                                ) : (
                                    <>
                                        <i className="fas fa-paper-plane"></i> 
                                        Send Revision Request
                                    </>
                                )}
                            </button>
                        </div>
                    </div>
                </div>
            )}
    </>
  );
};

export default ApplicationDetail;
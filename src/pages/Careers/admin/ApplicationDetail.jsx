import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import { base_url } from '../../../components/config';
import * as types from '../../../redux/type';

const ApplicationDetail = () => {
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
  
const notes = useSelector(state => state.application?.notes || []);
const noteSuccess = useSelector(state => state.application?.noteSuccess || null);
  const [activeStep, setActiveStep] = useState(1);
  const [loading, setLoading] = useState(true);
  const [applicationData, setApplicationData] = useState(null);

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
        admin_user: 'Admin' // Replace with actual admin username from auth
      }
    });
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

  const handleFinalApplicationClick = (formNumber) => {
    console.log(`Opening Final Application ${formNumber}`);
    // TODO: Add logic to open/view specific final application form
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

  return (
    <>
<div className="page-header">
        <div>
          <h2>Application Details - #{id?.padStart(4, '0')}</h2>
          <p>View complete application submission</p>
        </div>
        <div className="action-buttons-header">
          <button className="btn-approve" onClick={handleApprove}>
            <i className="fas fa-check-circle"></i> Approve
          </button>
          <button className="btn-reject" onClick={handleReject}>
            <i className="fas fa-times-circle"></i> Reject
          </button>
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
              ].map(step => (
                <div
                  key={step.num}
                  className={`step ${activeStep === step.num ? 'active' : 'completed'}`}
                  onClick={() => setActiveStep(step.num)}
                >
                  <div className="step-number">
                    {activeStep > step.num ? '✓' : step.num}
                  </div>
                  <span className="step-label">{step.label}</span>
                </div>
              ))}
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
                  <div className="form-field full-width">
                    <input
                      type="text"
                      value={applicationData.preEmployment.streetAddress || ''}
                      readOnly
                    />
                    <span className="field-label">Street Address</span>
                  </div>
                  <div className="address-grid">
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
                  </div>
                  <div className="form-field half-width">
                    <input
                      type="text"
                      value={applicationData.preEmployment.zipCode || ''}
                      readOnly
                    />
                    <span className="field-label">ZIP / Postal Code</span>
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

                {[1, 2, 3].map(num => (
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

                {['emp1', 'emp2', 'emp3'].map((prefix, index) => {
                  const title = ['First Employer', 'Second Employer', 'Third Employer'][index];
                  
                  return (
                    <div className="employer-section" key={prefix}>
                      <h2 className="employer-title">{title}</h2>

                      <div className="form-section">
                        <label className="section-label">Name of Employer</label>
                        <div className="name-grid">
                          {['First', 'Middle', 'Last'].map(part => (
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
                          <a href={`${base_url}/storage/${applicationData.documents[doc.name].local_path}`} target="_blank" rel="noopener noreferrer">
                            {applicationData.documents[doc.name].local_path.split('/').pop()}
                          </a>
                        </div>
                        {applicationData.documents[doc.expiry] && (
                          <div className="form-field half-width">
                            <label className="section-label">Expiration Date</label>
                            <input
                              type="date"
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
                        <a href={`${base_url}/storage/${applicationData.documents[doc.name].local_path}`} target="_blank" rel="noopener noreferrer">
                          {applicationData.documents[doc.name].local_path.split('/').pop()}
                        </a>
                      </div>
                    ) : (
                      <p className="field-value text-muted">Not uploaded</p>
                    )}
                  </div>
                ))}
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
      {viewMode === 'final' && (
        <div className="final-application-section">
          <h2 className="section-title">Final Application Forms</h2>
          <p className="section-description">Select a final application form to view</p>
          
          <div className="final-app-buttons">
            {[1, 2, 3, 4, 5, 6].map((num) => (
              <button
                key={num}
                className="final-app-button"
                onClick={() => handleFinalApplicationClick(num)}
              >
                <div className="button-icon">
                  <i className="fas fa-file-contract"></i>
                </div>
                <div className="button-content">
                  <h3>Final Application {num}</h3>
                  <p>View form details</p>
                </div>
                <i className="fas fa-chevron-right"></i>
              </button>
            ))}
          </div>
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
            <button type="submit" className="btn-add-note">
              <i className="fas fa-plus-circle"></i> Add Note
            </button>
          </form>

          {/* Notes List */}
          <div className="notes-list">
            {notes.length > 0 ? (
              notes.map(note => (
                <div key={note.id} className="note-card">
                  <div className="note-header">
                    <div className="note-author">
                      <i className="fas fa-user-circle"></i>
                      <span>{note.admin_user}</span>
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
              ))
            ) : (
              <div className="no-notes">
                <i className="fas fa-inbox"></i>
                <p>No notes yet. Add your first note above.</p>
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
};

export default ApplicationDetail;
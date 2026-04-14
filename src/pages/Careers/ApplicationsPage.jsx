import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import ProfileSidebar from './ProfileSidebar';
import * as types from '../../redux/type';

const ApplicationsPage = ({ onBack }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  
  const referenceId = localStorage.getItem('applicationReferenceId');
  
  // Get progress from Redux store
  const { formProgress, loading, error } = useSelector(
    state => state.applicationReducer
  );
  
  // Define all final applications with their details
  const finalApplications = [
    {
      id: 1,
      name: 'Final Application 1',
      description: 'Complete eligibility verification, W-9, attestations, and background screening',
      formType: 'final',
      path: '/final-form-2',
      steps: 13,
      icon: 'fas fa-file-contract',
    },
    {
      id: 2,
      name: 'Final Application 2',
      description: 'Independent Contractor Agreement and Orientation',
      formType: 'final_2',
      path: '/final-form-3',
      steps: 6,
      icon: 'fas fa-file-alt',
    },
    {
      id: 3,
      name: 'Final Application 3',
      description: 'Upload required documents and certifications',
      formType: 'final_3',
      path: '/final-form-4',
      steps: 8,
      icon: 'fas fa-file-medical',
    },
    {
      id: 4,
      name: 'Final Application 4',
      formType: 'final_4',
      path: '/final-form-6',
      steps: 2,
      icon: 'fas fa-file-invoice',
    },
    {
      id: 5,
      name: 'Final Application 5',
      formType: 'final_5',
      path: '/final-form',
      steps: 14,
      icon: 'fas fa-file-signature',
    },
    // {
    //   id: 6,
    //   name: 'Final Application 6',
    //   formType: 'final_6',
    //   path: '/final-application-6',
    //   steps: 9,
    //   icon: 'fas fa-file-check',
    // }
  ];
  
  // Fetch progress using Redux saga when component mounts
  useEffect(() => {
    if (referenceId) {
      dispatch({ type: types.FETCH_FORM_PROGRESS_REQUEST, payload: referenceId });
    }
  }, [dispatch, referenceId]);
  
  const getProgressForForm = (formType) => {
    // formProgress from Redux is an object keyed by form_type
    // Your backend should return: { "final": {...}, "final_2": {...}, etc. }
    const progress = formProgress?.[formType];
    
    if (!progress) {
      // Return default progress if not found
      return { percentage: 0, completedSteps: 0, totalSteps: 0, stepStatuses: {} };
    }
    
    return {
      percentage: progress.percentage || 0,
      completedSteps: progress.completedSteps || 0,
      totalSteps: progress.totalSteps || 0,
      stepStatuses: progress.stepStatuses || {}
    };
  };
  
  const handleOpenForm = (application) => {
    // Store the current form type in localStorage
    localStorage.setItem('currentFormType', application.formType);
    navigate(application.path);
  };
  
  const renderProgressBar = (percentage) => {
    return (
      <div className="progress-bar-container" style={{ marginTop: '10px' }}>
        <div className="progress-bar-track">
          <div 
            className="progress-bar-fill" 
            style={{ 
              width: `${percentage}%`,
              backgroundColor: '#4caf50',
              transition: 'width 0.3s ease'
            }}
          />
        </div>
        <div className="progress-text" style={{ fontSize: '12px', marginTop: '5px' }}>
          {Math.round(percentage)}% Complete
        </div>
      </div>
    );
  };
  
  const renderStepIndicators = (totalSteps, completedSteps) => {
    const displaySteps = Math.min(totalSteps, 10); // Show max 10 steps to avoid crowding
    const steps = [];
    for (let i = 1; i <= displaySteps; i++) {
      steps.push(
        <div 
          key={i}
          className={`step-indicator ${i <= completedSteps ? 'completed' : ''}`}
          style={{
            flex: 1,
            height: '4px',
            backgroundColor: i <= completedSteps ? '#4caf50' : '#e0e0e0',
            borderRadius: '2px'
          }}
        />
      );
    }
    return (
      <div className="step-indicators" style={{ display: 'flex', gap: '4px', marginTop: '10px' }}>
        {steps}
      </div>
    );
  };
  
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
              <a href="https://facebook.com" target="_blank" rel="noopener noreferrer"><i className="fab fa-facebook-f"></i></a>
              <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer"><i className="fab fa-linkedin-in"></i></a>
              <a href="https://twitter.com" target="_blank" rel="noopener noreferrer"><i className="fab fa-twitter"></i></a>
              <a href="https://instagram.com" target="_blank" rel="noopener noreferrer"><i className="fab fa-instagram"></i></a>
            </div>
          </div>
        </div>
      </header>

      {/* Main Layout Container */}
      <div className="profile-wrapper mt-5 mb-5">
        <div className="container">
          <div className="row">
            {/* Left Sidebar Card */}
            <div className="col-md-3">
              <ProfileSidebar />
            </div>
            
            <div className="col-md-9">
              {/* Right Content Card */}
              <main className="profile-content-card">
                <div className="final-application-section">
                  <h2 className="section-title">Final Application Forms</h2>
                  <p className="section-description">
                    {loading ? 'Loading your progress...' : 'Select a final application form to view or continue'}
                  </p>
                  
                  {/* Error Display */}
                  {error && !loading && (
                    <div className="alert alert-danger" style={{
                      padding: '12px',
                      borderRadius: '4px',
                      marginBottom: '20px',
                      backgroundColor: '#ffebee',
                      color: '#c62828'
                    }}>
                      Error loading progress: {typeof error === 'string' ? error : JSON.stringify(error)}
                    </div>
                  )}
                  
                  {loading ? (
                    <div className="text-center p-5">
                      <div className="spinner-border text-primary" role="status">
                        <span className="visually-hidden">Loading...</span>
                      </div>
                      <p className="mt-3">Loading your applications...</p>
                    </div>
                  ) : (
                    <div className="final-app-buttons">
                      {finalApplications.map((app) => {
                        const progress = getProgressForForm(app.formType);
                        const isComplete = progress.percentage === 100;
                        const statusText = isComplete ? 'Completed' : `${progress.completedSteps}/${progress.totalSteps} steps done`;
                        
                        return (
                          <button 
                            key={app.id}
                            className="final-app-button"
                            onClick={() => handleOpenForm(app)}
                            style={{ position: 'relative', overflow: 'hidden' }}
                          >
                            <div className="button-icon" style={{ color: app.color }}>
                              <i className={app.icon}></i>
                            </div>
                            <div className="button-content" style={{ flex: 1, textAlign: 'left' }}>
                              <h3 style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                                {app.name}
                                {isComplete && (
                                  <span style={{ 
                                    backgroundColor: '#4caf50', 
                                    color: 'white', 
                                    fontSize: '10px', 
                                    padding: '2px 8px', 
                                    borderRadius: '20px' 
                                  }}>
                                    ✓ Complete
                                  </span>
                                )}
                              </h3>
                              <p>{app.description}</p>
                              
                              {/* Progress Bar */}
                              {renderProgressBar(progress.percentage)}
                              
                              {/* Step Indicators */}
                              {renderStepIndicators(app.steps, progress.completedSteps)}
                              
                              <div style={{ 
                                fontSize: '11px', 
                                color: '#666', 
                                marginTop: '8px',
                                display: 'flex',
                                justifyContent: 'space-between'
                              }}>
                                <span>Status: {statusText}</span>
                                <span>{app.steps} total steps</span>
                              </div>
                            </div>
                            <i className="fas fa-chevron-right" style={{ color: app.color }}></i>
                          </button>
                        );
                      })}
                    </div>
                  )}
                </div>
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

export default ApplicationsPage;
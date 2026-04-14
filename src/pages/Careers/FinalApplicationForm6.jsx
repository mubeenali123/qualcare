import React, { useEffect, useRef, useState, useCallback } from 'react';
import './ApplicationForm.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useDispatch, useSelector } from 'react-redux';
import * as types from '../../redux/type';
import axios from 'axios';
import { base_url } from '../../components/config';

// Step name mapping for backend
const STEP_NAME_MAP = {
    1: 'health_release',
    2: 'vaccination_consent',
};

// Fields mapping for each step
const STEP_FIELDS_MAP = {
    1: ['healthReleaseName', 'hadTB', 'tbExplanation', 'hadBCG', 'bcgYear', 'currentTBSymptoms', 'noticeTitle', 'noticeDate'],
    2: ['vaccineRequestName', 'pregnant', 'allergies', 'dose1Date', 'dose2Date', 'dose3Date', 
        'lotNumber1', 'lotNumber2', 'lotNumber3', 'declineName', 'declineDate'],
};

const FinalApplicationForm6 = ({ formType = 'final_4' }) => {
    const dispatch = useDispatch();
    const { savingStep, stepSaveSuccess, formProgress, error } = useSelector(
        state => state.applicationReducer
    );
    
    const [submittedStep, setSubmittedStep] = useState(null);
    const today = new Date().toISOString().split("T")[0];

    const steps = [
        "Employment Health Release",
        "Vaccination Informed Consent"
    ];

    const [currentStep, setCurrentStep] = useState(1);
    const [isDrawing, setIsDrawing] = useState(false);
    
    // Signature refs for different canvases
    const noticeSignatureRef = useRef(null);
    const declineSignatureRef = useRef(null);
    
    const progressWidth = (currentStep / steps.length) * 100;
    
    // Get current form progress for this form type
    const currentFormProgress = formProgress?.[formType] || null;

    const [formData, setFormData] = useState({
        // Step 1: Health Release fields
        healthReleaseName: '',
        hadTB: '',
        tbExplanation: '',
        hadBCG: '',
        bcgYear: '',
        currentTBSymptoms: '',
        noticeTitle: '',
        noticeDate: today,
        
        // Step 2: Vaccination Consent fields
        vaccineRequestName: '',
        pregnant: false,
        allergies: false,
        dose1Date: '',
        dose2Date: '',
        dose3Date: '',
        lotNumber1: '',
        lotNumber2: '',
        lotNumber3: '',
        declineName: '',
        declineDate: today,
    });

    // Navigation effect - only navigate after successful save
    useEffect(() => {
        if (submittedStep !== null && !savingStep && stepSaveSuccess === STEP_NAME_MAP[submittedStep]) {
            setSubmittedStep(null);
            if (submittedStep === steps.length) {
                alert('Application submitted successfully!');
            } else {
                setCurrentStep(prev => Math.min(prev + 1, steps.length));
            }
            window.scrollTo({ top: 0, behavior: "smooth" });
        }
    }, [savingStep, stepSaveSuccess, submittedStep, steps.length]);

    useEffect(() => {
        window.scrollTo({ top: 0, behavior: "smooth" });
    }, [currentStep]);

    const goToStep = (step) => {
        if (step < 1 || step > steps.length) return;
        if (error) {
            dispatch({ type: types.CLEAR_FINAL_FORM_ERROR });
        }
        setCurrentStep(step);
    };

    const handleInputChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: type === 'checkbox' ? checked : value
        }));
    };

    // Get signature data from canvas
    const getSignatureData = (canvasRef) => {
        const canvas = canvasRef?.current;
        if (!canvas) return null;
        
        const ctx = canvas.getContext('2d');
        const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
        const isBlank = !Array.from(imageData.data).some(value => value !== 0);
        
        if (isBlank) return null;
        return canvas.toDataURL('image/png');
    };

    // Drawing functions for signature
    const startDrawing = (e, canvasRef) => {
        setIsDrawing(true);
        const canvas = canvasRef?.current;
        if (!canvas) return;
        const ctx = canvas.getContext('2d');
        const rect = canvas.getBoundingClientRect();
        const x = e.clientX ? e.clientX - rect.left : e.touches[0].clientX - rect.left;
        const y = e.clientY ? e.clientY - rect.top : e.touches[0].clientY - rect.top;
        ctx.beginPath();
        ctx.moveTo(x, y);
    };
    
    const draw = (e, canvasRef) => {
        if (!isDrawing) return;
        const canvas = canvasRef?.current;
        if (!canvas) return;
        const ctx = canvas.getContext('2d');
        const rect = canvas.getBoundingClientRect();
        const x = e.clientX ? e.clientX - rect.left : e.touches[0].clientX - rect.left;
        const y = e.clientY ? e.clientY - rect.top : e.touches[0].clientY - rect.top;
        ctx.lineWidth = 2;
        ctx.lineCap = 'round';
        ctx.strokeStyle = 'black';
        ctx.lineTo(x, y);
        ctx.stroke();
        ctx.beginPath();
        ctx.moveTo(x, y);
    };
    
    const stopDrawing = () => setIsDrawing(false);
    
    const clearSignature = (canvasRef) => {
        const canvas = canvasRef?.current;
        if (!canvas) return;
        const ctx = canvas.getContext('2d');
        ctx.clearRect(0, 0, canvas.width, canvas.height);
    };

    // Helper: convert base64 to Blob
    const dataURItoBlob = (dataURI) => {
        const byteString = atob(dataURI.split(',')[1]);
        const mimeString = dataURI.split(',')[0].split(':')[1].split(';')[0];
        const ab = new ArrayBuffer(byteString.length);
        const ia = new Uint8Array(ab);
        for (let i = 0; i < byteString.length; i++) {
            ia[i] = byteString.charCodeAt(i);
        }
        return new Blob([ab], { type: mimeString });
    };

    const handleNext = useCallback((e) => {
        e.preventDefault();
        if (savingStep) return;
        
        const referenceId = localStorage.getItem('applicationReferenceId');
        const stepName = STEP_NAME_MAP[currentStep];
        const stepNumber = currentStep;
        
        console.log('Saving step:', { stepNumber, stepName, referenceId });
        
        // Filter formData to ONLY include fields for this step
        let formDataToSend = {};
        const relevantFields = STEP_FIELDS_MAP[currentStep] || [];
        
        if (relevantFields.length > 0) {
            formDataToSend = relevantFields.reduce((obj, field) => {
                if (formData[field] !== undefined && formData[field] !== '') {
                    obj[field] = formData[field];
                }
                return obj;
            }, {});
        }
        
        // Get signature for current step
        let signatureData = null;
        if (currentStep === 1) {
            signatureData = getSignatureData(noticeSignatureRef);
        } else if (currentStep === 2) {
            signatureData = getSignatureData(declineSignatureRef);
        }
        
        setSubmittedStep(currentStep);
        
        dispatch({
            type: types.SAVE_FINAL_FORM_STEP_REQUEST,
            payload: {
                stepNumber: stepNumber,
                stepName: stepName,
                formData: formDataToSend,
                signatureData: signatureData,
                pdfFieldData: null,
                referenceId: referenceId,
            },
        });
    }, [currentStep, formData, savingStep, dispatch]);

    const handleSubmit = useCallback((e) => {
        e.preventDefault();
        if (savingStep) return;
        
        const referenceId = localStorage.getItem('applicationReferenceId');
        const stepName = STEP_NAME_MAP[currentStep];
        const stepNumber = currentStep;
        
        // Filter formData for step 2
        let formDataToSend = {};
        const relevantFields = STEP_FIELDS_MAP[currentStep] || [];
        
        if (relevantFields.length > 0) {
            formDataToSend = relevantFields.reduce((obj, field) => {
                if (formData[field] !== undefined && formData[field] !== '') {
                    obj[field] = formData[field];
                }
                return obj;
            }, {});
        }
        
        // Get signature
        const signatureData = getSignatureData(declineSignatureRef);
        
        setSubmittedStep(currentStep);
        
        dispatch({
            type: types.SAVE_FINAL_FORM_STEP_REQUEST,
            payload: {
                stepNumber: stepNumber,
                stepName: stepName,
                formData: formDataToSend,
                signatureData: signatureData,
                pdfFieldData: null,
                referenceId: referenceId,
            },
        });
    }, [currentStep, formData, savingStep, dispatch]);

    const onBack = () => {
        if (error) {
            dispatch({ type: types.CLEAR_FINAL_FORM_ERROR });
        }
        setCurrentStep(prev => Math.max(prev - 1, 1));
    };

    useEffect(() => {
  const fetchPreEmploymentData = async () => {
    const referenceId = localStorage.getItem('applicationReferenceId');
    if (!referenceId) return;
    
    try {
      const response = await axios.get(`${base_url}/applications-pre-employment/${referenceId}`);
      const preEmploymentData = response.data?.data || {};
      
      if (Object.keys(preEmploymentData).length > 0) {
        const fullName = `${preEmploymentData.firstName || ''} ${preEmploymentData.lastName || ''}`.trim();
        
        setFormData(prev => ({
          ...prev,
          healthReleaseName: fullName || prev.healthReleaseName,
          vaccineRequestName: fullName || prev.vaccineRequestName,
          declineName: fullName || prev.declineName,
        }));
      }
    } catch (error) {
      console.error('Error fetching pre-employment data:', error);
    }
  };
  
  fetchPreEmploymentData();
}, []);
    return (
        <div className="application-page final-application">
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
                {/* Progress Steps */}
                <div className="progress-steps">
                    {steps.map((label, index) => {
                        const stepNumber = index + 1;
                        const status = currentFormProgress?.stepStatuses?.[stepNumber];
                        return (
                            <div
                                key={stepNumber}
                                className={`step ${stepNumber === currentStep ? 'active' : ''} ${status === 'complete' ? 'completed' : ''}`}
                                onClick={() => goToStep(stepNumber)}
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

                <div className="progress-bar">
                    <div className="progress-text">Step {currentStep} of {steps.length}</div>
                    <div className="progress-track">
                        <div className="progress-fill" style={{ width: `${progressWidth}%` }}></div>
                    </div>
                </div>

                <p className="required-note"><span className="required">*</span> indicates required fields</p>

                {/* Loading indicator */}
                {savingStep && (
                    <div style={{
                        textAlign: 'center',
                        padding: '12px',
                        background: '#e3f2fd',
                        borderRadius: '4px',
                        marginBottom: '10px',
                        color: '#1565c0',
                        fontSize: 14,
                        fontWeight: 500,
                    }}>
                        ⏳ Saving, please wait...
                    </div>
                )}

                {/* Error banner */}
                {error && !savingStep && (
                    <div style={{
                        textAlign: 'center',
                        padding: '12px',
                        background: '#ffebee',
                        borderRadius: '4px',
                        marginBottom: '10px',
                        color: '#c62828',
                        fontSize: 14,
                        fontWeight: 500,
                    }}>
                        ❌ Error saving: {typeof error === 'string' ? error : JSON.stringify(error)}. Please try again.
                    </div>
                )}

                <form onSubmit={handleSubmit}>
                    {currentStep === 1 && (
                        <>
                            <div className="form-section">
                                <h1 className="form-title">EMPLOYMENT HEALTH RELEASE: DENIAL OF T.B. SIGNS AND SYMPTOMS</h1>
                                
                                <div className="row">
                                    <div className="form-field col-md-12">
                                        <label className="section-label">PRINTED NAME <span className="required">*</span></label>
                                        <input type="text" name="healthReleaseName" value={formData.healthReleaseName} onChange={handleInputChange} required />
                                    </div>
                                </div>

                                <div className="form-field">
                                    <label className="section-label">HAVE YOU EVER HAD TUBERCULOSIS?</label>
                                    <div className="radio-group">
                                        <label className="radio-label">
                                            <input type="radio" name="hadTB" value="yes" onChange={handleInputChange} /> <span>YES</span>
                                        </label>
                                        <label className="radio-label">
                                            <input type="radio" name="hadTB" value="no" onChange={handleInputChange} /> <span>NO</span>
                                        </label>
                                    </div>
                                </div>

                                <div className="form-field mb-2">
                                    <label className="section-label">IF YES, PLEASE EXPLAIN (DATE, CIRCUMSTANCES, TREATMENT):</label>
                                    <textarea name="tbExplanation" rows="3" value={formData.tbExplanation} onChange={handleInputChange}></textarea>
                                </div>

                                <div className="row">
                                    <div className="form-field col-md-6">
                                        <label className="section-label">HAVE YOU EVER HAD THE BCG VACCINE?</label>
                                        <div className="radio-group">
                                            <label className="radio-label"><input type="radio" name="hadBCG" value="yes" onChange={handleInputChange} /> <span>YES</span></label>
                                            <label className="radio-label"><input type="radio" name="hadBCG" value="no" onChange={handleInputChange} /> <span>NO</span></label>
                                        </div>
                                    </div>
                                    <div className="form-field col-md-6 ">
                                        <label className="section-label">YEAR RECEIVED</label>
                                        <input type="text" name="bcgYear" value={formData.bcgYear} onChange={handleInputChange} />
                                    </div>
                                </div>

                                <div className="form-note">
                                    <p><b>THE EARLY SIGNS AND SYMPTOMS OF TUBERCULOSIS ARE:</b> Cough, Night Sweats, Fever, Loss of Weight, Loss of Appetite, Coughing Blood.</p>
                                </div>

                                <div className="form-field">
                                    <label className="section-label">DO YOU CURRENTLY HAVE ANY OF THE SYMPTOMS MENTIONED ABOVE? IF YES WHICH ONE:</label>
                                    <input type="text" name="currentTBSymptoms" value={formData.currentTBSymptoms} onChange={handleInputChange} />
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
                                        <div className="signature-pad-container">
                                            <canvas 
                                                ref={noticeSignatureRef} 
                                                width={500} 
                                                height={100} 
                                                className="signature-canvas"
                                                onMouseDown={(e) => startDrawing(e, noticeSignatureRef)}
                                                onMouseMove={(e) => draw(e, noticeSignatureRef)}
                                                onMouseUp={stopDrawing}
                                                onMouseLeave={stopDrawing}
                                                onTouchStart={(e) => startDrawing(e, noticeSignatureRef)}
                                                onTouchMove={(e) => draw(e, noticeSignatureRef)}
                                                onTouchEnd={stopDrawing}
                                            />
                                            <button type="button" className="clear-signature-btn" onClick={() => clearSignature(noticeSignatureRef)}>↻</button>
                                        </div>
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="form-field col-md-6">
                                        <label className="section-label">TITLE</label>
                                        <input type="text" name="noticeTitle" value={formData.noticeTitle} onChange={handleInputChange} />
                                    </div>
                                    <div className="form-field col-md-6">
                                        <label className="section-label">DATE</label>
                                        <input type="date" name="noticeDate" value={formData.noticeDate} onChange={handleInputChange} />
                                    </div>
                                </div>
                            </div>
                        </>
                    )}

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
                                    <input type="text" name="vaccineRequestName" value={formData.vaccineRequestName} onChange={handleInputChange} />
                                </div>

                                <p className="form-note">I request vaccination with Hepatitis B vaccine.</p>

                                <div className="form-field">
                                    <label className="section-label">Pregnant</label>
                                    <div className="radio-group">
                                        <label className="radio-label"><input type="radio" name="pregnant" value="yes" onChange={handleInputChange} /> Yes</label>
                                        <label className="radio-label"><input type="radio" name="pregnant" value="no" onChange={handleInputChange} /> No</label>
                                    </div>
                                </div>

                                <div className="form-field">
                                    <label className="section-label">Allergies</label>
                                    <div className="radio-group">
                                        <label className="radio-label"><input type="radio" name="allergies" value="yes" onChange={handleInputChange} /> Yes</label>
                                        <label className="radio-label"><input type="radio" name="allergies" value="no" onChange={handleInputChange} /> No</label>
                                    </div>
                                </div>

                                <div className="form-field">
                                    <label className="section-label">Date Vaccinated – Dose 1</label>
                                    <input type="date" name="dose1Date" value={formData.dose1Date} onChange={handleInputChange} />
                                </div>

                                <div className="form-field">
                                    <label className="section-label">Date Vaccinated – Dose 2</label>
                                    <input type="date" name="dose2Date" value={formData.dose2Date} onChange={handleInputChange} />
                                </div>

                                <div className="form-field">
                                    <label className="section-label">Date Vaccinated – Dose 3</label>
                                    <input type="date" name="dose3Date" value={formData.dose3Date} onChange={handleInputChange} />
                                </div>

                                <div className="form-field">
                                    <label className="section-label">Lot Number – Dose 1</label>
                                    <input type="text" name="lotNumber1" value={formData.lotNumber1} onChange={handleInputChange} />
                                </div>

                                <div className="form-field">
                                    <label className="section-label">Lot Number – Dose 2</label>
                                    <input type="text" name="lotNumber2" value={formData.lotNumber2} onChange={handleInputChange} />
                                </div>

                                <div className="form-field">
                                    <label className="section-label">Lot Number – Dose 3</label>
                                    <input type="text" name="lotNumber3" value={formData.lotNumber3} onChange={handleInputChange} />
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
                                    <input type="text" name="declineName" value={formData.declineName} onChange={handleInputChange} />
                                </div>

                                <div className="row mt-4 align-items-center">
                                    <div className="col-md-6">
                                        <div className="signature-pad-container">
                                            <canvas 
                                                ref={declineSignatureRef} 
                                                width={500} 
                                                height={100} 
                                                className="signature-canvas"
                                                onMouseDown={(e) => startDrawing(e, declineSignatureRef)}
                                                onMouseMove={(e) => draw(e, declineSignatureRef)}
                                                onMouseUp={stopDrawing}
                                                onMouseLeave={stopDrawing}
                                                onTouchStart={(e) => startDrawing(e, declineSignatureRef)}
                                                onTouchMove={(e) => draw(e, declineSignatureRef)}
                                                onTouchEnd={stopDrawing}
                                            />
                                            <button type="button" className="clear-signature-btn" onClick={() => clearSignature(declineSignatureRef)}>↻</button>
                                        </div>
                                    </div>
                                    <div className="form-field col-md-6">
                                        <label className="section-label">Date</label>
                                        <input type="date" name="declineDate" value={formData.declineDate} onChange={handleInputChange} />
                                    </div>
                                </div>
                            </div>
                        </>
                    )}

                    <div className="form-actions">
                        {currentStep !== 1 && (
                            <button type="button" className="btn-previous" onClick={onBack} disabled={savingStep}>
                                Previous
                            </button>
                        )}
                        <button type="button" className="btn-save" disabled={savingStep}>Save</button>
                        {currentStep !== steps.length ? (
                            <button type="button" className="btn-next" onClick={handleNext} disabled={savingStep}>
                                {savingStep ? 'Saving...' : 'Save & Next'}
                            </button>
                        ) : (
                            <button type="button" className="btn-next" onClick={handleSubmit} disabled={savingStep}>
                                {savingStep ? 'Submitting...' : 'Submit'}
                            </button>
                        )}
                    </div>
                </form>
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

export default FinalApplicationForm6;
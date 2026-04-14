import React, { useEffect, useRef, useState, useCallback } from 'react';
import './ApplicationForm.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useDispatch, useSelector } from 'react-redux';
import * as types from '../../redux/type';
import { base_url } from '../../components/config';
import axios from 'axios';

// Step name mapping for backend
const STEP_NAME_MAP = {
    1: 'contractor_agreement',
    2: 'contractor_bg_screening',
    3: 'contractor_attestation',
    4: 'contractor_guidelines',
    5: 'contractor_orientation',
    6: 'neglect_exploitation',
};

// Fields mapping for each step
const STEP_FIELDS_MAP = {
    1: ['perDiemEffectiveDay', 'perDiemEffectiveMonth', 'perDiemEffectiveYear', 'perDiemContractorName', 'perDiemPosition'],
    2: [], // Static content - no form fields
    3: [], // Static content - no form fields  
    4: ['contractorPrintedName', 'contractorTitle', 'contractorDate', 'registryPrintedName', 'registryTitle', 'registryDate'],
    5: ['contractorName', 'witnessName', 'contractorDate', 'witnessDate', 'finalContractorName', 'finalContractorDate'],
    6: ['physical', 'verbalEmotional', 'mentalAbuse', 'abandonment', 'exploitation', 'mustReport', 'howToReport', 'caregiverName', 'date'],
};

const FinalApplicationForm3 = ({ formType = 'final_2' }) => {
    const dispatch = useDispatch();
    const { savingStep, stepSaveSuccess, formProgress, error } = useSelector(
        state => state.applicationReducer
    );
    
    const [submittedStep, setSubmittedStep] = useState(null);
    const today = new Date().toISOString().split("T")[0];

    const steps = [
        "Contractor Agreement",
        "Background Screening",
        "Attestation Compliance",
        "Contractor Guidelines",
        "Contractor Orientation",
        "Neglect Exploitation"
    ];

    const [currentStep, setCurrentStep] = useState(1);
    const [isDrawing, setIsDrawing] = useState(false);
    
    // Signature refs for different canvases
    const contractorSignatureRef = useRef(null);
    const registrySignatureRef = useRef(null);
    const finalSignatureRef = useRef(null);
    const caregiverSignatureRef = useRef(null);
    
    const progressWidth = (currentStep / steps.length) * 100;
    
    // Get current form progress for this form type
    const currentFormProgress = formProgress?.[formType] || null;

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
    const [formData, setFormData] = useState({
        // Step 1: Contractor Agreement fields
        perDiemEffectiveDay: '',
        perDiemEffectiveMonth: '',
        perDiemEffectiveYear: '',
        perDiemContractorName: '',
        perDiemPosition: '',
        
        // Step 4: Contractor Guidelines fields
        contractorPrintedName: '',
        contractorTitle: '',
        contractorDate: today,
        registryPrintedName: '',
        registryTitle: '',
        registryDate: today,
        
        // Step 5: Orientation fields
        contractorName: '',
        witnessName: '',
        witnessDate: today,
        finalContractorName: '',
        finalContractorDate: today,
        
        // Step 6: Neglect Exploitation fields
        physical: false,
        verbalEmotional: false,
        mentalAbuse: false,
        abandonment: false,
        exploitation: false,
        mustReport: '',
        howToReport: '',
        caregiverName: '',
        date: today,
    });
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

    const getSignatureData = (canvasRef) => {
        const canvas = canvasRef?.current;
        if (!canvas) return null;
        
        const ctx = canvas.getContext('2d');
        const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
        const isBlank = !Array.from(imageData.data).some(value => value !== 0);
        
        if (isBlank) return null;
        return canvas.toDataURL('image/png');
    };

    const handleNext = useCallback((e) => {
        e.preventDefault();
        if (savingStep) return;
        
        const referenceId = localStorage.getItem('applicationReferenceId');
        const stepName = STEP_NAME_MAP[currentStep];
        
        // Get the appropriate signature based on current step
        let signatureData = null;
        if (currentStep === 4) {
            signatureData = getSignatureData(contractorSignatureRef) || getSignatureData(registrySignatureRef);
        } else if (currentStep === 5) {
            signatureData = getSignatureData(finalSignatureRef);
        } else if (currentStep === 6) {
            signatureData = getSignatureData(caregiverSignatureRef);
        }
        
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
        
        console.log(`Step ${currentStep}: Sending ${Object.keys(formDataToSend).length} fields`);
        
        setSubmittedStep(currentStep);
        
        dispatch({
            type: types.SAVE_FINAL_FORM_STEP_REQUEST,
            payload: {
                stepNumber: currentStep,
                stepName: stepName,
                formData: formDataToSend,
                signatureData,
                pdfFieldData: null,
                referenceId,
            },
        });
    }, [currentStep, formData, savingStep, dispatch]);

    const handleSubmit = useCallback((e) => {
        e.preventDefault();
        if (savingStep) return;
        
        const referenceId = localStorage.getItem('applicationReferenceId');
        const stepName = STEP_NAME_MAP[currentStep];
        
        let signatureData = getSignatureData(caregiverSignatureRef);
        
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
        
        setSubmittedStep(currentStep);
        
        dispatch({
            type: types.SAVE_FINAL_FORM_STEP_REQUEST,
            payload: {
                stepNumber: currentStep,
                stepName: stepName,
                formData: formDataToSend,
                signatureData,
                pdfFieldData: null,
                referenceId,
            },
        });
    }, [currentStep, formData, savingStep, dispatch]);

    const onBack = () => {
        if (error) {
            dispatch({ type: types.CLEAR_FINAL_FORM_ERROR });
        }
        setCurrentStep(prev => Math.max(prev - 1, 1));
    };

    // Drawing functions
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



    const handleInputChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFormData({
            ...formData,
            [name]: type === 'checkbox' ? checked : value
        });
    };

    // Helper to get canvas ref based on step
    const getCanvasRefForStep = () => {
        if (currentStep === 4) return contractorSignatureRef;
        if (currentStep === 5) return finalSignatureRef;
        if (currentStep === 6) return caregiverSignatureRef;
        return null;
    };
useEffect(() => {
  const fetchPreEmploymentData = async () => {
    const referenceId = localStorage.getItem('applicationReferenceId');
    if (!referenceId) return;
    
    try {
      const response = await axios.get(`${base_url}/applications-pre-employment/${referenceId}`);
      console.log(response);
      console.log('response');
      const preEmploymentData = response.data?.data || {};

      // Pre-fill the formData with values from pre_employment
      if (Object.keys(preEmploymentData).length > 0) {
        // Combine first and last name for full name fields
        const fullName = `${preEmploymentData.firstName || ''} ${preEmploymentData.lastName || ''}`.trim();
        
        setFormData(prev => ({
          ...prev,
          perDiemContractorName: fullName || prev.perDiemContractorName,
          
          contractorPrintedName: fullName || prev.contractorPrintedName,
          
          contractorName: fullName || prev.contractorName,
          finalContractorName: fullName || prev.finalContractorName,
          
          caregiverName: fullName || prev.caregiverName,
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
                {/* Progress Steps with completion status */}
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
                                    33483 hereinafter referred to as “the Registry” and a Registered Nurse,
                                    Licensed Practical Nurse, Certified Nurse Assistant, Home Health Aide,
                                    Homemaker or Companion (circle one) herein after referred to as
                                    “Per Diem Independent Contractor”.
                                </p>

                                <div className="row">
                                    <div className="form-field col-md-2">
                                        <label className="section-label">DAY <span className="required">*</span></label>
                                        <input type="number" name="perDiemEffectiveDay" value={formData.perDiemEffectiveDay} onChange={handleInputChange} required />
                                    </div>
                                    <div className="form-field col-md-4">
                                        <label className="section-label">MONTH <span className="required">*</span></label>
                                        <input type="text" name="perDiemEffectiveMonth" value={formData.perDiemEffectiveMonth} onChange={handleInputChange} required />
                                    </div>
                                    <div className="form-field col-md-2">
                                        <label className="section-label">YEAR <span className="required">*</span></label>
                                        <input type="number" name="perDiemEffectiveYear" value={formData.perDiemEffectiveYear} onChange={handleInputChange} required />
                                    </div>
                                    <div className="form-field col-md-4">
                                        <label className="section-label">CONTRACTOR PRINTED NAME <span className="required">*</span></label>
                                        <input type="text" name="perDiemContractorName" value={formData.perDiemContractorName} onChange={handleInputChange} required />
                                    </div>
                                </div>

                                <p className="form-note">
                                    I hereby state that I am a Per Diem Independent Contractor to engage in
                                    health and/or maintenance services. I further state that I am a Per Diem
                                    Independent Contractor and meet all qualifications as such contained in the law.
                                </p>
                            </div>

                            <div className="form-section">
                                <h1 className="form-title">PURPOSE</h1>
                                <p className="form-note">The purpose of this Agreement is to provide health care services...</p>
                            </div>

                            <div className="form-section">
                                <h1 className="form-title">1. PAYMENT FOR SERVICES</h1>
                                <div className="form-field col-md-6">
                                    <label className="section-label">POSITION / PROFESSIONAL TITLE <span className="required">*</span></label>
                                    <input type="text" name="perDiemPosition" value={formData.perDiemPosition} onChange={handleInputChange} required />
                                </div>
                                <p className="form-note">I agree that I only receive compensation for the work or services performed on a Per Diem Basis...</p>
                            </div>

                            <div className="form-section">
                                <h1 className="form-title">2. LICENSES</h1>
                                <p className="form-note">The Per Diem Independent Contractor is responsible for ensuring that his or her own license or certification remains current and valid...</p>
                            </div>
                        </>
                    )}

                    {/* Step 2: Background Screening - Static content */}
                    {currentStep === 2 && (
                        <>
                            <div className="form-section">
                                <h1 className="form-title">3. BACKGROUND SCREENING</h1>
                                <p className="form-note">Per Diem Independent Contractor agrees that as a condition of this Agreement that he/she must clear a Level II Criminal Background screening...</p>
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

                    {/* Step 3: Attestation Compliance - Static content */}
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
                                <h1 className="form-title">14. NON-COMPETE</h1>
                                <p className="form-note">Except as referred by and through the Registry...</p>
                            </div>
                            <div className="form-section">
                                <h1 className="form-title">15. FINAL AGREEMENT & NOTICE</h1>
                                <p className="form-note">The Agreement constitutes the final understanding...</p>
                            </div>

                            <div className="form-section">
                                <h1 className="form-title">Per Diem Independent Contractor:</h1>
                                <div className="row">
                                    <div className="form-field col-md-6">
                                        <label className="section-label">Printed Name:</label>
                                        <input type="text" name="contractorPrintedName" value={formData.contractorPrintedName} onChange={handleInputChange} />
                                    </div>
                                    <div className="form-field col-md-6">
                                        <label className="section-label">Title:</label>
                                        <input type="text" name="contractorTitle" value={formData.contractorTitle} onChange={handleInputChange} />
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="form-field col-md-6">
                                        <label className="section-label">Signature:</label>
                                        <div className="signature-pad-container">
                                            <canvas ref={contractorSignatureRef} width={500} height={100} className="signature-canvas"
                                                onMouseDown={(e) => startDrawing(e, contractorSignatureRef)}
                                                onMouseMove={(e) => draw(e, contractorSignatureRef)}
                                                onMouseUp={stopDrawing}
                                                onMouseLeave={stopDrawing}
                                                onTouchStart={(e) => startDrawing(e, contractorSignatureRef)}
                                                onTouchMove={(e) => draw(e, contractorSignatureRef)}
                                                onTouchEnd={stopDrawing}
                                            />
                                            <button type="button" className="clear-signature-btn" onClick={() => clearSignature(contractorSignatureRef)}>↻</button>
                                        </div>
                                    </div>
                                    <div className="form-field col-md-6">
                                        <label className="section-label">Date:</label>
                                        <input type="date" name="contractorDate" value={formData.contractorDate} onChange={handleInputChange} />
                                    </div>
                                </div>
                            </div>

                            <div className="form-section">
                                <h1 className="form-title">Qualcare Nurse Registry Inc.:</h1>
                                <div className="row">
                                    <div className="form-field col-md-6">
                                        <label className="section-label">Printed Name:</label>
                                        <input type="text" name="registryPrintedName" value={formData.registryPrintedName} onChange={handleInputChange} />
                                    </div>
                                    <div className="form-field col-md-6">
                                        <label className="section-label">Title:</label>
                                        <input type="text" name="registryTitle" value={formData.registryTitle} onChange={handleInputChange} />
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="form-field col-md-6">
                                        <label className="section-label">Signature:</label>
                                        <div className="signature-pad-container">
                                            <canvas ref={registrySignatureRef} width={500} height={100} className="signature-canvas"
                                                onMouseDown={(e) => startDrawing(e, registrySignatureRef)}
                                                onMouseMove={(e) => draw(e, registrySignatureRef)}
                                                onMouseUp={stopDrawing}
                                                onMouseLeave={stopDrawing}
                                                onTouchStart={(e) => startDrawing(e, registrySignatureRef)}
                                                onTouchMove={(e) => draw(e, registrySignatureRef)}
                                                onTouchEnd={stopDrawing}
                                            />
                                            <button type="button" className="clear-signature-btn" onClick={() => clearSignature(registrySignatureRef)}>↻</button>
                                        </div>
                                    </div>
                                    <div className="form-field col-md-6">
                                        <label className="section-label">Date:</label>
                                        <input type="date" name="registryDate" value={formData.registryDate} onChange={handleInputChange} />
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
                                        <input type="text" name="contractorName" value={formData.contractorName} onChange={handleInputChange} />
                                    </div>
                                    <div className="form-field col-md-6">
                                        <label className="section-label">Witness</label>
                                        <input type="text" name="witnessName" value={formData.witnessName} onChange={handleInputChange} />
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="form-field col-md-6">
                                        <label className="section-label">Date</label>
                                        <input type="date" name="contractorDate" value={formData.contractorDate} onChange={handleInputChange} />
                                    </div>
                                    <div className="form-field col-md-6">
                                        <label className="section-label">Date</label>
                                        <input type="date" name="witnessDate" value={formData.witnessDate} onChange={handleInputChange} />
                                    </div>
                                </div>
                            </div>
                            <div className="form-section">
                                <h1 className="form-title">59A-18.007: REGISTERED NURSE AND LICENSED PRACTICAL NURSE.</h1>
                                <div className="row">
                                    <div className="form-field col-md-4">
                                        <label className="section-label">Independent Contractor Name</label>
                                        <input type="text" name="finalContractorName" value={formData.finalContractorName} onChange={handleInputChange} />
                                    </div>
                                    <div className="form-field col-md-4">
                                        <label className="section-label">Signature</label>
                                        <div className="signature-pad-container">
                                            <canvas ref={finalSignatureRef} width={400} height={100} className="signature-canvas"
                                                onMouseDown={(e) => startDrawing(e, finalSignatureRef)}
                                                onMouseMove={(e) => draw(e, finalSignatureRef)}
                                                onMouseUp={stopDrawing}
                                                onMouseLeave={stopDrawing}
                                                onTouchStart={(e) => startDrawing(e, finalSignatureRef)}
                                                onTouchMove={(e) => draw(e, finalSignatureRef)}
                                                onTouchEnd={stopDrawing}
                                            />
                                            <button type="button" className="clear-signature-btn" onClick={() => clearSignature(finalSignatureRef)}>↻</button>
                                        </div>
                                    </div>
                                    <div className="form-field col-md-4">
                                        <label className="section-label">Date</label>
                                        <input type="date" name="finalContractorDate" value={formData.finalContractorDate} onChange={handleInputChange} />
                                    </div>
                                </div>
                            </div>
                        </>
                    )}

                    {/* Step 6: Neglect Exploitation */}
                    {currentStep === 6 && (
                        <>
                            <div className="form-section">
                                <h1 className="form-title">ABUSE, NEGLECT AND EXPLOITATION</h1>
                                <p className="form-note">Click the words below that mean "ABUSE" to you. <i>(check all)</i></p>
                                <div className="checkbox-group">
                                    <label className="checkbox-label"><input type="checkbox" name="physical" checked={formData.physical} onChange={handleInputChange} /><span>Physical</span></label>
                                    <label className="checkbox-label"><input type="checkbox" name="verbalEmotional" checked={formData.verbalEmotional} onChange={handleInputChange} /><span>Verbal Emotional</span></label>
                                    <label className="checkbox-label"><input type="checkbox" name="mentalAbuse" checked={formData.mentalAbuse} onChange={handleInputChange} /><span>Mental Abuse</span></label>
                                    <label className="checkbox-label"><input type="checkbox" name="abandonment" checked={formData.abandonment} onChange={handleInputChange} /><span>Abandonment</span></label>
                                    <label className="checkbox-label"><input type="checkbox" name="exploitation" checked={formData.exploitation} onChange={handleInputChange} /><span>Exploitation</span></label>
                                </div>

                                <p className="form-note">2. I am aware that I must report abused, neglected and/or exploited?</p>
                                <div className="radio-group">
                                    <label className="radio-label"><span>YES</span><input type="radio" name="mustReport" value="yes" checked={formData.mustReport === 'yes'} onChange={handleInputChange} /></label>
                                    <label className="radio-label"><span>NO</span><input type="radio" name="mustReport" value="no" checked={formData.mustReport === 'no'} onChange={handleInputChange} /></label>
                                </div>

                                <p className="form-note">3. How would you report an incident of abuse, neglect and/or exploitation?</p>
                                <div className="radio-group">
                                    <label className="radio-label"><span>YES</span><input type="radio" name="howToReport" value="yes" checked={formData.howToReport === 'yes'} onChange={handleInputChange} /></label>
                                    <label className="radio-label"><span>NO</span><input type="radio" name="howToReport" value="no" checked={formData.howToReport === 'no'} onChange={handleInputChange} /></label>
                                </div>

                                <div className="form-field col-md-12">
                                    <label className="section-label">Caregiver Name:</label>
                                    <input type="text" name="caregiverName" value={formData.caregiverName} onChange={handleInputChange} />
                                </div>

                                <div className="row">
                                    <div className="form-field col-md-6">
                                        <label className="section-label">Signature:</label>
                                        <div className="signature-pad-container">
                                            <canvas ref={caregiverSignatureRef} width={500} height={100} className="signature-canvas"
                                                onMouseDown={(e) => startDrawing(e, caregiverSignatureRef)}
                                                onMouseMove={(e) => draw(e, caregiverSignatureRef)}
                                                onMouseUp={stopDrawing}
                                                onMouseLeave={stopDrawing}
                                                onTouchStart={(e) => startDrawing(e, caregiverSignatureRef)}
                                                onTouchMove={(e) => draw(e, caregiverSignatureRef)}
                                                onTouchEnd={stopDrawing}
                                            />
                                            <button type="button" className="clear-signature-btn" onClick={() => clearSignature(caregiverSignatureRef)}>↻</button>
                                        </div>
                                    </div>
                                    <div className="form-field col-md-6">
                                        <label className="section-label">Date:</label>
                                        <input type="date" name="date" value={formData.date} onChange={handleInputChange} />
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

export default FinalApplicationForm3;
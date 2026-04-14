import React, { useEffect, useRef, useState, useCallback } from 'react';
import './ApplicationForm.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useDispatch, useSelector } from 'react-redux';
import * as types from '../../redux/type';
import { base_url } from '../../components/config';
import axios from 'axios';

// Step name mapping for backend
const STEP_NAME_MAP = {
    1: 'doc_license_certification',
    2: 'doc_cpr',
    3: 'doc_drivers_license',
    4: 'doc_ss_card',
    5: 'doc_proof_residency',
    6: 'doc_auto_insurance',
    7: 'doc_liability_insurance',
    8: 'doc_guidelines_signature',  // Final signature step
};

// Fields mapping for each step
const STEP_FIELDS_MAP = {
    1: ['licenseCertification'],
    2: ['cpr'],
    3: ['driversLicense'],
    4: ['socialSecurityCard'],
    5: ['proofResidency'],
    6: ['autoInsurance'],
    7: ['professionalLiabilityInsurance'],
    8: ['printedName', 'title', 'date', 'registryPrintedName', 'registryTitle', 'registryDate'],
};

const FinalApplicationForm4 = ({ formType = 'final_3' }) => {
    const dispatch = useDispatch();
    const { savingStep, stepSaveSuccess, formProgress, error } = useSelector(
        state => state.applicationReducer
    );
    
    const [submittedStep, setSubmittedStep] = useState(null);
    const today = new Date().toISOString().split("T")[0];

    const steps = [
        "License / Certification",
        "CPR Certification",
        "Driver's License",
        "Social Security Card",
        "Proof of U.S. Residency",
        "Auto Insurance",
        "Liability Insurance",
        "Signatures"
    ];

    const [currentStep, setCurrentStep] = useState(1);
    const [isDrawing, setIsDrawing] = useState(false);
    const [previews, setPreviews] = useState({});
    const [files, setFiles] = useState({});
    
    // Signature refs
    const contractorSignatureRef = useRef(null);
    const registrySignatureRef = useRef(null);
    
    const progressWidth = (currentStep / steps.length) * 100;
    
    // Get current form progress for this form type
    const currentFormProgress = formProgress?.[formType] || null;

    // Navigation effect - only navigate after successful save
    useEffect(() => {
        if (submittedStep !== null && !savingStep && stepSaveSuccess === STEP_NAME_MAP[submittedStep]) {
            setSubmittedStep(null);
            if (submittedStep === steps.length) {
                alert('All documents submitted successfully!');
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

    const [formData, setFormData] = useState({
        // Step 8: Signature fields
        printedName: '',
        title: '',
        date: today,
        registryPrintedName: '',
        registryTitle: '',
        registryDate: today,
    });

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    // Handle file selection and preview
    const handleFileChange = (fieldName, file) => {
        if (file) {
            // Create preview for images
            if (file.type.startsWith('image/')) {
                setPreviews(prev => ({ ...prev, [fieldName]: URL.createObjectURL(file) }));
            } else {
                setPreviews(prev => ({ ...prev, [fieldName]: 'pdf' }));
            }
            setFiles(prev => ({ ...prev, [fieldName]: file }));
        }
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

const handleNext = useCallback((e) => {
    e.preventDefault();
    if (savingStep) return;
    
    const referenceId = localStorage.getItem('applicationReferenceId');
    const stepName = STEP_NAME_MAP[currentStep];
    const stepNumber = currentStep;
    
    console.log('Saving step:', { stepNumber, stepName, referenceId });
    
    // Create FormData for file uploads
    const formDataToSend = new FormData();
    formDataToSend.append('referenceId', referenceId);
    formDataToSend.append('step', stepName);  // ← 'step', not 'stepName'
    formDataToSend.append('stepNumber', stepNumber);
    
    // For signature step (step 8)
    if (currentStep === 8) {
        const contractorSignature = getSignatureData(contractorSignatureRef);
        const registrySignature = getSignatureData(registrySignatureRef);
        
        // Combine signatures (use the first one that exists)
        const signature = contractorSignature || registrySignature;
        
        if (signature) {
            const blob = dataURItoBlob(signature);
            formDataToSend.append('signature', blob, 'signature.png');
        }
        
        // Add text fields as JSON under 'data' key
        const textData = {
            printedName: formData.printedName,
            title: formData.title,
            date: formData.date,
            registryPrintedName: formData.registryPrintedName,
            registryTitle: formData.registryTitle,
            registryDate: formData.registryDate
        };
        formDataToSend.append('data', JSON.stringify(textData));
    } 
    // For file upload steps (steps 1-7)
    else {
        const fieldName = STEP_FIELDS_MAP[currentStep]?.[0];
        if (fieldName && files[fieldName]) {
            // Send file directly
            formDataToSend.append(fieldName, files[fieldName]);
            // Send empty data object
            formDataToSend.append('data', JSON.stringify({}));
        } else {
            console.warn(`No file selected for step ${currentStep}`);
            alert(`Please upload a file for ${steps[currentStep - 1]}`);
            return;
        }
    }
    
    setSubmittedStep(currentStep);
    
    dispatch({
        type: types.SAVE_FINAL_FORM_STEP_REQUEST,
        payload: formDataToSend,  // ← This is FormData
    });
}, [currentStep, files, formData, savingStep, dispatch]);

const handleSubmit = useCallback((e) => {
    e.preventDefault();
    if (savingStep) return;
    
    const referenceId = localStorage.getItem('applicationReferenceId');
    const stepName = STEP_NAME_MAP[currentStep];
    const stepNumber = currentStep;
    
    console.log('Submitting final step:', { stepNumber, stepName, referenceId });
    
    const formDataToSend = new FormData();
    formDataToSend.append('referenceId', referenceId);
    formDataToSend.append('step', stepName);  // ← MUST be 'step'
    formDataToSend.append('stepNumber', stepNumber);
    
    // Add signatures
    const contractorSignature = getSignatureData(contractorSignatureRef);
    const registrySignature = getSignatureData(registrySignatureRef);
    
    if (contractorSignature) {
        const blob = dataURItoBlob(contractorSignature);
        formDataToSend.append('signature', blob, 'contractor_signature.png');
    }
    if (registrySignature) {
        const blob = dataURItoBlob(registrySignature);
        formDataToSend.append('registry_signature', blob, 'registry_signature.png');
    }
    
    // Add text fields as JSON
    const textData = {
        printedName: formData.printedName,
        title: formData.title,
        date: formData.date,
        registryPrintedName: formData.registryPrintedName,
        registryTitle: formData.registryTitle,
        registryDate: formData.registryDate
    };
    formDataToSend.append('data', JSON.stringify(textData));
    
    setSubmittedStep(currentStep);
    
    dispatch({
        type: types.SAVE_FINAL_FORM_STEP_REQUEST,
        payload: formDataToSend,
    });
}, [formData, savingStep, dispatch]);

    const onBack = () => {
        if (error) {
            dispatch({ type: types.CLEAR_FINAL_FORM_ERROR });
        }
        setCurrentStep(prev => Math.max(prev - 1, 1));
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

    // Render upload field
    const renderUploadField = (label, fieldName, stepNumber) => (
        <div className="form-section">
            <h1 className="form-title">Document Upload</h1>
            <div className="form-note">
                <p>Please upload a copy of your <b>{label}</b>. On mobile devices, you can select "Camera" to take a photo directly.</p>
            </div>
            <div className="row">
                <div className="form-field col-md-12">
                    <label className="section-label">{label} <span className="required">*</span></label>
                    <div className="upload-container">
                        <input
                            type="file"
                            accept="image/*,application/pdf"
                            capture="environment"
                            onChange={(e) => handleFileChange(fieldName, e.target.files[0])}
                            className="form-control"
                            required
                        />
                    </div>
                </div>
            </div>
            {previews[fieldName] && (
                <div className="row mt-3">
                    <div className="col-md-12">
                        <p className="section-label">Preview:</p>
                        {previews[fieldName] === 'pdf' ? (
                            <div className="pdf-placeholder" style={{ padding: '20px', background: '#f5f5f5', textAlign: 'center', borderRadius: '8px' }}>
                                📄 PDF Document Selected: {files[fieldName]?.name}
                            </div>
                        ) : (
                            <img src={previews[fieldName]} alt="preview" style={{ maxWidth: '300px', borderRadius: '8px' }} />
                        )}
                    </div>
                </div>
            )}
        </div>
    );
useEffect(() => {
  const fetchPreEmploymentData = async () => {
    const referenceId = localStorage.getItem('applicationReferenceId');
    if (!referenceId) return;
    
    try {
      const response = await axios.get(`${base_url}/applications-pre-employment/${referenceId}`);
      const preEmploymentData = response.data?.data || {};
      
      // Pre-fill the formData with values from pre_employment
      if (Object.keys(preEmploymentData).length > 0) {
        // Combine first and last name for full name
        const fullName = `${preEmploymentData.firstName || ''} ${preEmploymentData.lastName || ''}`.trim();
        
        setFormData(prev => ({
          ...prev,
          // Step 8: Signature printed name
          printedName: fullName || prev.printedName,
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
                    {currentStep === 1 && renderUploadField("LICENSE / CERTIFICATION", "licenseCertification", 1)}
                    {currentStep === 2 && renderUploadField("CPR CERTIFICATION", "cpr", 2)}
                    {currentStep === 3 && renderUploadField("DRIVER'S LICENSE", "driversLicense", 3)}
                    {currentStep === 4 && renderUploadField("SOCIAL SECURITY CARD", "socialSecurityCard", 4)}
                    {currentStep === 5 && renderUploadField("PROOF OF U.S. RESIDENCY", "proofResidency", 5)}
                    {currentStep === 6 && renderUploadField("AUTO INSURANCE", "autoInsurance", 6)}
                    {currentStep === 7 && renderUploadField("PROFESSIONAL LIABILITY INSURANCE", "professionalLiabilityInsurance", 7)}

                    {/* Step 8: Signatures */}
                    {currentStep === 8 && (
                        <>
                            <div className="form-section">
                                <h1 className="form-title">DOCUMENT GUIDELINES</h1>
                                <p className="form-note">
                                    I hereby confirm that all uploaded documents are authentic, valid, and belong to me. 
                                    I understand that any falsified documents may result in immediate termination of this agreement.
                                </p>
                            </div>

                            <div className="form-section">
                                <h1 className="form-title">Independent Contractor:</h1>
                                <div className="row">
                                    <div className="form-field col-md-6">
                                        <label className="section-label">Printed Name:</label>
                                        <input type="text" name="printedName" value={formData.printedName} onChange={handleInputChange} required />
                                    </div>
                                    <div className="form-field col-md-6">
                                        <label className="section-label">Title:</label>
                                        <input type="text" name="title" value={formData.title} onChange={handleInputChange} required />
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="form-field col-md-6">
                                        <label className="section-label">Signature:</label>
                                        <div className="signature-pad-container">
                                            <canvas 
                                                ref={contractorSignatureRef} 
                                                width={500} 
                                                height={100} 
                                                className="signature-canvas"
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
                                        <input type="date" name="date" value={formData.date} onChange={handleInputChange} required />
                                    </div>
                                </div>
                            </div>

                            <div className="form-section">
                                <h1 className="form-title">Qualcare Nurse Registry Inc.:</h1>
                                <div className="row">
                                    <div className="form-field col-md-6">
                                        <label className="section-label">Printed Name:</label>
                                        <input type="text" name="registryPrintedName" value={formData.registryPrintedName} onChange={handleInputChange} required />
                                    </div>
                                    <div className="form-field col-md-6">
                                        <label className="section-label">Title:</label>
                                        <input type="text" name="registryTitle" value={formData.registryTitle} onChange={handleInputChange} required />
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="form-field col-md-6">
                                        <label className="section-label">Signature:</label>
                                        <div className="signature-pad-container">
                                            <canvas 
                                                ref={registrySignatureRef} 
                                                width={500} 
                                                height={100} 
                                                className="signature-canvas"
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
                                        <input type="date" name="registryDate" value={formData.registryDate} onChange={handleInputChange} required />
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

export default FinalApplicationForm4;
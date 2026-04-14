import React, { useEffect, useRef, useState, useCallback } from 'react';
import './ApplicationForm.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import '@react-pdf-viewer/core/lib/styles/index.css';
import { readPdfFormFields } from '../../utils/pdfUtils';
import { useDispatch, useSelector } from 'react-redux';
import * as types from '../../redux/type';

const STEP_PDF_MAP = {
    1: '/forms/section-2-page-1.pdf',
};
const STEP_NAME_MAP = {
    1: 'final_eligibility',
    2: 'final_w9',
    3: 'final_attest_compliance',
    4: 'final_attest_offenses',
    5: 'final_bg_screening',
    6: 'final_employee_attest',
    7: 'final_policy_ack',
    8: 'final_bg_attest',
    9: 'final_patient_abandon',
    10: 'final_charges_1',
    11: 'final_charges_2',
    12: 'final_charges_3',
    13: 'final_bg_auth',
};
// Add this after your STEP_NAME_MAP
const STEP_FIELDS_MAP = {
    2: ['w9Name', 'businessName', 'taxClass', 'llcClassification', 'exemptPayee', 
        'fatcaCode', 'w9Address', 'w9CityStateZip', 'requesterAddress', 'accountNumbers',
        'ssn1', 'ssn2', 'ssn3', 'ein1', 'ein2', 'w9SignDate'],
    
    3: ['attestationEmployeeName', 'attestationEmployerName', 'attestationProviderAddress'],
    
    5: ['exemptionAHCA', 'exemptionDOH', 'ahcaDecisionDate', 'dohDecisionDate', 
        'priorScreeningPurpose', 'screeningAgencyName', 'priorScreeningDate',
        'agencyAHCA', 'agencyDOH', 'agencyAPD', 'agencyDOEA', 'agencyDFS', 'agencyDCF'],
    
    6: ['finalAttestName', 'finalAttestTitle', 'finalAttestDate'],
    
    7: ['privacyPrintedName', 'privacyDate'],
    
    8: ['doeaIdType', 'doeaApplicantName', 'doeaPosition', 'doeaEmployer', 
        'doeaVolunteerHours', 'doeaLicenseException', 'doeaLicenseType'],
    
    9: ['doeaExemptionAgencyDate', 'doeaExemptionMultipleAgencies', 
        'doeaFinalAffiantName', 'doeaAttestationDate'],
    
    13: ['backgroundTitle', 'previousNames', 'backgroundDate'],
    
    // Steps with no form fields (static content only)
    1: [],   // Eligibility Verification - PDF form
    4: [],   // Attestation Offenses - static
    10: [],  // Charges Offenses 1 - static
    11: [],  // Charges Offenses 2 - static
    12: [],  // Charges Offenses 3 - static
};
const FinalApplicationForm2 = ({ }) => {
    const dispatch = useDispatch();
    const { savingStep, stepSaveSuccess, formProgress, error } = useSelector(
        state => state.applicationReducer
    );
    const [pdfFieldData, setPdfFieldData] = useState({});
const [iframePdfData, setIframePdfData] = useState(null);
const [submittedStep, setSubmittedStep] = useState(null);

useEffect(() => {
    const handleMessage = (event) => {
        // You'll need to implement PDF form data extraction in the iframe page
        if (event.data && event.data.type === 'pdfFormData') {
            setIframePdfData(event.data.data);
            setPdfFieldData(event.data.data);
        }
    };
    
    window.addEventListener('message', handleMessage);
    return () => window.removeEventListener('message', handleMessage);
}, []);
    const today = new Date().toISOString().split("T")[0];
const [formData, setFormData] = useState({
    // ============================================
    // STEP 2: W-9 Form (17 fields)
    // ============================================
    w9Name: '',
    businessName: '',
    taxClass: '',
    llcClassification: '',
    exemptPayee: '',
    fatcaCode: '',
    w9Address: '',
    w9CityStateZip: '',
    requesterAddress: '',
    accountNumbers: '',
    ssn1: '',
    ssn2: '',
    ssn3: '',
    ein1: '',
    ein2: '',
    w9SignDate: today,

    // ============================================
    // STEP 3: Attestation Compliance (3 fields)
    // ============================================
    attestationEmployeeName: '',
    attestationEmployerName: '',
    attestationProviderAddress: '',

    // ============================================
    // STEP 5: Background Screening (14 fields)
    // ============================================
    exemptionAHCA: false,
    exemptionDOH: false,
    ahcaDecisionDate: '',
    dohDecisionDate: '',
    priorScreeningPurpose: '',
    screeningAgencyName: '',
    priorScreeningDate: '',
    agencyAHCA: false,
    agencyDOH: false,
    agencyAPD: false,
    agencyDOEA: false,
    agencyDFS: false,
    agencyDCF: false,

    // ============================================
    // STEP 6: Employee Attestation (3 fields)
    // ============================================
    finalAttestName: '',
    finalAttestTitle: '',
    finalAttestDate: today,

    // ============================================
    // STEP 7: Privacy Policy (2 fields)
    // ============================================
    privacyPrintedName: '',
    privacyDate: today,

    // ============================================
    // STEP 8: Background Attestation / DOEA (7 fields)
    // ============================================
    doeaIdType: '',
    doeaApplicantName: '',
    doeaPosition: '',
    doeaEmployer: '',
    doeaVolunteerHours: '',
    doeaLicenseException: '',
    doeaLicenseType: '',

    // ============================================
    // STEP 9: Patient Abandonment (4 fields)
    // ============================================
    doeaExemptionAgencyDate: '',
    doeaExemptionMultipleAgencies: '',
    doeaFinalAffiantName: '',
    doeaAttestationDate: today,

    // ============================================
    // STEP 13: Background Authorization (3 fields)
    // ============================================
    backgroundTitle: '',
    previousNames: '',
    backgroundDate: today,
});
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

    const [currentStep, setCurrentStep] = useState(1);
    const [isDrawing, setIsDrawing] = useState(false);
    const canvasRefs = {
        2: useRef(null),
        6: useRef(null),
        7: useRef(null),
        9: useRef(null),
        13: useRef(null),
    };
    const getActiveCanvasRef = () => canvasRefs[currentStep] || { current: null };


    const progressWidth = (currentStep / steps.length) * 100;
    useEffect(() => {
        window.scrollTo({ top: 0, behavior: "smooth" });
    }, [currentStep]);

const goToStep = (step) => {
    if (step < 1 || step > steps.length) return;
    // Clear error when manually changing steps
    if (error) {
        dispatch({ type: types.CLEAR_FINAL_FORM_ERROR });
    }
    setCurrentStep(step);
};

    const onNext = useCallback(() => {
        setCurrentStep(prev => Math.min(prev + 1, steps.length));
        window.scrollTo({
            top: 0,
            behavior: "smooth"
        });
    }, [steps.length]);
const handleNext = useCallback((e) => {
    e.preventDefault();
    if (savingStep) return;
    
    const referenceId = localStorage.getItem('applicationReferenceId');
    const signatureData = getSignatureData();
    const stepName = STEP_NAME_MAP[currentStep];
    
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
    
    // PDF data only for step 1
    let pdfData = null;
    if (currentStep === 1) {
        pdfData = iframePdfData;
    }
    
    setSubmittedStep(currentStep);
    
    dispatch({
        type: types.SAVE_FINAL_FORM_STEP_REQUEST,
        payload: {
            stepNumber: currentStep,
            stepName: stepName,
            formData: formDataToSend,
            signatureData,
            pdfFieldData: pdfData,
            referenceId,
        },
    });
}, [currentStep, formData, iframePdfData, savingStep, dispatch]);


const onBack = () => {
    // Clear error when going back
    if (error) {
        dispatch({ type: types.CLEAR_FINAL_FORM_ERROR });
    }
    setCurrentStep(prev => Math.max(prev - 1, 1));
};
    const startDrawing = () => setIsDrawing(true);
    const stopDrawing = () => setIsDrawing(false);
    const draw = (e) => {
        if (!isDrawing) return;
        const canvas = getActiveCanvasRef().current;
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
    const clearSignature = () => {
        const canvas = getActiveCanvasRef().current;
        if (!canvas) return;
        canvas.getContext('2d').clearRect(0, 0, canvas.width, canvas.height);
    };
    const capitalizeLabelsInFinalApplication = () => {
        const container = document.querySelector(".final-application");

        if (!container) return;
        const formNotes = container.querySelectorAll(".form-note");

        formNotes.forEach(p => {
            // Get text content and remove extra whitespace
            let text = p.textContent.trim();

            if (text.length > 0) {
                // Convert to sentence case (first letter capital, rest lowercase)
                text = text
                    .toLowerCase()
                    .replace(/(^\w{1})|(\.\s*\w{1})/g, char => char.toUpperCase());

                p.textContent = text; // Update the <p> text safely
            }
        });

        const sectionLabels = container.querySelectorAll(".section-label");
        sectionLabels.forEach(label => {
            const requiredSpan = label.querySelector(".required");
            let text = label.textContent.replace("*", "").trim();

            if (text.length > 0) {
                text = text
                    .toLowerCase()
                    .replace(/\b\w/g, char => char.toUpperCase());

                label.innerHTML = text;

                if (requiredSpan) label.appendChild(requiredSpan);
            }
        });

        const labelSpans = container.querySelectorAll("label span");
        labelSpans.forEach(span => {
            if (!span.classList.contains("required")) {
                let text = span.textContent.trim();
                if (text.length > 0) {
                    text = text
                        .toLowerCase()
                        .replace(/\b\w/g, char => char.toUpperCase());
                    span.textContent = text;
                }
            }
        });
    };

    useEffect(() => {
        capitalizeLabelsInFinalApplication();
    }, []);
    useEffect(() => {
        const referenceId = localStorage.getItem('applicationReferenceId');
        if (referenceId) {
            dispatch({ type: types.FETCH_FINAL_FORM_DATA_REQUEST, payload: referenceId });
                    dispatch({ type: types.FETCH_FORM_PROGRESS_REQUEST, payload: referenceId });

        }
    }, []);
    useEffect(() => {
        if (STEP_PDF_MAP[currentStep]) {
            readPdfFormFields(STEP_PDF_MAP[currentStep])
                .then(fields => setPdfFieldData(fields))
                .catch(() => setPdfFieldData({}));
        }
    }, [currentStep]);

    // Get signature as base64
    const getSignatureData = useCallback(() => {
        const canvas = getActiveCanvasRef().current;
        if (!canvas) return null;
        
        // Check if canvas is actually drawn on (not blank)
        const ctx = canvas.getContext('2d');
        const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
        const isBlank = !Array.from(imageData.data).some(value => value !== 0);
        
        if (isBlank) return null;
        
        return canvas.toDataURL('image/png');
    }, [currentStep]);
    const clearError = () => {
        dispatch({ type: types.CLEAR_FINAL_FORM_ERROR });
    };

    const handleInputChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFormData({
            ...formData,
            [name]: type === 'checkbox' ? checked : value
        });
    };
    useEffect(() => {
    // Only navigate if:
    // 1. We submitted a step (submittedStep is not null)
    // 2. Not currently saving
    // 3. Save was successful for THIS step
    if (submittedStep !== null && !savingStep && stepSaveSuccess === STEP_NAME_MAP[submittedStep]) {
        // Clear the submitted step
        setSubmittedStep(null);
        
        // If this was the last step (step 13), show success and maybe redirect
        if (submittedStep === steps.length) {
            alert('Application submitted successfully!');
            // Optionally redirect to dashboard or applications page
            // navigate('/applications');
        } else {
            // Navigate to next step
            setCurrentStep(prev => Math.min(prev + 1, steps.length));
        }
        window.scrollTo({ top: 0, behavior: "smooth" });
    }
}, [savingStep, stepSaveSuccess, submittedStep, steps.length]);
    const handleSubmit = useCallback((e) => {
    e.preventDefault();
    if (savingStep) return;
    
    const referenceId = localStorage.getItem('applicationReferenceId');
    const signatureData = getSignatureData();
    const stepName = STEP_NAME_MAP[currentStep]; // This will be 'final_bg_auth' for step 13
    
    // Filter formData for step 13 fields
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
    
    console.log(`Final Step ${currentStep}: Submitting ${Object.keys(formDataToSend).length} fields`);
    
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
}, [currentStep, formData, savingStep, dispatch, getSignatureData]);
const currentFormProgress = formProgress?.['final'] || null;
    return (
        <div className="application-page final-application">
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

            {/* Form Content */}
            <div className="form-container">
                {/* Progress Steps */}
                {/* <div className="progress-steps">
                    {steps.map((label, index) => {
                        const stepNumber = index + 1;

                        return (
                            <div
                                key={stepNumber}
                                className={`step ${stepNumber === currentStep ? "active" : ""}`}
                                onClick={() => setCurrentStep(stepNumber)}
                                role="button"
                            >
                                <div className="step-number">{stepNumber}</div>
                                <span className="step-label">{label}</span>
                            </div>
                        );
                    })}
                </div> */}
                <div className="progress-steps">
                    {steps.map((label, index) => {
                        const stepNumber = index + 1;
                         const status = currentFormProgress?.stepStatuses?.[stepNumber];
                         console.log(currentFormProgress);
                         console.log('status comes here:');
                         console.log(status);
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

                <p className="required-note"><span className="required">*</span> indicates required fields</p>
                {/* ✅ Saving loader — visible during API call */}
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

                {/* ✅ Error banner — stays visible if save fails */}
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
                        <div style={{ height: '100vh', width: '100%', backgroundColor: '#ffffff', display: 'flex', justifyContent: 'center', alignItems: 'flex-start', overflow: 'auto' }}>
                            <iframe
                                src="/forms/section-2-page-1.pdf#toolbar=1&navpanes=1"
                                style={{ height: '100%', width: '100%', maxWidth: '1200px', border: 'none', backgroundColor: 'white' }}
                                title="PDF Form"
                            />
                        </div>
                    )}






                    {currentStep === 2 && (
                        <>
                            {/* Header Section */}
                            <div className="form-section" style={{ border: '3px solid #000', padding: '0' }}>
                                <div className="row" style={{ margin: '0', alignItems: 'stretch' }}>
                                    <div className="col-md-2" style={{ padding: '12px 10px', borderRight: '2px solid #000' }}>
                                        <p className="form-note" style={{ margin: '0', fontSize: '13px', lineHeight: '1.2' }}>Form <b style={{ fontSize: '30px', color: '#000' }}>W-9</b></p>
                                        <p className="form-note" style={{ margin: '5px 0 0 0', fontSize: '11px', lineHeight: '1.2' }}>(Rev. March 2024)</p>
                                        <p className="form-note" style={{ margin: '10px 0 0 0', fontSize: '11px', lineHeight: '1.3' }}>Department of the Treasury<br />Internal Revenue Service</p>
                                    </div>
                                    <div className="col-md-8 text-center" style={{ padding: '15px 20px', borderRight: '2px solid #000' }}>
                                        <h1 className="form-title text-center" style={{ fontSize: '22px', fontWeight: 'bold', margin: '0 0 8px 0', lineHeight: '1.2' }}>Request for Taxpayer<br />Identification Number and Certification</h1>
                                        <p className="form-note" style={{ margin: '8px 0 0 0', fontSize: '15px' }}>Go to <b><i>www.irs.gov/FormW9</i></b> for instructions and the latest information.</p>
                                    </div>
                                    <div className="col-md-2" style={{ padding: '15px 10px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                        <p className="form-note" style={{ margin: '0', fontSize: '20px', lineHeight: '1.3', textAlign: 'center', color: '#000' }}><b>Give form to the requester. Do not send to the IRS.</b></p>
                                    </div>
                                </div>
                            </div>

                            {/* Before you begin section */}
                            <div className="form-section" style={{ border: '3px solid #000', borderTop: 'none', padding: '8px 12px', backgroundColor: '#fff' }}>
                                <p className="form-note" style={{ margin: '0', lineHeight: '1.3' }}><b>Before you begin.</b> For guidance related to the purpose of Form W-9, see <i>Purpose of Form</i>, below. <b>Print or type.</b> See <i>Specific Instructions</i> on page 3.</p>
                            </div>

                            {/* Main Form Section */}
                            <div className="form-section" style={{ border: '3px solid #000', borderTop: 'none', padding: '0' }}>
                                {/* Line 1 */}
                                <div style={{ borderBottom: '2px solid #000', padding: '10px 12px' }}>
                                    <div className="form-field" style={{ marginBottom: '10px' }}>
                                        <label className="section-label" style={{ fontWeight: 'normal', display: 'block', marginBottom: '4px' }}><b>1</b>&nbsp;&nbsp;Name of entity/individual. An entry is required. (For a sole proprietor or disregarded entity, enter the owner's name on line 1, and enter the business/disregarded entity's name on line 2.)</label>
                                        <input type="text" name="w9Name" value={formData.w9Name} onChange={handleInputChange} style={{ width: '100%', border: 'none', borderBottom: '1px solid #000', padding: '4px 5px', fontSize: '12px', backgroundColor: 'transparent' }} />
                                    </div>

                                    {/* Line 2 */}
                                    <div className="form-field">
                                        <label className="section-label" style={{ fontWeight: 'normal', display: 'block', marginBottom: '4px' }}><b>2</b>&nbsp;&nbsp;Business name/disregarded entity name, if different from above.</label>
                                        <input type="text" name="businessName" value={formData.businessName} onChange={handleInputChange} style={{ width: '100%', border: 'none', borderBottom: '1px solid #000', padding: '4px 5px', fontSize: '12px', backgroundColor: 'transparent' }} />
                                    </div>
                                </div>

                                {/* Line 3a and 4 Row */}
                                <div className="row" style={{ margin: '0' }}>
                                    <div className="col-md-8" style={{ padding: '12px', borderRight: '2px solid #000' }}>
                                        <label className="section-label" style={{ fontWeight: 'normal', display: 'block', marginBottom: '10px' }}><b>3a</b>&nbsp;&nbsp;Check the appropriate box for federal tax classification of the entity/individual whose name is entered on line 1. Check only <b>one</b> of the following seven boxes.</label>

                                        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '15px', marginBottom: '10px' }}>
                                            <label className="radio-label" style={{ display: 'flex', alignItems: 'center' }}>
                                                <input type="checkbox" name="taxClass" value="individual" checked={formData.taxClass === 'individual'} onChange={handleInputChange} style={{ marginRight: '6px', width: '14px', height: '14px' }} />
                                                <span>Individual/sole proprietor</span>
                                            </label>
                                            <label className="radio-label" style={{ display: 'flex', alignItems: 'center' }}>
                                                <input type="checkbox" name="taxClass" value="c-corp" checked={formData.taxClass === 'c-corp'} onChange={handleInputChange} style={{ marginRight: '6px', width: '14px', height: '14px' }} />
                                                <span>C corporation</span>
                                            </label>
                                            <label className="radio-label" style={{ display: 'flex', alignItems: 'center' }}>
                                                <input type="checkbox" name="taxClass" value="s-corp" checked={formData.taxClass === 's-corp'} onChange={handleInputChange} style={{ marginRight: '6px', width: '14px', height: '14px' }} />
                                                <span>S corporation</span>
                                            </label>
                                            <label className="radio-label" style={{ display: 'flex', alignItems: 'center' }}>
                                                <input type="checkbox" name="taxClass" value="partnership" checked={formData.taxClass === 'partnership'} onChange={handleInputChange} style={{ marginRight: '6px', width: '14px', height: '14px' }} />
                                                <span>Partnership</span>
                                            </label>
                                            <label className="radio-label" style={{ display: 'flex', alignItems: 'center' }}>
                                                <input type="checkbox" name="taxClass" value="trust" checked={formData.taxClass === 'trust'} onChange={handleInputChange} style={{ marginRight: '6px', width: '14px', height: '14px' }} />
                                                <span>Trust/estate</span>
                                            </label>
                                        </div>

                                        <div style={{ marginBottom: '8px' }}>
                                            <label className="radio-label" style={{ display: 'inline-flex', alignItems: 'flex-start' }}>
                                                <input type="checkbox" name="taxClass" value="llc" checked={formData.taxClass === 'llc'} onChange={handleInputChange} style={{ marginRight: '6px', marginTop: '2px', width: '14px', height: '14px' }} />
                                                <span>LLC. Enter the tax classification (C = C corporation, S = S corporation, P = Partnership) &nbsp;. &nbsp;. &nbsp;. &nbsp;. &nbsp;
                                                    <input type="text" name="llcClassification" value={formData.llcClassification} onChange={handleInputChange} style={{ width: '30px', border: 'none', borderBottom: '1px solid #000', padding: '2px 5px', fontSize: '12px', backgroundColor: 'transparent', display: 'inline-block', marginLeft: '5px' }} /></span>
                                            </label>
                                            <p className="form-note" style={{ fontSize: '10px', marginLeft: '20px', marginTop: '5px', lineHeight: '1.3' }}><b>Note:</b> Check the "LLC" box above and, in the entry space, enter the appropriate code (C, S, or P) for the tax classification of the LLC, unless it is a disregarded entity. A disregarded entity should instead check the appropriate box for the tax classification of its owner.</p>
                                        </div>

                                        <div style={{ marginBottom: '10px' }}>
                                            <label className="radio-label" style={{ display: 'inline-flex', alignItems: 'center' }}>
                                                <input type="checkbox" style={{ marginRight: '6px', width: '14px', height: '14px' }} />
                                                <span>Other (see instructions) ▶
                                                    <input type="text" style={{ width: '200px', border: 'none', borderBottom: '1px solid #000', padding: '2px 5px', fontSize: '12px', marginLeft: '5px', backgroundColor: 'transparent', display: 'inline-block' }} /></span>
                                            </label>
                                        </div>

                                        <div style={{ borderTop: '1px solid #000', paddingTop: '10px' }}>
                                            <label className="section-label" style={{ fontWeight: 'normal', display: 'block', marginBottom: '6px' }}>
                                                <b>3b</b>&nbsp;&nbsp;If on line 3a you checked "Partnership" or "Trust/estate," or checked "LLC" and entered "P" as its tax classification, and you are providing this form to a partnership, trust, or estate in which you have an ownership interest, check this box if you have any foreign partners, owners, or beneficiaries. See instructions &nbsp;. &nbsp;. &nbsp;. &nbsp;. &nbsp;. &nbsp;. &nbsp;. &nbsp;. &nbsp;<input type="checkbox" style={{ width: '14px', height: '14px', marginLeft: '5px', verticalAlign: 'middle' }} />
                                            </label>
                                        </div>
                                    </div>

                                    {/* Line 4 - Right Column */}
                                    <div className="col-md-4" style={{ padding: '12px' }}>
                                        <label className="section-label" style={{ fontWeight: 'normal', display: 'block', marginBottom: '8px' }}><b>4</b>&nbsp;&nbsp;Exemptions (codes apply only to certain entities, not individuals; see instructions on page 3):</label>
                                        <div className="form-field" style={{ marginBottom: '12px' }}>
                                            <label className="section-label" style={{ display: 'block', marginBottom: '4px' }}>Exempt payee code (if any)</label>
                                            <input type="text" name="exemptPayee" value={formData.exemptPayee} onChange={handleInputChange} style={{ width: '100%', border: '1px solid #000', padding: '4px 6px', fontSize: '12px' }} />
                                        </div>
                                        <div className="form-field" style={{ marginBottom: '8px' }}>
                                            <label className="section-label" style={{ display: 'block', marginBottom: '4px' }}>Exemption from Foreign Account Tax Compliance Act (FATCA) reporting code (if any)</label>
                                            <input type="text" name="fatcaCode" value={formData.fatcaCode} onChange={handleInputChange} style={{ width: '100%', border: '1px solid #000', padding: '4px 6px', fontSize: '12px' }} />
                                        </div>
                                        <p className="form-note" style={{ fontStyle: 'italic', lineHeight: '1.3', margin: '0' }}>(Applies to accounts maintained outside the United States.)</p>
                                    </div>
                                </div>

                                {/* Lines 5, 6, 7 */}
                                <div className="row" style={{ margin: '0', borderTop: '2px solid #000' }}>
                                    <div className="col-md-8" style={{ padding: '12px', borderRight: '2px solid #000' }}>
                                        <div className="form-field" style={{ marginBottom: '12px' }}>
                                            <label className="section-label" style={{ fontWeight: 'normal', display: 'block', marginBottom: '4px' }}><b>5</b>&nbsp;&nbsp;Address (number, street, and apt. or suite no.). See instructions.</label>
                                            <input type="text" name="w9Address" value={formData.w9Address} onChange={handleInputChange} style={{ width: '100%', border: 'none', borderBottom: '1px solid #000', padding: '4px 5px', fontSize: '12px', backgroundColor: 'transparent' }} />
                                        </div>
                                        <div className="form-field">
                                            <label className="section-label" style={{ fontWeight: 'normal', display: 'block', marginBottom: '4px' }}><b>6</b>&nbsp;&nbsp;City, state, and ZIP code</label>
                                            <input type="text" name="w9CityStateZip" value={formData.w9CityStateZip} onChange={handleInputChange} style={{ width: '100%', border: 'none', borderBottom: '1px solid #000', padding: '4px 5px', fontSize: '12px', backgroundColor: 'transparent' }} />
                                        </div>
                                    </div>
                                    <div className="col-md-4" style={{ padding: '12px' }}>
                                        <label className="section-label" style={{ display: 'block', marginBottom: '4px' }}>Requester's name and address (optional)</label>
                                        <textarea name="requesterAddress" rows="4" value={formData.requesterAddress} onChange={handleInputChange} style={{ width: '100%', border: '1px solid #000', padding: '4px 6px', fontSize: '11px', resize: 'none' }}></textarea>
                                    </div>
                                </div>

                                <div className="form-field" style={{ borderTop: '2px solid #000', padding: '12px' }}>
                                    <label className="section-label" style={{ fontWeight: 'normal', display: 'block', marginBottom: '4px' }}><b>7</b>&nbsp;&nbsp;List account number(s) here (optional)</label>
                                    <input type="text" name="accountNumbers" value={formData.accountNumbers} onChange={handleInputChange} style={{ width: '100%', border: 'none', borderBottom: '1px solid #000', padding: '4px 5px', fontSize: '12px', backgroundColor: 'transparent' }} />
                                </div>
                            </div>

                            {/* Part I: TIN */}
                            <div className="form-section" style={{ border: '3px solid #000', borderTop: 'none', padding: '0' }}>
                                <div style={{ backgroundColor: '#000', color: '#fff', padding: '6px 12px' }}>
                                    <h1 className="form-title" style={{ fontWeight: 'bold', margin: '0', color: '#fff' }}>Part I &nbsp;&nbsp;&nbsp;&nbsp;&nbsp; Taxpayer Identification Number (TIN)</h1>
                                </div>
                                <div style={{ padding: '12px' }}>
                                    <p className="form-note" style={{ lineHeight: '1.4', margin: '0 0 8px 0' }}>
                                        Enter your TIN in the appropriate box. The TIN provided must match the name given on line 1 to avoid backup withholding. For individuals, this is generally your social security number (SSN). However, for a resident alien, sole proprietor, or disregarded entity, see the instructions for Part I, later. For other entities, it is your employer identification number (EIN). If you do not have a number, see <i>How to get a TIN</i>, later.
                                    </p>
                                    <p className='form-note' style={{ lineHeight: '1.4', margin: '0 0 12px 0' }}><b>Note:</b> If the account is in more than one name, see the instructions for line 1. See also <i>What Name and Number To Give the Requester</i> for guidelines on whose number to enter.</p>

                                    <div style={{ display: 'flex', alignItems: 'center', gap: '15px', flexWrap: 'wrap' }}>
                                        <div style={{ flex: '1', minWidth: '280px', border: '2px solid #000', padding: '10px' }}>
                                            <label className="section-label" style={{ display: 'block', marginBottom: '8px', fontWeight: 'bold' }}>Social security number</label>
                                            <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
                                                <input type="text" maxLength="3" name="ssn1" value={formData.ssn1} onChange={handleInputChange} style={{ width: '60px', border: '1px solid #000', padding: '6px', fontSize: '16px', textAlign: 'center' }} />
                                                <span style={{ fontSize: '18px', fontWeight: 'bold' }}>–</span>
                                                <input type="text" maxLength="2" name="ssn2" value={formData.ssn2} onChange={handleInputChange} style={{ width: '45px', border: '1px solid #000', padding: '6px', fontSize: '16px', textAlign: 'center' }} />
                                                <span style={{ fontSize: '18px', fontWeight: 'bold' }}>–</span>
                                                <input type="text" maxLength="4" name="ssn3" value={formData.ssn3} onChange={handleInputChange} style={{ width: '70px', border: '1px solid #000', padding: '6px', fontSize: '16px', textAlign: 'center' }} />
                                            </div>
                                        </div>
                                        <div style={{ fontSize: '13px', fontWeight: 'bold' }}>or</div>
                                        <div style={{ flex: '1', minWidth: '280px', border: '2px solid #000', padding: '10px' }}>
                                            <label className="section-label" style={{ display: 'block', marginBottom: '8px', fontWeight: 'bold' }}>Employer identification number</label>
                                            <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
                                                <input type="text" maxLength="2" name="ein1" value={formData.ein1} onChange={handleInputChange} style={{ width: '45px', border: '1px solid #000', padding: '6px', fontSize: '16px', textAlign: 'center' }} />
                                                <span style={{ fontSize: '18px', fontWeight: 'bold' }}>–</span>
                                                <input type="text" maxLength="7" name="ein2" value={formData.ein2} onChange={handleInputChange} style={{ width: '110px', border: '1px solid #000', padding: '6px', fontSize: '16px', textAlign: 'center' }} />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Part II: Certification */}
                            <div className="form-section" style={{ border: '3px solid #000', borderTop: 'none', padding: '0' }}>
                                <div style={{ backgroundColor: '#000', color: '#fff', padding: '6px 12px' }}>
                                    <h1 className="form-title" style={{ fontWeight: 'bold', margin: '0', color: '#fff' }}>Part II &nbsp;&nbsp;&nbsp; Certification</h1>
                                </div>
                                <div style={{ padding: '12px' }}>
                                    <p className="form-note" style={{ lineHeight: '1.4', margin: '0 0 6px 0' }}>Under penalties of perjury, I certify that:</p>
                                    <p className="form-note" style={{ lineHeight: '1.4', margin: '0 0 4px 0' }}>1. The number shown on this form is my correct taxpayer identification number (or I am waiting for a number to be issued to me); and</p>
                                    <p className="form-note" style={{ lineHeight: '1.4', margin: '0 0 4px 0' }}>2. I am not subject to backup withholding because (a) I am exempt from backup withholding, or (b) I have not been notified by the Internal Revenue Service (IRS) that I am subject to backup withholding as a result of a failure to report all interest or dividends, or (c) the IRS has notified me that I am no longer subject to backup withholding; and</p>
                                    <p className="form-note" style={{ lineHeight: '1.4', margin: '0 0 4px 0' }}>3. I am a U.S. citizen or other U.S. person (defined below); and</p>
                                    <p className="form-note" style={{ lineHeight: '1.4', margin: '0 0 10px 0' }}>4. The FATCA code(s) entered on this form (if any) indicating that I am exempt from FATCA reporting is correct.</p>

                                    <div style={{ backgroundColor: '#f9f9f9', padding: '10px', marginBottom: '12px', border: '1px solid #ddd' }}>
                                        <p className="form-note" style={{ lineHeight: '1.4', margin: '0' }}><b>Certification instructions.</b> You must cross out item 2 above if you have been notified by the IRS that you are currently subject to backup withholding because you have failed to report all interest and dividends on your tax return. For real estate transactions, item 2 does not apply. For mortgage interest paid, acquisition or abandonment of secured property, cancellation of debt, contributions to an individual retirement arrangement (IRA), and, generally, payments other than interest and dividends, you are not required to sign the certification, but you must provide your correct TIN. See the instructions for Part II, later.</p>
                                    </div>

                                    <div style={{ borderTop: '2px solid #000', paddingTop: '12px' }}>
                                        <div className="row" style={{ margin: '0' }}>
                                            <div className="col-md-1" style={{ padding: '0', borderRight: '2px solid #000', textAlign: 'center' }}>
                                                <div style={{ fontWeight: 'bold', lineHeight: '1.3', padding: '20px 5px 0 5px' }}><b>Sign<br />Here</b></div>
                                            </div>
                                            <div className="col-md-7" style={{ padding: '0 15px' }}>
                                                <label className="section-label" style={{ display: 'block', marginBottom: '6px', fontWeight: 'bold' }}>Signature of<br />U.S. person ▶</label>
                                                <div className="signature-pad-container" style={{ position: 'relative', border: '2px solid #000', backgroundColor: '#fff', height: '70px' }}>
                                                    <canvas
                                                        ref={canvasRefs[2]}
                                                        width={700}
                                                        height={70}
                                                        className="signature-canvas"
                                                        onMouseDown={startDrawing}
                                                        onMouseMove={draw}
                                                        onMouseUp={stopDrawing}
                                                        onMouseLeave={stopDrawing}
                                                        onTouchStart={startDrawing}
                                                        onTouchMove={draw}
                                                        onTouchEnd={stopDrawing}
                                                        style={{ display: 'block', width: '100%', height: '100%', cursor: 'crosshair' }}
                                                    />
                                                    <button type="button" className="clear-signature-btn" onClick={clearSignature} style={{ position: 'absolute', top: '5px', right: '5px', background: '#fff', border: '1px solid #000', borderRadius: '3px', padding: '3px 10px', cursor: 'pointer', fontSize: '14px' }}>↻</button>
                                                </div>
                                            </div>
                                            <div className="form-field col-md-4" style={{ padding: '0 0 0 15px' }}>
                                                <label className="section-label" style={{ display: 'block', marginBottom: '6px', fontWeight: 'bold' }}>Date ▶</label>
                                                <input type="date" name="w9SignDate" value={formData.w9SignDate} onChange={handleInputChange} style={{ width: '100%', border: '2px solid #000', padding: '8px', fontSize: '12px' }} />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* General Instructions Section */}
                            <div className="form-section" style={{ border: '3px solid #000', borderTop: 'none', padding: '15px' }}>
                                <h1 className="form-title" style={{ fontSize: '22px', fontWeight: 'bold', margin: '0 0 12px 0' }}>General Instructions</h1>
                                <p className="form-note" style={{ lineHeight: '1.4', margin: '0 0 10px 0' }}>
                                    Section references are to the Internal Revenue Code unless otherwise noted.
                                </p>
                                <p className="form-note" style={{ lineHeight: '1.4', margin: '0 0 12px 0' }}>
                                    <b>Future developments.</b> For the latest information about developments related to Form W-9 and its instructions, such as legislation enacted after they were published, go to <i>www.irs.gov/FormW9</i>.
                                </p>

                                <h2 className="form-title" style={{ fontSize: '22px', fontWeight: 'bold', margin: '15px 0 10px 0' }}>What's New</h2>
                                <p className="form-note" style={{ lineHeight: '1.4', margin: '0 0 8px 0' }}>
                                    Line 3a has been modified to clarify how a disregarded entity completes this line. An LLC that is a disregarded entity should check the appropriate box for the tax classification of its owner. Otherwise, it should check the "LLC" box and enter its appropriate tax classification.
                                </p>
                                <p className="form-note" style={{ lineHeight: '1.4', margin: '0 0 12px 0' }}>
                                    New line 3b has been added to this form. A flow-through entity is required to complete this line to indicate that it has direct or indirect foreign partners, owners, or beneficiaries when it provides the Form W-9 to another flow-through entity in which it has an ownership interest. This change is intended to provide a flow-through entity with information regarding the status of its indirect foreign partners, owners, or beneficiaries, so that it can satisfy any applicable reporting requirements. For example, a partnership that has any indirect foreign partners may be required to complete Schedules K-2 and K-3. See the Partnership Instructions for Schedules K-2 and K-3 (Form 1065).
                                </p>

                                <h2 className="form-title" style={{ fontSize: '22px', fontWeight: 'bold', margin: '15px 0 10px 0' }}>Purpose of Form</h2>
                                <p className="form-note" style={{ lineHeight: '1.4', margin: '0 0 8px 0' }}>
                                    An individual or entity (Form W-9 requester) who is required to file an information return with the IRS is giving you this form because they
                                </p>

                                <div style={{ textAlign: 'right', marginTop: '20px', paddingTop: '10px', borderTop: '1px solid #ddd' }}>
                                    <p className="form-note" style={{ fontSize: '10px', margin: '0' }}>Cat. No. 10231X &nbsp;&nbsp;&nbsp; Form <b>W-9</b> (Rev. 3-2024)</p>
                                </div>
                            </div>
                        </>
                    )}
                    {currentStep === 3 && (
                        <div className="attestation-compliance-container">
                            {/* Header with AHCA Logo and Title */}
                            <div className="row align-items-center mb-4">
                                <div className="col-md-8 col-12 text-center text-md-start mb-3 mb-md-0">
                                    <img
                                        src="/images/2.png"
                                        alt="Agency for Health Care Administration"
                                        className="img-fluid"
                                        style={{ maxWidth: "120px" }}
                                    />
                                </div>

                                <div className="col-md-4 col-12 text-center">
                                    <h1 className="form-title mb-0 text-center" style={{ fontSize: "24px", fontWeight: "bold" }}>
                                        ATTESTATION OF COMPLIANCE
                                    </h1>
                                    <h2 className="form-subtitle" style={{ fontSize: "20px" }}>
                                        with Background Screening Requirements
                                    </h2>
                                </div>
                            </div>


                            <hr style={{ borderTop: '2px solid #000' }} />

                            <div className="authority-box p-3 mb-4" style={{ backgroundColor: '#f2f2ee', border: '1px solid #ccc' }}>
                                <p className="form-note" style={{ fontSize: '15px' }}>
                                    <b>Authority:</b> This form may be used by <b>all employees</b> to comply with:
                                </p>
                                <ul className="form-note" style={{ listStyleType: 'disc', paddingLeft: '20px', fontSize: '15px' }}>
                                    <li>
                                        the attestation requirements of <b> section 435.05(2) , Florida Statutes </b>, which state that every employee required
                                        to undergo Level 2 background screening must attest, subject to penalty of perjury, to meeting the
                                        requirements for qualifying for employment pursuant to this chapter and agreeing to inform the employer
                                        immediately if arrested for any of the disqualifying offenses while employed by the employer; <b>AND</b>
                                    </li>
                                    <li className="mt-2">
                                        the proof of screening within the previous 5 years in <b>section 408.809(2), Florida Statutes </b> which requires proof
                                        of compliance with level 2 screening standards that have been screened through the Care Provider Background
                                        Screening Clearinghouse created under Section 435.12, F.S., or screened within the previous 5 years by the
                                        Agency, Department of Health, Department of Elder Affairs, the Agency for Persons with Disabilities,
                                        Department of Children and Families, or the Department of Financial Services for an applicant for a certificate
                                        of authority to operate a continuing care retirement community under Chapter 651, F.S., and in accordance
                                        with the standards in Section 408.809(2), F.S., if that agency is not currently implemented in the Care Provider
                                        Background Screening Clearinghouse.
                                    </li>
                                </ul>
                                <p className="form-note mt-3" style={{ fontSize: '13px' }}>
                                    <i><b>This form must be maintained in the employee’s personnel file</b>. If this form is used as proof of screening for an
                                        administrator or chief financial officer to satisfy the requirements of an <b>application for a health care provider
                                            license </b>, please attach a copy of the screening results and submit with the licensure application.</i>
                                </p>
                            </div>

                            {/* Table-style identification section */}
                            <div className="form-table mb-4" style={{ border: '1px solid #000' }}>
                                <div className="row m-0 border-bottom border-dark">
                                    <div className="col-4 p-2 border-right border-dark bg-light"><b>Employee/Contractor Name:</b></div>
                                    <div className="col-8 p-0">
                                        <input type="text" name="attestationEmployeeName" className="w-100 form-control p-2" value={formData.attestationEmployeeName} onChange={handleInputChange} />
                                    </div>
                                </div>
                                <div className="row m-0 border-bottom border-dark">
                                    <div className="col-4 p-2 border-right border-dark bg-light"><b>Health Care Provider/ Employer Name:</b></div>
                                    <div className="col-8 p-0">
                                        <input type="text" name="attestationEmployerName" className="w-100 form-control p-2" value={formData.attestationEmployerName} onChange={handleInputChange} />
                                    </div>
                                </div>
                                <div className="row m-0">
                                    <div className="col-4 p-2 border-right border-dark bg-light"><b>Address of Health Care Provider:</b></div>
                                    <div className="col-8 p-0">
                                        <input type="text" name="attestationProviderAddress" className="w-100 form-control p-2" value={formData.attestationProviderAddress} onChange={handleInputChange} />
                                    </div>
                                </div>
                            </div>

                            {/* Legal Text */}
                            <p className="form-note" style={{ textAlign: 'justify' }}>
                                I hereby attest to meeting the requirements for employment and that I have not been arrested for <del>or</del> <u>and</u> been found guilty of, regardless of adjudication, or entered a plea of nolo contendere, or guilty to any offense... prohibited under any of the following provisions of the Florida Statutes:
                            </p>

                            {/* Criminal Offenses Columns */}
                            <div className="row mt-3" style={{ fontSize: '12px' }}>
                                <div className="col-md-6 border-right border-secondary">
                                    <p><b><u>Criminal offenses found in section 435.04, F.S.</u></b></p>
                                    <p><b>(a) Section <u>393.135</u>, relating to sexual misconduct...</b></p>
                                    <p><b>(b) Section <u>394.4593</u>, relating to sexual misconduct...</b></p>
                                    <p><b>(c) Section <u>415.111</u>, relating to adult abuse, neglect...</b></p>
                                    <p><b>(d) Section <u>777.04</u>, relating to attempts, solicitation...</b></p>
                                    <p><b>(e) Section <u>782.04</u>, relating to murder.</b></p>
                                </div>

                                <div className="col-md-6">
                                    <p><b>(f) Section <u>782.07</u>, relating to manslaughter...</b></p>
                                    <p><b>(g) Section <u>782.071</u>, relating to vehicular homicide.</b></p>
                                    <p><b>(h) Section <u>782.09</u>, relating to killing of an unborn quick child...</b></p>
                                    <p><b>(i) Chapter 784, relating to assault, battery (felony).</b></p>
                                    <p><b>(j) Section <u>784.011</u>, relating to assault (minor victim).</b></p>
                                    <p><b>(k) Section <u>784.03</u>, relating to battery (minor victim).</b></p>
                                    <p><b>(l) Section <u>787.01</u>, relating to kidnapping.</b></p>
                                </div>
                            </div>

                        </div>
                    )}
                    {currentStep === 4 && (
                        <>
                            <div className="form-section">
                                <div className="row">
                                    {/* Left Column */}
                                    <div className="col-md-6">
                                        <p className="form-note"><b>(m) Section <u>787.02</u>, relating to false imprisonment.</b></p>
                                        <p className="form-note"><b>(n) Section <u>787.025</u>, relating to luring or enticing a child.</b></p>
                                        <p className="form-note"><b>(o) Section <u>787.04(2)</u>, relating to taking, enticing, or removing a child beyond the state limits with criminal intent pending custody proceedings.</b></p>
                                        <p className="form-note"><b>(p) Section <u>787.04(3)</u>, relating to carrying a child beyond the state lines with criminal intent to avoid producing a child at a custody hearing or delivering the child to the designated person.</b></p>
                                        <p className="form-note"><b>(q) Section <u>790.115(1)</u>, relating to exhibiting firearms or weapons within 1,000 feet of a school.</b></p>
                                        <p className="form-note"><b>(r) Section <u>790.115(2)(b)</u>, relating to possessing an electric weapon or device, destructive device, or other weapon on school property.</b></p>
                                        <p className="form-note"><b>(s) Section <u>794.011</u>, relating to sexual battery.</b></p>
                                        <p className="form-note"><b>(t) Former s. <u>794.041</u>, relating to prohibited acts of persons in familial or custodial authority.</b></p>
                                        <p className="form-note"><b>(u) Section <u>794.05</u>, relating to unlawful sexual activity with certain minors.</b></p>
                                        <p className="form-note"><b>(v) Chapter 796, relating to prostitution.</b></p>
                                        <p className="form-note"><b>(w) Section <u>798.02</u>, relating to lewd and lascivious behavior.</b></p>
                                        <p className="form-note"><b>(x) Chapter 800, relating to lewdness and indecent exposure.</b></p>
                                        <p className="form-note"><b>(y) Section <u>806.01</u>, relating to arson.</b></p>
                                        <p className="form-note"><b>(z) Section <u>810.02</u>, relating to burglary.</b></p>
                                        <p className="form-note"><b>(aa) Section <u>810.14</u>, relating to voyeurism, if the offense is a felony.</b></p>
                                        <p className="form-note"><b>(bb) Section <u>810.145</u>, relating to video voyeurism, if the offense is a felony.</b></p>
                                        <p className="form-note"><b>(cc) Chapter 812, relating to theft, robbery, and related crimes, if the offense is a felony.</b></p>
                                        <p className="form-note"><b>(dd) Section <u>817.563</u>, relating to fraudulent sale of controlled substances, only if the offense was a felony.</b></p>
                                        <p className="form-note"><b>(ee) Section <u>825.102</u>, relating to abuse, aggravated abuse, or neglect of an elderly person or disabled adult.</b></p>
                                        <p className="form-note"><b>(ff) Section <u>825.1025</u>, relating to lewd or lascivious offenses committed upon or in the presence of an elderly person or disabled adult.</b></p>
                                        <p className="form-note"><b>(gg) Section <u>825.103</u>, relating to exploitation of an elderly person or disabled adult, if the offense was a felony.</b></p>
                                    </div>

                                    {/* Right Column */}
                                    <div className="col-md-6">
                                        <p className="form-note"><b>(hh) Section <u>826.04</u>, relating to incest.</b></p>
                                        <p className="form-note"><b>(ii) Section <u>827.03</u>, relating to child abuse, aggravated child abuse, or neglect of a child.</b></p>
                                        <p className="form-note"><b>(jj) Section <u>827.04</u>, relating to contributing to the delinquency or dependency of a child.</b></p>
                                        <p className="form-note"><b>(kk) Former s. <u>827.05</u>, relating to negligent treatment of children.</b></p>
                                        <p className="form-note"><b>(ll) Section <u>827.071</u>, relating to sexual performance by a child.</b></p>
                                        <p className="form-note"><b>(mm) Section <u>843.01</u>, relating to resisting arrest with violence.</b></p>
                                        <p className="form-note"><b>(nn) Section <u>843.025</u>, relating to depriving a law enforcement, correctional, or correctional probation officer means of protection or communication.</b></p>
                                        <p className="form-note"><b>(oo) Section <u>843.12</u>, relating to aiding in an escape.</b></p>
                                        <p className="form-note"><b>(pp) Section <u>843.13</u>, relating to aiding in the escape of juvenile inmates in correctional institutions.</b></p>
                                        <p className="form-note"><b>(qq) Chapter 847, relating to obscene literature.</b></p>
                                        <p className="form-note"><b>(rr) Section <u>874.05(1)</u>, relating to encouraging or recruiting another to join a criminal gang.</b></p>
                                        <p className="form-note"><b>(ss) Chapter 893, relating to drug abuse prevention and control, only if the offense was a felony or if any other person involved in the offense was a minor.</b></p>
                                        <p className="form-note"><b>(tt) Section <u>916.1075</u>, relating to sexual misconduct with certain forensic clients and reporting of such sexual misconduct.</b></p>
                                        <p className="form-note"><b>(uu) Section <u>944.35(3)</u>, relating to inflicting cruel or inhuman treatment on an inmate resulting in great bodily harm.</b></p>
                                        <p className="form-note"><b>(vv) Section <u>944.40</u>, relating to escape.</b></p>
                                        <p className="form-note"><b>(ww) Section <u>944.46</u>, relating to harboring, concealing, or aiding an escaped prisoner.</b></p>
                                        <p className="form-note"><b>(xx) Section <u>944.47</u>, relating to introduction of contraband into a correctional facility.</b></p>
                                        <p className="form-note"><b>(yy) Section <u>985.701</u>, relating to sexual misconduct in juvenile justice programs.</b></p>
                                        <p className="form-note"><b>(zz) Section <u>985.711</u>, relating to contraband introduced into detention facilities.</b></p>
                                    </div>

                                </div>
                            </div>

                            {/* Final Legal Clause Section */}
                            <div className="form-section">
                                <p className="form-note">
                                    <b>(3)</b> The security background investigations under this section must ensure that no person subject to this section has been found guilty of, regardless of adjudication, or entered a plea of nolo contendere or guilty to, any offense that constitutes domestic violence as defined in s. 741.28, whether such act was committed in this state or in another jurisdiction.
                                </p>
                            </div>
                        </>
                    )}
                    {currentStep === 5 && (

                        <>
                            <div className="form-section">
                                <h1 className="section-label"><u><b>Criminal offenses found in section 408.809(4), F.S.</b></u></h1>

                                <div className="row mt-2">
                                    {/* Left Column */}
                                    <div className="col-md-6">
                                        <p className="form-note"><b>(a) Any authorizing statutes, if the offense was a felony.</b></p>
                                        <p className="form-note"><b>(b) This chapter, if the offense was a felony.</b></p>
                                        <p className="form-note"><b>(c) Section <u>409.920</u>, relating to Medicaid provider fraud.</b></p>
                                        <p className="form-note"><b>(d) Section <u>409.9201</u>, relating to Medicaid fraud.</b></p>
                                        <p className="form-note"><b>(e) Section <u>741.28</u>, relating to domestic violence.</b></p>
                                        <p className="form-note"><b>(f) Section <u>777.04</u>, relating to attempts, solicitation, and conspiracy to commit an offense listed in this subsection.</b></p>
                                        <p className="form-note"><b>(g) Section <u>817.034</u>, relating to fraudulent acts through mail, wire, radio, electromagnetic, photoelectronic, or photooptical systems.</b></p>
                                        <p className="form-note"><b>(h) Section <u>817.234</u>, relating to false and fraudulent insurance claims.</b></p>
                                        <p className="form-note"><b>(i) Section <u>817.481</u>, relating to obtaining goods by using a false or expired credit card or other credit device, if the offense was a felony.</b></p>
                                        <p className="form-note"><b>(j) Section <u>817.50</u>, relating to fraudulently obtaining goods or services from a health care provider.</b></p>
                                        <p className="form-note"><b>(k) Section <u>817.505</u>, relating to patient brokering.</b></p>
                                        <p className="form-note"><b>(l) Section <u>817.568</u>, relating to criminal use of personal identification information.</b></p>
                                    </div>

                                    {/* Right Column */}
                                    <div className="col-md-6">
                                        <p className="form-note"><b>(m) Section <u>817.60</u>, relating to obtaining a credit card through fraudulent means.</b></p>
                                        <p className="form-note"><b>(n) Section <u>817.61</u>, relating to fraudulent use of credit cards, if the offense was a felony.</b></p>
                                        <p className="form-note"><b>(o) Section <u>831.01</u>, relating to forgery.</b></p>
                                        <p className="form-note"><b>(p) Section <u>831.02</u>, relating to uttering forged instruments.</b></p>
                                        <p className="form-note"><b>(q) Section <u>831.07</u>, relating to forging bank bills, checks, drafts, or promissory notes.</b></p>
                                        <p className="form-note"><b>(r) Section <u>831.09</u>, relating to uttering forged bank bills, checks, drafts, or promissory notes.</b></p>
                                        <p className="form-note"><b>(s) Section <u>831.30</u>, relating to fraud in obtaining medicinal drugs.</b></p>
                                        <p className="form-note"><b>(t) Section <u>831.31</u>, relating to the sale, manufacture, delivery, or possession with the intent to sell, manufacture, or deliver any counterfeit controlled substance, if the offense was a felony.</b></p>
                                        <p className="form-note"><b>(u) Section <u>895.03</u>, relating to racketeering and collection of unlawful debts.</b></p>
                                        <p className="form-note"><b>(v) Section <u>896.101</u>, relating to the Florida Money Laundering Act.</b></p>
                                    </div>
                                </div>

                            </div>

                            {/* Exemption Selection Section */}
                            <div className="form-section border p-3">
                                <div className="row mb-3">
                                    <div className="col-12">
                                        <label className="checkbox-label d-flex align-items-start">
                                            <input type="checkbox" name="exemptionAHCA" checked={formData.exemptionAHCA} onChange={handleInputChange} />
                                            <span className="ms-2"><b>I have been granted an Exemption from Disqualification through the Agency for Healthcare Administration (AHCA).</b></span>
                                        </label>
                                        <div className="form-field mt-2 d-flex">
                                            <i className="me-2 mb-2">Date of Decision:</i>
                                            <input type="date" name="ahcaDecisionDate" className="w-25" value={formData.ahcaDecisionDate} onChange={handleInputChange} />
                                        </div>
                                    </div>
                                </div>

                                <div className="row">
                                    <div className="col-12">
                                        <label className="checkbox-label d-flex align-items-start">
                                            <input type="checkbox" name="exemptionDOH" checked={formData.exemptionDOH} onChange={handleInputChange} />
                                            <span className="ms-2"><b>I have been granted an Exemption from Disqualification through the Florida Department of Health.</b></span>
                                        </label>
                                        <div className="form-field mt-2 d-flex">
                                            <i className="me-2 mb-2">Date of Decision:</i>
                                            <input type="date" name="dohDecisionDate" className="w-25" value={formData.dohDecisionDate} onChange={handleInputChange} />
                                        </div>
                                    </div>
                                </div>
                                <h4 className="text-center mt-3"><b>**A copy of the Exemption from Disqualification decision letter must be attached**</b></h4>
                            </div>

                            {/* Prior Screening Section */}
                            <div className="form-section border p-3 mt-4">
                                <h5>
                                    If you are also using this form to provide evidence of prior Level 2 screening (fingerprinting) in the last 5 years <u>and</u> have not been unemployed for more than 90 days, please provide the following information. <b>A copy of the prior screening results must be attached.</b>
                                </h5>

                                <div className="row mt-3">
                                    <div className="form-field col-md-12 d-flex">
                                        <label className="section-label mb-0">Purpose of Prior Screening:</label>
                                        <input type="text" name="priorScreeningPurpose" value={formData.priorScreeningPurpose} onChange={handleInputChange} />
                                    </div>
                                </div>

                                <div className="row mt-2">
                                    <div className="form-field col-md-6 d-flex">
                                        <label className="section-label me-2 mb-0">Screening conducted by:</label>
                                        <input type="text" name="screeningAgencyName" value={formData.screeningAgencyName} onChange={handleInputChange} />
                                    </div>
                                    <div className="form-field col-md-6 d-flex">
                                        <label className="section-label me-2 mb-0">Date of Prior Screening:</label>
                                        <input type="date" name="priorScreeningDate" value={formData.priorScreeningDate} onChange={handleInputChange} />
                                    </div>
                                </div>

                                <div className="row mt-3">
                                    <div className="col-md-6">
                                        <label className="checkbox-label d-flex align-items-center mb-1">
                                            <input type="checkbox" name="agencyAHCA" checked={formData.agencyAHCA} onChange={handleInputChange} />
                                            <span className="ms-2">Agency for Healthcare Administration</span>
                                        </label>
                                        <label className="checkbox-label d-flex align-items-center mb-1">
                                            <input type="checkbox" name="agencyDOH" checked={formData.agencyDOH} onChange={handleInputChange} />
                                            <span className="ms-2">Department of Health</span>
                                        </label>
                                        <label className="checkbox-label d-flex align-items-center mb-1">
                                            <input type="checkbox" name="agencyAPD" checked={formData.agencyAPD} onChange={handleInputChange} />
                                            <span className="ms-2">Agency for Persons with Disabilities</span>
                                        </label>
                                    </div>
                                    <div className="col-md-6">
                                        <label className="checkbox-label d-flex align-items-center mb-1">
                                            <input type="checkbox" name="agencyDOEA" checked={formData.agencyDOEA} onChange={handleInputChange} />
                                            <span className="ms-2">Department of Elder Affairs</span>
                                        </label>
                                        <label className="checkbox-label d-flex align-items-center mb-1">
                                            <input type="checkbox" name="agencyDFS" checked={formData.agencyDFS} onChange={handleInputChange} />
                                            <span className="ms-2">Department of Financial Services</span>
                                        </label>
                                        <label className="checkbox-label d-flex align-items-center mb-1">
                                            <input type="checkbox" name="agencyDCF" checked={formData.agencyDCF} onChange={handleInputChange} />
                                            <span className="ms-2">Department of Children and Family Services</span>
                                        </label>
                                    </div>
                                </div>
                            </div>
                        </>

                    )}
                    {currentStep === 6 && (
                        <>

                            {/* Legal Statement */}
                            <div style={{ fontFamily: 'Arial, sans-serif', padding: '20px', color: '#333' }}>
                                {/* Header */}
                                <h2 style={{ fontSize: '22px', fontWeight: '500', marginBottom: '20px' }} className='form-title'>Attestation</h2>

                                {/* Top Text Section */}
                                <div className="form-section" style={{ marginBottom: '40px' }}>
                                    <p style={{
                                        lineHeight: '1.8',
                                        fontSize: '16px',
                                        color: '#555',
                                        fontStyle: 'italic'
                                    }}>
                                        Under penalty of perjury, I,
                                        <input
                                            type="text"
                                            name="finalAttestName"
                                            value={formData.finalAttestName}
                                            onChange={handleInputChange}
                                            style={{
                                                border: 'none',
                                                borderBottom: '2px solid #ccc', // Border bottom only
                                                backgroundColor: '#fffbe6',   // Pale yellow background
                                                borderRadius: '0',
                                                padding: '5px 10px',
                                                margin: '0 10px',
                                                width: '250px',
                                                outline: 'none',
                                                fontStyle: 'italic',
                                                fontSize: '16px',
                                                color: '#000'
                                            }}
                                        />,
                                        hereby swear or affirm that I meet the requirements for qualifying for employment in regards to the background screening standards set forth in Chapter 435 and section 408.809, F.S. In addition, I agree to immediately inform my employer if arrested or convicted of any of the disqualifying offenses while employed by any health care provider licensed pursuant to Chapter 408, Part II F.S.
                                    </p>
                                </div>

                                <div className="form-section">
                                    <div className="row align-items-end">

                                        {/* Signature Column - Keeping the box for the canvas area */}
                                        <div className="col-md-6" style={{ marginBottom: '20px' }}>
                                            <div style={{
                                                borderBottom: '2px dashed rgb(179, 179, 179)', // Kept dashed box for signature area boundary
                                                borderRadius: '4px',
                                                position: 'relative',
                                                height: '120px',
                                                display: 'flex',
                                                alignItems: 'center',
                                                backgroundColor: '#fff', // Signature background remains white for clarity
                                                boxShadow: 'inset 0 0 5px rgba(0,0,0,0.05)'
                                            }}>
                                                <canvas
                                                    ref={canvasRefs[6]}
                                                    width={800}
                                                    height={120}
                                                    style={{ width: '100%', height: '100%', cursor: 'crosshair' }}
                                                    onMouseDown={startDrawing}
                                                    onMouseMove={draw}
                                                    onMouseUp={stopDrawing}
                                                    onMouseLeave={stopDrawing}
                                                    onTouchStart={startDrawing}
                                                    onTouchMove={draw}
                                                    onTouchEnd={stopDrawing}
                                                />
                                                <button
                                                    type="button"
                                                    onClick={clearSignature}
                                                    style={{
                                                        position: 'absolute',
                                                        bottom: '10px',
                                                        right: '10px',
                                                        background: '#f9f9f9',
                                                        border: '1px solid #ccc',
                                                        borderRadius: '50%',
                                                        width: '30px',
                                                        height: '30px',
                                                        fontSize: '16px',
                                                        cursor: 'pointer',
                                                        display: 'flex',
                                                        alignItems: 'center',
                                                        justifyContent: 'center',
                                                        color: '#666',
                                                        boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
                                                    }}
                                                    title="Clear Signature"
                                                >
                                                    ↻
                                                </button>
                                            </div>
                                            <label style={{ display: 'block', fontSize: '14px', fontWeight: '700', marginTop: '12px', color: '#2c3e50' }}>
                                                Employee/Contractor Signature
                                            </label>
                                        </div>

                                        {/* Title Column - Border Bottom Style */}
                                        <div className="col-md-3" style={{ marginBottom: '20px' }}>
                                            <input
                                                type="text"
                                                name="finalAttestTitle"
                                                value={formData.finalAttestTitle}
                                                onChange={handleInputChange}
                                                style={{
                                                    width: '100%',
                                                    height: '40px',
                                                    border: 'none',
                                                    borderBottom: '2px solid #ccc', // Border bottom only
                                                    backgroundColor: '#fffbe6',   // Pale yellow background
                                                    borderRadius: '0',
                                                    padding: '5px 10px',
                                                    outline: 'none',
                                                    fontSize: '16px'
                                                }}
                                            />
                                            <label style={{ display: 'block', fontSize: '14px', fontWeight: '700', marginTop: '12px', color: '#2c3e50' }}>
                                                Title
                                            </label>
                                        </div>

                                        {/* Date Column - Border Bottom Style */}
                                        <div className="col-md-3" style={{ marginBottom: '20px' }}>
                                            <input
                                                type="date"
                                                name="finalAttestDate"
                                                value={formData.finalAttestDate}
                                                onChange={handleInputChange}
                                                style={{
                                                    width: '100%',
                                                    height: '40px',
                                                    border: 'none',
                                                    borderBottom: '2px solid #ccc', // Border bottom only
                                                    backgroundColor: '#fffbe6',   // Pale yellow background
                                                    borderRadius: '0',
                                                    padding: '5px 10px',
                                                    outline: 'none',
                                                    fontSize: '16px',
                                                    fontFamily: 'Arial, sans-serif'
                                                }}
                                            />
                                            <label style={{ display: 'block', fontSize: '14px', fontWeight: '700', marginTop: '12px', color: '#2c3e50' }}>
                                                Date
                                            </label>
                                        </div>

                                    </div>
                                </div>
                            </div>
                        </>
                    )}

                    {currentStep === 7 && (
                        <>
                            <div className="form-section text-center">
                                <h1 className="form-title">PRIVACY POLICY ACKNOWLEDGEMENT FORM</h1>
                            </div>

                            {/* Acknowledgement Text Section */}
                            <div className="form-section">
                                <p className="form-note mb-4">
                                    I acknowledge that I have received a copy of the privacy policies from the Florida Department
                                    of Law Enforcement and the Federal Bureau of Investigation, which describe the exchange of
                                    information where criminal record results will become part of the Care Provider Background
                                    Screening Clearinghouse.
                                </p>
                                <p className="form-note">
                                    I understand and agree that I will read and comply with the guidelines contained in the
                                    privacy policies.
                                </p>
                            </div>

                            {/* Input and Signature Section */}
                            <div className="form-section mt-4">
                                {/* Printed Name */}
                                <div className="form-field mb-5">
                                    <input
                                        type="text"
                                        name="privacyPrintedName"
                                        value={formData.privacyPrintedName}
                                        onChange={handleInputChange}
                                    />
                                    <label className="form-note mt-1">Employee/Contractor Name (Printed)</label>
                                </div>

                                {/* Signature Pad */}
                                <div className='col-md-6'>

                                    <div className="signature-pad-container mb-1">
                                        <canvas
                                            ref={canvasRefs[7]}
                                            width={700}
                                            height={120}
                                            className="signature-canvas"
                                            onMouseDown={startDrawing}
                                            onMouseMove={draw}
                                            onMouseUp={stopDrawing}
                                            onMouseLeave={stopDrawing}
                                            onTouchStart={startDrawing}
                                            onTouchMove={draw}
                                            onTouchEnd={stopDrawing}
                                        />
                                        <button
                                            type="button"
                                            className="clear-signature-btn"
                                            onClick={clearSignature}
                                        >
                                            ↻
                                        </button>
                                    </div>
                                    <label className="form-note">Employee/Contractor Signature</label>
                                </div>
                                {/* Date */}
                                <div className="form-field mb-4">
                                    <input
                                        type="date"
                                        name="privacyDate"
                                        value={formData.privacyDate}
                                        onChange={handleInputChange}
                                    />
                                    <label className="form-note mt-1">Date</label>
                                </div>
                            </div>
                        </>
                    )}
                    {currentStep === 8 && (
                        <div className="doea-form-container" style={{ maxWidth: '900px', margin: 'auto', color: '#000', padding: '20px' }}>

                            {/* Header Section */}
                            <div className="doea-header" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', marginBottom: '20px' }}>
                                <div className="doea-logo">
                                    <img
                                        src="images/0.jpg"
                                        alt="Elder Affairs Florida"
                                        style={{ height: '160px' }}
                                    />
                                </div>
                            </div>

                            {/* Blue Title Banner */}
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

                            {/* Main Data Section (Boxed Fields) */}
                            <div style={{ border: '1px solid #000' }}>
                                <div style={{ borderBottom: '1px solid #000', padding: '10px' }}>
                                    <label style={{ display: 'block', fontSize: '13px', fontWeight: 'bold', marginBottom: '5px' }}>TYPE OF PERSONAL IDENTIFICATION PROVIDED:</label>
                                    <input
                                        type="text"
                                        name="doeaIdType"
                                        className="doea-boxed-input"
                                        value={formData.doeaIdType}
                                        onChange={handleInputChange}
                                        style={{ width: '100%', backgroundColor: '#fffbe6', border: 'none', height: '35px', padding: '0 10px', outline: 'none' }}
                                    />
                                </div>

                                <div style={{ borderBottom: '1px solid #000', padding: '10px' }}>
                                    <label style={{ display: 'block', fontSize: '13px', fontWeight: 'bold', marginBottom: '5px' }}>APPLICANT (first name, middle name, last name):</label>
                                    <input
                                        type="text"
                                        name="doeaApplicantName"
                                        className="doea-boxed-input"
                                        value={formData.doeaApplicantName}
                                        onChange={handleInputChange}
                                        style={{ width: '100%', backgroundColor: '#fffbe6', border: 'none', height: '35px', padding: '0 10px', outline: 'none' }}
                                    />
                                </div>

                                <div style={{ borderBottom: '1px solid #000', padding: '10px' }}>
                                    <label style={{ display: 'block', fontSize: '13px', fontWeight: 'bold', marginBottom: '5px' }}>POSITION APPLIED:</label>
                                    <input
                                        type="text"
                                        name="doeaPosition"
                                        className="doea-boxed-input"
                                        value={formData.doeaPosition}
                                        onChange={handleInputChange}
                                        style={{ width: '100%', backgroundColor: '#fffbe6', border: 'none', height: '35px', padding: '0 10px', outline: 'none' }}
                                    />
                                </div>

                                <div style={{ padding: '10px' }}>
                                    <label style={{ display: 'block', fontSize: '13px', fontWeight: 'bold', marginBottom: '5px' }}>EMPLOYER:</label>
                                    <input
                                        type="text"
                                        name="doeaEmployer"
                                        className="doea-boxed-input"
                                        value={formData.doeaEmployer}
                                        onChange={handleInputChange}
                                        style={{ width: '100%', backgroundColor: '#fffbe6', border: 'none', height: '35px', padding: '0 10px', outline: 'none' }}
                                    />
                                    <p style={{ fontSize: '14px', fontWeight: 'bold', marginTop: '10px', marginBottom: 0 }}>
                                        It is the Employer’s responsibility to verify the authenticity and accuracy of any document provided for identification.
                                    </p>
                                </div>
                            </div>

                            {/* Exception Section (Dark Blue Border Box) */}
                            <div style={{ border: '2px solid #002e5d', padding: '20px', marginTop: '25px' }}>
                                <p style={{ fontSize: '14px', fontWeight: 'bold', marginBottom: '15px' }}>
                                    IF YOU ARE CLAIMING AN EXCEPTION TO BACKGROUND SCREENING, PURSUANT TO SECTION 430.0402(2) FLORIDA STATUTES, PROVIDE SUPPORTING DOCUMENTATION. Check one:
                                </p>

                                <div className="row">
                                    <div className="col-md-6 mb-3">
                                        <span style={{ fontSize: '14px' }}>Volunteer under 20 hours:</span>
                                        <input
                                            type="text"
                                            name="doeaVolunteerHours"
                                            className="doea-underline-input"
                                            value={formData.doeaVolunteerHours}
                                            onChange={handleInputChange}
                                            style={{ border: 'none', borderBottom: '1px solid #000', backgroundColor: '#fffbe6', width: '100px', marginLeft: '10px', outline: 'none', padding: '0 5px' }}
                                        />
                                    </div>
                                    <div className="col-md-6 mb-3">
                                        <span style={{ fontSize: '14px' }}>License Exception:</span>
                                        <input
                                            type="text"
                                            name="doeaLicenseException"
                                            className="doea-underline-input"
                                            value={formData.doeaLicenseException}
                                            onChange={handleInputChange}
                                            style={{ border: 'none', borderBottom: '1px solid #000', backgroundColor: '#fffbe6', width: '100px', marginLeft: '10px', outline: 'none', padding: '0 5px' }}
                                        />
                                    </div>
                                    <div className="col-12">
                                        <span style={{ fontSize: '14px' }}>Type of License:</span>
                                        <input
                                            type="text"
                                            name="doeaLicenseType"
                                            className="doea-underline-input"
                                            value={formData.doeaLicenseType}
                                            onChange={handleInputChange}
                                            style={{ border: 'none', borderBottom: '1px solid #000', backgroundColor: '#fffbe6', width: '300px', marginLeft: '10px', outline: 'none', padding: '0 5px' }}
                                        />
                                    </div>
                                </div>
                            </div>


                        </div>
                    )}
                    {currentStep === 9 && (
                        <div className="doea-form-container" style={{ maxWidth: '900px', margin: 'auto', color: '#000', padding: '20px' }}>

                            {/* Exemption Information Box */}
                            <div style={{ border: '1px solid #000', padding: '15px', marginBottom: '30px' }}>
                                <p style={{ fontSize: '14px', fontWeight: 'bold', marginBottom: '15px', textTransform: 'uppercase', lineHeight: '1.4' }}>
                                    IF THE APPLICANT HAS RECEIVED AN EXEMPTION FOR A DISQUALIFYING OFFENSE,
                                    PLEASE STATE WHICH AGENCY AND PROVIDE A COPY OF THE LETTER(S) GRANTING
                                    THAT EXEMPTION.
                                </p>

                                <div style={{ display: 'flex', alignItems: 'flex-end', marginBottom: '10px' }}>
                                    <label style={{ fontSize: '14px', whiteSpace: 'nowrap', marginRight: '10px' }}>Agency/Date</label>
                                    <input
                                        type="text"
                                        name="doeaExemptionAgencyDate"
                                        className="doea-underline-input"
                                        value={formData.doeaExemptionAgencyDate}
                                        onChange={handleInputChange}
                                        style={{ flex: 1, border: 'none', borderBottom: '1px solid #000', backgroundColor: '#fffbe6', padding: '2px 5px', outline: 'none' }}
                                    />
                                </div>

                                <div style={{ display: 'flex', alignItems: 'flex-end' }}>
                                    <label style={{ fontSize: '14px', whiteSpace: 'nowrap', marginRight: '10px' }}>If more than one Agency, please list:</label>
                                    <input
                                        type="text"
                                        name="doeaExemptionMultipleAgencies"
                                        className="doea-underline-input"
                                        value={formData.doeaExemptionMultipleAgencies}
                                        onChange={handleInputChange}
                                        style={{ flex: 1, border: 'none', borderBottom: '1px solid #000', backgroundColor: '#fffbe6', padding: '2px 5px', outline: 'none' }}
                                    />
                                </div>
                            </div>

                            {/* Offenses Review Notice Box */}
                            <div style={{ border: '1px solid #000', padding: '15px', textAlign: 'center', marginBottom: '40px' }}>
                                <p style={{ margin: 0, fontSize: '15px', fontWeight: 'bold', lineHeight: '1.4' }}>
                                    ALL APPLICANTS FOR THIS POSITION SHOULD REVIEW THE FOLLOWING<br />
                                    LIST OF OFFENSES BEFORE SIGNING THE ATTESTATION.
                                </p>
                            </div>

                            {/* Final Attestation Heading */}
                            <h2 style={{ fontSize: '18px', textAlign: 'center', marginBottom: '30px', fontWeight: 'bold', letterSpacing: '1px' }}>ATTESTATION</h2>

                            {/* Name Input within Text */}
                            <div style={{ marginBottom: '20px', lineHeight: '1.8' }}>
                                <span style={{ fontSize: '16px', fontWeight: 'bold' }}>UNDER PENALTY OF PERJURY, I,</span>
                                <input
                                    type="text"
                                    name="doeaFinalAffiantName"
                                    className="doea-underline-input"
                                    value={formData.doeaFinalAffiantName}
                                    onChange={handleInputChange}
                                    style={{
                                        border: 'none',
                                        borderBottom: '1px solid #000',
                                        backgroundColor: '#fffbe6',
                                        width: '60%',
                                        marginLeft: '10px',
                                        padding: '0 10px',
                                        outline: 'none',
                                        fontSize: '16px'
                                    }}
                                />
                                <span style={{ fontSize: '16px' }}>,</span>
                            </div>

                            <p style={{ fontSize: '15px', lineHeight: '1.6', marginBottom: '40px' }}>
                                hereby swear or affirm that I meet the requirements for qualifying for employment or service provider
                                pursuant to the background screening standards set forth in Chapter 435 and Section 430.0402
                                of the Florida Statutes. In addition, I have no current charges pending and I understand that I must
                                immediately inform my employer or designee if arrested for any of the following disqualifying
                                offenses throughout the time I am employed or otherwise providing services with this employer.
                            </p>

                            {/* Signature and Date Section */}
                            <div className="row" style={{ marginBottom: '40px' }}>
                                <div className="col-md-7">
                                    <div style={{ position: 'relative', borderBottom: '1px solid #000', backgroundColor: '#fffbe6' }}>
                                        <canvas
                                            ref={canvasRefs[9]}
                                            width={500}
                                            height={80}
                                            className="signature-canvas"
                                            style={{ width: '100%', height: '80px', cursor: 'crosshair' }}
                                            onMouseDown={startDrawing}
                                            onMouseMove={draw}
                                            onMouseUp={stopDrawing}
                                            onMouseLeave={stopDrawing}
                                            onTouchStart={startDrawing}
                                            onTouchMove={draw}
                                            onTouchEnd={stopDrawing}
                                        />
                                        <button
                                            type="button"
                                            onClick={clearSignature}
                                            style={{
                                                position: 'absolute',
                                                right: '5px',
                                                top: '5px',
                                                background: 'rgba(255,255,255,0.7)',
                                                border: '1px solid #ccc',
                                                borderRadius: '50%',
                                                width: '24px',
                                                height: '24px',
                                                cursor: 'pointer',
                                                fontSize: '12px'
                                            }}
                                        >
                                            ↻
                                        </button>
                                    </div>
                                    <label style={{ display: 'block', fontSize: '14px', marginTop: '8px' }}>Applicant Signature</label>
                                </div>

                                <div className="col-md-1"></div>

                                <div className="col-md-4">
                                    <input
                                        type="date"
                                        name="doeaAttestationDate"
                                        className="doea-underline-input"
                                        value={formData.doeaAttestationDate}
                                        onChange={handleInputChange}
                                        style={{
                                            width: '100%',
                                            border: 'none',
                                            borderBottom: '1px solid #000',
                                            backgroundColor: '#fffbe6',
                                            height: '80px',
                                            padding: '0 10px',
                                            outline: 'none',
                                            fontSize: '16px'
                                        }}
                                    />
                                    <label style={{ display: 'block', fontSize: '14px', marginTop: '8px' }}>Date</label>
                                </div>
                            </div>

                            {/* Note Section */}
                            <div style={{ marginBottom: '40px' }}>
                                <p style={{ fontSize: '15px', margin: 0 }}>
                                    <strong>NOTE TO EMPLOYER:</strong><br />
                                    Once the Attestation is signed, maintain it within the Applicant’s file.
                                </p>
                            </div>
                        </div>
                    )}
                    {currentStep === 10 && (
                        <div className="doea-form-container" style={{ maxWidth: '900px', margin: 'auto', color: '#000', padding: '20px' }}>

                            {/* Statutory Offense Table */}
                            <div style={{ border: '1px solid #000', marginBottom: '20px' }}>

                                {/* Table Header Section - Bright Yellow */}
                                <div style={{ display: 'flex', backgroundColor: '#ffff00', borderBottom: '1px solid #000' }}>
                                    <div style={{
                                        width: '20%',
                                        padding: '10px',
                                        borderRight: '1px solid #000',
                                        fontWeight: 'bold',
                                        fontSize: '12px',
                                        textAlign: 'center',
                                        display: 'flex',
                                        flexDirection: 'column',
                                        justifyContent: 'center'
                                    }}>
                                        FLORIDA STATUTE
                                        <span style={{ fontWeight: 'normal', fontSize: '10px' }}>(or any similar statute of another jurisdiction)</span>
                                    </div>
                                    <div style={{ width: '80%', padding: '10px', fontSize: '11px', lineHeight: '1.3' }}>
                                        <strong style={{ fontSize: '13px' }}>CHARGE/OFFENSE</strong><br />
                                        No person subject to the provisions of this section has an arrest awaiting final disposition for, has been
                                        found guilty of, regardless of adjudication, or entered a plea of nolo contendere (no contest) or guilty
                                        to, or has been adjudicated delinquent and the record has not been sealed or expunged for, any offense
                                        prohibited under any of the following provisions of state law or similar law of another jurisdiction:
                                    </div>
                                </div>

                                {/* Table Rows */}
                                {[
                                    { statute: "39.205", offense: "Relating to the failure to report child abuse, abandonment, or neglect." },
                                    { statute: "393.135", offense: "Relating to sexual misconduct with certain developmentally disabled clients and reporting of such sexual misconduct." },
                                    { statute: "394.4593", offense: "Relating to sexual misconduct with certain mental health patients and reporting of such sexual misconduct." },
                                    { statute: "409.920*", offense: "Relating to Medicaid provider fraud." },
                                    { statute: "409.9201*", offense: "Relating to Medicaid fraud." },
                                    { statute: "414.39", offense: "Relating to Fraud, if the offense was a felony." },
                                    { statute: "415.111", offense: "Relating to abuse, neglect, or exploitation of a vulnerable adult." },
                                    { statute: "741.28**", offense: "Relating to domestic." },
                                    { statute: "777.04", offense: "Relating to attempts, solicitation, and conspiracy to commit an offense listed in this subsection." },
                                    { statute: "782.04", offense: "Relating to murder." },
                                    { statute: "782.07", offense: "Relating to manslaughter, aggravated manslaughter of an elderly person or disabled adult, or aggravated manslaughter of a child." },
                                    { statute: "782.071", offense: "Relating to vehicular homicide." },
                                    { statute: "782.09", offense: "Relating to the killing of an unborn child by injury to the mother." },
                                    { statute: "784 – All", offense: "All of Chapter 784 offenses relating to assault, battery, and culpable negligence, if offense was a felony." },
                                    { statute: "784.011", offense: "Relating to assault, if the victim of the offence was a minor." },
                                    { statute: "784.021", offense: "Relating to aggravated assault." },
                                    { statute: "784.03", offense: "Relating to battery, if the victim of the offence was a minor." },
                                    { statute: "784.045", offense: "Relating to aggravated battery." },
                                    { statute: "784.075", offense: "Relating to battery on staff of a detention or commitment facility or on a juvenile probation officer." },
                                    { statute: "787.01", offense: "Relating to kidnapping." },
                                    { statute: "787.02", offense: "Relating to false imprisonment." },
                                    { statute: "787.025", offense: "Relating to luring or enticing a child." },
                                    { statute: "787.04(2)", offense: "Relating to taking, enticing, or removing a child beyond state limits with criminal intent pending custody proceedings." },
                                    { statute: "787.04(3)", offense: "Relating to carrying a child beyond the state lines with criminal intent to avoid producing a child at a custody hearing or delivering the child to the designated person." },
                                    { statute: "787.06", offense: "Relating to human trafficking." },
                                    { statute: "787.07", offense: "Relating to human smuggling." },
                                    { statute: "790.115(1)", offense: "Relating to exhibiting firearms or weapons within 1,000 feet of a school." }
                                ].map((item, index) => (
                                    <div key={index} style={{
                                        display: 'flex',
                                        borderBottom: index === 26 ? 'none' : '1px solid #000',
                                        minHeight: '30px'
                                    }}>
                                        <div style={{
                                            width: '20%',
                                            padding: '4px 10px',
                                            borderRight: '1px solid #000',
                                            fontSize: '13px',
                                            display: 'flex',
                                            alignItems: 'center'
                                        }}>
                                            {item.statute}
                                        </div>
                                        <div style={{
                                            width: '80%',
                                            padding: '4px 10px',
                                            fontSize: '13px',
                                            display: 'flex',
                                            alignItems: 'center'
                                        }}>
                                            {item.offense}
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}
                    {currentStep === 11 && (
                        <div className="doea-form-container" style={{ maxWidth: '900px', margin: 'auto', color: '#000', padding: '20px' }}>

                            {/* Statutory Offense Table - Continuation */}
                            <div style={{ border: '1px solid #000', marginBottom: '20px' }}>

                                {/* List Mapping from Image 31a974.png (Continuation) */}
                                {[
                                    { statute: "790.115(2)(b)", offense: "Relating to possessing an electric weapon or device, destructive device, or other weapon on school property." },
                                    { statute: "794.011", offense: "Relating to sexual battery." },
                                    { statute: "794.041", offense: "Relating to prohibited acts of persons in familial or custodial authority." },
                                    { statute: "794.05", offense: "Relating to unlawful sexual activity with certain minors." },
                                    { statute: "794.08", offense: "Relating to female genital mutilation." },
                                    { statute: "796 – All", offense: "All Chapter 796 offenses relating to prostitution." },
                                    { statute: "798.02", offense: "Relating to lewd and lascivious behavior." },
                                    { statute: "800 – All", offense: "All Chapter 800 relating to lewdness and indecent exposure and offenses against students by authority figures." },
                                    { statute: "806.01", offense: "Relating to arson." },
                                    { statute: "810.02", offense: "Relating to burglary." },
                                    { statute: "810.14", offense: "Relating to voyeurism, if the offense is a felony." },
                                    { statute: "810.145", offense: "Relating to video voyeurism, if the offense is a felony." },
                                    { statute: "812 – All", offense: "All Chapter 812 offenses relating to theft, robbery, and related crimes, if the offense was a felony." },
                                    { statute: "817.034*", offense: "Relating to fraudulent acts through mail, wire, radio, electromagnetic, photoelectronic, or photo-optical systems." },
                                    { statute: "817.234*", offense: "Relating to false and fraudulent insurance claims." },
                                    { statute: "817.505*", offense: "Relating to patient brokering." },
                                    { statute: "817.563", offense: "Relating to fraudulent sale of controlled substances, only if the offense was a felony." },
                                    { statute: "817.568*", offense: "Relating to criminal use of personal identification information." },
                                    { statute: "817.60*", offense: "Relating to obtaining a credit card through fraudulent means." },
                                    { statute: "817.61*", offense: "Relating to fraudulent use of credit cards, if the offense was a felony." },
                                    { statute: "825.102", offense: "Relating to abuse, aggravated abuse, or neglect of an elderly person or disabled adult." },
                                    { statute: "825.1025", offense: "Relating to lewd or lascivious offenses committed upon or in the presence of an elderly person or disabled adult." },
                                    { statute: "825.103", offense: "Relating to the exploitation of an elderly person or disabled adult, if the offense was a felony." },
                                    { statute: "826.04", offense: "Relating to incest." },
                                    { statute: "827.03", offense: "Relating to child abuse, aggravated child abuse, or neglect of a child." },
                                    { statute: "827.04", offense: "Relating to contributing to the delinquency or dependency of a child." },
                                    { statute: "827.05", offense: "Relating to negligent treatment of children." },
                                    { statute: "827.071", offense: "Relating to sexual performance by a child." },
                                    { statute: "831.311", offense: "Relating to the unlawful sale, manufacture, alteration, delivery, uttering, or possession of counterfeit-resistant prescription blanks for controlled substances." },
                                    { statute: "827.04", offense: "Relating to contributing to the delinquency or dependency of a child." },
                                    { statute: "831.01*", offense: "Relating to forgery." }
                                ].map((item, index) => (
                                    <div key={index} style={{
                                        display: 'flex',
                                        borderBottom: index === 30 ? 'none' : '1px solid #000',
                                        minHeight: '30px'
                                    }}>
                                        <div style={{
                                            width: '20%',
                                            padding: '4px 10px',
                                            borderRight: '1px solid #000',
                                            fontSize: '13px',
                                            display: 'flex',
                                            alignItems: 'center'
                                        }}>
                                            <span className="form-note">{item.statute}</span>
                                        </div>
                                        <div style={{
                                            width: '80%',
                                            padding: '4px 10px',
                                            fontSize: '13px',
                                            display: 'flex',
                                            alignItems: 'center'
                                        }}>
                                            <span className="form-note">{item.offense}</span>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}
                    {currentStep === 12 && (
                        <div className="doea-form-container" style={{ maxWidth: '900px', margin: 'auto', color: '#000', padding: '20px' }}>

                            {/* Final Statutory Offense Table Section */}
                            <div style={{ border: '1px solid #000', marginBottom: '20px' }}>

                                {/* List Mapping from image_cc1d80.png */}
                                {[
                                    { statute: "831.02*", offense: "Relating to uttering forged instruments." },
                                    { statute: "831.07*", offense: "Relating to forging bank bills, checks, drafts, or promissory notes." },
                                    { statute: "831.09*", offense: "Relating to uttering forged bank bills, checks." },
                                    { statute: "836.10", offense: "Relating to written or electronic threats to kill, do bodily injury, or conduct a mass shooting or an act of terrorism." },
                                    { statute: "843.01", offense: "Relating to resisting arrest with violence." },
                                    { statute: "843.025", offense: "Relating to depriving a law enforcement, correctional, or correctional probation officer means of protection or communication." },
                                    { statute: "843.12", offense: "Relating to aiding in an escape." },
                                    { statute: "843.13", offense: "Relating to aiding in the escape of juvenile inmates in correctional institutions." },
                                    { statute: "847 – All", offense: "All Chapter 847 offenses relating to obscene literature." },
                                    { statute: "859.01", offense: "Relating to poisoning food or water." },
                                    { statute: "873.01", offense: "Relating to the prohibition on the purchase or sale of human organs and tissue." },
                                    { statute: "874.05", offense: "Relating to encouraging or recruiting another to join a criminal gang." },
                                    { statute: "893 – All", offense: "All Chapter 893 offenses (all drug related offenses) relating to drug abuse prevention and control, only if the offense was a felony or if any other person involved in the offense was a minor." },
                                    { statute: "916.1075", offense: "Relating to sexual misconduct with certain forensic clients and reporting of such sexual misconduct." },
                                    { statute: "944.35(3)", offense: "Relating to inflicting cruel or inhuman treatment on an inmate resulting in great bodily harm." },
                                    { statute: "944.40", offense: "Relating to escape." },
                                    { statute: "944.46", offense: "Relating to harboring, concealing, or aiding an escaped prisoner." },
                                    { statute: "944.47", offense: "Relating to introduction of contraband into a correctional facility." },
                                    { statute: "985.701", offense: "Relating to sexual misconduct in juvenile justice programs." },
                                    { statute: "985.711", offense: "Relating to contraband introduced into detention facilities." }
                                ].map((item, index) => (
                                    <div key={index} style={{
                                        display: 'flex',
                                        borderBottom: index === 19 ? 'none' : '1px solid #000',
                                        minHeight: '30px'
                                    }}>
                                        <div style={{
                                            width: '20%',
                                            padding: '4px 10px',
                                            borderRight: '1px solid #000',
                                            fontSize: '13px',
                                            display: 'flex',
                                            alignItems: 'center'
                                        }}>
                                            <span className="form-note">{item.statute}</span>
                                        </div>
                                        <div style={{
                                            width: '80%',
                                            padding: '4px 10px',
                                            fontSize: '13px',
                                            display: 'flex',
                                            alignItems: 'center'
                                        }}>
                                            <span className="form-note">{item.offense}</span>
                                        </div>
                                    </div>
                                ))}
                            </div>

                            {/* Statutory Footnotes */}
                            <div style={{ marginTop: '10px', marginBottom: '20px' }}>
                                <p style={{ fontSize: '12px', margin: '2px 0' }}>
                                    * These offenses are disqualifying only if the applicant is working with the Medicaid program.
                                </p>
                                <p style={{ fontSize: '12px', margin: '2px 0' }}>
                                    ** These offenses are disqualifying only if the applicant is working with children or the elderly.
                                </p>
                            </div>
                        </div>
                    )}
                    {currentStep === 13 && (
                        <>
                            <div className="form-section">
                                <h1 className="form-title">BACKGROUND CHECK AUTHORIZATION</h1>

                                <p className="form-note">
                                    I voluntarily consent to and authorize <b>QUALCARE NURSE REGISTRY</b>, here in referred to as Registry,
                                    and or their assigned agents, associates, or consumer reporting agencies to request and receive any
                                    criminal background reports, consumer reports, investigative consumer reports containing information
                                    as to my character, general reputation, personal characteristics and mode of living, or information
                                    concerning me as part of the pre-employment background review process.
                                </p>

                                <p className="form-note">
                                    Reports requested may include any of the following: Law Enforcement Records, Criminal Records, Civil
                                    Records, Motor Vehicle / Driving Records, Credential Verification, Employment Verifications, Past
                                    Employment Verifications, Education Verifications, Reference Checks, Military Service Verifications,
                                    and Consumer Credit Reports in accordance with the provisions of the Fair Credit Reporting Act and
                                    similar state laws.
                                </p>

                                <p className="form-note">
                                    I authorize any persons, organizations, companies, corporations, consumer reporting agencies, courts
                                    of law, licensing agencies, schools, and any current or past employer to furnish Registry and or their
                                    assigned agents, associates or consumer reporting agencies with any and all information concerning me.
                                </p>

                                <p className="form-note">
                                    I further agree to release Registry and or their assigned agents, associates, or consumer reporting
                                    agencies and all persons and organizations providing information from any and all claims, liability
                                    and responsibility arising out of the release of such information in connection with this research.
                                </p>

                                <p className="form-note">
                                    This authorization shall remain on file and shall serve as an ongoing authorization for Registry to
                                    procure criminal records, consumer reports, including investigative consumer reports, at any time
                                    during the contracting period.
                                </p>

                                <p className="form-note">
                                    By signing below, I hereby release Registry, its employees, agents, and all persons, agencies and
                                    entities providing information or reports about me from any and all liability arising out of the
                                    release of any such information or reports.
                                </p>

                                <p className="form-note">
                                    I understand that if an adverse decision on my application for employment is made based in whole or
                                    in part on information contained in any consumer report, I will be informed.
                                </p>

                                <p className="form-note">
                                    I will also be provided an opportunity to obtain a copy of that consumer report and to dispute any
                                    inaccurate or incomplete information.
                                </p>

                                <p className="form-note">
                                    I agree that a photocopy, facsimile, or other electronic forms of this information can be furnished
                                    to Registry, and that it will have the same authority and authenticity as the original.
                                </p>

                                <p className="form-note">
                                    I also understand that any misrepresentation, falsification or omission of facts herein may be
                                    considered cause for rescinding an offer of employment, termination of employment, or denial of
                                    consideration for future employment.
                                </p>
                            </div>
                            <div className="form-section">
                                <div className="row align-items-center">
                                    <div className="form-field col-md-6">
                                        <label className="section-label">SIGNATURE <span className="required">*</span></label>

                                        <div className="signature-pad-container">
                                            <canvas
                                                ref={canvasRefs[13]}
                                                width={1000}
                                                height={200}
                                                className="signature-canvas"
                                                onMouseDown={startDrawing}
                                                onMouseMove={draw}
                                                onMouseUp={stopDrawing}
                                                onMouseLeave={stopDrawing}
                                                onTouchStart={startDrawing}
                                                onTouchMove={draw}
                                                onTouchEnd={stopDrawing}
                                            />
                                            <button
                                                type="button"
                                                className="clear-signature-btn"
                                                onClick={clearSignature}
                                            >
                                                ↻
                                            </button>
                                        </div>
                                    </div>

                                    <div className="form-field col-md-3">
                                        <label className="section-label">TITLE</label>
                                        <input
                                            type="text"
                                            name="backgroundTitle"
                                            value={formData.backgroundTitle}
                                            onChange={handleInputChange}
                                        />
                                    </div>

                                    <div className="form-field col-md-3">
                                        <label className="section-label">DATE <span className="required">*</span></label>
                                        <input
                                            type="date"
                                            name="backgroundDate"
                                            value={formData.backgroundDate}
                                            onChange={handleInputChange}
                                            required
                                        />
                                    </div>
                                </div>
                            </div>
                            <div className="form-section">
                                <div className="form-field">
                                    <label className="section-label">
                                        OTHER NAMES UNDER WHICH PREVIOUSLY EMPLOYED (PRINT NAME)
                                    </label>
                                    <input
                                        type="text"
                                        name="previousNames"
                                        value={formData.previousNames}
                                        onChange={handleInputChange}
                                    />
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
                            <button
                                type="button"
                                className="btn-next"
                                onClick={handleNext}
                                disabled={savingStep}
                            >
                                {savingStep ? 'Saving...' : 'Save & Next'}
                            </button>
                        ) : (
                            <button
                                type="submit"
                                className="btn-next"
                                disabled={savingStep}
                            >
                                {savingStep ? 'Submitting...' : 'Submit'}
                            </button>
                        )}
                    </div>
                </form>
            </div>
        </div>

    );
};

export default FinalApplicationForm2;
import React, { useEffect, useRef, useState, useCallback } from 'react';

import './ApplicationForm.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useDispatch, useSelector } from 'react-redux';
import * as types from '../../redux/type';
const STEP_NAME_MAP = {
    1: 'employee_application_part1',
    2: 'employee_application_part2',
    3: 'reference_check',
    4: 'paycheck_policy',
    5: 'disciplinary_action',
    6: 'safety_policy',
    7: 'patient_abandonment',
    8: 'confidentiality_statement',
    9: 'contractor_agreement',
    10: 'non_discrimination',
    11: 'health_questionnaire',
    12: 'infection_control',
    13: 'policy_statement',
};

// Fields mapping for each step
const STEP_FIELDS_MAP = {
    1: ['hr_contractor_name', 'hr_role_RN', 'hr_role_LPN', 'hr_role_CNA', 'hr_role_HHA',
        'hr_doc_0', 'hr_doc_1', 'hr_doc_2', 'hr_doc_3', 'hr_doc_4', 'hr_doc_5', 'hr_doc_6',
        'hr_doc_7', 'hr_doc_8', 'hr_doc_9', 'hr_doc_10', 'hr_doc_11', 'hr_doc_12',
        'hr_inservice_0', 'hr_inservice_1', 'hr_inservice_2', 'hr_inservice_3', 'hr_inservice_4',
        'hr_inservice_5', 'hr_inservice_6', 'hr_inservice_7', 'hr_inservice_8', 'hr_inservice_9',
        'hr_inservice_10', 'hr_inservice_11', 'hr_inservice_12', 'hr_inservice_13'],
    
    2: ['lastName', 'firstName', 'dob', 'ssn', 'presentAddress', 'presentCity', 'presentState', 'presentZip',
        'permanentAddress', 'permanentCity', 'permanentState', 'permanentZip', 'homePhone', 'cellPhone',
        'otherPhone', 'email', 'referredBy', 'positionRN', 'positionLPN', 'positionCNA', 'positionHHA',
        'positionCompanion', 'dateCanStart', 'contractCompensation', 'licenseNumber', 'licenseExpiration',
        'employedNow', 'mayInquire', 'contractedBefore', 'whenContracted', 'unemployed', 'goingToSchool',
        'languageEnglish', 'languageSpanish', 'languageOther', 'emergencyName', 'emergencyRelationship',
        'emergencyAddress', 'emergencyPhone', 'emergencyAltPhone'],
    
    3: ['expAlzheimers', 'expStroke', 'expCatheter', 'expDementia', 'expHIV', 'expWheelchair',
        'expBedridden', 'expLiftingPatients', 'expBrokenHip', 'expBypassSurgery', 'expFeedingTubes',
        'expBreathingTreatments', 'expHearingVision', 'expCancer', 'expDiabeticDiet', 'expKosherDiet',
        'expLowSaltDiet', 'expDehydration', 'expConstipation', 'expIncontinence', 'expHeartProblems',
        'liveInWeekdays', 'liveOutWeekdays', 'liveInWeekends', 'liveOutWeekends', 'driversLicense',
        'ownCar', 'fullTime', 'partTime', 'days', 'nights', 'ref1Name', 'ref1Address', 'ref1Phone',
        'ref1Business', 'ref1Years', 'ref2Name', 'ref2Address', 'ref2Phone', 'ref2Business', 'ref2Years',
        'ref3Name', 'ref3Address', 'ref3Phone', 'ref3Business', 'ref3Years', 'grammarSchoolName',
        'grammarSchoolLocation', 'grammarSchoolYears', 'grammarSchoolGraduated', 'grammarSchoolSubject',
        'highSchoolName', 'highSchoolLocation', 'highSchoolYears', 'highSchoolGraduated', 'highSchoolSubject',
        'collegeName', 'collegeLocation', 'collegeYears', 'collegeGraduated', 'collegeSubject',
        'additionalEdu1', 'additionalEdu2', 'additionalEdu3', 'additionalEdu4', 'additionalEdu5',
        'employer0From', 'employer0To', 'employer0Name', 'employer0Earnings', 'employer0Position', 'employer0Reason',
        'employer1From', 'employer1To', 'employer1Name', 'employer1Earnings', 'employer1Position', 'employer1Reason',
        'employer2From', 'employer2To', 'employer2Name', 'employer2Earnings', 'employer2Position', 'employer2Reason',
        'employer3From', 'employer3To', 'employer3Name', 'employer3Earnings', 'employer3Position', 'employer3Reason',
        'authDate', 'authSignature', 'authPrintName', 'mondayFrom', 'mondayTo', 'mondayOvernight',
        'tuesdayFrom', 'tuesdayTo', 'tuesdayOvernight', 'wednesdayFrom', 'wednesdayTo', 'wednesdayOvernight',
        'thursdayFrom', 'thursdayTo', 'thursdayOvernight', 'fridayFrom', 'fridayTo', 'fridayOvernight',
        'saturdayFrom', 'saturdayTo', 'saturdayOvernight', 'sundayFrom', 'sundayTo', 'sundayOvernight'],
    
    4: ['lastManager', 'referenceDate', 'organization', 'address', 'phone', 'fax', 'positionApplied',
        'lengthFrom', 'lengthTo', 'rn', 'reasonLeaving', 'eligibleRehire', 'abilityFollowInstructions',
        'professionalDress', 'willingnessResponsibility', 'skillsProficiency', 'overallPerformance',
        'reliabilityAttendance', 'teamwork', 'qualityOfWork', 'jobKnowledge', 'additionalComments',
        'printName', 'dateSignature', 'positionTitle'],
    
    5: ['paycheckPreference', 'paycheckMailName', 'paycheckMailAddress', 'paycheckMailCity', 'paycheckMailZip',
        'acknowledgementName', 'paycheckPolicyTitle', 'paycheckPolicyDate'],
    
    6: ['disciplinaryTitle', 'disciplinaryDate'],
    7: ['safetyPolicyTitle', 'safetyPolicyDate'],
    8: ['dressCodeTitle', 'dressCodeDate'],
    9: ['confidentialityStatementDate'],
    10: ['contractorAgreementDate'],
    11: ['nonDiscriminationDate'],
    12: ['contractorNameHealth', 'contractorSSN', 'healthHeight', 'healthWeight', 'healthTitle', 'healthDate'],
    13: ['infectionControlTitle', 'infectionControlDate'],
    14: ['policyTitle', 'policyDate'],
};
const FinalApplicationForm = ({ formType = 'final_5' }) => {
        const dispatch = useDispatch();
    const { savingStep, stepSaveSuccess, formProgress, error } = useSelector(
        state => state.applicationReducer
    );
    
    const [submittedStep, setSubmittedStep] = useState(null);
const today = new Date().toISOString().split("T")[0];
    const steps = [
        "Employee Application",
        "Employee Application",
        "Reference Check",
        "PayCheck Policy",
        "Company Disciplinary",
        "Safety And Policy",
        "Patient Abandonment",
        "Confidentiality Statement",
        "Contractor Agreement",
        "Discrimination Policy",
        "Company Disciplinary",
        "Infection Control",
        "Policy Statement"
    ];

    const [currentStep, setCurrentStep] = useState(1);
    const [isDrawing, setIsDrawing] = useState(false);
        const signatureRef = useRef(null);
    const healthSignatureRef = useRef(null);
    const policySignatureRef = useRef(null);
    
    const progressWidth = (currentStep / steps.length) * 100;
    
    // Get current form progress for this form type
    const currentFormProgress = formProgress?.[formType] || null;
    const [formData, setFormData] = useState({

        // Dynamic fields for docs and in-services will be handled via the mapping
        
        // Step 2-3: Employee Application fields
        lastName: '', firstName: '', dob: '', ssn: '', presentAddress: '', presentCity: '', presentState: '', presentZip: '',
        permanentAddress: '', permanentCity: '', permanentState: '', permanentZip: '', homePhone: '', cellPhone: '',
        otherPhone: '', email: '', referredBy: '', positionRN: false, positionLPN: false, positionCNA: false,
        positionHHA: false, positionCompanion: false, dateCanStart: '', contractCompensation: '', licenseNumber: '',
        licenseExpiration: '', employedNow: '', mayInquire: '', contractedBefore: '', whenContracted: '', unemployed: '',
        goingToSchool: '', languageEnglish: false, languageSpanish: false, languageOther: false, emergencyName: '',
        emergencyRelationship: '', emergencyAddress: '', emergencyPhone: '', emergencyAltPhone: '',
        
        // Experience and availability fields
        expAlzheimers: false, expStroke: false, expCatheter: false, expDementia: false, expHIV: false,
        expWheelchair: false, expBedridden: false, expLiftingPatients: false, expBrokenHip: false,
        expBypassSurgery: false, expFeedingTubes: false, expBreathingTreatments: false, expHearingVision: false,
        expCancer: false, expDiabeticDiet: false, expKosherDiet: false, expLowSaltDiet: false, expDehydration: false,
        expConstipation: false, expIncontinence: false, expHeartProblems: false,
        liveInWeekdays: false, liveOutWeekdays: false, liveInWeekends: false, liveOutWeekends: false,
        driversLicense: '', ownCar: '', fullTime: false, partTime: false, days: false, nights: false,
        
        // References
        ref1Name: '', ref1Address: '', ref1Phone: '', ref1Business: '', ref1Years: '',
        ref2Name: '', ref2Address: '', ref2Phone: '', ref2Business: '', ref2Years: '',
        ref3Name: '', ref3Address: '', ref3Phone: '', ref3Business: '', ref3Years: '',
        
        // Education
        grammarSchoolName: '', grammarSchoolLocation: '', grammarSchoolYears: '', grammarSchoolGraduated: '', grammarSchoolSubject: '',
        highSchoolName: '', highSchoolLocation: '', highSchoolYears: '', highSchoolGraduated: '', highSchoolSubject: '',
        collegeName: '', collegeLocation: '', collegeYears: '', collegeGraduated: '', collegeSubject: '',
        additionalEdu1: '', additionalEdu2: '', additionalEdu3: '', additionalEdu4: '', additionalEdu5: '',
        
        // Employers
        employer0From: '', employer0To: '', employer0Name: '', employer0Earnings: '', employer0Position: '', employer0Reason: '',
        employer1From: '', employer1To: '', employer1Name: '', employer1Earnings: '', employer1Position: '', employer1Reason: '',
        employer2From: '', employer2To: '', employer2Name: '', employer2Earnings: '', employer2Position: '', employer2Reason: '',
        employer3From: '', employer3To: '', employer3Name: '', employer3Earnings: '', employer3Position: '', employer3Reason: '',
        
        // Authorization
        authDate: today, authSignature: '', authPrintName: '',
        
        // Availability Schedule
        mondayFrom: '', mondayTo: '', mondayOvernight: '', tuesdayFrom: '', tuesdayTo: '', tuesdayOvernight: '',
        wednesdayFrom: '', wednesdayTo: '', wednesdayOvernight: '', thursdayFrom: '', thursdayTo: '', thursdayOvernight: '',
        fridayFrom: '', fridayTo: '', fridayOvernight: '', saturdayFrom: '', saturdayTo: '', saturdayOvernight: '',
        sundayFrom: '', sundayTo: '', sundayOvernight: '',
        
        // Step 4: Reference Check
        lastManager: '', referenceDate: today, organization: '', address: '', phone: '', fax: '', positionApplied: '',
        lengthFrom: '', lengthTo: '', rn: '', reasonLeaving: '', eligibleRehire: '',
        abilityFollowInstructions: '', professionalDress: '', willingnessResponsibility: '', skillsProficiency: '',
        overallPerformance: '', reliabilityAttendance: '', teamwork: '', qualityOfWork: '', jobKnowledge: '',
        additionalComments: '', printName: '', dateSignature: today, positionTitle: '',
        
        // Step 5: Paycheck Policy
        paycheckPreference: '', paycheckMailName: '', paycheckMailAddress: '', paycheckMailCity: '', paycheckMailZip: '',
        acknowledgementName: '', paycheckPolicyTitle: '', paycheckPolicyDate: today,
        
        // Step 6: Disciplinary Action
        disciplinaryTitle: '', disciplinaryDate: today,
        
        // Step 7: Safety Policy
        safetyPolicyTitle: '', safetyPolicyDate: today,
        
        // Step 8: Patient Abandonment / Dress Code
        dressCodeTitle: '', dressCodeDate: today,
        
        // Step 9: Confidentiality Statement
        confidentialityStatementDate: today,
        
        // Step 10: Contractor Agreement
        contractorAgreementDate: today,
        
        // Step 11: Non-Discrimination
        nonDiscriminationDate: today,
        
        // Step 12: Health Questionnaire
        contractorNameHealth: '', contractorSSN: '', healthHeight: '', healthWeight: '', healthTitle: '', healthDate: today,
        
        // Step 13: Infection Control
        infectionControlTitle: '', infectionControlDate: today,
        
        // Step 14: Policy Statement
        policyTitle: '', policyDate: today,
    });
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

    const onNext = () => {
        setCurrentStep(prev => Math.min(prev + 1, steps.length));
        window.scrollTo({
            top: 0,
            behavior: "smooth"
        });
    };
    const handleNext = useCallback((e) => {
        e.preventDefault();
        if (savingStep) return;
        
        const referenceId = localStorage.getItem('applicationReferenceId');
        const stepName = STEP_NAME_MAP[currentStep];
        const stepNumber = currentStep;
        
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
        
        // Get signature for steps that need it
        let signatureData = null;
        if ([4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14].includes(currentStep)) {
            let activeRef = signatureRef;
            if (currentStep === 12) activeRef = healthSignatureRef;
            if (currentStep === 14) activeRef = policySignatureRef;
            signatureData = getSignatureData(activeRef);
        }
        
        console.log(`Step ${currentStep}: Sending ${Object.keys(formDataToSend).length} fields`);
        
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
        
        const signatureData = getSignatureData(policySignatureRef);
        
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
        const getCanvasRefForStep = () => {
        if (currentStep === 12) return healthSignatureRef;
        if (currentStep === 14) return policySignatureRef;
        return signatureRef;
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
    const stopDrawing = () => setIsDrawing(false);
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
    const clearSignature = (canvasRef) => {
        const canvas = canvasRef?.current;
        if (!canvas) return;
        const ctx = canvas.getContext('2d');
        ctx.clearRect(0, 0, canvas.width, canvas.height);
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


    const handleInputChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: type === 'checkbox' ? checked : value
        }));
    };




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



                {/* Progress Bar */}
<div className="progress-bar">
                    <div className="progress-text">Step {currentStep} of {steps.length}</div>
                    <div className="progress-track">
                        <div className="progress-fill" style={{ width: `${progressWidth}%` }}></div>
                    </div>
                </div>

                <p className="required-note"><span className="required">*</span> indicates required fields</p>
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
                                <h1 className="form-title">PERSONAL INFORMATION:</h1>

                                <div className="row">
                                    <div className="form-field col-md-3">
                                        <label className="section-label">NAME (LAST) <span className="required">*</span></label>
                                        <input
                                            type="text"
                                            name="lastName"
                                            value={formData.lastName}
                                            onChange={handleInputChange}
                                            required
                                        />
                                    </div>
                                    <div className="form-field col-md-3">
                                        <label className="section-label">NAME (FIRST) <span className="required">*</span></label>
                                        <input
                                            type="text"
                                            name="firstName"
                                            value={formData.firstName}
                                            onChange={handleInputChange}
                                            required
                                        />
                                    </div>
                                    <div className="form-field col-md-3">
                                        <label className="section-label">DOB <span className="required">*</span></label>
                                        <input
                                            type="date"
                                            name="dob"
                                            value={formData.dob}
                                            onChange={handleInputChange}
                                            required
                                        />
                                    </div>
                                    <div className="form-field col-md-3">
                                        <label className="section-label">SSN <span className="required">*</span></label>
                                        <input
                                            type="text"
                                            name="ssn"
                                            value={formData.ssn}
                                            onChange={handleInputChange}
                                            required
                                        />
                                    </div>
                                </div>

                                <div className="row">


                                    <div className="form-field col-md-3">
                                        <label className="section-label">PRESENT ADDRESS <span className="required">*</span></label>
                                        <input
                                            type="text"
                                            name="presentAddress"
                                            value={formData.presentAddress}
                                            onChange={handleInputChange}
                                            required
                                        />
                                    </div>
                                    <div className="form-field col-md-3">
                                        <label className="section-label">CITY <span className="required">*</span></label>
                                        <input
                                            type="text"
                                            name="presentCity"
                                            value={formData.presentCity}
                                            onChange={handleInputChange}
                                            required
                                        />
                                    </div>
                                    <div className="form-field col-md-3">
                                        <label className="section-label">STATE <span className="required">*</span></label>
                                        <input
                                            type="text"
                                            name="presentState"
                                            value={formData.presentState}
                                            onChange={handleInputChange}
                                            required
                                        />
                                    </div>
                                    <div className="form-field col-md-3">
                                        <label className="section-label">ZIP <span className="required">*</span></label>
                                        <input
                                            type="text"
                                            name="presentZip"
                                            value={formData.presentZip}
                                            onChange={handleInputChange}
                                            required
                                        />
                                    </div>
                                </div>

                                <div className="row">
                                    <div className="form-field col-md-3">
                                        <label className="section-label">PERMANENT ADDRESS</label>
                                        <input
                                            type="text"
                                            name="permanentAddress"
                                            value={formData.permanentAddress}
                                            onChange={handleInputChange}
                                        />
                                    </div>
                                    <div className="form-field col-md-3">
                                        <label className="section-label">CITY</label>
                                        <input
                                            type="text"
                                            name="permanentCity"
                                            value={formData.permanentCity}
                                            onChange={handleInputChange}
                                        />
                                    </div>
                                    <div className="form-field col-md-3">
                                        <label className="section-label">STATE</label>
                                        <input
                                            type="text"
                                            name="permanentState"
                                            value={formData.permanentState}
                                            onChange={handleInputChange}
                                        />
                                    </div>
                                    <div className="form-field col-md-3">
                                        <label className="section-label">ZIP</label>
                                        <input
                                            type="text"
                                            name="permanentZip"
                                            value={formData.permanentZip}
                                            onChange={handleInputChange}
                                        />
                                    </div>
                                </div>


                                <div className="row">
                                    <div className="form-field col-md-4">
                                        <label className="section-label">HOME PHONE</label>
                                        <input
                                            type="tel"
                                            name="homePhone"
                                            value={formData.homePhone}
                                            onChange={handleInputChange}
                                        />
                                    </div>
                                    <div className="form-field col-md-4">
                                        <label className="section-label">CELL # <span className="required">*</span></label>
                                        <input
                                            type="tel"
                                            name="cellPhone"
                                            value={formData.cellPhone}
                                            onChange={handleInputChange}
                                            required
                                        />
                                    </div>
                                    <div className="form-field col-md-4">
                                        <label className="section-label">OTHER #</label>
                                        <input
                                            type="tel"
                                            name="otherPhone"
                                            value={formData.otherPhone}
                                            onChange={handleInputChange}
                                        />
                                    </div>
                                </div>

                                <div className="form-row">
                                    <div className="form-field">
                                        <label className="section-label">EMAIL <span className="required">*</span></label>
                                        <input
                                            type="email"
                                            name="email"
                                            value={formData.email}
                                            onChange={handleInputChange}
                                            required
                                        />
                                    </div>
                                    <div className="form-field">
                                        <label className="section-label">REFERRED BY</label>
                                        <input
                                            type="text"
                                            name="referredBy"
                                            value={formData.referredBy}
                                            onChange={handleInputChange}
                                        />
                                    </div>
                                </div>
                            </div>

                            <div className="form-section">
                                <h1 className="form-title">CONTRACT POSITION DESIRED:</h1>

                                <div className="mb-3">
                                    <label className="form-check form-check-inline">
                                        <input
                                            className="form-check-input"
                                            type="checkbox"
                                            name="positionRN"
                                            checked={formData.positionRN}
                                            onChange={handleInputChange}
                                        />
                                        <span className="form-check-label">RN</span>
                                    </label>

                                    <label className="form-check form-check-inline">
                                        <input
                                            className="form-check-input"
                                            type="checkbox"
                                            name="positionLPN"
                                            checked={formData.positionLPN}
                                            onChange={handleInputChange}
                                        />
                                        <span className="form-check-label">LPN</span>
                                    </label>

                                    <label className="form-check form-check-inline">
                                        <input
                                            className="form-check-input"
                                            type="checkbox"
                                            name="positionCNA"
                                            checked={formData.positionCNA}
                                            onChange={handleInputChange}
                                        />
                                        <span className="form-check-label">CNA</span>
                                    </label>

                                    <label className="form-check form-check-inline">
                                        <input
                                            className="form-check-input"
                                            type="checkbox"
                                            name="positionHHA"
                                            checked={formData.positionHHA}
                                            onChange={handleInputChange}
                                        />
                                        <span className="form-check-label">HHA</span>
                                    </label>

                                    <label className="form-check form-check-inline">
                                        <input
                                            className="form-check-input"
                                            type="checkbox"
                                            name="positionCompanion"
                                            checked={formData.positionCompanion}
                                            onChange={handleInputChange}
                                        />
                                        <span className="form-check-label">COMPANION/HOMEMAKER</span>
                                    </label>
                                </div>


                                <div className="row">
                                    <div className="form-field col-md-6">
                                        <label className="section-label">DATE YOU CAN START</label>
                                        <input
                                            type="date"
                                            name="dateCanStart"
                                            value={formData.dateCanStart}
                                            onChange={handleInputChange}
                                        />
                                    </div>
                                    <div className="form-field col-md-6">
                                        <label className="section-label">CONTRACT COMPENSATION DESIRED</label>
                                        <input
                                            type="text"
                                            name="contractCompensation"
                                            value={formData.contractCompensation}
                                            onChange={handleInputChange}
                                        />
                                    </div>

                                </div>

                                <div className="row">
                                    <div className="form-field col-md-4">
                                        <label className="section-label">Other</label>
                                        <input
                                            type="text"
                                            name="licenseOther"
                                            value={formData.licenseOther}
                                            onChange={handleInputChange}
                                        />
                                    </div>
                                    <div className="form-field col-md-4">
                                        <label className="section-label">LICENSE/CERTIFICATE #</label>
                                        <input
                                            type="text"
                                            name="licenseNumber"
                                            value={formData.licenseNumber}
                                            onChange={handleInputChange}
                                        />
                                    </div>
                                    <div className="form-field col-md-4">
                                        <label className="section-label">LICENSE EXPIRATION DATE</label>
                                        <input
                                            type="date"
                                            name="licenseExpiration"
                                            value={formData.licenseExpiration}
                                            onChange={handleInputChange}
                                        />
                                    </div>
                                </div>

                                <div className="form-row">
                                    <div className="form-field">
                                        <label className="section-label">ARE YOU EMPLOYED/CONTRACTED NOW?</label>
                                        <div className="radio-group">
                                            <label className="radio-label">
                                                <input
                                                    type="radio"
                                                    name="employedNow"
                                                    value="yes"
                                                    checked={formData.employedNow === 'yes'}
                                                    onChange={handleInputChange}
                                                />
                                                <span>YES</span>
                                            </label>
                                            <label className="radio-label">
                                                <input
                                                    type="radio"
                                                    name="employedNow"
                                                    value="no"
                                                    checked={formData.employedNow === 'no'}
                                                    onChange={handleInputChange}
                                                />
                                                <span>NO</span>
                                            </label>
                                        </div>
                                    </div>
                                    <div className="form-field">
                                        <label className="section-label">IF SO, MAY WE INQUIRE OF YOUR PRESENT POSITION?</label>
                                        <div className="radio-group">
                                            <label className="radio-label">
                                                <input
                                                    type="radio"
                                                    name="mayInquire"
                                                    value="yes"
                                                    checked={formData.mayInquire === 'yes'}
                                                    onChange={handleInputChange}
                                                />
                                                <span>YES</span>
                                            </label>
                                            <label className="radio-label">
                                                <input
                                                    type="radio"
                                                    name="mayInquire"
                                                    value="no"
                                                    checked={formData.mayInquire === 'no'}
                                                    onChange={handleInputChange}
                                                />
                                                <span>NO</span>
                                            </label>
                                        </div>
                                    </div>
                                </div>

                                <div className="form-row">
                                    <div className="form-field">
                                        <label className="section-label">DID YOU CONTRACT WITH THIS REGISTRY BEFORE?</label>
                                        <div className="radio-group">
                                            <label className="radio-label">
                                                <input
                                                    type="radio"
                                                    name="contractedBefore"
                                                    value="yes"
                                                    checked={formData.contractedBefore === 'yes'}
                                                    onChange={handleInputChange}
                                                />
                                                <span>YES</span>
                                            </label>
                                            <label className="radio-label">
                                                <input
                                                    type="radio"
                                                    name="contractedBefore"
                                                    value="no"
                                                    checked={formData.contractedBefore === 'no'}
                                                    onChange={handleInputChange}
                                                />
                                                <span>NO</span>
                                            </label>
                                        </div>
                                    </div>
                                    <div className="form-field">
                                        <label className="section-label">WHEN?</label>
                                        <input
                                            type="text"
                                            name="whenContracted"
                                            value={formData.whenContracted}
                                            onChange={handleInputChange}
                                        />
                                    </div>
                                </div>

                                <div className="form-row">
                                    <div className="form-field">
                                        <label className="section-label">ARE YOU UNEMPLOYED?</label>
                                        <div className="radio-group">
                                            <label className="radio-label">
                                                <input
                                                    type="radio"
                                                    name="unemployed"
                                                    value="yes"
                                                    checked={formData.unemployed === 'yes'}
                                                    onChange={handleInputChange}
                                                />
                                                <span>YES</span>
                                            </label>
                                            <label className="radio-label">
                                                <input
                                                    type="radio"
                                                    name="unemployed"
                                                    value="no"
                                                    checked={formData.unemployed === 'no'}
                                                    onChange={handleInputChange}
                                                />
                                                <span>NO</span>
                                            </label>
                                        </div>
                                    </div>
                                    <div className="form-field">
                                        <label className="section-label">ARE YOU GOING TO SCHOOL?</label>
                                        <div className="radio-group">
                                            <label className="radio-label">
                                                <input
                                                    type="radio"
                                                    name="goingToSchool"
                                                    value="yes"
                                                    checked={formData.goingToSchool === 'yes'}
                                                    onChange={handleInputChange}
                                                />
                                                <span>YES</span>
                                            </label>
                                            <label className="radio-label">
                                                <input
                                                    type="radio"
                                                    name="goingToSchool"
                                                    value="no"
                                                    checked={formData.goingToSchool === 'no'}
                                                    onChange={handleInputChange}
                                                />
                                                <span>NO</span>
                                            </label>
                                        </div>
                                    </div>
                                </div>

                                <div className="form-row">
                                    <label className="section-label">WHAT LANGUAGES CAN YOU SPEAK FLUENTLY?</label>
                                    <div className="mb-3 form-section">
                                        <label className="form-check form-check-inline">
                                            <input
                                                className="form-check-input"
                                                type="checkbox"
                                                name="languageEnglish"
                                                checked={formData.languageEnglish}
                                                onChange={handleInputChange}
                                            />
                                            <span className="form-check-label">ENGLISH</span>
                                        </label>

                                        <label className="form-check form-check-inline">
                                            <input
                                                className="form-check-input"
                                                type="checkbox"
                                                name="languageSpanish"
                                                checked={formData.languageSpanish}
                                                onChange={handleInputChange}
                                            />
                                            <span className="form-check-label">SPANISH</span>
                                        </label>




                                        <label className="form-check form-check-inline">
                                            <input
                                                className="form-check-input"
                                                type="checkbox"
                                                name="languageOther"
                                                checked={formData.languageOther}
                                                onChange={handleInputChange}
                                            />
                                            <span className="form-check-label">OTHER:</span>
                                        </label>
                                    </div>

                                </div>
                            </div>

                            <div className="form-section">
                                <h1 className="form-title">IN CASE OF EMERGENCY, PLEASE NOTIFY:</h1>

                                <div className="form-row">
                                    <div className="form-field">
                                        <label className="section-label">NAME <span className="required">*</span></label>
                                        <input
                                            type="text"
                                            name="emergencyName"
                                            value={formData.emergencyName}
                                            onChange={handleInputChange}
                                            required
                                        />
                                    </div>
                                    <div className="form-field">
                                        <label className="section-label">RELATIONSHIP <span className="required">*</span></label>
                                        <input
                                            type="text"
                                            name="emergencyRelationship"
                                            value={formData.emergencyRelationship}
                                            onChange={handleInputChange}
                                            required
                                        />
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="form-field col-md-4">
                                        <label className="section-label">ADDRESS <span className="required">*</span></label>
                                        <input
                                            type="text"
                                            name="emergencyAddress"
                                            value={formData.emergencyAddress}
                                            onChange={handleInputChange}
                                            required
                                        />
                                    </div>
                                    <div className="form-field col-md-4">
                                        <label className="section-label">PHONE <span className="required">*</span></label>
                                        <input
                                            type="tel"
                                            name="emergencyPhone"
                                            value={formData.emergencyPhone}
                                            onChange={handleInputChange}
                                            required
                                        />
                                    </div>
                                    <div className="form-field col-md-4">
                                        <label className="section-label">ALT. PHONE #</label>
                                        <input
                                            type="tel"
                                            name="emergencyAltPhone"
                                            value={formData.emergencyAltPhone}
                                            onChange={handleInputChange}
                                        />
                                    </div>
                                </div>

                            </div>

                            <div className="form-section">
                                <h1 className="form-title">EXPERIENCE: (CHECK ALL THAT APPLY)</h1>

                                <div className="row">
                                    {/* Row 1 */}
                                    <div className="col-md-4 form-check mb-2">
                                        <input
                                            className="form-check-input"
                                            type="checkbox"
                                            name="expAlzheimers"
                                            checked={formData.expAlzheimers}
                                            onChange={handleInputChange}
                                        />
                                        <label className="form-check-label">ALZHEIMER'S</label>
                                    </div>
                                    <div className="col-md-4 form-check mb-2">
                                        <input
                                            className="form-check-input"
                                            type="checkbox"
                                            name="expLiftingPatients"
                                            checked={formData.expLiftingPatients}
                                            onChange={handleInputChange}
                                        />
                                        <label className="form-check-label">LIFTING PATIENTS</label>
                                    </div>
                                    <div className="col-md-4 form-check mb-2">
                                        <input
                                            className="form-check-input"
                                            type="checkbox"
                                            name="expDiabeticDiet"
                                            checked={formData.expDiabeticDiet}
                                            onChange={handleInputChange}
                                        />
                                        <label className="form-check-label">DIABETIC DIET</label>
                                    </div>

                                    {/* Row 2 */}
                                    <div className="col-md-4 form-check mb-2">
                                        <input
                                            className="form-check-input"
                                            type="checkbox"
                                            name="expStroke"
                                            checked={formData.expStroke}
                                            onChange={handleInputChange}
                                        />
                                        <label className="form-check-label">STROKE</label>
                                    </div>
                                    <div className="col-md-4 form-check mb-2">
                                        <input
                                            className="form-check-input"
                                            type="checkbox"
                                            name="expBrokenHip"
                                            checked={formData.expBrokenHip}
                                            onChange={handleInputChange}
                                        />
                                        <label className="form-check-label">BROKEN HIP</label>
                                    </div>
                                    <div className="col-md-4 form-check mb-2">
                                        <input
                                            className="form-check-input"
                                            type="checkbox"
                                            name="expKosherDiet"
                                            checked={formData.expKosherDiet}
                                            onChange={handleInputChange}
                                        />
                                        <label className="form-check-label">KOSHER DIET</label>
                                    </div>

                                    {/* Row 3 */}
                                    <div className="col-md-4 form-check mb-2">
                                        <input
                                            className="form-check-input"
                                            type="checkbox"
                                            name="expCatheter"
                                            checked={formData.expCatheter}
                                            onChange={handleInputChange}
                                        />
                                        <label className="form-check-label">CATHETER</label>
                                    </div>
                                    <div className="col-md-4 form-check mb-2">
                                        <input
                                            className="form-check-input"
                                            type="checkbox"
                                            name="expBypassSurgery"
                                            checked={formData.expBypassSurgery}
                                            onChange={handleInputChange}
                                        />
                                        <label className="form-check-label">BYPASS SURGERY</label>
                                    </div>
                                    <div className="col-md-4 form-check mb-2">
                                        <input
                                            className="form-check-input"
                                            type="checkbox"
                                            name="expLowSaltDiet"
                                            checked={formData.expLowSaltDiet}
                                            onChange={handleInputChange}
                                        />
                                        <label className="form-check-label">LOW SALT DIET</label>
                                    </div>

                                    {/* Row 4 */}
                                    <div className="col-md-4 form-check mb-2">
                                        <input
                                            className="form-check-input"
                                            type="checkbox"
                                            name="expDementia"
                                            checked={formData.expDementia}
                                            onChange={handleInputChange}
                                        />
                                        <label className="form-check-label">DEMENTIA</label>
                                    </div>
                                    <div className="col-md-4 form-check mb-2">
                                        <input
                                            className="form-check-input"
                                            type="checkbox"
                                            name="expFeedingTubes"
                                            checked={formData.expFeedingTubes}
                                            onChange={handleInputChange}
                                        />
                                        <label className="form-check-label">FEEDING TUBES</label>
                                    </div>
                                    <div className="col-md-4 form-check mb-2">
                                        <input
                                            className="form-check-input"
                                            type="checkbox"
                                            name="expDehydration"
                                            checked={formData.expDehydration}
                                            onChange={handleInputChange}
                                        />
                                        <label className="form-check-label">DEHYDRATION</label>
                                    </div>

                                    {/* Row 5 */}
                                    <div className="col-md-4 form-check mb-2">
                                        <input
                                            className="form-check-input"
                                            type="checkbox"
                                            name="expHIV"
                                            checked={formData.expHIV}
                                            onChange={handleInputChange}
                                        />
                                        <label className="form-check-label">HIV</label>
                                    </div>
                                    <div className="col-md-4 form-check mb-2">
                                        <input
                                            className="form-check-input"
                                            type="checkbox"
                                            name="expBreathingTreatments"
                                            checked={formData.expBreathingTreatments}
                                            onChange={handleInputChange}
                                        />
                                        <label className="form-check-label">BREATHING TREATMENTS</label>
                                    </div>
                                    <div className="col-md-4 form-check mb-2">
                                        <input
                                            className="form-check-input"
                                            type="checkbox"
                                            name="expConstipation"
                                            checked={formData.expConstipation}
                                            onChange={handleInputChange}
                                        />
                                        <label className="form-check-label">CONSTIPATION</label>
                                    </div>

                                    {/* Row 6 */}
                                    <div className="col-md-4 form-check mb-2">
                                        <input
                                            className="form-check-input"
                                            type="checkbox"
                                            name="expWheelchair"
                                            checked={formData.expWheelchair}
                                            onChange={handleInputChange}
                                        />
                                        <label className="form-check-label">WHEELCHAIR</label>
                                    </div>
                                    <div className="col-md-4 form-check mb-2">
                                        <input
                                            className="form-check-input"
                                            type="checkbox"
                                            name="expHearingVision"
                                            checked={formData.expHearingVision}
                                            onChange={handleInputChange}
                                        />
                                        <label className="form-check-label">HEARING/VISION PROBLEMS</label>
                                    </div>
                                    <div className="col-md-4 form-check mb-2">
                                        <input
                                            className="form-check-input"
                                            type="checkbox"
                                            name="expIncontinence"
                                            checked={formData.expIncontinence}
                                            onChange={handleInputChange}
                                        />
                                        <label className="form-check-label">INCONTINENCE</label>
                                    </div>

                                    {/* Row 7 */}
                                    <div className="col-md-4 form-check mb-2">
                                        <input
                                            className="form-check-input"
                                            type="checkbox"
                                            name="expBedRidden"
                                            checked={formData.expBedRidden}
                                            onChange={handleInputChange}
                                        />
                                        <label className="form-check-label">BED RIDDEN</label>
                                    </div>
                                    <div className="col-md-4 form-check mb-2">
                                        <input
                                            className="form-check-input"
                                            type="checkbox"
                                            name="expCancer"
                                            checked={formData.expCancer}
                                            onChange={handleInputChange}
                                        />
                                        <label className="form-check-label">CANCER</label>
                                    </div>
                                    <div className="col-md-4 form-check mb-2">
                                        <input
                                            className="form-check-input"
                                            type="checkbox"
                                            name="expHeartProblems"
                                            checked={formData.expHeartProblems}
                                            onChange={handleInputChange}
                                        />
                                        <label className="form-check-label">HEART PROBLEMS</label>
                                    </div>
                                </div>


                            </div>
                            <div className="form-section">
                                <h1 className="form-title">WORK AVAILABILITY: (CHECK ALL THAT APPLY)</h1>


                                <div className="form-row d-flex align-items-center gap-5">

                                    {/* Weekdays */}
                                    <div className="d-flex align-items-center gap-3">
                                        <strong>Weekdays:</strong>

                                        <label className="radio-label d-flex align-items-center gap-1">
                                            <input
                                                type="radio"
                                                name="weekdaysAvailability"
                                                checked={formData.liveInWeekdays}
                                                onChange={() =>
                                                    setFormData({ ...formData, liveInWeekdays: true, liveOutWeekdays: false })
                                                }
                                            />
                                            <span>Live In</span>
                                        </label>

                                        <label className="radio-label d-flex align-items-center gap-1">
                                            <input
                                                type="radio"
                                                name="weekdaysAvailability"
                                                checked={formData.liveOutWeekdays}
                                                onChange={() =>
                                                    setFormData({ ...formData, liveInWeekdays: false, liveOutWeekdays: true })
                                                }
                                            />
                                            <span>Live Out</span>
                                        </label>
                                    </div>

                                    {/* Weekends */}
                                    <div className="d-flex align-items-center gap-3">
                                        <strong>Weekends:</strong>

                                        <label className="radio-label d-flex align-items-center gap-1">
                                            <input
                                                type="radio"
                                                name="weekendsAvailability"
                                                checked={formData.liveInWeekends}
                                                onChange={() =>
                                                    setFormData({ ...formData, liveInWeekends: true, liveOutWeekends: false })
                                                }
                                            />
                                            <span>Live In</span>
                                        </label>

                                        <label className="radio-label d-flex align-items-center gap-1">
                                            <input
                                                type="radio"
                                                name="weekendsAvailability"
                                                checked={formData.liveOutWeekends}
                                                onChange={() =>
                                                    setFormData({ ...formData, liveInWeekends: false, liveOutWeekends: true })
                                                }
                                            />
                                            <span>Live Out</span>
                                        </label>
                                    </div>

                                </div>



                                <div className="form-row mb-3">

                                    <div className="form-field col-md-4">
                                        <label className="section-label">Driver’s License</label>

                                        <div className="d-flex gap-3">
                                            <label className="radio-label">
                                                <input
                                                    type="radio"
                                                    name="driversLicense"
                                                    value="yes"
                                                    checked={formData.driversLicense === "yes"}
                                                    onChange={handleInputChange}
                                                />
                                                <span>YES</span>
                                            </label>

                                            <label className="radio-label">
                                                <input
                                                    type="radio"
                                                    name="driversLicense"
                                                    value="no"
                                                    checked={formData.driversLicense === "no"}
                                                    onChange={handleInputChange}
                                                />
                                                <span>NO</span>
                                            </label>
                                        </div>
                                    </div>

                                    <div className="form-field col-md-8">
                                        <label className="section-label">
                                            Do you have any physical disabilities that will prevent you from performing the job you are applying for?
                                        </label>

                                        <div className="d-flex gap-3">
                                            <label className="radio-label">
                                                <input
                                                    type="radio"
                                                    name="physicalDisability"
                                                    value="yes"
                                                    checked={formData.physicalDisability === "yes"}
                                                    onChange={handleInputChange}
                                                />
                                                <span>YES</span>
                                            </label>

                                            <label className="radio-label">
                                                <input
                                                    type="radio"
                                                    name="physicalDisability"
                                                    value="no"
                                                    checked={formData.physicalDisability === "no"}
                                                    onChange={handleInputChange}
                                                />
                                                <span>NO</span>
                                            </label>
                                        </div>
                                    </div>

                                </div>



                                <div className="form-row mb-3">

                                    <div className="form-field col-md-4">
                                        <label className="section-label">Own Car</label>

                                        <div className="d-flex gap-3">
                                            <label className="radio-label">
                                                <input
                                                    type="radio"
                                                    name="ownCar"
                                                    value="yes"
                                                    checked={formData.ownCar === "yes"}
                                                    onChange={handleInputChange}
                                                />
                                                <span>YES</span>
                                            </label>

                                            <label className="radio-label">
                                                <input
                                                    type="radio"
                                                    name="ownCar"
                                                    value="no"
                                                    checked={formData.ownCar === "no"}
                                                    onChange={handleInputChange}
                                                />
                                                <span>NO</span>
                                            </label>
                                        </div>
                                    </div>

                                    <div className="form-field col-md-8">
                                        <label className="section-label">Have you ever been injured?</label>

                                        <div className="d-flex gap-3">
                                            <label className="radio-label">
                                                <input
                                                    type="radio"
                                                    name="injuredBefore"
                                                    value="yes"
                                                    checked={formData.injuredBefore === "yes"}
                                                    onChange={handleInputChange}
                                                />
                                                <span>YES</span>
                                            </label>

                                            <label className="radio-label">
                                                <input
                                                    type="radio"
                                                    name="injuredBefore"
                                                    value="no"
                                                    checked={formData.injuredBefore === "no"}
                                                    onChange={handleInputChange}
                                                />
                                                <span>NO</span>
                                            </label>
                                        </div>
                                    </div>

                                </div>
                                <div className="mb-3">
                                    <label className="section-label">Availability Schedule</label>

                                    <div className="form-check form-check-inline">
                                        <input
                                            className="form-check-input"
                                            type="checkbox"
                                            name="fullTime"
                                            checked={formData.fullTime}
                                            onChange={handleInputChange}
                                        />
                                        <span className="form-check-label">F/T</span>
                                    </div>

                                    <div className="form-check form-check-inline">
                                        <input
                                            className="form-check-input"
                                            type="checkbox"
                                            name="partTime"
                                            checked={formData.partTime}
                                            onChange={handleInputChange}
                                        />
                                        <span className="form-check-label">P/T</span>
                                    </div>

                                    <div className="form-check form-check-inline">
                                        <input
                                            className="form-check-input"
                                            type="checkbox"
                                            name="days"
                                            checked={formData.days}
                                            onChange={handleInputChange}
                                        />
                                        <span className="form-check-label">DAYS</span>
                                    </div>

                                    <div className="form-check form-check-inline">
                                        <input
                                            className="form-check-input"
                                            type="checkbox"
                                            name="nights"
                                            checked={formData.nights}
                                            onChange={handleInputChange}
                                        />
                                        <span className="form-check-label">NIGHTS</span>
                                    </div>


                                </div>



                            </div>
                            <div className="form-section">
                                <h1 className="form-title">
                                    REFERENCES - PERSONAL: <small>(LIST 3 PERSONS NOT RELATED TO YOU THAT YOU HAVE KNOWN AT LEAST ONE YEAR)</small>
                                </h1>

                                {/* Header Row */}
                                <div className="row mb-2">
                                    <div className="col-md-3"><h1 className='section-label'>Name</h1></div>
                                    <div className="col-md-3"><h1 className='section-label'>Address</h1></div>
                                    <div className="col-md-2"><h1 className='section-label'>Phone</h1></div>
                                    <div className="col-md-2"><h1 className='section-label'>Business</h1></div>
                                    <div className="col-md-2"><h1 className='section-label'>Yrs Known</h1></div>
                                </div>

                                {/* Loop over 3 references */}
                                {[0, 1, 2].map((i) => (
                                    <div className="row mb-2" key={i}>
                                        <div className="form-field col-md-3">
                                            <input
                                                type="text"
                                                className="form-control"
                                                name={`ref${i + 1}Name`}
                                                value={formData[`ref${i + 1}Name`]}
                                                onChange={handleInputChange}
                                            />
                                        </div>
                                        <div className="form-field col-md-3">
                                            <input
                                                type="text"
                                                className="form-control"
                                                name={`ref${i + 1}Address`}
                                                value={formData[`ref${i + 1}Address`]}
                                                onChange={handleInputChange}
                                            />
                                        </div>
                                        <div className="form-field col-md-2">
                                            <input
                                                type="tel"
                                                className="form-control"
                                                name={`ref${i + 1}Phone`}
                                                value={formData[`ref${i + 1}Phone`]}
                                                onChange={handleInputChange}
                                            />
                                        </div>
                                        <div className="form-field col-md-2">
                                            <input
                                                type="text"
                                                className="form-control"
                                                name={`ref${i + 1}Business`}
                                                value={formData[`ref${i + 1}Business`]}
                                                onChange={handleInputChange}
                                            />
                                        </div>
                                        <div className="form-field col-md-2">
                                            <input
                                                type="number"
                                                className="form-control"
                                                name={`ref${i + 1}Years`}
                                                value={formData[`ref${i + 1}Years`]}
                                                onChange={handleInputChange}
                                            />
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </>

                    )}
                    {currentStep === 2 && (
                        <>
                            <div className="form-section">
                                <h1 className="form-title">7. EDUCATION:</h1>

                                {['Grammar School', 'High School', 'College'].map((school, idx) => (
                                    <div className="row mb-2" key={idx}>
                                        <div className="form-field col-md-3">
                                            <label className="section-label">{school} Name</label>
                                            <input
                                                type="text"
                                                name={`${school.replace(' ', '').toLowerCase()}Name`}
                                                value={formData[`${school.replace(' ', '').toLowerCase()}Name`] || ''}
                                                onChange={handleInputChange}
                                            />
                                        </div>
                                        <div className="form-field col-md-3">
                                            <label className="section-label">Location</label>
                                            <input
                                                type="text"
                                                name={`${school.replace(' ', '').toLowerCase()}Location`}
                                                value={formData[`${school.replace(' ', '').toLowerCase()}Location`] || ''}
                                                onChange={handleInputChange}
                                            />
                                        </div>
                                        <div className="form-field col-md-2">
                                            <label className="section-label">Years Attended</label>
                                            <input
                                                type="number"
                                                name={`${school.replace(' ', '').toLowerCase()}Years`}
                                                value={formData[`${school.replace(' ', '').toLowerCase()}Years`] || ''}
                                                onChange={handleInputChange}
                                            />
                                        </div>
                                        <div className="form-field col-md-2">
                                            <label className="section-label">Graduated?</label>
                                            <input
                                                type="text"
                                                name={`${school.replace(' ', '').toLowerCase()}Graduated`}
                                                value={formData[`${school.replace(' ', '').toLowerCase()}Graduated`] || ''}
                                                onChange={handleInputChange}
                                            />
                                        </div>
                                        <div className="form-field col-md-2">
                                            <label className="section-label">Subject/Diploma</label>
                                            <input
                                                type="text"
                                                name={`${school.replace(' ', '').toLowerCase()}Subject`}
                                                value={formData[`${school.replace(' ', '').toLowerCase()}Subject`] || ''}
                                                onChange={handleInputChange}
                                            />
                                        </div>
                                    </div>
                                ))}
                            </div>

                            <div className="form-section">
                                <h1 className="form-title">8. ADDITIONAL EDUCATION (Subjects of special study or special training skills)</h1>


                                {[1, 2, 3, 4, 5].map((i) => (
                                    <div className="row mb-2" key={i}>
                                        <div className="form-field col-md-12">
                                            <input
                                                type="text"
                                                name={`additionalEdu${i}`}
                                                value={formData[`additionalEdu${i}`] || ''}
                                                onChange={handleInputChange}
                                            />
                                        </div>
                                    </div>
                                ))}
                            </div>

                            <div className="form-section">
                                <h1 className="form-title">9. FORMER CONTRACT EMPLOYERS (List your last four employers with current one first)</h1>

                                {[0, 1, 2, 3].map((i) => (
                                    <div className="row mb-2" key={i}>
                                        <div className="form-field col-md-2">
                                            <label className="section-label">From (DD/MM/YY)</label>
                                            <input
                                                type="date"
                                                name={`employer${i}From`}
                                                value={formData[`employer${i}From`] || ''}
                                                onChange={handleInputChange}
                                            />
                                        </div>
                                        <div className="form-field col-md-2">
                                            <label className="section-label">To (DD/MM/YY)</label>
                                            <input
                                                type="date"
                                                name={`employer${i}To`}
                                                value={formData[`employer${i}To`] || ''}
                                                onChange={handleInputChange}
                                            />
                                        </div>
                                        <div className="form-field col-md-3">
                                            <label className="section-label">Employer Name/Address</label>
                                            <input
                                                type="text"
                                                name={`employer${i}Name`}
                                                value={formData[`employer${i}Name`] || ''}
                                                onChange={handleInputChange}
                                            />
                                        </div>
                                        <div className="form-field col-md-2">
                                            <label className="section-label">Earnings</label>
                                            <input
                                                type="text"
                                                name={`employer${i}Earnings`}
                                                value={formData[`employer${i}Earnings`] || ''}
                                                onChange={handleInputChange}
                                            />
                                        </div>
                                        <div className="form-field col-md-1">
                                            <label className="section-label">Position</label>
                                            <input
                                                type="text"
                                                name={`employer${i}Position`}
                                                value={formData[`employer${i}Position`] || ''}
                                                onChange={handleInputChange}
                                            />
                                        </div>
                                        <div className="form-field col-md-2">
                                            <label className="section-label">Reason You Left</label>
                                            <input
                                                type="text"
                                                name={`employer${i}Reason`}
                                                value={formData[`employer${i}Reason`] || ''}
                                                onChange={handleInputChange}
                                            />
                                        </div>
                                    </div>
                                ))}
                            </div>


                            <div className="form-section">
                                <h1 className="form-title">10. AUTHORIZATION STATEMENT:</h1>
                                <p class="form-note">
                                    I CERTIFY THAT THE FACTS CONTAINED IN THIS APPLICATION ARE TRUE AND COMPLETE TO THE BEST ‘OF MY KNOWLEDGE AND
                                    UNDERSTAND THAT, IF CONTRACTED, FALSIFIED STATEMENTS ON THIS APPLICATION SHALL BE GROUP FOR TERMINATION OF THIS
                                    CONTRACT
                                </p>
                                <p class="form-note">
                                    I AUTHORIZE INVESTIGATION OF ALL STATEMENTS CONTAINED HEREIN AND THE REFERENCES AND EMPLOYERS/CONTRACTORS
                                    LISTED ABOVE MAY GIVE YOU ANY AND ALL INFORMATION CONCERNING MY PREVIOUS WORK HISTORY AND ANY PERTINENT
                                    INFORMATION THEY MAY HAVE, PERSONAL OR OTHERWISE, AND RELEASE THE COMP ANY FROM ALL LIABILITY FOR ANY DAMAGE
                                    THAT MAY RESULT FROM UTILIZATION OF SUCH INFORMATION.
                                    I ALSO UNDERSTAND AND AGREE THAT NO REPRESENTATIVE OF THE COMPANY HAS THE AUTHORITY TO ENTER INTO ANY
                                    AGREEMENT FOR EMPLOYMENT. IF CONTRACT IS OFFERED, WORK SHALL BE PERFORMED AS AN INDEPENDENT CONTRACTOR ONLY.
                                </p>

                                <div className="row">
                                    <div className="form-field col-md-4">
                                        <label className="section-label">Date</label>
                                        <input type="date" name="authDate" value={formData.authDate || ''} onChange={handleInputChange} />
                                    </div>
                                    <div className="form-field col-md-4">
                                        <label className="section-label">Signature</label>
                                        <input type="text" name="authSignature" value={formData.authSignature || ''} onChange={handleInputChange} />
                                    </div>
                                    <div className="form-field col-md-4">
                                        <label className="section-label">Print Name</label>
                                        <input type="text" name="authPrintName" value={formData.authPrintName || ''} onChange={handleInputChange} />
                                    </div>
                                </div>
                            </div>

                            <div className="form-section">
                                <h1 className="form-title">CURRENT AVAILABILITY</h1>

                                <div className="row mb-2">
                                    <div className="col-md-2"><h1 className='section-label'>Day</h1></div>
                                    <div className="col-md-3"><h1 className='section-label'>From (Time)</h1></div>
                                    <div className="col-md-3"><h1 className='section-label'>To (Time)</h1></div>
                                    <div className="col-md-4"><h1 className='section-label'>Overnight? (Yes/No)</h1></div>
                                </div>

                                {['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'].map((day) => (
                                    <div className="row mb-2" key={day}>
                                        <div className="form-field col-md-2">
                                            <span>{day}</span>
                                        </div>
                                        <div className="form-field col-md-3">
                                            <input
                                                type="time"
                                                name={`${day.toLowerCase()}From`}
                                                value={formData[`${day.toLowerCase()}From`] || ''}
                                                onChange={handleInputChange}
                                            />
                                        </div>
                                        <div className="form-field col-md-3">
                                            <input
                                                type="time"
                                                name={`${day.toLowerCase()}To`}
                                                value={formData[`${day.toLowerCase()}To`] || ''}
                                                onChange={handleInputChange}
                                            />
                                        </div>
                                        <div className="form-field col-md-4">
                                            <select
                                                name={`${day.toLowerCase()}Overnight`}
                                                value={formData[`${day.toLowerCase()}Overnight`] || ''}
                                                onChange={handleInputChange}
                                            >
                                                <option value="">Select</option>
                                                <option value="yes">Yes</option>
                                                <option value="no">No</option>
                                            </select>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </>
                    )}
                    {currentStep === 3 && (
                        <>
                            <div className="form-section">
                                <h1 className="form-title">REFERENCE CHECK FORM</h1>

                                {/* Applicant Info */}
                                <div className="row mb-2">
                                    <div className="form-field col-md-4">
                                        <label className="section-label">Name of Last Manager/Supervisor</label>
                                        <input
                                            type="text"
                                            name="lastManager"
                                            value={formData.lastManager}
                                            onChange={handleInputChange}
                                        />
                                    </div>
                                    <div className="form-field col-md-4">
                                        <label className="section-label">Date</label>
                                        <input
                                            type="date"
                                            name="date"
                                            value={formData.referenceDate}
                                            onChange={handleInputChange}
                                        />
                                    </div>
                                    <div className="form-field mb-2 col-md-4">
                                        <label className="section-label">Organization</label>
                                        <input
                                            type="text"
                                            name="organization"
                                            value={formData.organization}
                                            onChange={handleInputChange}
                                        />
                                    </div>
                                </div>



                                <div className="form-field mb-2">
                                    <label className="section-label">Address</label>
                                    <input
                                        type="text"
                                        name="address"
                                        value={formData.address}
                                        onChange={handleInputChange}
                                    />
                                </div>

                                <div className="row mb-2">
                                    <div className="form-field col-md-6">
                                        <label className="section-label">Phone Number</label>
                                        <input
                                            type="tel"
                                            name="phone"
                                            value={formData.phone}
                                            onChange={handleInputChange}
                                        />
                                    </div>
                                    <div className="form-field col-md-6">
                                        <label className="section-label">Fax</label>
                                        <input
                                            type="text"
                                            name="fax"
                                            value={formData.fax}
                                            onChange={handleInputChange}
                                        />
                                    </div>
                                </div>

                                <div className="form-field mb-3">
                                    <p className="form-note">
                                        To whom it may concern, <br />
                                        The applicant listed below is applying for a position as <b>Position Applied</b> and has provided your name as an employment reference. As we place great importance on the thorough screening of our applicants, we would appreciate a prompt and thoughtful response.
                                    </p>
                                </div>

                                <div className="form-field mb-2">
                                    <label className="section-label">Position applied for</label>
                                    <input
                                        type="text"
                                        name="positionApplied"
                                        value={formData.positionApplied}
                                        onChange={handleInputChange}
                                    />
                                </div>

                                {/* Section 1 */}
                                <div className="form-section">
                                    <h2 className="form-title">Section 1 – To be completed by the applicant</h2>
                                    <p className="form-note">
                                        I, <b>Applicant Name</b>, owner of the Social Security # <b>SSN</b>, hereby authorize QUALCARE NURSE REGISTRY to contact you as my previous employer.
                                    </p>

                                    <div className="form-field">
                                        <label className="section-label">Applicant’s Signature <span className="required">*</span></label>
                                        <div className="signature-pad-container">
                                            <canvas
                                                ref={signatureRef}
                                                width={500}
                                                height={200}
                                                className="signature-canvas"
                                                onMouseDown={(e) => startDrawing(e, signatureRef)}
                                                onMouseMove={(e) => draw(e, signatureRef)}
                                                onMouseUp={stopDrawing}
                                                onMouseLeave={stopDrawing}
                                                onTouchStart={startDrawing}
                                                onTouchMove={draw}
                                                onTouchEnd={stopDrawing}
                                            />
                                            <button type="button" className="clear-signature-btn" onClick={clearSignature}>
                                                ↻
                                            </button>
                                        </div>
                                    </div>
                                </div>

                                {/* Section 2 */}
                                <div className="form-section">
                                    <h2 className="form-title">Section 2 – Office Use Only</h2>

                                    <div className="row mb-2">
                                        <div className="form-field col-md-4">
                                            <label className="section-label">Length of employment from</label>
                                            <input
                                                type="date"
                                                name="lengthFrom"
                                                value={formData.lengthFrom}
                                                onChange={handleInputChange}
                                            />
                                        </div>
                                        <div className="form-field col-md-4">
                                            <label className="section-label">to</label>
                                            <input
                                                type="date"
                                                name="lengthTo"
                                                value={formData.lengthTo}
                                                onChange={handleInputChange}
                                            />
                                        </div>
                                        <div className="form-field mb-2 col-md-4">
                                            <label className="section-label">Functioned in the capacity of RN / LVN / LPN / HHA / CNA</label>
                                            <input
                                                type="text"
                                                name="rn"
                                                value={formData.rn}
                                                onChange={handleInputChange}
                                            />
                                        </div>
                                    </div>



                                    <div className="form-field mb-2">
                                        <label className="section-label">Reason for leaving</label>
                                        <input
                                            type="text"
                                            name="reasonLeaving"
                                            value={formData.reasonLeaving}
                                            onChange={handleInputChange}
                                        />
                                    </div>

                                    <div className="form-field mb-2">
                                        <label className="section-label">Is the applicant eligible for rehire?</label>
                                        <div className="radio-group">
                                            <label className="radio-label">
                                                <input
                                                    type="radio"
                                                    name="eligibleRehire"
                                                    value="yes"
                                                    checked={formData.eligibleRehire === "yes"}
                                                    onChange={handleInputChange}
                                                /> Yes
                                            </label>
                                            <label className="radio-label">
                                                <input
                                                    type="radio"
                                                    name="eligibleRehire"
                                                    value="no"
                                                    checked={formData.eligibleRehire === "no"}
                                                    onChange={handleInputChange}
                                                /> No
                                            </label>
                                        </div>
                                    </div>

                                    <p className="form-note">
                                        PLEASE COMMENT ON THE APPLICANT’S ATTRIBUTES USING THE FOLLOWING SCALE: POOR, FAIR, GOOD, VERY GOOD, EXCELLENT
                                    </p>

                                    {(() => {
                                        const attributes = [
                                            { label: "Ability to follow instructions", name: "abilityFollowInstructions" },
                                            { label: "Professional dress and grooming", name: "professionalDress" },
                                            { label: "Willingness to assume responsibility", name: "willingnessResponsibility" },
                                            { label: "Skills / Proficiency", name: "skillsProficiency" },
                                            { label: "Overall Job Performance", name: "overallPerformance" },
                                            { label: "Reliability and Attendance", name: "reliabilityAttendance" },
                                            { label: "Ability to work with others", name: "teamwork" },
                                            { label: "Quality of work", name: "qualityOfWork" },
                                            { label: "Job Knowledge", name: "jobKnowledge" },
                                        ];

                                        const rows = [];
                                        for (let i = 0; i < attributes.length; i += 3) {
                                            rows.push(attributes.slice(i, i + 3));
                                        }

                                        return rows.map((group, rowIndex) => (
                                            <div className="row mb-2" key={rowIndex}>
                                                {group.map((attr, colIndex) => (
                                                    <div className="form-field col-md-4" key={colIndex}>
                                                        <label className="section-label">{attr.label}</label>
                                                        <input
                                                            type="text"
                                                            name={attr.name}
                                                            value={formData[attr.name]}
                                                            onChange={handleInputChange}
                                                            className="form-control"
                                                        />
                                                    </div>
                                                ))}
                                            </div>
                                        ));
                                    })()}

                                    <div className="form-field mb-2">
                                        <label className="section-label">Additional Comments</label>
                                        <textarea
                                            name="additionalComments"
                                            value={formData.additionalComments}
                                            onChange={handleInputChange}
                                        />
                                    </div>

                                    <div className="row mb-2">
                                        <div className="form-field col-md-4">
                                            <label className="section-label">Name (please print)</label>
                                            <input
                                                type="text"
                                                name="printName"
                                                value={formData.printName}
                                                onChange={handleInputChange}
                                            />
                                        </div>
                                        <div className="form-field col-md-4">
                                            <label className="section-label">Date</label>
                                            <input
                                                type="date"
                                                name="dateSignature"
                                                value={formData.dateSignature}
                                                onChange={handleInputChange}
                                            />
                                        </div>
                                        <div className="form-field col-md-4">
                                            <label className="section-label">Position/Title</label>
                                            <input
                                                type="text"
                                                name="positionTitle"
                                                value={formData.positionTitle}
                                                onChange={handleInputChange}
                                            />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </>
                    )}
                    {currentStep === 4 && (
                        <>
                            <div className="form-section">
                                <h1 className="form-title">PAYCHECK POLICY</h1>

                                {/* Policy Description Texts */}
                                <div className="row mb-3">
                                    <div className="col-12">
                                        <p className="form-note">
                                            <strong>Disbursement of Funds and Pay Check Policy</strong>
                                        </p>
                                        <p className="form-note">
                                            <strong>QUALCARE NURSE REGISTRY</strong> will issue paychecks every Friday after 2:00 pm.
                                            Checks must be picked up by you at the office with a valid ID. If a check needs to
                                            be re-issued, you fill be required to pay the $50.00 bank fee, which will be
                                            deducted from your re-issued check.
                                        </p>
                                    </div>
                                </div>

                                {/* Preference Selection */}
                                <div className="form-field">
                                    <label className="section-label">WOULD YOU PREFER?</label>
                                    <div className="radio-group">
                                        <label className="radio-label">
                                            <input
                                                type="radio"
                                                name="paycheckPreference"
                                                value="pickup"
                                                checked={formData.paycheckPreference === 'pickup'}
                                                onChange={handleInputChange}
                                            />
                                            <span>Pick you check up in the office</span>
                                        </label>
                                        <label className="radio-label">
                                            <input
                                                type="radio"
                                                name="paycheckPreference"
                                                value="mailed"
                                                checked={formData.paycheckPreference === 'mailed'}
                                                onChange={handleInputChange}
                                            />
                                            <span>Have your check mailed to you</span>
                                        </label>
                                    </div>
                                </div>

                                {/* Address Confirmation Section */}
                                <div className="mt-4">
                                    <p className="form-note">If would like your check mailed, please confirm the address:</p>

                                    <div className="row">
                                        <div className="form-field col-md-12">
                                            <label className="section-label">NAME</label>
                                            <input
                                                type="text"
                                                name="paycheckMailName"
                                                value={formData.paycheckMailName}
                                                onChange={handleInputChange}
                                            />
                                        </div>
                                    </div>

                                    <div className="row">
                                        <div className="form-field col-md-12">
                                            <label className="section-label">ADDRESS</label>
                                            <input
                                                type="text"
                                                name="paycheckMailAddress"
                                                value={formData.paycheckMailAddress}
                                                onChange={handleInputChange}
                                            />
                                        </div>
                                    </div>

                                    <div className="row">
                                        <div className="form-field col-md-8">
                                            <label className="section-label">CITY</label>
                                            <input
                                                type="text"
                                                name="paycheckMailCity"
                                                value={formData.paycheckMailCity}
                                                onChange={handleInputChange}
                                            />
                                        </div>
                                        <div className="form-field col-md-4">
                                            <label className="section-label">ZIP</label>
                                            <input
                                                type="text"
                                                name="paycheckMailZip"
                                                value={formData.paycheckMailZip}
                                                onChange={handleInputChange}
                                            />
                                        </div>
                                    </div>
                                </div>

                                {/* Acknowledgement Text with Inline Input */}
                                <div className="row mt-4">
                                    <div className="col-12">
                                        <p className="form-note acknowledgement-line">
                                            I, <input
                                                type="text"
                                                name="acknowledgementName"
                                                className="inline-signature-input"
                                                value={formData.acknowledgementName}
                                                onChange={handleInputChange}
                                                style={{ borderBottom: '1px solid #000', borderTop: 'none', borderLeft: 'none', borderRight: 'none', outline: 'none', padding: '0 5px', minWidth: '200px' }}
                                            /> have read and fully understand the above policy set forth by QUALCARE NURSE REGISTRY.
                                        </p>
                                    </div>
                                </div>

                                {/* Signature, Title, and Date Section */}
                                <div className="row mt-4">
                                    <div className="form-field col-md-6">
                                        <label className="section-label">Signature <span className="required">*</span></label>
                                        <div className="signature-pad-container">
                                            <canvas
                                                ref={signatureRef}
                                                width={500}
                                                height={200}
                                                className="signature-canvas"
                                                onMouseDown={(e) => startDrawing(e, signatureRef)}
                                                onMouseMove={(e) => draw(e, signatureRef)}
                                                onMouseUp={stopDrawing}
                                                onMouseLeave={stopDrawing}
                                                onTouchStart={startDrawing}
                                                onTouchMove={draw}
                                                onTouchEnd={stopDrawing}
                                            />
                                            <button type="button" className="clear-signature-btn" onClick={clearSignature}>
                                                ↻
                                            </button>
                                        </div>
                                    </div>

                                    <div className="col-md-6">
                                        <div className="form-field mb-3">
                                            <label className="section-label">TITLE</label>
                                            <input
                                                type="text"
                                                name="paycheckPolicyTitle"
                                                value={formData.paycheckPolicyTitle}
                                                onChange={handleInputChange}
                                            />
                                        </div>
                                        <div className="form-field">
                                            <label className="section-label">DATE</label>
                                            <input
                                                type="date"
                                                name="paycheckPolicyDate"
                                                value={formData.paycheckPolicyDate}
                                                onChange={handleInputChange}
                                            />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </>
                    )}
                    {currentStep === 5 && (
                        <>
                            <div className="form-section">
                                <h1 className="form-title">
                                    COMPANY DISCIPLINARY ACTION FOR A POSITIVE CONFIRMED DRUG AND / ALCOHOL SCREEN
                                </h1>

                                {/* Policy Text Section */}
                                <div className="row mb-4">
                                    <div className="col-12">
                                        <p className="form-note">
                                            This company hereby states its policy relating to those individuals who test positive on a drug and/or alcohol screen to be as followed;
                                        </p>
                                        <p className="form-note">
                                            Any Per Diem Independent Contractor/Employee who tests positive on a Drug and/or Alcohol screening will be terminated from their contract.
                                            If he/she is able to successfully obtain substance abuse treatment, at their own expense, and their contract is still available, he/she will be given one (1) chance to be retired, upon a negative return-to-work Drug and/or Alcohol screen he/she will then undergo random Drug and/or Alcohol screens for a period of (2) years as follow-up treatment.
                                            If he/she tests positive on any of their follow-up Drug and/or Alcohol screens, he/she will be terminated from their employment.
                                        </p>
                                        <p className="form-note">
                                            If a Per Diem Independent Contractor/Employee refuses to take a periodic, random, post-accident, routine fitness for duty or reasonable suspicion Drug and/or Alcohol screen, he/she will be terminated from employment.
                                        </p>
                                        <p className="form-note">
                                            Any Per Diem Independent Contractor/Employee using, selling, purchasing, possessing, soliciting or distributing drugs and/or alcohol on duty or at company's property, it will be terminated from the contract.
                                        </p>
                                    </div>
                                </div>

                                {/* Signature and Info Section */}
                                <div className="row align-items-end">
                                    <div className="form-field col-md-6">
                                        <label className="section-label">Signature <span className="required">*</span></label>
                                        <div className="signature-pad-container">
                                            <canvas
                                                ref={signatureRef}
                                                width={500}
                                                height={200}
                                                className="signature-canvas"
                                                onMouseDown={(e) => startDrawing(e, signatureRef)}
                                                onMouseMove={(e) => draw(e, signatureRef)}
                                                onMouseUp={stopDrawing}
                                                onMouseLeave={stopDrawing}
                                                onTouchStart={startDrawing}
                                                onTouchMove={draw}
                                                onTouchEnd={stopDrawing}
                                            />
                                            <button type="button" className="clear-signature-btn" onClick={clearSignature}>
                                                ↻
                                            </button>
                                        </div>
                                    </div>

                                    <div className="form-field col-md-3">
                                        <label className="section-label">TITLE</label>
                                        <input
                                            type="text"
                                            name="disciplinaryTitle"
                                            value={formData.disciplinaryTitle}
                                            onChange={handleInputChange}
                                        />
                                    </div>

                                    <div className="form-field col-md-3">
                                        <label className="section-label">DATE</label>
                                        <input
                                            type="date"
                                            name="disciplinaryDate"
                                            value={formData.disciplinaryDate}
                                            onChange={handleInputChange}
                                        />
                                    </div>
                                </div>
                            </div>
                        </>
                    )}
                    {currentStep === 6 && (
                        <>
                            <div className="form-section">
                                {/* SAFETY POLICY SECTION */}
                                <h1 className="form-title">SAFETY POLICY</h1>
                                <div className="row mb-3">
                                    <div className="col-12">
                                        <p className="form-note">
                                            It is the policy of <strong>QUALCARE NURSE REGISTRY</strong> to provide a safe and healthful environment for all employees/caregivers/ contractors and visitors who are associated with our company.
                                        </p>
                                        <p className="form-note">
                                            Safety and health programs dedicated to the elimination of accidents causes, will be emphasized and sponsored throughout the facility and department work safety rules, the investigation of accidents and the inspection of work procedures and facilities. These on-going programs eliminate unsafe work practices/conditions and to reduce the potential for accidents and personal injury.
                                        </p>
                                        <p className="form-note">
                                            The success of our safety and health programs will only be achieved by the active leadership, direct participation, and enthusiastic support from all department heads, and case managers.
                                        </p>
                                        <p className="form-note">
                                            Each member of <strong>QUALCARE NURSE REGISTRY</strong> is obligated to observe safe practices and obey all safety rules, this direct personal involvement is the only way we can attain our goal of accident reduction and elimination.
                                        </p>
                                        <p className="form-note">
                                            I have read and fully understand and agree to the above statements.
                                        </p>
                                    </div>
                                </div>

                                {/* TRANSPORTATION RESPONSIBILITY POLICY SECTION */}
                                <h1 className="form-title">TRANSPORTATION RESPONSIBILITY POLICY</h1>
                                <div className="row mb-3">
                                    <div className="col-12">
                                        <p className="form-note">
                                            It has been explained to me that I am being offered employment with the understanding that I have personal transportation at my disposal to be used for travel to and from patient assignments.
                                        </p>
                                        <p className="form-note">
                                            I further understand that I am responsible for maintaining automobile liability to include bodily injury and property damage.
                                        </p>
                                        <p className="form-note">
                                            Should I be unable to make patient visits assigned to be because of transportation problems, I will give <strong>QUALCARE NURSE REGISTRY</strong>, a minimum of one working day or eight hours’ notice.
                                        </p>
                                        <p className="form-note">
                                            Failure to comply with the above may result in the immediate termination of my employment contract without further notice.
                                        </p>
                                    </div>
                                </div>

                                {/* HOURS OF OPERATIONS POLICY SECTION */}
                                <h1 className="form-title">HOURS OF OPERATIONS POLICY</h1>
                                <div className="row mb-4">
                                    <div className="col-12">
                                        <p className="form-note">
                                            Office hours are from 9:00 am to 5:00 pm, Monday through Friday. Should an incident occur which requires immediate attention Per Diem Independent Contractor is required to notify the Registry as soon as possible. A 24-hour / 7-days a week answering systems is provided for this purpose.
                                        </p>
                                        <p className="form-note">
                                            By signing this agreement you are stating that you understand that any incident involving you or the client must be reported to <strong>QUALCARE NURSE REGISTRY</strong>, immediately.
                                        </p>
                                        <p className="form-note">
                                            You also understand that proper documentation must be completed and submitted to the office in a timely manner. Nursing Notes are due Every Thursday.
                                        </p>
                                        <p className="form-note">
                                            Any other matter you are wishing to discuss with the Registry personnel, the calls should be placed during office hours.
                                        </p>
                                        <p className="form-note">
                                            <strong>I have read and fully understand and agree to the above statements.</strong>
                                        </p>
                                    </div>
                                </div>

                                {/* FINAL SIGNATURE SECTION FOR ALL ABOVE POLICIES */}
                                <div className="row align-items-end">
                                    <div className="form-field col-md-6">
                                        <label className="section-label">Signature <span className="required">*</span></label>
                                        <div className="signature-pad-container">
                                            <canvas
                                                ref={signatureRef}
                                                width={500}
                                                height={200}
                                                className="signature-canvas"
                                                onMouseDown={(e) => startDrawing(e, signatureRef)}
                                                onMouseMove={(e) => draw(e, signatureRef)}
                                                onMouseUp={stopDrawing}
                                                onMouseLeave={stopDrawing}
                                                onTouchStart={startDrawing}
                                                onTouchMove={draw}
                                                onTouchEnd={stopDrawing}
                                            />
                                            <button type="button" className="clear-signature-btn" onClick={clearSignature}>
                                                ↻
                                            </button>
                                        </div>
                                    </div>

                                    <div className="form-field col-md-3">
                                        <label className="section-label">TITLE</label>
                                        <input
                                            type="text"
                                            name="safetyPolicyTitle"
                                            value={formData.safetyPolicyTitle}
                                            onChange={handleInputChange}
                                        />
                                    </div>

                                    <div className="form-field col-md-3">
                                        <label className="section-label">DATE</label>
                                        <input
                                            type="date"
                                            name="safetyPolicyDate"
                                            value={formData.safetyPolicyDate}
                                            onChange={handleInputChange}
                                        />
                                    </div>
                                </div>
                            </div>
                        </>
                    )}
                    {currentStep === 7 && (
                        <>
                            <div className="form-section">
                                {/* PATIENT ABANDONMENT POLICY */}
                                <h1 className="form-title">PATIENT ABANDONMENT POLICY</h1>
                                <div className="row mb-4">
                                    <div className="col-12">
                                        <p className="form-note">
                                            It is the policy of this Registry that if a caregiver abandons a patient, the Per Diem Independent Contractor/caregiver will be immediately dismissed. The patient will be assigned another caregiver to continue care. The supervisor must contact the case manager to inform of the situation.
                                        </p>
                                        <p className="form-note">
                                            Leaving a patient before your shift is completed without the knowledge and approval of <strong>QUALCARE NURSE REGISTRY</strong> is considered patient abandonment. The above mentioned actions will be taken.
                                        </p>
                                    </div>
                                </div>

                                {/* DRESS CODE POLICY */}
                                <h1 className="form-title">DRESS CODE POLICY</h1>
                                <div className="row mb-3">
                                    <div className="col-12">
                                        <p className="form-note">
                                            To present a professional health care individual image to the public at large and specifically to our clients and their family members.
                                        </p>
                                        <p className="form-note"><strong>PROCEDURE</strong></p>

                                        <p className="form-note"><strong>Dress Code for All Personnel:</strong></p>
                                        <ol className="form-note">
                                            <li>Good personal hygiene</li>
                                            <li>Minimal jewelry – accessories simple and uncluttered</li>
                                            <li>Clean, well-groomed fingernails</li>
                                            <li>Neat, clean hair – no extreme non-professional styles</li>
                                            <li>Appropriate undergarments</li>
                                            <li>Hemlines no more than 2 inches above the knee or 2 inches below the knee</li>
                                            <li>Make-up natural – no extreme colorings, lashes or sparkles</li>
                                        </ol>

                                        <p className="form-note"><strong>Dress Code for All Direct Care Personnel:</strong></p>
                                        <ol className="form-note">
                                            <li>All of the above plus:</li>
                                            <li>Clean, wrinkle-free uniforms (may be scrub-type)</li>
                                            <li>Clean, closed-toe, flat shoes</li>
                                            <li>Clean, short-trimmed and groomed fingernails</li>
                                            <li>Avoid heavy perfumes and colognes</li>
                                            <li>Office RN’s must wear white lab coat if not in uniform and visiting patients, hospital, physician’s offices, etc.</li>
                                        </ol>

                                        <p className="form-note"><strong>Items Not Acceptable (All Staff):</strong></p>
                                        <div className="row">
                                            <div className="col-md-6">
                                                <ol className="form-note" start="1">
                                                    <li>Glitter or sequin-covered clothing</li>
                                                    <li>Jean-type clothing</li>
                                                    <li>Tight pants or leggings</li>
                                                    <li>Shorts</li>
                                                    <li>Beach-type sandals</li>
                                                    <li>Long, dangling or hoop earrings</li>
                                                </ol>
                                            </div>
                                            <div className="col-md-6">
                                                <ol className="form-note" start="7">
                                                    <li>See-through fabrics</li>
                                                    <li>Tank tops</li>
                                                    <li>Open-back tops or plunging necklines</li>
                                                    <li>No exposed body piercing except ears</li>
                                                    <li>Long dresses/skirts due to safety hazard</li>
                                                </ol>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                {/* SIGNATURE SECTION */}
                                <div className="row align-items-end mt-4">
                                    <div className="form-field col-md-6">
                                        <label className="section-label">Signature <span className="required">*</span></label>
                                        <div className="signature-pad-container">
                                            <canvas
                                                ref={signatureRef}
                                                width={500}
                                                height={200}
                                                className="signature-canvas"
                                                onMouseDown={(e) => startDrawing(e, signatureRef)}
                                                onMouseMove={(e) => draw(e, signatureRef)}
                                                onMouseUp={stopDrawing}
                                                onMouseLeave={stopDrawing}
                                                onTouchStart={startDrawing}
                                                onTouchMove={draw}
                                                onTouchEnd={stopDrawing}
                                            />
                                            <button type="button" className="clear-signature-btn" onClick={clearSignature}>
                                                ↻
                                            </button>
                                        </div>
                                    </div>

                                    <div className="form-field col-md-3">
                                        <label className="section-label">TITLE</label>
                                        <input
                                            type="text"
                                            name="dressCodeTitle"
                                            value={formData.dressCodeTitle}
                                            onChange={handleInputChange}
                                        />
                                    </div>

                                    <div className="form-field col-md-3">
                                        <label className="section-label">DATE</label>
                                        <input
                                            type="date"
                                            name="dressCodeDate"
                                            value={formData.dressCodeDate}
                                            onChange={handleInputChange}
                                        />
                                    </div>
                                </div>
                            </div>
                        </>
                    )}
                    {currentStep === 8 && (
                        <>
                            <div className="form-section">
                                <h1 className="form-title">CONFIDENTIALITY STATEMENT</h1>

                                <p className="form-note">
                                    I acknowledge that I have read and understood QUALCARE NURSE REGISTRY, here in referred to as Registry, Confidentiality Policy, HIPAA regulations and the Privacy Statement. I acknowledge that during my employment/placement/volunteer/project work with Registry I may have access to confidential information. <br /><br />

                                    I acknowledge that it is a term and condition of my work with Registry that I will at all times respect the privacy of clients and their families, students, volunteers, and employees, and the confidential nature of the business of Registry. I will closely protect confidential information to prevent it being inappropriately accessed, used or disclosed either directly by me, or by virtue of my password to systems, or by permitting breaches in physical security to occur. If I become aware of any violation of confidentiality, or lose any record containing confidential information or any key or other item that could be used to violate confidentiality, I will notify my supervisor or another responsible Registry supervisor at the first reasonable opportunity. <br /><br />

                                    I understand that violations to confidentiality may include, but are not limited to:
                                    <ul>
                                        <li>Accessing personal or organizational information that I do not require in order to properly carry out my duties;</li>
                                        <li>Using or disclosing personal/organizational information (verbally, through the computer system, or in hard copy) without proper authorization;</li>
                                        <li>Inappropriately sharing passwords, keys, codes or other identification devices without proper authorization.</li>
                                    </ul>

                                    I will only access, use, transfer, or disclose private and confidential information as required by the duties of my position. I agree to cooperate with Registry in any audit or investigation relating to confidential information and to provide any records requested in connection with such audits or investigations. I understand and agree to abide by the conditions outlined in this agreement both during and after my employment or association with Registry. I understand that a violation of this agreement may result in disciplinary action that may include termination/dismissal from employment or association with Registry, or that I may be subject to civil or criminal liability. <br /><br />

                                    I understand that no information is to be released without the written “Release of Information” consent signed by the patient or patient’s legal representative. It is understood that breaks in the policies and procedures of Registry concerning confidentiality may result in immediate termination without further notice.
                                </p>

                                <div className="row align-items-end mt-4">
                                    <div className="form-field col-md-6">
                                        <label className="section-label">Signature <span className="required">*</span></label>
                                        <div className="signature-pad-container">
                                            <canvas
                                                ref={signatureRef}
                                                width={500}
                                                height={200}
                                                className="signature-canvas"
                                                onMouseDown={(e) => startDrawing(e, signatureRef)}
                                                onMouseMove={(e) => draw(e, signatureRef)}
                                                onMouseUp={stopDrawing}
                                                onMouseLeave={stopDrawing}
                                                onTouchStart={startDrawing}
                                                onTouchMove={draw}
                                                onTouchEnd={stopDrawing}
                                            />
                                            <button type="button" className="clear-signature-btn" onClick={clearSignature}>
                                                ↻
                                            </button>
                                        </div>
                                    </div>

                                    <div className="form-field col-md-3">
                                        <label className="section-label">TITLE</label>
                                        <input
                                            type="text"
                                            name="dressCodeTitle"
                                            value={formData.dressCodeTitle}
                                            onChange={handleInputChange}
                                        />
                                    </div>

                                    <div className="form-field col-md-3">
                                        <label className="section-label">DATE</label>
                                        <input
                                            type="date"
                                            name="dressCodeDate"
                                            value={formData.confidentialityStatementDate}
                                            onChange={handleInputChange}
                                        />
                                    </div>
                                </div>
                            </div>

                        </>
                    )}
                    {currentStep === 9 && (
                        <>
                            <div className="form-section">
                                <h1 className="form-title">Contractor Agreement</h1>

                                <p className="form-note">
                                    <strong>APPLICATION:</strong><br />
                                    Upon receipt of your references, your application and exam will be reviewed by our staff and your license will be verified by the State Board of Nursing. You will be notified approximately one week after your interview until your application has been approved.
                                </p>

                                <p className="form-note">
                                    <strong>PROBATION:</strong><br />
                                    When references have cleared and you have been offered your first assignment, you are considered a probationary caregiver. Probationary status is in effect for 90 days from the date of your first assignment. One or more incidents could cause us to discontinue offering you assignments and will result in termination. Some examples are:
                                    <ul>
                                        <li>Infractions of the “Nurse Practice Act”.</li>
                                        <li>Reports from facilities that your work is not accepted by clients.</li>
                                        <li>Not showing up for an assignment that you have accepted.</li>
                                        <li>Too many sick or emergency cancellations.</li>
                                        <li>Any serious misconduct while on or off duty that may reflect on Qualcare Nurse Registry.</li>
                                        <li>Infractions of policies or procedures of facilities.</li>
                                        <li>Violation of “Conditions of Employment”.</li>
                                    </ul>
                                </p>

                                <p className="form-note">
                                    <strong>REQUIREMENTS:</strong><br />
                                    When you contract for QUALCARE NURSE REGISTRY, it is your responsibility to call in your availability to our office on a weekly basis. If you fail to do so, your file will be placed inactive and you will be considered resigned. If you change your telephone number, or it becomes disconnected, it is your responsibility to provide our office with an alternative phone number until this requirement is met. If our office cannot reach you due to the reason above, your file will be placed inactive and you will be considered resigned. <br /><br />

                                    All employees/caregivers/contractors must comply with AHCA requirements within 30 days from the date of your first assignment. Any violation of AHCA requirements, either by not complying when hired or at renewal times, are grounds for termination.
                                </p>

                            </div>

                            <div className="row align-items-end mt-4">
                                <div className="form-field col-md-6">
                                    <label className="section-label">Signature <span className="required">*</span></label>
                                    <div className="signature-pad-container">
                                        <canvas
                                            ref={signatureRef}
                                            width={500}
                                            height={200}
                                            className="signature-canvas"
                                            onMouseDown={(e) => startDrawing(e, signatureRef)}
                                            onMouseMove={(e) => draw(e, signatureRef)}
                                            onMouseUp={stopDrawing}
                                            onMouseLeave={stopDrawing}
                                            onTouchStart={startDrawing}
                                            onTouchMove={draw}
                                            onTouchEnd={stopDrawing}
                                        />
                                        <button type="button" className="clear-signature-btn" onClick={clearSignature}>
                                            ↻
                                        </button>
                                    </div>
                                </div>

                                <div className="form-field col-md-3">
                                    <label className="section-label">TITLE</label>
                                    <input
                                        type="text"
                                        name="dressCodeTitle"
                                        value={formData.dressCodeTitle}
                                        onChange={handleInputChange}
                                    />
                                </div>

                                <div className="form-field col-md-3">
                                    <label className="section-label">DATE</label>
                                    <input
                                        type="date"
                                        name="dressCodeDate"
                                        value={formData.contractorAgreementDate}
                                        onChange={handleInputChange}
                                    />
                                </div>
                            </div>
                        </>
                    )}
                    {currentStep === 10 && (
                        <>
                            <div className="form-section">
                                <h1 className="form-title">NON-DISCRIMINATION POLICY</h1>

                                <p className="form-note">
                                    In accordance with Title VI of the Civil Rights Act of 1964 and its implementing regulation, QUALCARE NURSE REGISTRY is an EQUAL OPPORTUNITY EMPLOYER and WILL NOT DISCRIMINATE AGAINST RACE, COLOR, CREED, RELIGION, SEX, AGE, GENDER PREFERENCE, NATIONAL ORIGIN, HANDICAP (MENTAL OR PHYSICAL), ETHICAL/POLITICAL BELIEFS, DECISION REGARDING ADVANCE DIRECTIVES, OR COMMUNICABLE DISEASE as defined in Section 504 of Title VI. <br /><br />

                                    In accordance with Section 504 of Rehabilitation Act of 1973 and its implementing regulation, QUALCARE NURSE REGISTRY WILL NOT, DIRECTLY OR THROUGH CONTRACTUAL OR OTHER ARRANGEMENTS, DISCRIMINATE ON THE BASIS OF HANDICAP. <br /><br />

                                    In accordance with the Age Discrimination Act of 1975 and its implementing regulation, QUALCARE NURSE REGISTRY WILL NOT, DIRECTLY OR THROUGH CONTRACTUAL OR OTHER ARRANGEMENTS, DISCRIMINATE ON THE BASIS OF AGE in the provision of services, unless age is a factor necessary to normal operation or the achievement of any statutory objective. <br /><br />

                                    In accordance with the Americans with Disabilities Act of 1992 (42 USC § 12101) and its implementing regulations (private employers with more than 25 Registry personnel), QUALCARE NURSE REGISTRY WILL NOT, DIRECTLY OR THROUGH CONTRACTUAL OR OTHER ARRANGEMENTS, DISCRIMINATE ON THE BASIS OF DISABILITY. A disability is a physical or mental impairment that substantially limits a major life activity, or for which there is a record of impairment, or which causes the individual to be regarded as impaired. <br /><br />

                                    I hereby verify that I have had all my questions answered to my satisfaction and that I understand all of the material covered.
                                </p>

                                {/* SIGNATURE SECTION */}
                                <div className="row align-items-end mt-4">
                                    <div className="form-field col-md-6">
                                        <label className="section-label">Signature <span className="required">*</span></label>
                                        <div className="signature-pad-container">
                                            <canvas
                                                ref={signatureRef}
                                                width={500}
                                                height={200}
                                                className="signature-canvas"
                                                onMouseDown={(e) => startDrawing(e, signatureRef)}
                                                onMouseMove={(e) => draw(e, signatureRef)}
                                                onMouseUp={stopDrawing}
                                                onMouseLeave={stopDrawing}
                                                onTouchStart={startDrawing}
                                                onTouchMove={draw}
                                                onTouchEnd={stopDrawing}
                                            />
                                            <button type="button" className="clear-signature-btn" onClick={clearSignature}>
                                                ↻
                                            </button>
                                        </div>
                                    </div>

                                    <div className="form-field col-md-3">
                                        <label className="section-label">TITLE</label>
                                        <input
                                            type="text"
                                            name="dressCodeTitle"
                                            value={formData.dressCodeTitle}
                                            onChange={handleInputChange}
                                        />
                                    </div>

                                    <div className="form-field col-md-3">
                                        <label className="section-label">DATE</label>
                                        <input
                                            type="date"
                                            name="dressCodeDate"
                                            value={formData.nonDiscriminationDate}
                                            onChange={handleInputChange}
                                        />
                                    </div>
                                </div>
                            </div>

                        </>
                    )}
                    {currentStep === 11 && (
                        <>
                            <div className="form-section">
                                <h1 className="form-title">COMPANY DISCIPLINARY ACTION FOR A POSITIVE CONFIRMED DRUG AND ALCOHOL SCREEN</h1>
                                <p className="form-note"><strong>State of Purpose:</strong></p>
                                <p className="form-note">
                                    The purpose of this questionnaire is to provide <strong>QUALCARE NURSE REGISTRY</strong> with information
                                    regarding preexisting conditions or disabilities that the employee/contractor might suffer.
                                </p>

                                <div className="row mb-3">
                                    <div className="form-field col-md-3">
                                        <label className="section-label">Name of Contractor</label>
                                        <input type="text" name="contractorNameHealth" value={formData.contractorNameHealth} onChange={handleInputChange} />
                                    </div>
                                    <div className="form-field col-md-3">
                                        <label className="section-label">Contractor SSN Number</label>
                                        <input type="text" name="contractorSSN" value={formData.contractorSSN} onChange={handleInputChange} placeholder="xxx-xx-xxxx" />
                                    </div>
                                    <div className="form-field col-md-3">
                                        <label className="section-label">Height</label>
                                        <input type="text" name="healthHeight" value={formData.healthHeight} onChange={handleInputChange} />
                                    </div>
                                    <div className="form-field col-md-3">
                                        <label className="section-label">Weight</label>
                                        <input type="text" name="healthWeight" value={formData.healthWeight} onChange={handleInputChange} />
                                    </div>
                                </div>

                                <p className="form-note"><strong>1. Do you have any of the following?</strong> (Check YES or NO)</p>

                                {/* Table-like structure for health conditions */}
                                <div className="health-checklist">
                                    {['Epilepsy (convulsions, seizures)', 'Diabetes (Medication?)', 'Marie-Strum Pell disease', 'Amputation of foot, leg, arm, or hand', 'Total loss of sight of one or both eyes', 'Parkinson’s disease', 'Herniated disk', 'Total deafness'].map((condition) => (
                                        <div className="row mb-1" key={condition}>
                                            <div className="col-8 form-note">{condition}</div>
                                            <div className="col-2 text-center"><input type="checkbox" name={`${condition}_yes`} /></div>
                                            <div className="col-2 text-center"><input type="checkbox" name={`${condition}_no`} /></div>
                                        </div>
                                    ))}
                                </div>

                                {/* Health Questionnaire Signature Pad */}
                                <div className="row align-items-end mt-4">
                                    <div className="form-field col-md-6">
                                        <label className="section-label">Signature <span className="required">*</span></label>
                                        <div className="signature-pad-container">
                                            <canvas
                                                ref={healthSignatureRef}
                                                width={500}
                                                height={200}
                                                className="signature-canvas"
                                                onMouseDown={(e) => startDrawing(e, healthSignatureRef)}
                                                onMouseMove={(e) => draw(e, healthSignatureRef)} 
                                                onMouseUp={stopDrawing}
                                                onMouseLeave={stopDrawing}
                                            />
                                            <button type="button" className="clear-signature-btn" onClick={() => clearSignature(healthSignatureRef)}>
                                                ↻
                                            </button>
                                        </div>
                                    </div>
                                    <div className="form-field col-md-3">
                                        <label className="section-label">TITLE</label>
                                        <input type="text" name="healthTitle" value={formData.healthTitle} onChange={handleInputChange} />
                                    </div>
                                    <div className="form-field col-md-3">
                                        <label className="section-label">DATE</label>
                                        <input type="date" name="healthDate" value={formData.healthDate} onChange={handleInputChange} />
                                    </div>
                                </div>
                            </div>

                        </>
                    )}
                    {currentStep === 12 && (
                        <>
                            <div className="form-section">
                                <h1 className="form-title">INFECTION CONTROL UNIVERSAL ISOLATION</h1>
                                <div className="row mb-4">
                                    <div className="col-12">
                                        <p className="form-note"><strong>POLICY:</strong></p>
                                        <p className="form-note">
                                            The procedures of “University Isolation” as recommended by the Center for Disease Control
                                            will be carried out.
                                        </p>
                                        <p className="form-note">
                                            “UNIVERSAL ISOLATION” precautions means that blood and body fluids precautions should
                                            be consistently used for all patients.
                                        </p>

                                        <p className="form-note"><strong>PROCEDURE:</strong></p>
                                        <ol className="form-note">
                                            <li>Gloves should be worn for touching blood and body fluids, mucous membranes, or non-intact skin for all patients, for handling items or surfaces soiled with blood or body fluids, and for performing venipuncture and other vascular access procedure.</li>
                                            <li>Masks and protective eye wear or face shields should be worn during procedures that are likely to generate droplets of blood or other body fluids to prevent exposure of mucous membranes of the mouth, nose, and eyes.</li>
                                            <li>Gowns or aprons should be worn during procedures that are likely to generate splashes of blood or other body fluids.</li>
                                            <li>Hands and other skin surfaces should be washed immediately and thoroughly if contaminated. Hands should be washed immediately after removing gloves.</li>
                                            <li>Needles should not be recapped, bent or broken by hand, removed from disposable syringes, or otherwise manipulated by hand.</li>
                                            <li>Mouthpieces, resuscitation bags, or other ventilation devices should be available for use in areas in which the need for resuscitation is Predictable.</li>
                                            <li>Health-care workers who have exudative lesion or weeping dermatitis should refrain from direct patient care and from handling patient-care equipment until the condition is resolved.</li>
                                        </ol>
                                    </div>
                                </div>

                                <div className="row align-items-end mt-4">
                                    <div className="form-field col-md-6">
                                        <label className="section-label">Signature <span className="required">*</span></label>
                                        <div className="signature-pad-container">
                                            <canvas
                                                ref={signatureRef}
                                                width={500}
                                                height={200}
                                                className="signature-canvas"
                                                onMouseDown={(e) => startDrawing(e, signatureRef)}
                                                onMouseMove={(e) => draw(e, signatureRef)}
                                                onMouseUp={stopDrawing}
                                                onMouseLeave={stopDrawing}
                                                onTouchStart={startDrawing}
                                                onTouchMove={draw}
                                                onTouchEnd={stopDrawing}
                                            />
                                            <button type="button" className="clear-signature-btn" onClick={clearSignature}>
                                                ↻
                                            </button>
                                        </div>
                                    </div>
                                    <div className="form-field col-md-3">
                                        <label className="section-label">Title</label>
                                        <input type="text" name="infectionControlTitle" value={formData.infectionControlTitle} onChange={handleInputChange} />
                                    </div>
                                    <div className="form-field col-md-3">
                                        <label className="section-label">Date</label>
                                        <input type="date" name="infectionControlDate" value={formData.infectionControlDate} onChange={handleInputChange} />
                                    </div>
                                </div>
                            </div>

                        </>
                    )}
                    {currentStep === 13 && (
                        <>
                            <div className="form-section">
                                <h1 className="form-title">POLICY STATEMENT</h1>
                                <div className="row mb-4">
                                    <div className="col-12">
                                        <p className="form-note">
                                            Title VI of the Civil Rights Act of 1964, Section 504 of the Rehabilitation Act of 1973 and the Age Discrimination Act of 1975.
                                        </p>
                                        <p className="form-note">
                                            QUALCARE NURSE REGISTRY agrees to comply with provisions of title VI of the Civil Rights Act of 1964, Section 504 of the Rehabilitation Act of 1973 and the Age Discrimination Act of 1975, and all requirements imposed pursuant thereto, to the end that no person shall on the grounds of race, color, national origin, handicap or age, be excluded from participation in, be denied benefits of, or otherwise be subjected to discrimination in the provisions of any care of services.
                                        </p>
                                        <p className="form-note">Specifically, the above includes (but is not limited to) the following characteristics:</p>
                                        <ol className="form-note">
                                            <li>Care will be provided in a manner that is not discriminated against person on the basis of race, color, national origin, handicap, or age.</li>
                                            <li>Employees will be assigned to clients services without regard to the race, color, national origin, handicap, or age of either the client or employee.</li>
                                            <li>Staff privileges will not be denied professionally qualified personnel on the basis of race, color, national origin, handicap or age.</li>
                                            <li>All facilities of the Registry will be utilized without regard to race, color, national origin, handicap or age.</li>
                                        </ol>
                                        <p className="form-note">
                                            The non-discriminatory policy of this Registry applies to clients, physicians, independent contractors and all responsible employees.
                                        </p>
                                    </div>
                                </div>

                                <h1 className="form-title">BIOHAZARDOUS WASTE MANAGEMENT ACKNOWLEDGMENT</h1>
                                <div className="row mb-4">
                                    <div className="col-12">
                                        <p className="form-note">APPLICANT ACKNOWLEDGMENT OF RECEIPT ON: RECOMMENDED METHOD OF HANDLING BIOMEDICAL WASTE</p>
                                        <ul className="form-note">
                                            <li>I have been verbally informed of the recommended method of handling biomedical waste generated in the home care setting.</li>
                                            <li>I have been given written material on "Safe Sharps Disposal at Home"</li>
                                            <li>I have been given written material on "Cleaning up after Injury or Accident in Your Home"</li>
                                            <li>QUALCARE NURSE REGISTRY has given me the chance to discuss my concern regarding biomedical waste management in my home.</li>
                                        </ul>
                                    </div>
                                </div>

                                <div className="row align-items-end mt-4">
                                    <div className="form-field col-md-6">
                                        <label className="section-label">Signature <span className="required">*</span></label>
                                        <div className="signature-pad-container">
                                            <canvas
                                                ref={policySignatureRef}
                                                width={500}
                                                height={200}
                                                className="signature-canvas"
                                                onMouseDown={(e) => startDrawing(e, policySignatureRef)}
                                                onMouseMove={(e) => draw(e, policySignatureRef)}
                                                onMouseUp={stopDrawing}
                                                onMouseLeave={stopDrawing}
                                            />
                                            <button type="button" className="clear-signature-btn" onClick={() => clearSignature(policySignatureRef)}>↻</button>
                                        </div>
                                    </div>
                                    <div className="form-field col-md-3">
                                        <label className="section-label">Title</label>
                                        <input type="text" name="policyTitle" value={formData.policyTitle} onChange={handleInputChange} />
                                    </div>
                                    <div className="form-field col-md-3">
                                        <label className="section-label">Date</label>
                                        <input type="date" name="policyDate" value={formData.policyDate} onChange={handleInputChange} />
                                    </div>
                                </div>
                            </div>
                        </>
                    )}
                    <div className="form-actions">
                        {currentStep !== 1 && (
                        <button
                            type="button"
                            className="btn-previous"
                            onClick={onBack}
                        >
                            Previous
                        </button>
)}
                        <button type="button" className="btn-save" onClick={handleSubmit}>Save</button>
                        {currentStep !== steps.length && (
        <button
            type="button"
            className="btn-next"
            onClick={handleNext}
        >
            Save & Next
        </button>
    )}

                    </div>
                </form>
            </div>
        </div>

    );
};

export default FinalApplicationForm;
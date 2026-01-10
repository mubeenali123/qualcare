import React, { useEffect, useRef, useState } from 'react';
import './ApplicationForm.css';
import 'bootstrap/dist/css/bootstrap.min.css';

const FinalApplicationForm2 = ({ }) => {
    const steps = [
        "HR Folder Checklist",
        "Employee Application #1",
        "Employee Application #2",
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
    const canvasRef = useRef(null);
    const policyCanvasRef = useRef(null);
    const healthCanvasRef = useRef(null);
    const progressWidth = (currentStep / steps.length) * 100;
    useEffect(() => {
        window.scrollTo({ top: 0, behavior: "smooth" });
    }, [currentStep]);

    const goToStep = (step) => {
        if (step < 1 || step > steps.length) return;
        setCurrentStep(step);
    };

    const onNext = () => {
        setCurrentStep(prev => Math.min(prev + 1, steps.length));
        window.scrollTo({
            top: 0,
            behavior: "smooth"
        });
    };
    const handleNext = (e) => {
        e.preventDefault();
        console.log('Form Data:', formData);
        onNext();
    };
    const handleSubmit = (e) => {
        e.preventDefault();
        alert('Form Submitted')
    };
    const onBack = () => {
        setCurrentStep(prev => Math.max(prev - 1, 1));

    };
    const startDrawing = (e) => setIsDrawing(true);
    const stopDrawing = (e) => setIsDrawing(false);
    const draw = (e) => {
        if (!isDrawing) return;
        const canvas = canvasRef.current;
        const ctx = canvas.getContext("2d");
        const rect = canvas.getBoundingClientRect();
        const x = e.clientX ? e.clientX - rect.left : e.touches[0].clientX - rect.left;
        const y = e.clientY ? e.clientY - rect.top : e.touches[0].clientY - rect.top;
        ctx.lineWidth = 2;
        ctx.lineCap = "round";
        ctx.strokeStyle = "black";
        ctx.lineTo(x, y);
        ctx.stroke();
        ctx.beginPath();
        ctx.moveTo(x, y);
    };
    const clearSignature = () => {
        const canvas = canvasRef.current;
        const ctx = canvas.getContext("2d");
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

    const [formData, setFormData] = useState({
        lastName: '',
        firstName: '',
        middleInitial: '',
        dob: '',
        ssn: '',
        presentAddress: '',
        presentCity: '',
        presentState: '',
        presentZip: '',
        permanentAddress: '',
        permanentCity: '',
        permanentState: '',
        permanentZip: '',
        homePhone: '',
        cellPhone: '',
        otherPhone: '',
        email: '',
        referredBy: '',

        // Contract Position Desired
        positionRN: false,
        positionLPN: false,
        positionCNA: false,
        positionHHA: false,
        positionCompanion: false,
        licenseNumber: '',
        licenseExpiration: '',
        dateCanStart: '',
        contractCompensation: '',

        // Employment Status
        employedNow: '',
        mayInquire: '',
        contractedBefore: '',
        whenContracted: '',
        unemployed: '',
        goingToSchool: '',
        physicalDisabilities: '',
        everInjured: '',

        // Emergency Contact
        emergencyName: '',
        emergencyRelationship: '',
        emergencyAddress: '',
        emergencyPhone: '',
        emergencyAltPhone: '',

        // Work Availability
        fullTime: false,
        partTime: false,
        days: false,
        nights: false,
        liveInWeekdays: false,
        liveOutWeekdays: false,
        liveInWeekends: false,
        liveOutWeekends: false,
        driversLicense: '',
        ownCar: '',

        // Languages
        languageEnglish: false,
        languageSpanish: false,
        languageOther: '',

        // Experience
        expAlzheimers: false,
        expStroke: false,
        expCatheter: false,
        expDementia: false,
        expHIV: false,
        expWheelchair: false,
        expBedridden: false,
        expLiftingPatients: false,
        expBrokenHip: false,
        expBypassSurgery: false,
        expFeedingTubes: false,
        expBreathingTreatments: false,
        expHearingVision: false,
        expCancer: false,
        expDiabeticDiet: false,
        expKosherDiet: false,
        expLowSaltDiet: false,
        expDehydration: false,
        expConstipation: false,
        expIncontinence: false,
        expHeartProblems: false,

        // Availability Schedule
        mondayFrom: '',
        mondayTo: '',
        mondayOvernight: '',
        tuesdayFrom: '',
        tuesdayTo: '',
        tuesdayOvernight: '',
        wednesdayFrom: '',
        wednesdayTo: '',
        wednesdayOvernight: '',
        thursdayFrom: '',
        thursdayTo: '',
        thursdayOvernight: '',
        fridayFrom: '',
        fridayTo: '',
        fridayOvernight: '',
        saturdayFrom: '',
        saturdayTo: '',
        saturdayOvernight: '',
        sundayFrom: '',
        sundayTo: '',
        sundayOvernight: '',

        // References
        reference1Name: '',
        reference1Address: '',
        reference1Phone: '',
        reference1Business: '',
        reference1YearsKnown: '',
        reference2Name: '',
        reference2Address: '',
        reference2Phone: '',
        reference2Business: '',
        reference2YearsKnown: '',
        reference3Name: '',
        reference3Address: '',
        reference3Phone: '',
        reference3Business: '',
        reference3YearsKnown: '',

        // Education
        grammarSchoolName: '',
        grammarSchoolLocation: '',
        grammarSchoolYears: '',
        grammarSchoolGraduated: '',
        grammarSchoolSubject: '',
        highSchoolName: '',
        highSchoolLocation: '',
        highSchoolYears: '',
        highSchoolGraduated: '',
        highSchoolSubject: '',
        collegeName: '',
        collegeLocation: '',
        collegeYears: '',
        collegeGraduated: '',
        collegeSubject: '',

        // Additional Education
        additionalEducation: '',

        // Former Employers
        employer1From: '',
        employer1To: '',
        employer1Name: '',
        employer1Earnings: '',
        employer1Position: '',
        employer1Reason: '',
        employer2From: '',
        employer2To: '',
        employer2Name: '',
        employer2Earnings: '',
        employer2Position: '',
        employer2Reason: '',
        employer3From: '',
        employer3To: '',
        employer3Name: '',
        employer3Earnings: '',
        employer3Position: '',
        employer3Reason: '',
        employer4From: '',
        employer4To: '',
        employer4Name: '',
        employer4Earnings: '',
        employer4Position: '',
        employer4Reason: ''
    });

    const handleInputChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFormData({
            ...formData,
            [name]: type === 'checkbox' ? checked : value
        });
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
                </div>



                {/* Progress Bar */}
                <div className="progress-bar">
                    <div className="progress-text">
                        Step {currentStep} of {steps.length}
                    </div>

                    <div className="progress-track">
                        <div className="progress-fill" style={{ width: `${progressWidth}%` }}></div>
                    </div>
                </div>

                <p className="required-note"><span className="required">*</span> indicates required fields</p>

                <form onSubmit={handleSubmit}>
                    {currentStep === 1 && (
                        <>
                            <div className="form-section">
                                <h1 className="form-title">Employment Eligibility Verification</h1>
                                <p className="form-note"><b>Department of Homeland Security</b> | U.S. Citizenship and Immigration Services</p>
                                <p className="form-note"><b>START HERE:</b> Employers must ensure the form instructions are available to employees when completing this form. Employers are liable for failing to comply with the requirements for completing this form.</p>
                                <p className="form-note"><b>ANTI-DISCRIMINATION NOTICE:</b> All employees can choose which acceptable documentation to present for Form I-9. Employers cannot ask
                                    employees for documentation to verify information in Section 1, or specify which acceptable documentation employees must present for Section 2 or
                                    Supplement B, Reverification and Rehire. Treating employees differently based on their citizenship, immigration status, or national origin may be illegal. </p>
                            </div>

                            {/* Section 1: Employee Information and Attestation */}
                            <div className="form-section">
                                <h1 className="form-title">Section 1. Employee Information and Attestation</h1>
                                <p className="form-note">Employees must complete and sign Section 1 of Form I-9 no later than the <b>first day of employment</b>, but not before accepting a job offer.</p>

                                <div className="row">
                                    <div className="form-field col-md-3">
                                        <label className="section-label">Last Name (Family Name) <span className="required">*</span></label>
                                        <input type="text" name="lastName" value={formData.lastName} onChange={handleInputChange} required />
                                    </div>
                                    <div className="form-field col-md-3">
                                        <label className="section-label">First Name (Given Name) <span className="required">*</span></label>
                                        <input type="text" name="firstName" value={formData.firstName} onChange={handleInputChange} required />
                                    </div>
                                    <div className="form-field col-md-2">
                                        <label className="section-label">Middle Initial</label>
                                        <input type="text" name="middleInitial" value={formData.middleInitial} onChange={handleInputChange} />
                                    </div>
                                    <div className="form-field col-md-4">
                                        <label className="section-label">Other Last Names Used (if any)</label>
                                        <input type="text" name="otherNames" value={formData.otherNames} onChange={handleInputChange} />
                                    </div>
                                </div>

                                <div className="row">
                                    <div className="form-field col-md-6">
                                        <label className="section-label">Address (Street Number and Name) <span className="required">*</span></label>
                                        <input type="text" name="address" value={formData.address} onChange={handleInputChange} required />
                                    </div>
                                    <div className="form-field col-md-2">
                                        <label className="section-label">Apt. Number</label>
                                        <input type="text" name="aptNumber" value={formData.aptNumber} onChange={handleInputChange} />
                                    </div>
                                    <div className="form-field col-md-2">
                                        <label className="section-label">City or Town <span className="required">*</span></label>
                                        <input type="text" name="city" value={formData.city} onChange={handleInputChange} required />
                                    </div>
                                    <div className="form-field col-md-1">
                                        <label className="section-label">State <span className="required">*</span></label>
                                        <input type="text" name="state" value={formData.state} onChange={handleInputChange} required />
                                    </div>
                                    <div className="form-field col-md-1">
                                        <label className="section-label">ZIP <span className="required">*</span></label>
                                        <input type="text" name="zip" value={formData.zip} onChange={handleInputChange} required />
                                    </div>
                                </div>

                                <div className="row">
                                    <div className="form-field col-md-3">
                                        <label className="section-label">Date of Birth (mm/dd/yyyy) <span className="required">*</span></label>
                                        <input type="date" name="dob" value={formData.dob} onChange={handleInputChange} required />
                                    </div>
                                    <div className="form-field col-md-3">
                                        <label className="section-label">U.S. Social Security Number <span className="required">*</span></label>
                                        <input type="text" name="ssn" value={formData.ssn} onChange={handleInputChange} required />
                                    </div>
                                    <div className="form-field col-md-3">
                                        <label className="section-label">Employee's Email Address</label>
                                        <input type="email" name="email" value={formData.email} onChange={handleInputChange} />
                                    </div>
                                    <div className="form-field col-md-3">
                                        <label className="section-label">Employee's Telephone Number</label>
                                        <input type="tel" name="phone" value={formData.phone} onChange={handleInputChange} />
                                    </div>
                                </div>

                                <div className="attestation-box mt-4">
                                    <p className="form-note">I am aware that federal law
                                        provides for imprisonment and/or
                                        fines for false statements, or the
                                        use of false documents, in
                                        connection with the completion of
                                        this form. I attest, under penalty
                                        of perjury, that this information,
                                        including my selection of the box
                                        attesting to my citizenship or
                                        immigration status, is true and
                                        correct. </p>

                                    <div className="radio-group-vertical">
                                        <label className="radio-label">
                                            <input type="radio" name="citizenshipStatus" value="citizen" checked={formData.citizenshipStatus === 'citizen'} onChange={handleInputChange} />
                                            <span>1. A citizen of the United States</span>
                                        </label>
                                        <label className="radio-label">
                                            <input type="radio" name="citizenshipStatus" value="noncitizen_national" checked={formData.citizenshipStatus === 'noncitizen_national'} onChange={handleInputChange} />
                                            <span>2. A noncitizen national of the United States</span>
                                        </label>
                                        <label className="radio-label">
                                            <input type="radio" name="citizenshipStatus" value="permanent_resident" checked={formData.citizenshipStatus === 'permanent_resident'} onChange={handleInputChange} />
                                            <span>3. A lawful permanent resident (Enter USCIS or A-Number)</span>
                                        </label>
                                        <div className="form-field col-md-3">
                                            <input type="text" className="mb-3 mt-3" name="uscisNumber" placeholder="USCIS/A-Number" value={formData.uscisNumber} onChange={handleInputChange} />
                                        </div>

                                        <label className="radio-label">
                                            <input
                                                type="radio"
                                                name="citizenshipStatus"
                                                value="authorized_to_work"
                                                checked={formData.citizenshipStatus === "authorized_to_work"}
                                                onChange={handleInputChange}
                                            />
                                            <span>4. A noncitizen authorized to work until (exp. date, if any)</span>
                                        </label>

                                        <div className="row mt-2">
                                            <div className="form-field col-md-3">
                                                <label className="section-label">Work Authorization Expiration Date</label>
                                                <input
                                                    type="date"
                                                    name="workAuthExpiry"
                                                    value={formData.workAuthExpiry}
                                                    onChange={handleInputChange}
                                                />
                                            </div>
                                        </div>

                                        {/* REQUIRED NOTE FOR ITEM 4 */}
                                        <p className="form-note mt-2">
                                            If you check Item Number 4., enter <b>one</b> of the following:
                                        </p>

                                        <div className="row">
                                            <div className="form-field col-md-3">
                                                <label className="section-label">USCIS A-Number</label>
                                                <input
                                                    type="text"
                                                    name="uscisNumber"
                                                    value={formData.uscisNumber}
                                                    onChange={handleInputChange}
                                                />
                                            </div>

                                            <div className="form-field col-md-3">
                                                <label className="section-label">Form I-94 Admission Number</label>
                                                <input
                                                    type="text"
                                                    name="i94Number"
                                                    value={formData.i94Number}
                                                    onChange={handleInputChange}
                                                />
                                            </div>

                                            <div className="form-field col-md-3">
                                                <label className="section-label">Foreign Passport Number</label>
                                                <input
                                                    type="text"
                                                    name="passportNumber"
                                                    value={formData.passportNumber}
                                                    onChange={handleInputChange}
                                                />
                                            </div>

                                            <div className="form-field col-md-3">
                                                <label className="section-label">Country of Issuance</label>
                                                <input
                                                    type="text"
                                                    name="passportCountry"
                                                    value={formData.passportCountry}
                                                    onChange={handleInputChange}
                                                />
                                            </div>
                                        </div>

                                    </div>
                                </div>

                                <div className="row mt-4">
                                    <div className="col-md-6">
                                        <label className="section-label">Signature of Employee</label>
                                        <div className="signature-pad-container">
                                            <canvas
                                                ref={canvasRef}
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
                                            <button type="button" className="clear-signature-btn" onClick={clearSignature}>↻</button>
                                        </div>
                                    </div>
                                    <div className="form-field col-md-6">
                                        <label className="section-label">Today's Date (mm/dd/yyyy)</label>
                                        <input type="date" name="signatureDate" value={formData.signatureDate} onChange={handleInputChange} />
                                    </div>
                                </div>
                            </div>
                        </>
                    )}
                    {currentStep === 1 && (
                        <>
                           <div className="form-section">
    <h1 className="form-title">Section 2. Employer Review and Verification</h1>
    <p className="form-note">
        Employers or their authorized representative must complete and sign <b>Section 2</b> within three business days after the employee's first day of employment, and must physically examine, or examine consistent with an alternative procedure authorized by the Secretary of DHS, documentation from List A OR a combination of documentation from List B and List C. Enter any additional documentation in the Additional Information box; see Instructions.
    </p>

    {/* Header Row for Document Lists */}
    <div className="row mb-2">
        <div className="col-md-4"><h1 className='section-label text-center'>List A</h1></div>
        <div className="col-md-1 text-center d-flex align-items-center justify-content-center"><b>OR</b></div>
        <div className="col-md-3"><h1 className='section-label text-center'>List B</h1></div>
        <div className="col-md-1 text-center d-flex align-items-center justify-content-center"><b>AND</b></div>
        <div className="col-md-3"><h1 className='section-label text-center'>List C</h1></div>
    </div>

    <div className="row">
        {/* List A Column - Documents 1, 2, and 3 */}
        <div className="col-md-4 border-end">
            {[1, 2, 3].map((num) => (
                <div key={`listA-${num}`} className="mb-4">
                    <div className="form-field mb-2">
                        <label className="section-label"><b>Document Title {num} {num > 1 ? '(if any)' : ''}</b></label>
                        <input type="text" name={`listADocTitle${num}`} value={formData[`listADocTitle${num}`]} onChange={handleInputChange} />
                    </div>
                    <div className="form-field mb-2">
                        <label className="section-label">Issuing Authority</label>
                        <input type="text" name={`listAIssuing${num}`} value={formData[`listAIssuing${num}`]} onChange={handleInputChange} />
                    </div>
                    <div className="form-field mb-2">
                        <label className="section-label">Document Number (if any)</label>
                        <input type="text" name={`listADocNum${num}`} value={formData[`listADocNum${num}`]} onChange={handleInputChange} />
                    </div>
                    <div className="form-field mb-2">
                        <label className="section-label">Expiration Date (if any)</label>
                        <input type="date" name={`listAExpDate${num}`} value={formData[`listAExpDate${num}`]} onChange={handleInputChange} />
                    </div>
                </div>
            ))}
        </div>

        {/* List B and C Column + Additional Info */}
        <div className="col-md-8">
            <div className="row">
                {/* List B */}
                <div className="col-md-6 border-end">
                    <div className="form-field mb-2">
                        <label className="section-label"><b>Document Title</b></label>
                        <input type="text" name="listBDocTitle" value={formData.listBDocTitle} onChange={handleInputChange} />
                    </div>
                    <div className="form-field mb-2">
                        <label className="section-label">Issuing Authority</label>
                        <input type="text" name="listBIssuing" value={formData.listBIssuing} onChange={handleInputChange} />
                    </div>
                    <div className="form-field mb-2">
                        <label className="section-label">Document Number (if any)</label>
                        <input type="text" name="listBDocNum" value={formData.listBDocNum} onChange={handleInputChange} />
                    </div>
                    <div className="form-field mb-2">
                        <label className="section-label">Expiration Date (if any)</label>
                        <input type="date" name="listBExpDate" value={formData.listBExpDate} onChange={handleInputChange} />
                    </div>
                </div>
                {/* List C */}
                <div className="col-md-6">
                    <div className="form-field mb-2">
                        <label className="section-label"><b>Document Title</b></label>
                        <input type="text" name="listCDocTitle" value={formData.listCDocTitle} onChange={handleInputChange} />
                    </div>
                    <div className="form-field mb-2">
                        <label className="section-label">Issuing Authority</label>
                        <input type="text" name="listCIssuing" value={formData.listCIssuing} onChange={handleInputChange} />
                    </div>
                    <div className="form-field mb-2">
                        <label className="section-label">Document Number (if any)</label>
                        <input type="text" name="listCDocNum" value={formData.listCDocNum} onChange={handleInputChange} />
                    </div>
                    <div className="form-field mb-2">
                        <label className="section-label">Expiration Date (if any)</label>
                        <input type="date" name="listCExpDate" value={formData.listCExpDate} onChange={handleInputChange} />
                    </div>
                </div>
            </div>

            {/* Additional Information Box */}
            <div className="form-field mt-3">
                <label className="section-label"><b>Additional Information</b></label>
                <textarea 
                    name="additionalInfo"  
                    rows="8" 
                    value={formData.additionalInfo} 
                    onChange={handleInputChange}
                ></textarea>
                <div className="mt-2">
                    <label className="checkbox-label">
                        <input 
                            type="checkbox" 
                            name="altProcedure" 
                            checked={formData.altProcedure} 
                            onChange={handleInputChange} 
                        />
                        <span className="ms-2">Check here if you used an alternative procedure authorized by DHS to examine documents.</span>
                    </label>
                </div>
            </div>
        </div>
    </div>

    {/* Employer Certification Area */}
    <div className="certification-box mt-4 border p-3">
        <p className="form-note">
            <b>Certification:</b> I attest, under penalty of perjury, that (1) I have examined the documentation presented by the above-named employee, (2) the above-listed documentation appears to be genuine and to relate to the employee named, and (3) to the best of my knowledge, the employee is authorized to work in the United States.
        </p>
        
        <div className="row">
            <div className="form-field col-md-9">
                <label className="section-label">First Day of Employment (mm/dd/yyyy)</label>
                <input type="date" name="firstDayOfEmployment" value={formData.firstDayOfEmployment} onChange={handleInputChange} />
            </div>
        </div>

        <div className="row mt-3">
            <div className="form-field col-md-4">
                <label className="section-label">Last Name, First Name and Title of Employer or Authorized Representative</label>
                <input type="text" name="employerNameTitle" value={formData.employerNameTitle} onChange={handleInputChange} />
            </div>
            <div className="col-md-4">
                <label className="section-label">Signature of Employer or Authorized Representative</label>
                <div className="signature-pad-container">
                    <canvas
                        ref={canvasRef}
                        width={500}
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
                    <button type="button" className="clear-signature-btn" onClick={clearSignature}>↻</button>
                </div>
            </div>
            <div className="form-field col-md-4">
                <label className="section-label">Today's Date (mm/dd/yyyy)</label>
                <input type="date" name="employerTodayDate" value={formData.employerTodayDate} onChange={handleInputChange} />
            </div>
        </div>

        <div className="row mt-3">
            <div className="form-field col-md-5">
                <label className="section-label">Employer's Business or Organization Name</label>
                <input type="text" name="businessName" value={formData.businessName} onChange={handleInputChange} />
            </div>
            <div className="form-field col-md-7">
                <label className="section-label">Employer's Business or Organization Address, City or Town, State, ZIP Code</label>
                <input type="text" name="businessAddressFull" value={formData.businessAddressFull} onChange={handleInputChange} />
            </div>
        </div>
    </div>
    
    <p className="form-note text-center mt-3">
        For reverification or rehire, complete <b>Supplement B, Reverification and Rehire</b> on Page 4.
    </p>
</div>
                        </>
                    )}
                    {currentStep === 2 && (
                        <>
                        <div className="form-section">
                <div className="row">
                    <div className="col-md-2 border-end">
                        <p className="form-note">Form <b>W-9</b></p>
                        <p className="form-note">(Rev. October 2018)</p>
                        <p className="form-note">Department of the Treasury Internal Revenue Service</p>
                    </div>
                    <div className="col-md-8 text-center">
                        <h1 className="form-title">Request for Taxpayer Identification Number and Certification</h1>
                        <p className="form-note">▶ Go to <b>www.irs.gov/FormW9</b> for instructions and the latest information.</p>
                    </div>
                    <div className="col-md-2 border-start">
                        <p className="form-note"><b>Give Form to the requester. Do not send to the IRS.</b></p>
                    </div>
                </div>
            </div>

            {/* Identification Section */}
            <div className="form-section">
                <div className="form-field mb-2">
                    <label className="section-label">1 Name (as shown on your income tax return). Name is required on this line; do not leave this line blank.</label>
                    <input type="text" name="w9Name" value={formData.w9Name} onChange={handleInputChange} />
                </div>

                <div className="form-field mb-2">
                    <label className="section-label">2 Business name/disregarded entity name, if different from above</label>
                    <input type="text" name="businessName" value={formData.businessName} onChange={handleInputChange} />
                </div>

                <div className="row">
                    <div className="col-md-8">
                        <label className="section-label">3 Check appropriate box for federal tax classification of the person whose name is entered on line 1. Check only <b>one</b> of the following seven boxes.</label>
                        <div className="radio-group flex-wrap">
                            <label className="radio-label">
                                <input type="radio" name="taxClass" value="individual" checked={formData.taxClass === 'individual'} onChange={handleInputChange} />
                                <span>Individual/sole proprietor or single-member LLC</span>
                            </label>
                            <label className="radio-label">
                                <input type="radio" name="taxClass" value="c-corp" checked={formData.taxClass === 'c-corp'} onChange={handleInputChange} />
                                <span>C Corporation</span>
                            </label>
                            <label className="radio-label">
                                <input type="radio" name="taxClass" value="s-corp" checked={formData.taxClass === 's-corp'} onChange={handleInputChange} />
                                <span>S Corporation</span>
                            </label>
                            <label className="radio-label">
                                <input type="radio" name="taxClass" value="partnership" checked={formData.taxClass === 'partnership'} onChange={handleInputChange} />
                                <span>Partnership</span>
                            </label>
                            <label className="radio-label">
                                <input type="radio" name="taxClass" value="trust" checked={formData.taxClass === 'trust'} onChange={handleInputChange} />
                                <span>Trust/estate</span>
                            </label>
                        </div>
                        <div className="form-field mt-2">
                            <label className="radio-label">
                                <input type="radio" name="taxClass" value="llc" checked={formData.taxClass === 'llc'} onChange={handleInputChange} />
                                <span>Limited liability company. Enter the tax classification (C=C corporation, S=S corporation, P=Partnership)</span>
                            </label>
                            <div className='form-field col-md-4 mt-3'>

                            <input type="text" name="llcClassification" value={formData.llcClassification} onChange={handleInputChange} />
                            </div>
                        </div>
                        <p className="form-note mt-2"><b>Note:</b> Check the appropriate box in the line above for the tax classification of the single-member owner.  Do not check 
LLC if the LLC is classified as a single-member LLC that is disregarded from the owner unless the owner of the LLC is 
another LLC that is not disregarded from the owner for U.S. federal tax purposes. Otherwise, a single-member LLC that 
is disregarded from the owner should check the appropriate box for the tax classification of its owner.</p>
                    </div>

                    <div className="col-md-4 border-start">
                        <div className="form-field mb-2">
                            <label className="section-label">4 Exemptions (codes apply only to certain entities):</label>
                            <div className="row">
                                <div className="form-field col-md-12">
                                    <label className="section-label">Exempt payee code (if any)</label>
                                    <input type="text" name="exemptPayee" value={formData.exemptPayee} onChange={handleInputChange} />
                                </div>
                                <div className="form-field col-md-12 mt-2">
                                    <label className="section-label">Exemption from FATCA reporting code (if any)</label>
                                    <input type="text" name="fatcaCode" value={formData.fatcaCode} onChange={handleInputChange} />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="row mt-3">
                    <div className="form-field col-md-8">
                        <label className="section-label">5 Address (number, street, and apt. or suite no.)</label>
                        <input type="text" name="w9Address" value={formData.w9Address} onChange={handleInputChange} />
                    </div>
                    <div className="form-field col-md-4">
                        <label className="section-label">Requester’s name and address (optional)</label>
                        <textarea name="requesterAddress" rows="2" value={formData.requesterAddress} onChange={handleInputChange}></textarea>
                    </div>
                </div>

                <div className="row">
                    <div className="form-field col-md-8">
                        <label className="section-label">6 City, state, and ZIP code</label>
                        <input type="text" name="w9CityStateZip" value={formData.w9CityStateZip} onChange={handleInputChange} />
                    </div>
                    <div className="form-field col-md-4">
                        <label className="section-label">7 List account number(s) here (optional)</label>
                        <input type="text" name="accountNumbers" value={formData.accountNumbers} onChange={handleInputChange} />
                    </div>
                </div>
            </div>

            {/* Part I: TIN */}
            <div className="form-section">
                <h1 className="form-title">Part I: Taxpayer Identification Number (TIN)</h1>
                <p className="form-note">Enter your TIN in the appropriate box. The TIN provided must match the name given on line 1 to avoid 
backup withholding. For individuals, this is generally your social security number (SSN). However, for a 
resident alien, sole proprietor, or disregarded entity, see the instructions for Part I, later. For other 
entities, it is your employer identification number (EIN). If you do not have a number, see How to get a 
TIN, later.</p>
<p className='form-note'><b>Note:</b> If the account is in more than one name, see the instructions for line 1. Also see What Name and 
Number To Give the Requester for guidelines on whose number to enter.</p>
                <div className="row align-items-center">
                    <div className="col-md-5">
                        <label className="section-label"><b>Social security number</b></label>
                        <div className="row">
                            <div className='form-field col-md-4'>

                            <input type="text" maxLength="3" name="ssn1" value={formData.ssn1} onChange={handleInputChange} />
                            </div>
                            <div className='form-field col-md-4'>

                            <input type="text" maxLength="2" name="ssn2" value={formData.ssn2} onChange={handleInputChange} />
                            </div>
                            <div className='form-field col-md-4'>
                            <input type="text" maxLength="4" name="ssn3" value={formData.ssn3} onChange={handleInputChange} />
                            </div>
                                
                        </div>
                    </div>
                    <div className="col-md-2 text-center"><b>OR</b></div>
                    <div className="col-md-5">
                        <label className="section-label"><b>Employer identification number</b></label>
                        <div className="row">
                            <div className='form-field col-md-6'>

                            <input type="text" maxLength="2" name="ein1" value={formData.ein1} onChange={handleInputChange} />
                            </div>
<div className='form-field col-md-6'>

                            <input type="text" maxLength="7" name="ein2" value={formData.ein2} onChange={handleInputChange} />
</div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Part II: Certification */}
            <div className="form-section">
                <h1 className="form-title">Part II: Certification</h1>
                <p className="form-note">Under penalties of perjury, I certify that:</p>
                <p className="form-note">1. The number shown on this form is my correct taxpayer identification number (or I am waiting for a number to be issued to me); and</p>
                <p className="form-note">2.  I am not subject to backup withholding because: (a) I am exempt from backup withholding, or (b) I have not been notified by the Internal Revenue
Service (IRS) that I am subject to backup withholding as a result of a failure to report all interest or dividends, or (c) the IRS has notified me that I am
no longer subject to backup withholding; and</p>
                <p className="form-note">3.  I am a U.S. citizen or other U.S. person (defined below); and</p>
                <p className="form-note">4. The FATCA code(s) entered on this form (if any) indicating that I am exempt from FATCA reporting is correct.</p>
                
                <div className="certification-instruction mt-2">
                    <p className="form-note"><b>Certification instructions.</b>  You must cross out item 2 above if you have been notified by the IRS that you are currently subject to backup withholding because 
you have failed to report all interest and dividends on your tax return. For real estate transactions, item 2 does not apply. For mortgage interest paid, 
acquisition or abandonment of secured property, cancellation of debt, contributions to an individual retirement arrangement (IRA), and generally, payments 
other than interest and dividends, you are not required to sign the certification, but you must provide your correct TIN. See the instructions for Part II, later.</p>
                </div>

                <div className="row mt-4 align-items-center">
                    <div className="col-md-6">
                        <label className="section-label"><b>Sign Here: Signature of U.S. person</b></label>
                        <div className="signature-pad-container">
                            <canvas
                                ref={canvasRef}
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
                            <button type="button" className="clear-signature-btn" onClick={clearSignature}>↻</button>
                        </div>
                    </div>
                    <div className="form-field col-md-6">
                        <label className="section-label"><b>Date</b></label>
                        <input type="date" name="w9SignDate" value={formData.w9SignDate} onChange={handleInputChange} />
                    </div>
                </div>
            </div>
            {/* General Instructions Section */}
            <div className="form-section">
                <h1 className="form-title">General Instructions</h1>
                <p className="form-note">
                    Section references are to the Internal Revenue Code unless otherwise noted.
                </p>
                <p className="form-note">
                    <b>Future developments.</b> For the latest information about developments related to Form W-9 and its instructions, such as legislation enacted after they were published, go to <b>www.irs.gov/FormW9</b>.
                </p>

                <h1 className="form-title mt-3">Purpose of Form</h1>
                <p className="form-note">
                    An individual or entity (Form W-9 requester) who is required to file an information return with the IRS must obtain your correct taxpayer identification number (TIN) which may be your social security number (SSN), individual taxpayer identification number (ITIN), adoption taxpayer identification number (ATIN), or employer identification number (EIN), to report on an information return the amount paid to you, or other amount reportable on an information return. Examples of information returns include, but are not limited to, the following.
                </p>

                <div className="row">
                    <div className="col-md-6">
                        <ul className="form-note">
                            <li><b>Form 1099-INT</b> (interest earned or paid)</li>
                            <li><b>Form 1099-DIV</b> (dividends, including those from stocks or mutual funds)</li>
                            <li><b>Form 1099-MISC</b> (various types of income, prizes, awards, or gross proceeds)</li>
                            <li><b>Form 1099-B</b> (stock or mutual fund sales and certain other transactions by brokers)</li>
                            <li><b>Form 1099-S</b> (proceeds from real estate transactions)</li>
                            <li><b>Form 1099-K</b> (merchant card and third party network transactions)</li>
                        </ul>
                    </div>
                    <div className="col-md-6">
                        <ul className="form-note">
                            <li><b>Form 1098</b> (home mortgage interest), <b>1098-E</b> (student loan interest), <b>1098-T</b> (tuition)</li>
                            <li><b>Form 1099-C</b> (canceled debt)</li>
                            <li><b>Form 1099-A</b> (acquisition or abandonment of secured property)</li>
                        </ul>
                    </div>
                </div>

                <p className="form-note mt-2">
                    Use Form W-9 only if you are a U.S. person (including a resident alien), to provide your correct TIN.
                </p>
                <p className="form-note">
                    If you do not return Form W-9 to the requester with a TIN, you might be subject to backup withholding. See <i>What is backup withholding</i>, later.
                </p>
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
                        <button type="button" className="btn-save">Save</button>
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

export default FinalApplicationForm2;
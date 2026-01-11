import React, { useEffect, useRef, useState } from 'react';
import './ApplicationForm.css';
import 'bootstrap/dist/css/bootstrap.min.css';

const FinalApplicationForm2 = ({ }) => {
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
                        <h1 className="form-title text-center">Request for Taxpayer Identification Number and Certification</h1>
                        <p className="form-note">Go to <b>www.irs.gov/FormW9</b> for instructions and the latest information.</p>
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
                    {currentStep === 3 && (
                        <>
                      <div className="form-section text-center">
                <h1 className="form-title">ATTESTATION OF COMPLIANCE</h1>
                <h2 className="form-subtitle">With Background Screening Requirements</h2>
            </div>

            {/* Authority Section */}
            <div className="form-section">
                <div className="authority-box p-3" style={{ backgroundColor: '#f4f4f2' }}>
                    <p className="form-note">
                        <b>Authority:</b> This form may be used by <b>all employees</b> to comply with:
                    </p>
                    <ul className="form-note">
                        <li>
                            the attestation requirements of <b>section 435.05(2), Florida Statutes</b>, which state that every employee required 
                            to undergo Level 2 background screening must attest, subject to penalty of perjury, to meeting the 
                            requirements for qualifying for employment pursuant to this chapter and agreeing to inform the employer 
                            immediately if arrested for any of the disqualifying offenses while employed by the employer; <b>AND</b>
                        </li>
                        <li className="mt-2">
                            the proof of screening within the previous 5 years in <b>section 408.809(2), Florida Statutes</b> which requires proof 
                            of compliance with level 2 screening standards that have been screened through the Care Provider Background 
                            Screening Clearinghouse created under Section 435.12, F.S., or screened within the previous 5 years by the 
                            Agency, Department of Health, Department of Elder Affairs, the Agency for Persons with Disabilities, 
                            Department of Children and Families, or the Department of Financial Services for an applicant for a certificate 
                            of authority to operate a continuing care retirement community under Chapter 651, F.S., and in accordance 
                            with the standards in Section 408.809(2), F.S., if that agency is not currently implemented in the Care Provider 
                            Background Screening Clearinghouse.
                        </li>
                    </ul>
                    <p className="form-note mt-3">
                        <i><b>This form must be maintained in the employee's personnel file.</b> If this form is used as proof of screening for an 
                        administrator or chief financial officer to satisfy the requirements of an <u><b>application for a health care provider 
                        license</b></u>, please attach a copy of the screening results and submit with the licensure application.</i>
                    </p>
                </div>
            </div>
            <div className="form-section">
                <div className="row mb-2">
                    <div className="form-field col-md-4">
                        <label className="section-label mb-0"><b>Employee/Contractor Name:</b></label>
                        <input type="text" name="attestationEmployeeName" value={formData.attestationEmployeeName} onChange={handleInputChange} />
                    </div>
                
                    <div className="form-field col-md-4">
                        <label className="section-label mb-0"><b>Health Care Provider/ Employer Name:</b></label>
                        <input type="text" name="attestationEmployerName" value={formData.attestationEmployerName} onChange={handleInputChange} />
                    </div>
                    <div className="form-field col-md-4">
                        <label className="section-label mb-0"><b>Address of Health Care Provider:</b></label>
                        <input type="text" name="attestationProviderAddress" value={formData.attestationProviderAddress} onChange={handleInputChange} />
                    </div>
                    </div>
            </div>
            <div className="form-section">
                <p className="form-note">
                    I hereby attest to meeting the requirements for employment and that I have not been arrested for <del>or</del> <u>and</u> 
                    been found guilty of, regardless of adjudication, or entered a plea of nolo contendere, or guilty to any 
                    offense, or have an arrest awaiting a final disposition prohibited under any of the following provisions of 
                    the Florida Statutes or under any similar statute of another jurisdiction:
                </p>

                <div className="row mt-3">
                    <div className="col-md-6">
                        <p className="form-note"><u><b>Criminal offenses found in section 435.04, F.S.</b></u></p>
                        <p className="form-note">(a) Section <u>393.135</u>, relating to sexual misconduct with certain developmentally disabled clients and reporting of such sexual misconduct.</p>
                        <p className="form-note">(b) Section <u>394.4593</u>, relating to sexual misconduct with certain mental health patients and reporting of such sexual misconduct.</p>
                        <p className="form-note">(c) Section <u>415.111</u>, relating to adult abuse, neglect, or exploitation of aged persons or disabled adults.</p>
                        <p className="form-note">(d) Section <u>777.04</u>, relating to attempts, solicitation, and conspiracy to commit an offense listed in this subsection.</p>
                        <p className="form-note">(e) Section <u>782.04</u>, relating to murder.</p>
                    </div>
                    <div className="col-md-6 mt-md-4">
                        <p className="form-note">(f) Section <u>782.07</u>, relating to manslaughter, aggravated manslaughter of an elderly person or disabled adult, or aggravated manslaughter of a child.</p>
                        <p className="form-note">(g) Section <u>782.071</u>, relating to vehicular homicide.</p>
                        <p className="form-note">(h) Section <u>782.09</u>, relating to killing of an unborn quick child by injury to the mother.</p>
                        <p className="form-note">(i) Chapter 784, relating to assault, battery, and culpable negligence, if the offense was a felony.</p>
                        <p className="form-note">(j) Section <u>784.011</u>, relating to assault, if the victim of the offense was a minor.</p>
                        <p className="form-note">(k) Section <u>784.03</u>, relating to battery, if the victim of the offense was a minor.</p>
                    </div>
                </div>
            </div>
            <div className="form-section border-top pt-4">
                <div className="row align-items-end">
                    <div className="col-md-6">
                        <label className="section-label"><b>Signature of Employee/Contractor</b></label>
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
                            <button type="button" className="clear-signature-btn" onClick={clearSignature}>
                                ↻
                            </button>
                        </div>
                    </div>
                    <div className="form-field col-md-6">
                        <label className="section-label"><b>Date</b></label>
                        <input type="date" name="attestationDate" value={formData.attestationDate} onChange={handleInputChange} />
                    </div>
                </div>
            </div>
                        </>
                    )}
                    {currentStep === 4 && (
                        <>
                        <div className="form-section">
                <div className="row">
                    {/* Left Column */}
                    <div className="col-md-6">
                        <p className="form-note">(m) Section <u>787.02</u>, relating to false imprisonment.</p>
                        <p className="form-note">(n) Section <u>787.025</u>, relating to luring or enticing a child.</p>
                        <p className="form-note">(o) Section <u>787.04(2)</u>, relating to taking, enticing, or removing a child beyond the state limits with criminal intent pending custody proceedings.</p>
                        <p className="form-note">(p) Section <u>787.04(3)</u>, relating to carrying a child beyond the state lines with criminal intent to avoid producing a child at a custody hearing or delivering the child to the designated person.</p>
                        <p className="form-note">(q) Section <u>790.115(1)</u>, relating to exhibiting firearms or weapons within 1,000 feet of a school.</p>
                        <p className="form-note">(r) Section <u>790.115(2)(b)</u>, relating to possessing an electric weapon or device, destructive device, or other weapon on school property.</p>
                        <p className="form-note">(s) Section <u>794.011</u>, relating to sexual battery.</p>
                        <p className="form-note">(t) Former s. <u>794.041</u>, relating to prohibited acts of persons in familial or custodial authority.</p>
                        <p className="form-note">(u) Section <u>794.05</u>, relating to unlawful sexual activity with certain minors.</p>
                        <p className="form-note">(v) Chapter 796, relating to prostitution.</p>
                        <p className="form-note">(w) Section <u>798.02</u>, relating to lewd and lascivious behavior.</p>
                        <p className="form-note">(x) Chapter 800, relating to lewdness and indecent exposure.</p>
                        <p className="form-note">(y) Section <u>806.01</u>, relating to arson.</p>
                        <p className="form-note">(z) Section <u>810.02</u>, relating to burglary.</p>
                        <p className="form-note">(aa) Section <u>810.14</u>, relating to voyeurism, if the offense is a felony.</p>
                        <p className="form-note">(bb) Section <u>810.145</u>, relating to video voyeurism, if the offense is a felony.</p>
                        <p className="form-note">(cc) Chapter 812, relating to theft, robbery, and related crimes, if the offense is a felony.</p>
                        <p className="form-note">(dd) Section <u>817.563</u>, relating to fraudulent sale of controlled substances, only if the offense was a felony.</p>
                        <p className="form-note">(ee) Section <u>825.102</u>, relating to abuse, aggravated abuse, or neglect of an elderly person or disabled adult.</p>
                        <p className="form-note">(ff) Section <u>825.1025</u>, relating to lewd or lascivious offenses committed upon or in the presence of an elderly person or disabled adult.</p>
                        <p className="form-note">(gg) Section <u>825.103</u>, relating to exploitation of an elderly person or disabled adult, if the offense was a felony.</p>
                    </div>

                    {/* Right Column */}
                    <div className="col-md-6">
                        <p className="form-note">(hh) Section <u>826.04</u>, relating to incest.</p>
                        <p className="form-note">(ii) Section <u>827.03</u>, relating to child abuse, aggravated child abuse, or neglect of a child.</p>
                        <p className="form-note">(jj) Section <u>827.04</u>, relating to contributing to the delinquency or dependency of a child.</p>
                        <p className="form-note">(kk) Former s. <u>827.05</u>, relating to negligent treatment of children.</p>
                        <p className="form-note">(ll) Section <u>827.071</u>, relating to sexual performance by a child.</p>
                        <p className="form-note">(mm) Section <u>843.01</u>, relating to resisting arrest with violence.</p>
                        <p className="form-note">(nn) Section <u>843.025</u>, relating to depriving a law enforcement, correctional, or correctional probation officer means of protection or communication.</p>
                        <p className="form-note">(oo) Section <u>843.12</u>, relating to aiding in an escape.</p>
                        <p className="form-note">(pp) Section <u>843.13</u>, relating to aiding in the escape of juvenile inmates in correctional institutions.</p>
                        <p className="form-note">(qq) Chapter 847, relating to obscene literature.</p>
                        <p className="form-note">(rr) Section <u>874.05(1)</u>, relating to encouraging or recruiting another to join a criminal gang.</p>
                        <p className="form-note">(ss) Chapter 893, relating to drug abuse prevention and control, only if the offense was a felony or if any other person involved in the offense was a minor.</p>
                        <p className="form-note">(tt) Section <u>916.1075</u>, relating to sexual misconduct with certain forensic clients and reporting of such sexual misconduct.</p>
                        <p className="form-note">(uu) Section <u>944.35(3)</u>, relating to inflicting cruel or inhuman treatment on an inmate resulting in great bodily harm.</p>
                        <p className="form-note">(vv) Section <u>944.40</u>, relating to escape.</p>
                        <p className="form-note">(ww) Section <u>944.46</u>, relating to harboring, concealing, or aiding an escaped prisoner.</p>
                        <p className="form-note">(xx) Section <u>944.47</u>, relating to introduction of contraband into a correctional facility.</p>
                        <p className="form-note">(yy) Section <u>985.701</u>, relating to sexual misconduct in juvenile justice programs.</p>
                        <p className="form-note">(zz) Section <u>985.711</u>, relating to contraband introduced into detention facilities.</p>
                    </div>
                </div>
            </div>

            {/* Final Legal Clause Section */}
            <div className="form-section">
                <p className="form-note">
                    <b>(3)</b> The security background investigations under this section must ensure that no person subject to this section has been found guilty of, regardless of adjudication, or entered a plea of nolo contendere or guilty to, any offense that constitutes domestic violence as defined in s. <u>741.28</u>, whether such act was committed in this state or in another jurisdiction.
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
                        <p className="form-note">(a) Any authorizing statutes, if the offense was a felony.</p>
                        <p className="form-note">(b) This chapter, if the offense was a felony.</p>
                        <p className="form-note">(c) Section <u>409.920</u>, relating to Medicaid provider fraud.</p>
                        <p className="form-note">(d) Section <u>409.9201</u>, relating to Medicaid fraud.</p>
                        <p className="form-note">(e) Section <u>741.28</u>, relating to domestic violence.</p>
                        <p className="form-note">(f) Section <u>777.04</u>, relating to attempts, solicitation, and conspiracy to commit an offense listed in this subsection.</p>
                        <p className="form-note">(g) Section <u>817.034</u>, relating to fraudulent acts through mail, wire, radio, electromagnetic, photoelectronic, or photooptical systems.</p>
                        <p className="form-note">(h) Section <u>817.234</u>, relating to false and fraudulent insurance claims.</p>
                        <p className="form-note">(i) Section <u>817.481</u>, relating to obtaining goods by using a false or expired credit card or other credit device, if the offense was a felony.</p>
                        <p className="form-note">(j) Section <u>817.50</u>, relating to fraudulently obtaining goods or services from a health care provider.</p>
                        <p className="form-note">(k) Section <u>817.505</u>, relating to patient brokering.</p>
                        <p className="form-note">(l) Section <u>817.568</u>, relating to criminal use of personal identification information.</p>
                    </div>

                    {/* Right Column */}
                    <div className="col-md-6">
                        <p className="form-note">(m) Section <u>817.60</u>, relating to obtaining a credit card through fraudulent means.</p>
                        <p className="form-note">(n) Section <u>817.61</u>, relating to fraudulent use of credit cards, if the offense was a felony.</p>
                        <p className="form-note">(o) Section <u>831.01</u>, relating to forgery.</p>
                        <p className="form-note">(p) Section <u>831.02</u>, relating to uttering forged instruments.</p>
                        <p className="form-note">(q) Section <u>831.07</u>, relating to forging bank bills, checks, drafts, or promissory notes.</p>
                        <p className="form-note">(r) Section <u>831.09</u>, relating to uttering forged bank bills, checks, drafts, or promissory notes.</p>
                        <p className="form-note">(s) Section <u>831.30</u>, relating to fraud in obtaining medicinal drugs.</p>
                        <p className="form-note">(t) Section <u>831.31</u>, relating to the sale, manufacture, delivery, or possession with the intent to sell, manufacture, or deliver any counterfeit controlled substance, if the offense was a felony.</p>
                        <p className="form-note">(u) Section <u>895.03</u>, relating to racketeering and collection of unlawful debts.</p>
                        <p className="form-note">(v) Section <u>896.101</u>, relating to the Florida Money Laundering Act.</p>
                    </div>
                </div>
            </div>

            {/* Exemption Selection Section */}
            <div className="form-section border p-3 mt-4">
                <div className="row mb-3">
                    <div className="col-12">
                        <label className="checkbox-label d-flex align-items-start">
                            <input type="checkbox" name="exemptionAHCA" checked={formData.exemptionAHCA} onChange={handleInputChange} />
                            <span className="ms-2"><b>I have been granted an Exemption from Disqualification through the Agency for Healthcare Administration (AHCA).</b></span>
                        </label>
                        <div className="form-field ms-4 mt-2 d-flex">
                            <i className="me-2">Date of Decision:</i>
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
                        <div className="form-field ms-4 mt-2 d-flex">
                            <i className="me-2">Date of Decision:</i>
                            <input type="date" name="dohDecisionDate" className="w-25"value={formData.dohDecisionDate} onChange={handleInputChange} />
                        </div>
                    </div>
                </div>
                <p className="form-note text-center mt-3"><b>**A copy of the Exemption from Disqualification decision letter must be attached**</b></p>
            </div>

            {/* Prior Screening Section */}
            <div className="form-section border p-3 mt-4">
                <p className="form-note">
                    If you are also using this form to provide evidence of prior Level 2 screening (fingerprinting) in the last 5 years <u>and</u> have not been unemployed for more than 90 days, please provide the following information. <b>A copy of the prior screening results must be attached.</b>
                </p>

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
                      <div className="form-section mb-4">
                <h1 className="form-title">Attestation</h1>
            </div>

            {/* Legal Statement */}
            <div className="form-section">
                <p className="form-note" style={{ lineHeight: '1.6', fontSize: '16px' }}>
                    Under penalty of perjury, I, 
                    <input 
                        type="text" 
                        name="finalAttestName" 
                        value={formData.finalAttestName} 
                        onChange={handleInputChange}
                        className="mx-2 d-inline-block"
                    />, 
                    hereby swear or affirm that I meet the requirements for qualifying for employment in regards to the background screening standards set forth in Chapter 435 and section 408.809, F.S. In addition, I agree to immediately inform my employer if arrested or convicted of any of the disqualifying offenses while employed by any health care provider licensed pursuant to Chapter 408, Part II F.S.
                </p>
            </div>

            <div className="form-section mt-5">
                <div className="row align-items-center">
                    <div className="col-md-6">
                        <div className="signature-pad-container mb-2">
                            <canvas
                                ref={canvasRef}
                                width={800}
                                height={100}
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
                        <label className="section-label d-block pt-1">Employee/Contractor Signature</label>
                    </div>

                    {/* Title Column */}
                    <div className="col-md-3">
                        <div className="form-field mb-2">
                            <input 
                                type="text" 
                                name="finalAttestTitle" 
                                value={formData.finalAttestTitle} 
                                onChange={handleInputChange}
                            />
                        </div>
                        <label className="section-label d-block pt-1">Title</label>
                    </div>

                    {/* Date Column */}
                    <div className="col-md-3">
                        <div className="form-field mb-2">
                            <input 
                                type="date" 
                                name="finalAttestDate" 
                                value={formData.finalAttestDate} 
                                onChange={handleInputChange}
                            />
                        </div>
                        <label className="section-label d-block pt-1">Date</label>
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
                            ref={canvasRef}
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
                        <>
                      <div className="form-section text-center">
                <h1 className="form-title">DEPARTMENT OF ELDER AFFAIRS BACKGROUND SCREENING</h1>
                <h2 className="form-subtitle">ATTESTATION OF COMPLIANCE – APPLICANT</h2>
            </div>

            {/* Legal Statement Section */}
            <div className="form-section">
                <p className="form-note mb-3">
                    This form is required by all applicants to comply with section 435.05(2), F.S., which states:
                </p>
                    <p className="form-note italic" style={{ fontStyle: 'italic', borderLeft: '3px solid #ccc', paddingLeft: '15px' }}>
                        Every applicant for employment or volunteer services must attest, subject to penalty of perjury, 
                        to meeting the requirements for employment or other services pursuant to this chapter and 
                        agreeing to inform the employer or designated individual immediately if arrested for any of the 
                        disqualifying offenses while employed or providing services.
                    </p>
            </div>

            {/* Application Data Fields */}
            <div className="form-section">
                <div className="form-field mb-2">
                    <label className="section-label d-block">TYPE OF PERSONAL IDENTIFICATION PROVIDED:</label>
                    <input 
                        type="text" 
                        name="doeaIdType" 
                        value={formData.doeaIdType} 
                        onChange={handleInputChange}
                    />
                </div>
                <div className="form-field mb-2">
                    <label className="section-label d-block">APPLICANT (first name, middle name, last name):</label>
                    <input 
                        type="text" 
                        name="doeaApplicantName" 
                        value={formData.doeaApplicantName} 
                        onChange={handleInputChange}
                    />
                </div>
                <div className="form-field mb-2">
                    <label className="section-label d-block">POSITION APPLIED:</label>
                    <input 
                        type="text" 
                        name="doeaPosition" 
                        value={formData.doeaPosition} 
                        onChange={handleInputChange}
                    />
                </div>
                <div className="form-field">
                    <label className="section-label d-block">EMPLOYER:</label>
                    <input 
                        type="text" 
                        name="doeaEmployer" 
                        value={formData.doeaEmployer} 
                        onChange={handleInputChange}
                    />
                    <p className="form-note" style={{ fontSize: '13px', fontWeight: 'bold' }}>
                        It is the Employer’s responsibility to verify the authenticity and accuracy of any document provided for identification.
                    </p>
                </div>
            </div>

            {/* Exception Section */}
            <div className="form-section mt-4">
                <p className="form-note mb-2">
                    IF YOU ARE CLAIMING AN EXCEPTION TO BACKGROUND SCREENING, PURSUANT TO SECTION 430.0402(2) FLORIDA STATUTES, PROVIDE SUPPORTING DOCUMENTATION. Check one:
                </p>
                <div className="row">
                    <div className='col-md-4'>

                        <div className="form-field d-flex">
                            <span className="form-note me-2">Volunteer under 20 hours:</span>
                            <input 
                                type="text" 
                                name="doeaVolunteerHours" 
                                value={formData.doeaVolunteerHours} 
                                onChange={handleInputChange}
                                />
                        </div>
                                </div>
                                <div className='col-md-4'>

                        <div className="form-field d-flex">
                            <span className="form-note me-2">Type of License</span>
                            <input 
                                type="text" 
                                name="doeaLicenseType" 
                                value={formData.doeaLicenseType} 
                                onChange={handleInputChange}
                            />
                        </div>
                                </div>
<div className='col-md-4'>

                                            <div className="form-field d-flex">
                            <span className="form-note me-2">License Exception</span>
                            <input 
                                type="text" 
                                name="doeaLicenseException" 
                                value={formData.doeaLicenseException} 
                                onChange={handleInputChange}
                            />
                    </div>
</div>

                </div>
            </div>

            <div className="mt-5 text-center">
                <p className="form-note" style={{ fontSize: '12px' }}>
                    DOEA Form 236, Attestation of Compliance - Applicant, Effective September 10, 2024
                </p>
            </div>
                        </>
                    )}
                    {currentStep === 9 && (
                        <>
                      <div className="form-section">
                <p className="form-note">
                    IF THE APPLICANT HAS RECEIVED AN EXEMPTION FOR A DISQUALIFYING OFFENSE, 
                    PLEASE STATE WHICH AGENCY AND PROVIDE A COPY OF THE LETTER(S) GRANTING 
                    THAT EXEMPTION.
                </p>
                
                <div className="form-field">
                    <label className="form-note">Agency/Date</label>
                    <input 
                        type="text" 
                        name="doeaExemptionAgencyDate" 
                        value={formData.doeaExemptionAgencyDate} 
                        onChange={handleInputChange} 
                    />
                </div>

                <div className="form-field">
                    <label className="form-note">If more than one Agency, please list:</label>
                    <input 
                        type="text" 
                        name="doeaExemptionMultipleAgencies" 
                        value={formData.doeaExemptionMultipleAgencies} 
                        onChange={handleInputChange} 
                    />
                </div>
            </div>

            <div className="form-section text-center">
                <p className="form-note">
                    <strong>
                        ALL APPLICANTS FOR THIS POSITION SHOULD REVIEW THE FOLLOWING 
                        LIST OF OFFENSES BEFORE SIGNING THE ATTESTATION.
                    </strong>
                </p>
            </div>

            <div className="form-section">
                <h1 className="form-title text-center">ATTESTATION</h1>
                
                <p className="form-note">
                    UNDER PENALTY OF PERJURY, I,
                </p>
                
                <div className="form-field">
                    <input 
                        type="text" 
                        name="doeaFinalAffiantName" 
                        value={formData.doeaFinalAffiantName} 
                        onChange={handleInputChange} 
                    />
                </div>

                <p className="form-note">
                    hereby swear or affirm that I meet the requirements for qualifying for employment or service provider 
                    pursuant to the background screening standards set forth in Chapter 435 and Section 430.0402 
                    of the Florida Statutes. In addition, I have no current charges pending and I understand that I must 
                    immediately inform my employer or designee if arrested for any of the following disqualifying 
                    offenses throughout the time I am employed or otherwise providing services with this employer.
                </p>
            </div>

            <div className="form-section">
                <div className="row">
                    <div className="col-md-6">
                            <div className="signature-pad-container">
                                <canvas
                                    ref={canvasRef}
                                    width={1000}
                                    height={100}
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
                       
                            <label className="section-label d-block pt-1">Applicant Signature</label>
                    </div>
                    <div className="col-md-6">
                        <div className="form-field">
                            <input 
                                type="date" 
                                name="doeaAttestationDate" 
                                value={formData.doeaAttestationDate} 
                                onChange={handleInputChange} 
                            />
                            <label className="form-note">Date</label>
                        </div>
                    </div>
                </div>
            </div>

            <div className="form-section mt-4">
                <p className="form-note">
                    <strong>NOTE TO EMPLOYER:</strong><br />
                    Once the Attestation is signed, maintain it within the Applicant’s file.
                </p>
            </div>

            <div className="form-section text-center">
                <p className="form-note">
                    DOEA Form 236, Attestation of Compliance - Applicant, Effective September 10, 2024
                </p>
            </div>
                        </>
                    )}
                    {currentStep === 10 && (
                        <>
                        <div className="form-section">
                <p className="form-note">
                    <strong>CHARGE/OFFENSE</strong><br />
                    No person subject to the provisions of this section has an arrest awaiting final disposition for, 
                    has been found guilty of, regardless of adjudication, or entered a plea of nolo contendere (no contest) 
                    or guilty to, or has been adjudicated delinquent and the record has not been sealed or expunged for, 
                    any offense prohibited under any of the following provisions of state law or similar law of another jurisdiction:
                </p>
            </div>

            {/* Offenses List */}
            <div className="form-section">
                <div className="row fw-bold border-bottom">
                    <div className="col-3"><p className="form-note">FLORIDA STATUTE</p></div>
                    <div className="col-9"><p className="form-note">CHARGE/OFFENSE</p></div>
                </div>

                {/* Statutory List Mapping */}
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
                    <div key={index} className="row border-bottom py-1">
                        <div className="col-3">
                            <p className="form-note">{item.statute}</p>
                        </div>
                        <div className="col-9">
                            <p className="form-note">{item.offense}</p>
                        </div>
                    </div>
                ))}
            </div>

            {/* Footer Reference */}
            <div className="form-section text-center mt-3">
                <p className="form-note">
                    DOEA Form 236, Attestation of Compliance - Applicant, Effective September 10, 2024
                </p>
            </div>
                        </>
                    )}
                    {currentStep === 11 && (
                        <>
                        <div className="form-section">
                <div className="row fw-bold border-bottom">
                    <div className="col-3"><p className="form-note">FLORIDA STATUTE</p></div>
                    <div className="col-9"><p className="form-note">CHARGE/OFFENSE</p></div>
                </div>

                {/* Statutory List Mapping from Image 31a974.png */}
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
                    { statute: "831.311", offense: "Relating to the unlawful sale, manufacture, alteration, delivery, uttering, or passion of counterfeit-resistant prescription blanks for controlled substances." },
                    { statute: "827.04", offense: "Relating to contributing to the delinquency or dependency of a child." },
                    { statute: "831.01*", offense: "Relating to forgery." }
                ].map((item, index) => (
                    <div key={index} className="row border-bottom py-1">
                        <div className="col-3">
                            <p className="form-note">{item.statute}</p>
                        </div>
                        <div className="col-9">
                            <p className="form-note">{item.offense}</p>
                        </div>
                    </div>
                ))}
            </div>

            {/* Footer Reference */}
            <div className="form-section text-center mt-3">
                <p className="form-note">
                    DOEA Form 236, Attestation of Compliance - Applicant, Effective September 10, 2024
                </p>
            </div>
                        </>
                    )}
                    {currentStep === 12 && (
                        <>
                        <div className="form-section">
                <div className="row fw-bold border-bottom">
                    <div className="col-3"><p className="form-note">FLORIDA STATUTE</p></div>
                    <div className="col-9"><p className="form-note">CHARGE/OFFENSE</p></div>
                </div>

                {/* Statutory List Mapping from Image 31fc45.png */}
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
                    { statute: "859.01", offense: "Relating to relating to poisoning food or water." },
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
                    <div key={index} className="row border-bottom py-1">
                        <div className="col-3">
                            <p className="form-note">{item.statute}</p>
                        </div>
                        <div className="col-9">
                            <p className="form-note">{item.offense}</p>
                        </div>
                    </div>
                ))}
            </div>

            {/* Statutory Footer Footnote */}
            <div className="form-section">
                <p className="form-note">
                    * These offenses are disqualifying only if the applicant is working with the Medicaid program.
                </p>
                <p className="form-note">
                    ** These offenses are disqualifying only if the applicant is working with children or the elderly.
                </p>
            </div>

            {/* Form Identifier Footer */}
            <div className="form-section text-center mt-3">
                <p className="form-note">
                    DOEA Form 236, Attestation of Compliance - Applicant, Effective September 10, 2024
                </p>
            </div>
                        </>
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
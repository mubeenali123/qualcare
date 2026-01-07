import React, { useEffect, useState } from 'react';
import './ApplicationForm.css';
import 'bootstrap/dist/css/bootstrap.min.css';
const FinalApplicationForm = ({ onBack, onNext, goToStep }) => {
const capitalizeLabelsInFinalApplication = () => {
  const container = document.querySelector(".final-application");

  if (!container) return;

  // 1️⃣ Handle section-labels with a specific condition
  const sectionLabels = container.querySelectorAll(".section-label");
  sectionLabels.forEach(label => {
    // Example condition: only convert if label has no inner span OR ignore "*"
    const requiredSpan = label.querySelector(".required");
    let text = label.textContent.replace("*", "").trim();

    // Your specific condition: only capitalize if length > 0
    if (text.length > 0) {
      text = text
        .toLowerCase()
        .replace(/\b\w/g, char => char.toUpperCase());

      label.innerHTML = text;

      if (requiredSpan) label.appendChild(requiredSpan);
    }
  });

  // 2️⃣ Handle labels with spans inside (like radios, checkboxes)
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

// Run once after component mounts
useEffect(() => {
  capitalizeLabelsInFinalApplication();
}, []);

    const [formData, setFormData] = useState({
        // Personal Information
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

    const handleNext = (e) => {
        e.preventDefault();
        console.log('Form Data:', formData);
        onNext();
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
                    <div className="step active">
                        <div className="step-number">1</div>
                        <span className="step-label">Employee Application #1</span>
                    </div>
                    <div className="step">
                        <div className="step-number">2</div>
                        <span className="step-label">Employee Application #2</span>
                    </div>
                    <div className="step">
                        <div className="step-number">3</div>
                        <span className="step-label">Reference Check</span>
                    </div>
                    <div className="step">
                        <div className="step-number">4</div>
                        <span className="step-label">PayCheck Policy</span>
                    </div>
                    <div className="step">
                        <div className="step-number">5</div>
                        <span className="step-label">Company Disciplinary</span>
                    </div>
                    <div className="step">
                        <div className="step-number">6</div>
                        <span className="step-label">Safety Policy</span>
                    </div>
                    <div className="step">
                        <div className="step-number">7</div>
                        <span className="step-label">Patient Abandonment</span>
                    </div>
                    <div className="step">
                        <div className="step-number">8</div>
                        <span className="step-label">Confidentiality</span>
                    </div>
                    <div className="step">
                        <div className="step-number">9</div>
                        <span className="step-label">Contractor Agreement</span>
                    </div>
                    <div className="step">
                        <div className="step-number">10</div>
                        <span className="step-label">Non Discrimination Policy</span>
                    </div>
                    <div className="step">
                        <div className="step-number">11</div>
                        <span className="step-label">Company Disciplinary</span>
                    </div>
                    <div className="step">
                        <div className="step-number">12</div>
                        <span className="step-label">Infection Control</span>
                    </div>
                    <div className="step">
                        <div className="step-number">13</div>
                        <span className="step-label">Policy Statement</span>
                    </div>
                </div>

                {/* Progress Bar */}
                <div className="progress-bar">
                    <div className="progress-text">Step 1 of 13</div>
                    <div className="progress-track">
                        <div className="progress-fill" style={{ width: '7.69%' }}></div>
                    </div>
                </div>

                <p className="required-note"><span className="required">*</span> indicates required fields</p>

                <form onSubmit={handleNext}>
                    {/* 1. PERSONAL INFORMATION */}
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

                    {/* 2. CONTRACT POSITION DESIRED */}
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

                    {/* 3. IN CASE OF EMERGENCY */}
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

                    {/* 4. EXPERIENCE */}
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
                                   {/* Submit Buttons */}
            <div className="form-actions">
                <button type="button" className="btn-save">Save</button>
                <button type="submit" className="btn-next">Save and Next</button>
            </div>
                </form>
            </div>
        </div>

    );
};

export default FinalApplicationForm;
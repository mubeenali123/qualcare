import React, { useState } from 'react';
import './ApplicationForm.css';
import 'bootstrap/dist/css/bootstrap.min.css';

const FinalApplicationForm = ({ onBack, onNext, goToStep }) => {
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
        <div className="application-page">
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
                    <div className="step active" onClick={() => goToStep(1)}>
                        <div className="step-number">1</div>
                        <span className="step-label">Personal Information</span>
                    </div>
                    <div className="step" onClick={() => goToStep(2)}>
                        <div className="step-number">2</div>
                        <span className="step-label">Background Documentation</span>
                    </div>
                    <div className="step" onClick={() => goToStep(3)}>
                        <div className="step-number">3</div>
                        <span className="step-label">Contractor Agreement</span>
                    </div>
                    <div className="step" onClick={() => goToStep(4)}>
                        <div className="step-number">4</div>
                        <span className="step-label">License & Certification</span>
                    </div>
                    <div className="step" onClick={() => goToStep(5)}>
                        <div className="step-number">5</div>
                        <span className="step-label">Training Certificates</span>
                    </div>
                    <div className="step" onClick={() => goToStep(6)}>
                        <div className="step-number">6</div>
                        <span className="step-label">Health Documentation</span>
                    </div>
                </div>

                {/* Progress Bar */}
                <div className="progress-bar">
                    <div className="progress-text">Step 1 of 6</div>
                    <div className="progress-track">
                        <div className="progress-fill" style={{ width: '16.67%' }}></div>
                    </div>
                </div>

                <p className="required-note"><span className="required">*</span> indicates required fields</p>

                <h1 className="form-title">INDEPENDENT CONTRACTOR EMPLOYMENT APPLICATION - PAGE 1 OF 2</h1>

                <form onSubmit={handleNext}>
                    {/* 1. PERSONAL INFORMATION */}
                    <div className="form-section">
                        <h2 className="section-title">1. PERSONAL INFORMATION:</h2>

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
                        <h2 className="section-title">2. CONTRACT POSITION DESIRED:</h2>

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
                        <h2 className="section-title">3. IN CASE OF EMERGENCY, PLEASE NOTIFY:</h2>

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
                        <h2 className="section-title">4. EXPERIENCE: (CHECK ALL THAT APPLY)</h2>

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
                    <h2 className="section-title">5. WORK AVAILABILITY: (CHECK ALL THAT APPLY)</h2>
                    
                    <div className="mb-3">
                        <label className="form-check form-check-inline">
                            <input
                                type="checkbox"
                                name="fullTime"
                                checked={formData.fullTime}
                                onChange={handleInputChange}
                                className='form-check-input'
                            />
                            <span>F/T</span>
                        </label>
                        <label className="form-check form-check-inline">
                            <input
                                type="checkbox"
                                name="partTime"
                                checked={formData.partTime}
                                onChange={handleInputChange}
                                className='form-check-input'
                            />
                            <span>P/T</span>
                        </label>
                        <label className="form-check form-check-inline">
                            <input
                                type="checkbox"
                                name="days"
                                checked={formData.days}
                                onChange={handleInputChange}
                                className='form-check-input'
                            />
                            <span>DAYS</span>
                        </label>
                        <label className="form-check form-check-inline">
                            <input
                                type="checkbox"
                                name="nights"
                                checked={formData.nights}
                                onChange={handleInputChange}
                                className='form-check-input'
                            />
                            <span>NIGHTS</span>
                        </label>
                    </div>

                    <div className="form-row">
                        <div className="form-field">
                            <label className="section-label">WEEKDAYS</label>
                            <div className="radio-group">
                                <label className="radio-label">
                                    <input
                                        type="radio"
                                        name="weekdaysAvailability"
                                        value="liveIn"
                                        checked={formData.liveInWeekdays}
                                        onChange={(e) => setFormData({...formData, liveInWeekdays: true, liveOutWeekdays: false})}
                                    />
                                    <span>LIVE IN</span>
                                </label>
                                <label className="radio-label">
                                    <input
                                        type="radio"
                                        name="weekdaysAvailability"
                                        value="liveOut"
                                        checked={formData.liveOutWeekdays}
                                        onChange={(e) => setFormData({...formData, liveInWeekdays: false, liveOutWeekdays: true})}
                                    />
                                    <span>LIVE OUT</span>
                                </label>
                            </div>
                        </div>
                        <div className="form-field">
                            <label className="section-label">WEEKENDS</label>
                            <div className="radio-group">
                                <label className="radio-label">
                                    <input
                                        type="radio"
                                        name="weekendsAvailability"
                                        value="liveIn"
                                        checked={formData.liveInWeekends}
                                        onChange={(e) => setFormData({...formData, liveInWeekends: true, liveOutWeekends: false})}
                                    />
                                    <span>LIVE IN</span>
                                </label>
                                <label className="radio-label">
                                    <input
                                        type="radio"
                                        name="weekendsAvailability"
                                        value="liveOut"
                                        checked={formData.liveOutWeekends}
                                        onChange={(e) => setFormData({...formData, liveInWeekends: false, liveOutWeekends: true})}
                                    />
                                    <span>LIVE OUT</span>
                                </label>
                            </div>
                        </div>
                    </div>

                    <div className="form-row">
                        <div className="form-field">
                            <label className="section-label">DRIVER'S LICENSE</label>
                            <div className="radio-group">
                                <label className="radio-label">
                                    <input
                                        type="radio"
                                        name="driversLicense"
                                        value="yes"
                                        checked={formData.driversLicense === 'yes'}
                                        onChange={handleInputChange}
                                    />
                                    <span>YES</span>
                                </label>
                                <label className="radio-label">
                                    <input
                                        type="radio"
                                        name="driversLicense"
                                        value="no"
                                        checked={formData.driversLicense === 'no'}
                                        onChange={handleInputChange}
                                    />
                                    <span>NO</span>
                                </label>
                            </div>
                        </div>
                        <div className="form-field">
                            <label className="section-label">OWN CAR</label>
                            <div className="radio-group">
                                <label className="radio-label">
                                    <input
                                        type="radio"
                                        name="ownCar"
                                        value="yes"
                                        checked={formData.ownCar === 'yes'}
                                        onChange={handleInputChange}
                                    />
                                    <span>YES</span>
                                </label>
                                <label className="radio-label">
                                    <input
                                        type="radio"
                                        name="ownCar"
                                        value="no"
                                        checked={formData.ownCar === 'no'}
                                        onChange={handleInputChange}
                                    />
                                    <span>NO</span>
                                </label>
                            </div>
                        </div>
                    </div>

                    <div className="form-field">
                        <label className="section-label">WHAT LANGUAGES CAN YOU SPEAK FLUENTLY:</label>
                        <div className="checkbox-group">
                            <label className="checkbox-label">
                                <input
                                    type="checkbox"
                                    name="languageEnglish"
                                    checked={formData.languageEnglish}
                                    onChange={handleInputChange}
                                />
                                <span>ENGLISH</span>
                            </label>
                            <label className="checkbox-label">
                                <input
                                    type="checkbox"
                                    name="languageSpanish"
                                    checked={formData.languageSpanish}
                                    onChange={handleInputChange}
                                />
                                <span>SPANISH</span>
                            </label>
                        </div>
                        <input
                            type="text"
                            name="languageOther"
                            value={formData.languageOther}
                            onChange={handleInputChange}
                            placeholder="OTHER:"
                        />
                    </div>

                    <h3 className="subsection-title">AVAILABILITY SCHEDULE:</h3>
                    <table className="availability-table">
                        <thead>
                            <tr>
                                <th></th>
                                <th>FROM (Time)</th>
                                <th>TO (Time)</th>
                                <th>Overnight? (Yes/No?)</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>MONDAY</td>
                                <td><input type="time" name="mondayFrom" value={formData.mondayFrom} onChange={handleInputChange} /></td>
                                <td><input type="time" name="mondayTo" value={formData.mondayTo} onChange={handleInputChange} /></td>
                                <td><input type="text" name="mondayOvernight" value={formData.mondayOvernight} onChange={handleInputChange} /></td>
                            </tr>
                            <tr>
                                <td>TUESDAY</td>
                                <td><input type="time" name="tuesdayFrom" value={formData.tuesdayFrom} onChange={handleInputChange} /></td>
                                <td><input type="time" name="tuesdayTo" value={formData.tuesdayTo} onChange={handleInputChange} /></td>
                                <td><input type="text" name="tuesdayOvernight" value={formData.tuesdayOvernight} onChange={handleInputChange} /></td>
                            </tr>
                            <tr>
                                <td>WEDNESDAY</td>
                                <td><input type="time" name="wednesdayFrom" value={formData.wednesdayFrom} onChange={handleInputChange} /></td>
                                <td><input type="time" name="wednesdayTo" value={formData.wednesdayTo} onChange={handleInputChange} /></td>
                                <td><input type="text" name="wednesdayOvernight" value={formData.wednesdayOvernight} onChange={handleInputChange} /></td>
                            </tr>
                            <tr>
                                <td>THURSDAY</td>
                                <td><input type="time" name="thursdayFrom" value={formData.thursdayFrom} onChange={handleInputChange} /></td>
                                <td><input type="time" name="thursdayTo" value={formData.thursdayTo} onChange={handleInputChange} /></td>
                                <td><input type="text" name="thursdayOvernight" value={formData.thursdayOvernight} onChange={handleInputChange} /></td>
                            </tr>
                            <tr>
                                <td>FRIDAY</td>
                                <td><input type="time" name="fridayFrom" value={formData.fridayFrom} onChange={handleInputChange} /></td>
                                <td><input type="time" name="fridayTo" value={formData.fridayTo} onChange={handleInputChange} /></td>
                                <td><input type="text" name="fridayOvernight" value={formData.fridayOvernight} onChange={handleInputChange} /></td>
                            </tr>
                            <tr>
                                <td>SATURDAY</td>
                                <td><input type="time" name="saturdayFrom" value={formData.saturdayFrom} onChange={handleInputChange} /></td>
                                <td><input type="time" name="saturdayTo" value={formData.saturdayTo} onChange={handleInputChange} /></td>
                                <td><input type="text" name="saturdayOvernight" value={formData.saturdayOvernight} onChange={handleInputChange} /></td>
                            </tr>
                            <tr>
                                <td>SUNDAY</td>
                                <td><input type="time" name="sundayFrom" value={formData.sundayFrom} onChange={handleInputChange} /></td>
                                <td><input type="time" name="sundayTo" value={formData.sundayTo} onChange={handleInputChange} /></td>
                                <td><input type="text" name="sundayOvernight" value={formData.sundayOvernight} onChange={handleInputChange} /></td>
                            </tr>
                        </tbody>
                    </table>
                </div>
                </form>
            </div>
        </div>

    );
};

export default FinalApplicationForm;
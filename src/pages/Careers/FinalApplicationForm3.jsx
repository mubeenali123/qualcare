import React, { useEffect, useRef, useState } from 'react';
import './ApplicationForm.css';
import 'bootstrap/dist/css/bootstrap.min.css';

const FinalApplicationForm3 = ({ }) => {
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
    const canvasRef = useRef(null);
    const contractorCanvasRef = useRef(null);
    const registryCanvasRef = useRef(null);
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
        employer4Reason: '',
        contractorDate:today,
        registryDate:today,
        witnessDate:today,
        finalContractorDate:today,
        date:today
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

      {/* Effective Date Inputs */}
      <div className="row">
        <div className="form-field col-md-2">
          <label className="section-label">DAY <span className="required">*</span></label>
          <input
            type="number"
            name="perDiemEffectiveDay"
            value={formData.perDiemEffectiveDay}
            onChange={handleInputChange}
            required
          />
        </div>

        <div className="form-field col-md-4">
          <label className="section-label">MONTH <span className="required">*</span></label>
          <input
            type="text"
            name="perDiemEffectiveMonth"
            value={formData.perDiemEffectiveMonth}
            onChange={handleInputChange}
            required
          />
        </div>

        <div className="form-field col-md-2">
          <label className="section-label">YEAR <span className="required">*</span></label>
          <input
            type="number"
            name="perDiemEffectiveYear"
            value={formData.perDiemEffectiveYear}
            onChange={handleInputChange}
            required
          />
        </div>

        <div className="form-field col-md-4">
          <label className="section-label">
            CONTRACTOR PRINTED NAME <span className="required">*</span>
          </label>
          <input
            type="text"
            name="perDiemContractorName"
            value={formData.perDiemContractorName}
            onChange={handleInputChange}
            required
          />
        </div>
      </div>

      <p className="form-note">
        I hereby state that I am a Per Diem Independent Contractor to engage in
        health and/or maintenance services. I further state that I am a Per Diem
        Independent Contractor and meet all qualifications as such contained in
        the law.
      </p>
    </div>

    <div className="form-section">
      <h1 className="form-title">PURPOSE</h1>

      <p className="form-note">
        The purpose of this Agreement is to provide health care services in the
        home or health care facility where there are ill or disabled person
        and/or people in need of specialized home health care and/or staff relief
        for local health institution.
      </p>

      <p className="form-note">
        Per Diem Independent Contractor acknowledges and represents that he/she
        is a self-employed care provider.
      </p>
    </div>

    <div className="form-section">
      <h1 className="form-title">1. PAYMENT FOR SERVICES</h1>

      <p className="form-note">
        I agree that I only receive compensation for the work or services
        performed on a Per Diem Basis, at a defined rate per hour agreed between
        both parties in the Agreement variable to each Client.
      </p>

      {/* Position Input */}
      <div className="form-field col-md-6">
        <label className="section-label">
          POSITION / PROFESSIONAL TITLE <span className="required">*</span>
        </label>
        <input
          type="text"
          name="perDiemPosition"
          value={formData.perDiemPosition}
          onChange={handleInputChange}
          required
        />
      </div>

      <p className="form-note">
        This contract does not prohibit the Per Diem independent Contractor from
        working with other organizations or on his/her own assignments.
      </p>

      <p className="form-note">
        I agree that for Clients that elect to pay me through an escrow account
        (“Escrow Account”) that Registry maintains for the convenience of
        Clients, I hereby authorize that each such Client payment by the Client
        and/or its third party payer be reduced by the amount of fees I owe the
        Registry with respect to such payment.
      </p>

      <p className="form-note">
        Furthermore, I assign to Registry all my right, title and interest to
        collect and receive from its own account such payment from the
        respective Client and/or third party payer on my behalf.
      </p>

      <p className="form-note">
        I acknowledge that I bear the entire risk of non-payment by any Client,
        and in the event that Registry were to advance me a Client payment, and
        the Client and/or its third party payer fail to pay such amount within a
        reasonable time determined solely by Registry, I will be liable to repay
        such amount to Registry and such amount may be deducted from any
        subsequent payment to me through the Escrow account by said Client.
      </p>

      <p className="form-note">
        I acknowledge and represent that I retain sole responsibility for all
        federal, state and local tax obligations that pertain to all compensation
        I receive from clients referred hereunder, including but not limited to
        Social Security, Medicare, self-employment and income tax.
      </p>

      <p className="form-note">
        I also understand that I will not be eligible for unemployment
        compensation. Registry will report on a Form 1099 for each year the
        amount of fees I received from clients referred by Registry.
      </p>
    </div>

    <div className="form-section">
      <h1 className="form-title">2. LICENSES</h1>

      <p className="form-note">
        The Per Diem Independent Contractor is responsible for ensuring that his
        or her own license or certification remains current and valid during the
        period of contract.
      </p>

      <p className="form-note">
        Failure to maintain valid license or remains current status will cause
        suspension of assignments and may be the basis of termination of this
        agreement with the Registry.
      </p>

      <p className="form-note">
        Per Diem Independent Contractor understands and acknowledges that
        he/she is responsible for fulfilling all continuing education
        requirements and all other requirements to maintain his or her license
        or certification.
      </p>
    </div>
  </>
)}

                    {currentStep === 2 && (
                        <>
<div className="form-section">
  <h1 className="form-title">3. BACKGROUND SCREENING</h1>

  <p className="form-note">
    Per Diem Independent Contractor agrees that as a condition of this Agreement that he/she must
    clear a Level II Criminal Background screening by the Registry through the Agency for Health
    Care Administration, as well as a national Sex Offender Registry Screening.
  </p>

  <p className="form-note">
    Per Diem Independent Contractor agrees to bear the cost associated with any Background Screening.
  </p>
</div>
<div className="form-section">
  <h1 className="form-title">4. DRUG SCREENING</h1>

  <p className="form-note">
    Per Diem Independent Contractor agrees that his/her acceptance of this agreement is contingent
    upon the submission of a negative 10 panel drug screen result. Such panel shall be designated
    by the Registry.
  </p>

  <p className="form-note">
    Per Diem Independent Contractor further agrees and consents to submit to random drug screening
    with the results being provided to the Registry.
  </p>

  <p className="form-note">
    Per Diem Independent Contractor agrees to pay for the expense of such drug screenings. A positive
    result for illegal use of controlled substances or failure to submit to such drug screening shall
    be grounds for termination of the Agreement.
  </p>
</div>
<div className="form-section">
  <h1 className="form-title">5. COMMUNICABLE DISEASE</h1>

  <p className="form-note">
    Per Diem Independent Contractor agrees to provide documentation of a health screening which
    verifies that he/she is free of communicable disease prior to or upon contract and prior to
    assignment of direct patient care.
  </p>

  <p className="form-note">
    Also, Per Diem Independent Contractor understands and agrees that pursuant to Florida Chapter
    59A-18 (Nurse Registries Standards and Licensing) he/she must:
  </p>

  <p className="form-note">
    <b>A.</b> Prior to contact with Clients, Per Diem Independent Contractor has to provide a statement
    from a physician based on an examination within the last six (6) months stating that he/she is
    free of communicable diseases and has been tested at his/her own expense and was found to be free
    of tuberculosis;
  </p>

  <p className="form-note">
    <b>B.</b> Obtain and keep active, at own expense, current CPR certificate;
  </p>

  <p className="form-note">
    <b>C.</b> Obtain all continuing education under their license;
  </p>

  <p className="form-note">
    <b>D.</b> Review and become familiar with the applicable rules and statutes attached hereto.
  </p>
</div>
<div className="form-section">
  <h1 className="form-title">6. INSURANCE</h1>

  <p className="form-note">
    Per Diem Independent Contractor shall maintain all required insurances including but not limited to:
  </p>

  <p className="form-note">
    <b>E.</b> Professional Liability Insurance in an amount specified by the Registry at Per Diem
    Independent Contractor own expense. Furthermore, hereby indemnifies and hold harmless Registry
    and any of its officers against any liability that might arise as a result of the failure to
    maintain Professional Liability Insurance coverage and against any liability arising out of
    service.
  </p>

  <p className="form-note">
    <b>F.</b> Automobile insurance, in the minimum amount required by state law.
  </p>

  <p className="form-note">
    <b>G.</b> Workman’s Compensation coverage at Per Diem Independent Contractor expense for all injuries
    sustained while working with Registry Clients, including the related expense and loss of income.
    Furthermore, hereby indemnifies and hold harmless Registry and any of its officers against any
    liability that might arise as a result of the failure to maintain Workman’s Compensation Coverage.
  </p>

  <p className="form-note">
    Per Diem Independent Contractor agrees to provide Registry with copies of all required insurance. policies prior to or upon execution of this agreement and annually therea er or upon renewal or 
substitution.
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

<div className="form-section">
  <h1 className="form-title">7. TRANSPORTATION</h1>

  <p className="form-note">
    Per Diem Independent Contractor agrees to provide and maintain his/her reliable transportation.
  </p>
</div>
<div className="form-section">
  <h1 className="form-title">8. SELF EMPLOYMENT</h1>

  <p className="form-note">
    I hereby represent and affirm that I have established myself as a self-employed independent
    contractor and not an employee of Registry, which I maintain own business and that Registry and
    I intend to contract with each other as independent contractors. Neither Registry nor shall I
    provide the other as any (i) tools, supplies or equipment (ii) reimbursement for any expenses,
    or (iii) training or instruction of any kind or nature other than as required by law. I always
    shall; retain the right, at my sole discretion, to accept or decline a client referral offered
    by Registry.
  </p>
</div>
<div className="form-section">
  <h1 className="form-title">9. TOOLS AND SUPPLIES</h1>

  <p className="form-note">
    Per Diem Independent Contractor agrees to provide his/her own equipment such as blood pressure
    cuff, stethoscope, uniforms, gloves etc.
  </p>
</div>
<div className="form-section">
  <h1 className="form-title">10. CONFIDENTIALITY</h1>

  <p className="form-note">
    Per Diem Independent Contractor shall maintain and preserve the confidentiality of all patient
    health related information in accordance with all State and Federal privacy laws and Registry
    Policy. Per Diem Independent Contractor acknowledges that it is within the terms and conditions
    of his work to respect at all times the privacy of clients and their families, students,
    volunteers and employees, and the confidential nature of the business of the Registry.
  </p>
</div>
<div className="form-section">
  <h1 className="form-title">11. PATIENT VISIT NOTES AND WEEKLY INVOICE</h1>

  <p className="form-note">
    Per Diem Independent Contractor shall be responsible for creating, updating, maintaining and
    submitting to the Registry clinical record and service notes for each patient or client. Per
    Diem Independent Contractor shall submit clinical records, service notes and weekly invoices
    for each patient/client to the office of the Registry by close of business each Monday for all
    care or service provided during the previous week.
  </p>
</div>
<div className="form-section">
  <h1 className="form-title">12. TERM, RENEWAL AND TERMINATION</h1>

  <p className="form-note">
    <b>A.</b> This Agreement shall begin at the time both parties signatures are affixed on Effective Date.
  </p>

  <p className="form-note">
    <b>B.</b> Any limitations set forth in this Agreement, including but not limited to the
    “Non-Compete” portion of the Agreement, shall remain in force and effect until the expiration
    of that limitation by its term.
  </p>

  <p className="form-note">
    <b>C.</b> The initial term of this engagement shall be the 12 month period commencing on the
    Effective Date hereof. This Agreement shall be automatically extended for successive additional
    one year terms provided that neither party hereto advises the other in writing at least thirty
    (30) days prior to the end of the current term of intent not to extend the Agreement. In addition,
    Registry may terminate this agreement (i) without cause upon thirty (30) days prior written
    notice or (ii) immediately if provider fails to maintain any required certifications, violates
    the term and provision of this agreement or (iii) if Registry determines, in its sole discretion,
    that there is a threat to the well-being of Client.
  </p>
</div>

                        </>
                    )}
                    {currentStep === 4 && (
                        <>
<div className="form-section">
          <h1 className="form-title">PER DIEM INDEPENDENT CONTRACTOR GUIDELINES</h1>
          
          <p className="form-note">
            Per Diem Independent Contractor acknowledges receipt of and agrees to abide by all of the terms and 
            conditions as set out in the "Per Diem Independent Contractor Guidelines" document and the "Per 
            Diem Independent Contractor Guidelines" is made a part of the Agreement as if fully set out herein.
          </p>
        </div>

        <div className="form-section">
          <h1 className="form-title">14. NON- COMPETE</h1>
          
          <p className="form-note">
            Except as referred by and through the Registry, Per Diem Independent Contractor agrees to refrain 
            from accepting any employment from or providing any service that the Registry provides to a Registry 
            client, as defined below, or from accepting anything of value in exchange for any service provided, 
            that the Registry provides to a Registry client by the Per Diem Independent Contractor. During 
            the period of time from the date of contract until the expiration of (1) one year after the date that 
            Contractor relationship, whichever is last. Client is defined as an individual that the Registry has 
            provided service or care to or has discussed with the client, caregiver, responsible party or guardian, 
            the possibility of providing care or service through the Registry.
          </p>
        </div>

        <div className="form-section">
          <h1 className="form-title">15. FINAL AGREEMENT & NOTICE</h1>
          
          <p className="form-note">
            The Agreement constitutes the final understanding and Agreement between the parties with respect 
            to the subject matter hereof and supersedes all prior negotiations, understandings and agreements 
            between the parties, whether written or oral. This Agreement may be amended, supplemented or 
            changed only by an agreement, either an agreement, either hereon with both parties' initials, or 
            separately in writing signed by both parties. Any notice given under this Agreement shall be sufficient 
            if it is in writing and if sent by certified or registered mail.
          </p>

          <p className="form-note">
            <b>IN WITNESS WHEREOF</b>, the parties hereto have set their hands and seals in execution of this 
            Agreement as of the Effective Date first above written.
          </p>
        </div>

        <div className="form-section">
          <h1 className="form-title">Per Diem Independent Contractor:</h1>

          <div className="row">
            <div className="form-field col-md-6">
              <label className="section-label">Printed Name:</label>
              <input
                type="text"
                name="contractorPrintedName"
                value={formData.contractorPrintedName}
                onChange={handleInputChange}
              />
            </div>
            <div className="form-field col-md-6">
              <label className="section-label">Title:</label>
              <input
                type="text"
                name="contractorTitle"
                value={formData.contractorTitle}
                onChange={handleInputChange}
              />
            </div>
          </div>

          <div className="row">
            <div className="form-field col-md-6">
              <label className="section-label">Signature:</label>
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
                  onClick={() => clearSignature(contractorCanvasRef)}
                >
                  ↻
                </button>
              </div>
            </div>
            <div className="form-field col-md-6">
              <label className="section-label">Date:</label>
              <input
                type="date"
                name="contractorDate"
                value={formData.contractorDate}
                onChange={handleInputChange}
              />
            </div>
          </div>
        </div>

        <div className="form-section">
          <h1 className="form-title">Qualcare Nurse Registry Inc.:</h1>

          <div className="row">
            <div className="form-field col-md-6">
              <label className="section-label">Printed Name:</label>
              <input
                type="text"
                name="registryPrintedName"
                value={formData.registryPrintedName}
                onChange={handleInputChange}
              />
            </div>
            <div className="form-field col-md-6">
              <label className="section-label">Title:</label>
              <input
                type="text"
                name="registryTitle"
                value={formData.registryTitle}
                onChange={handleInputChange}
              />
            </div>
          </div>

          <div className="row">
            <div className="form-field col-md-6">
              <label className="section-label">Signature:</label>
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
                  onClick={() => clearSignature(registryCanvasRef)}
                >
                  ↻
                </button>
              </div>
            </div>
            <div className="form-field col-md-6">
              <label className="section-label">Date:</label>
              <input
                type="date"
                name="registryDate"
                value={formData.registryDate}
                onChange={handleInputChange}
              />
            </div>
          </div>
        </div>
                        </>
                    )}
                    {currentStep === 5 && (
                        <>
                      <div className="form-section">
        <h1 className="form-title">INDEPENDENT CONTRACTOR ORIENTATION</h1>
        <h2 className="form-title">CERTIFIED NURSING ASSISTANT (CNA) AND HOME HEALTH AIDE (HHA)</h2>
      </div>

      <div className="form-section">
        <h1 className="form-title">REGISTRATION POLICIES</h1>
        
        <p className="form-note">
          I have received the following applicable rules and Florida State Statutes of AHCA and the contractor 
          description (summarized from regulations) and agree to follow them:
        </p>

        <p className="form-note">1. 59A-18.00081: Certified Nursing Assistant and Home Health Aide</p>
        <p className="form-note">2. 400.506: Licensure of nurse registries; requirements; penalties.</p>
        <p className="form-note">3. 400.512: Screening of nurse registry personnel.</p>
        <p className="form-note">4. 400.484: Right of inspection; deficiencies; fines.</p>
        <p className="form-note">5. 400.462: Definitions.</p>
        <p className="form-note">6. 400.495: Notice of toll-free telephone number for central abuse hotline.</p>
        <p className="form-note">7. 59A-18.017: Supplemental Staffing for Health Care Facilities.</p>
        <p className="form-note">8. Independent Contractor Description -Duties Summary from regulations.</p>

        <p className="form-note" style={{marginTop: '20px'}}>
          I have signed an independent contractor agreement and understand and agree that I will be responsible: 
          for my own payroll taxes and will not be covered for workers compensation, social security and 
          unemployment benefits per the contract.
        </p>

        <div className="row" style={{marginTop: '30px'}}>
          <div className="form-field col-md-6">
            <label className="section-label">Independent Contractor Name</label>
            <input
              type="text"
              name="contractorName"
              value={formData.contractorName}
              onChange={handleInputChange}
            />
          </div>
          <div className="form-field col-md-6">
            <label className="section-label">Witness</label>
            <input
              type="text"
              name="witnessName"
              value={formData.witnessName}
              onChange={handleInputChange}
            />
          </div>
        </div>

        <div className="row">
          <div className="form-field col-md-6">
            <label className="section-label">Date</label>
            <input
              type="date"
              name="contractorDate"
              value={formData.contractorDate}
              onChange={handleInputChange}
            />
          </div>
          <div className="form-field col-md-6">
            <label className="section-label">Date</label>
            <input
              type="date"
              name="witnessDate"
              value={formData.witnessDate}
              onChange={handleInputChange}
            />
          </div>
        </div>
      </div>

      <div className="form-section">
        <h1 className="form-title">59A-18.007: REGISTERED NURSE AND LICENSED PRACTICAL NURSE.</h1>
        
        <p className="form-note">The registered nurse and the licensed practical nurse shall:</p>
        
        <p className="form-note">
          (1) Be responsible for the clinical records for their patients. The clinical records shall be filed with the 
          nurse registry, for each patient or client to whom they are giving care in the home or place of residence. 
          Clinical notes and clinical records related to care given under a staffing arrangement are maintained by 
          the facility where the staffing contract is arranged.
        </p>

        <p className="form-note">
          (2) Be responsible for maintaining the medical plan of treatment with clinical notes and filing the initial 
          medical plan of treatment, any amendments to the plan, any additional order or change in orders, and a 
          copy of the clinical notes at the office of the nurse registry.
        </p>

        <p className="form-note" style={{fontStyle: 'italic', fontSize: '12px', marginTop: '20px'}}>
          Rulemaking Authority 400.497, 400.506 FS. Law Implemented 400.497, 400.506 FS. History–New 2-9-93, Amended 1-27-94, 12-24-00, 5-4-15.
        </p>

        <div className="row" style={{marginTop: '30px'}}>
          <div className="form-field col-md-4">
            <label className="section-label">Independent Contractor Name</label>
            <input
              type="text"
              name="finalContractorName"
              value={formData.finalContractorName}
              onChange={handleInputChange}
            />
          </div>
          <div className="form-field col-md-4">
            <label className="section-label">Signature</label>
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
              <button 
                type="button" 
                className="clear-signature-btn" 
                onClick={clearSignature}
              >
                ↻
              </button>
            </div>
          </div>
          <div className="form-field col-md-4">
            <label className="section-label">Date</label>
            <input
              type="date"
              name="finalContractorDate"
              value={formData.finalContractorDate}
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
        <h1 className="form-title">ABUSE, NEGLECT AND EXPLOITATION</h1>
      </div>

      <div className="form-section">
        <p className="form-note">No one has the right to be abused, neglected or exploited!</p>
        <p className="form-note">Report any other forms of abuse by calling:</p>
        
        <p className="form-note" style={{textAlign: 'center', fontSize: '18px', fontWeight: 'bold', margin: '20px 0'}}>
          1(800) 96-ABUSE (1-800-962-2873)
        </p>

        <p className="form-note" style={{fontWeight: 'bold', marginTop: '25px'}}>Forms of abuse:</p>

        <p className="form-note">
          1. <b>Physical abuse:</b> hitting, slapping, kicking, pushing, or someone touching you in your private 
          areas (sexual touch), unwanted requests for sexual favors, giving you illegal drugs.
        </p>

        <p className="form-note">
          2. <b>Verbal abuse:</b> someone yelling, cursing, or making degrading and derogat01Y comments at you, 
          using threats against you as a form of intimidation.
        </p>

        <p className="form-note">
          3. <b>Emotional abuse:</b> someone telling you that you can't make your own decisions or not letting you 
          talk to your friends when you want to.
        </p>

        <p className="form-note">
          4. <b>Mental abuse:</b> someone telling you that you are worthless, making jokes about you, punishing 
          you or controlling you.
        </p>

        <p className="form-note">
          5. <b>Abandonment:</b> leaving you without medical care if you've been hurt, leaving you alone if you 
          require someone to assist you with your personal care needs, not reporting abuse against you.
        </p>

        <p className="form-note">
          6. <b>Exploitation:</b> unwanted use of someone's personal money or belongings, someone taking your 
          social security check or money from you, taking your money without your permission.
        </p>

        <p className="form-note" style={{marginTop: '25px'}}>
          1. Click the words below that mean "ABUSE" to you. <i>(check all)</i>
        </p>

        <div className="checkbox-group">
          <label className="checkbox-label">
            <input
              type="checkbox"
              name="physical"
              checked={formData.physical}
              onChange={handleInputChange}
            />
            <span>Physical</span>
          </label>
          <label className="checkbox-label">
            <input
              type="checkbox"
              name="verbalEmotional"
              checked={formData.verbalEmotional}
              onChange={handleInputChange}
            />
            <span>Verbal Emotional</span>
          </label>
          <label className="checkbox-label">
            <input
              type="checkbox"
              name="mentalAbuse"
              checked={formData.mentalAbuse}
              onChange={handleInputChange}
            />
            <span>Mental Abuse</span>
          </label>
          <label className="checkbox-label">
            <input
              type="checkbox"
              name="abandonment"
              checked={formData.abandonment}
              onChange={handleInputChange}
            />
            <span>Abandonment</span>
          </label>
          <label className="checkbox-label">
            <input
              type="checkbox"
              name="exploitation"
              checked={formData.exploitation}
              onChange={handleInputChange}
            />
            <span>Exploitation</span>
          </label>
        </div>

        <p className="form-note" style={{marginTop: '25px'}}>
          2. I am aware that I must report abused, neglected and/or exploited?
        </p>

        <div className="radio-group">
          <label className="radio-label">
            <span>YES</span>
            <input
              type="radio"
              name="mustReport"
              value="yes"
              checked={formData.mustReport === 'yes'}
              onChange={handleInputChange}
            />
          </label>
          <label className="radio-label">
            <span>NO</span>
            <input
              type="radio"
              name="mustReport"
              value="no"
              checked={formData.mustReport === 'no'}
              onChange={handleInputChange}
            />
          </label>
        </div>

        <p className="form-note" style={{marginTop: '25px'}}>
          3. How would you report an incident of abuse, neglect and/or exploitation?
        </p>
        <p className="form-note" style={{fontStyle: 'italic', marginLeft: '20px'}}>
          I would call 1-800-96-ABUSE (22873)
        </p>

        <div className="radio-group">
          <label className="radio-label">
            <span>YES</span>
            <input
              type="radio"
              name="howToReport"
              value="yes"
              checked={formData.howToReport === 'yes'}
              onChange={handleInputChange}
            />
          </label>
          <label className="radio-label">
            <span>NO</span>
            <input
              type="radio"
              name="howToReport"
              value="no"
              checked={formData.howToReport === 'no'}
              onChange={handleInputChange}
            />
          </label>
        </div>

        <div className="row" style={{marginTop: '30px'}}>
          <div className="form-field col-md-12">
            <label className="section-label">Caregiver Name:</label>
            <input
              type="text"
              name="caregiverName"
              value={formData.caregiverName}
              onChange={handleInputChange}
            />
          </div>
        </div>

        <div className="row">
          <div className="form-field col-md-6">
            <label className="section-label">Signature:</label>
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
          <div className="form-field col-md-6">
            <label className="section-label">Date:</label>
            <input
              type="date"
              name="date"
              value={formData.date}
              onChange={handleInputChange}
            />
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

export default FinalApplicationForm3;
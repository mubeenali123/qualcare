import React, { useEffect, useRef, useState } from 'react';
import './ApplicationForm.css';
import 'bootstrap/dist/css/bootstrap.min.css';

const FinalApplicationForm6 = ({ handleFileChange, canvasRef, startDrawing, draw, stopDrawing, clearSignature }) => {
        const today = new Date().toISOString().split("T")[0];

    // Steps for each doc (7), Guidelines (1), and Final Signature (1)
    const steps = [
        "Employement Health Release",
        "Vaccination Informed Consent"
    ];

    const [currentStep, setCurrentStep] = useState(1);
    const [formData, setFormData] = useState({
        printedName: '',
        title: '',
        date: '',
        registryPrintedName: '',
        registryTitle: '',
        registryDate: '',
        noticeDate:today,
        date:today
    });

    const progressWidth = (currentStep / steps.length) * 100;

    useEffect(() => {
        window.scrollTo({ top: 0, behavior: "smooth" });
    }, [currentStep]);

    const handleNext = (e) => {
        e.preventDefault();
        setCurrentStep(prev => Math.min(prev + 1, steps.length));
    };

    const onBack = () => {
        setCurrentStep(prev => Math.max(prev - 1, 1));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        alert('Form Submitted');
    };
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };
    return (
        <div className="application-page final-application">
            <header className="header">
                <div className="header-container">
                    <div className="logo">
                        <img src="/logo.png.png" alt="QualCare Logo" />
                    </div>
                    <button className="home-btn" onClick={onBack}>Home</button>
                </div>
            </header>

            <div className="form-container">
                <div className="progress-steps">
                    {steps.map((label, index) => (
                        <div key={index + 1} className={`step ${index + 1 === currentStep ? "active" : ""}`}>
                            <div className="step-number">{index + 1}</div>
                            <span className="step-label">{label}</span>
                        </div>
                    ))}
                </div>

                <div className="progress-bar">
                    <div className="progress-text">Step {currentStep} of {steps.length}</div>
                    <div className="progress-track">
                        <div className="progress-fill" style={{ width: `${progressWidth}%` }}></div>
                    </div>
                </div>

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
            <textarea name="tbExplanation" rows="3" onChange={handleInputChange}></textarea>
        </div>

        <div className="row">
            <div className="form-field col-md-6">
                <label className="section-label">HAVE YOU EVER HAD THE BCG VACCINE?</label>
                <div className="radio-group">
                    <label className="radio-label"><input type="radio" name="hadBCG" value="yes" /> <span>YES</span></label>
                    <label className="radio-label"><input type="radio" name="hadBCG" value="no" /> <span>NO</span></label>
                </div>
            </div>
            <div className="form-field col-md-6 ">
                <label className="section-label">YEAR RECEIVED</label>
                <input type="text" name="bcgYear" onChange={handleInputChange} />
            </div>
        </div>

        <div className="form-note">
            <p><b>THE EARLY SIGNS AND SYMPTOMS OF TUBERCULOSIS ARE:</b> Cough, Night Sweats, Fever, Loss of Weight, Loss of Appetite, Coughing Blood.</p>
        </div>

        <div className="form-field">
            <label className="section-label">DO YOU CURRENTLY HAVE ANY OF THE SYMPTOMS MENTIONED ABOVE? IF YES WHICH ONE:</label>
            <input type="text" name="currentTBSymptoms" onChange={handleInputChange} />
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
                    <canvas ref={canvasRef} width={500} height={200} className="signature-canvas"
                        onMouseDown={startDrawing} onMouseMove={draw} onMouseUp={stopDrawing}
                        onTouchStart={startDrawing} onTouchMove={draw} onTouchEnd={stopDrawing}
                    />
                    <button type="button" className="clear-signature-btn" onClick={clearSignature}>↻</button>
                </div>
            </div>
        </div>
        <div className="row">
            <div className="form-field col-md-6">
                <label className="section-label">TITLE</label>
                <input type="text" name="noticeTitle" onChange={handleInputChange} />
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
  <p className="form-note">
    6. Minor side effects may include soreness at injection site, low-grade fever,
    malaise, or nausea.
  </p>

  <div className="form-field">
    <label className="section-label">Full Name (Requesting Vaccination)</label>
    <input type="text" placeholder="Enter full name" />
  </div>

  <p className="form-note">
    I request vaccination with Hepatitis B vaccine.
  </p>

  <div className="form-field checkbox-group">
    <label className="section-label">Pregnant</label>
    <label className="section-label"><input type="checkbox" /> Yes</label>
    <label className="section-label"><input type="checkbox" /> No</label>
  </div>

  <div className="form-field checkbox-group">
    <label className="section-label">Allergies</label>
    <label className="section-label"><input type="checkbox" /> Yes</label>
    <label className="section-label"><input type="checkbox" /> No</label>
  </div>

  <div className="form-field">
    <label className="section-label">Date Vaccinated – Dose 1</label>
    <input type="date" />
  </div>

  <div className="form-field">
    <label className="section-label">Date Vaccinated – Dose 2</label>
    <input type="date" />
  </div>

  <div className="form-field">
    <label className="section-label">Date Vaccinated – Dose 3</label>
    <input type="date" />
  </div>

  <div className="form-field">
    <label className="section-label">Lot Number – Dose 1</label>
    <input type="text" />
  </div>

  <div className="form-field">
    <label className="section-label">Lot Number – Dose 2</label>
    <input type="text" />
  </div>

  <div className="form-field">
    <label className="section-label">Lot Number – Dose 3</label>
    <input type="text" />
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
    <label className='section-label'>Full Name (Declining Vaccination)</label>
    <input type="text" placeholder="Enter full name" />
  </div>
<div className='row mt-4 align-items-center'>
    <div className='col-md-6'>

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
          title="Clear signature"
        >
          ↻
        </button>
      </div>

    </div>

  <div className="form-field col-md-6">
    <label className="section-label">Date</label>
    <input type="date" value={formData.date}/>
  </div>
                                </div>
</div>

</>
)}

                    <div className="form-actions">
                        {currentStep !== 1 && (
                            <button type="button" className="btn-previous" onClick={onBack}>Previous</button>
                        )}
                        <button type="button" className="btn-save">Save</button>
                        {currentStep !== steps.length ? (
                            <button type="button" className="btn-next" onClick={handleNext}>Save & Next</button>
                        ) : (
                            <button type="submit" className="btn-next">Submit Application</button>
                        )}
                    </div>
                </form>
            </div>
        </div>
    );
};

export default FinalApplicationForm6;
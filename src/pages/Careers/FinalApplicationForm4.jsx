import React, { useEffect, useRef, useState } from 'react';
import './ApplicationForm.css';
import 'bootstrap/dist/css/bootstrap.min.css';

const FinalApplicationForm4 = ({ handleFileChange, canvasRef, startDrawing, draw, stopDrawing, clearSignature }) => {
    // Steps for each doc (7), Guidelines (1), and Final Signature (1)
    const steps = [
        "License / Certification",
        "CPR Certification",
        "Driver's License",
        "Social Security Card",
        "Proof of U.S. Residency",
        "Auto Insurance",
        "Liability Insurance",
    ];

    const [currentStep, setCurrentStep] = useState(1);
    const [previews, setPreviews] = useState({});
    const [formData, setFormData] = useState({
        printedName: '',
        title: '',
        date: '',
        registryPrintedName: '',
        registryTitle: '',
        registryDate: ''
    });

    const progressWidth = (currentStep / steps.length) * 100;

    useEffect(() => {
        window.scrollTo({ top: 0, behavior: "smooth" });
    }, [currentStep]);

    // Live Preview Handler
    const handleLocalFileChange = (name, file) => {
        if (file) {
            if (file.type.startsWith('image/')) {
                setPreviews(prev => ({ ...prev, [name]: URL.createObjectURL(file) }));
            } else {
                setPreviews(prev => ({ ...prev, [name]: 'pdf' }));
            }
            handleFileChange(name, file);
        }
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

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

    // Helper for rendering upload fields consistently
    const renderUploadField = (label, name) => (
        <div className="form-section">
            <h1 className="form-title">SECTION #4</h1>
            <div className="form-note">
                <p>Please upload a copy of your <b>{label}</b>. On mobile devices, you can select "Camera" to take a photo directly.</p>
            </div>
            <div className="row">
                <div className="form-field col-md-12">
                    <label className="section-label">{label} <span className="required">*</span></label>
                    <div className="upload-container">
                        <input
                            type="file"
                            name={name}
                            accept="image/*,application/pdf"
                            capture="environment"
                            onChange={(e) => handleLocalFileChange(name, e.target.files[0])}
                            className="form-control"
                            required
                        />
                    </div>
                </div>
            </div>
            {previews[name] && (
                <div className="row mt-3">
                    <div className="col-md-12">
                        <p className="section-label">LIVE PREVIEW:</p>
                        {previews[name] === 'pdf' ? (
                            <div className="pdf-placeholder">PDF Document Selected</div>
                        ) : (
                            <img src={previews[name]} alt="preview" style={{ maxWidth: '300px', borderRadius: '8px' }} />
                        )}
                    </div>
                </div>
            )}
        </div>
    );

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
                    {currentStep === 1 && renderUploadField("LICENSE / CERTIFICATION", "licenseCertification")}
                    {currentStep === 2 && renderUploadField("CPR", "cpr")}
                    {currentStep === 3 && renderUploadField("DRIVER'S LICENSE", "driversLicense")}
                    {currentStep === 4 && renderUploadField("SOCIAL SECURITY CARD", "socialSecurityCard")}
                    {currentStep === 5 && renderUploadField("PROOF OF U.S. RESIDENCY", "proofResidency")}
                    {currentStep === 6 && renderUploadField("AUTO INSURANCE", "autoInsurance")}
                    {currentStep === 7 && renderUploadField("PROFESSIONAL LIABILITY INSURANCE", "professionalLiabilityInsurance")}


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

export default FinalApplicationForm4;
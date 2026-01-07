import React, { useState, useRef } from 'react';
import './ApplicationForm.css';

const Step7 = ({ onPrevious, onBack, onNext, goToStep }) => {
  const today = new Date().toISOString().split("T")[0];

  const [formData, setFormData] = useState({
    agreeStatements: false,
    signatureDate: today,
  });
  const [isDrawing, setIsDrawing] = useState(false);
  const canvasRef = useRef(null);

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? checked : value
    });
  };

  // Signature Pad Functions
  const startDrawing = (e) => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    const rect = canvas.getBoundingClientRect();
    
    let x, y;
    if (e.type === 'mousedown') {
      x = e.clientX - rect.left;
      y = e.clientY - rect.top;
    } else if (e.type === 'touchstart') {
      x = e.touches[0].clientX - rect.left;
      y = e.touches[0].clientY - rect.top;
    }
    
    ctx.beginPath();
    ctx.moveTo(x, y);
    setIsDrawing(true);
  };

  const draw = (e) => {
    if (!isDrawing) return;
    
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    const rect = canvas.getBoundingClientRect();
    
    let x, y;
    if (e.type === 'mousemove') {
      x = e.clientX - rect.left;
      y = e.clientY - rect.top;
    } else if (e.type === 'touchmove') {
      e.preventDefault();
      x = e.touches[0].clientX - rect.left;
      y = e.touches[0].clientY - rect.top;
    }
    
    ctx.lineWidth = 2;
    ctx.lineCap = 'round';
    ctx.strokeStyle = '#000';
    ctx.lineTo(x, y);
    ctx.stroke();
  };

  const stopDrawing = () => {
    setIsDrawing(false);
  };

  const clearSignature = () => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    ctx.clearRect(0, 0, canvas.width, canvas.height);
  };

  const handleSubmit = (e) => {
  e.preventDefault();
  
  if (!formData.agreeStatements) {
    alert('Please agree to the statements before submitting.');
    return;
  }
  
  if (!formData.signatureDate) {
    alert('Please enter the date.');
    return;
  }

  const canvas = canvasRef.current;
  const signatureData = canvas.toDataURL();
  
  console.log('Final Submission:', {
    ...formData,
    signature: signatureData
  });
  
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
  <div className="step completed" onClick={() => goToStep(1)}>
    <div className="step-number">✓</div>
    <span className="step-label">Pre-Employment</span>
  </div>
  <div className="step completed" onClick={() => goToStep(2)}>
    <div className="step-number">✓</div>
    <span className="step-label">Education</span>
  </div>
  <div className="step completed" onClick={() => goToStep(3)}>
    <div className="step-number">✓</div>
    <span className="step-label">Experience</span>
  </div>
  <div className="step completed" onClick={() => goToStep(4)}>
    <div className="step-number">✓</div>
    <span className="step-label">References</span>
  </div>
  <div className="step completed" onClick={() => goToStep(5)}>
    <div className="step-number">✓</div>
    <span className="step-label">Skills</span>
  </div>
  <div className="step completed" onClick={() => goToStep(6)}>
    <div className="step-number">✓</div>
    <span className="step-label">Documents</span>
  </div>
  <div className="step active" onClick={() => goToStep(7)}>
    <div className="step-number">7</div>
    <span className="step-label">Review</span>
  </div>
</div>

        {/* Progress Bar */}
        <div className="progress-bar">
          <div className="progress-text">Step 7 of 7</div>
          <div className="progress-track">
            <div className="progress-fill" style={{ width: '100%' }}></div>
          </div>
        </div>

        <p className="required-note"><span className="required">*</span> indicates required fields</p>

        <h1 className="form-title">CAREFULLY READ EACH STATEMENT BEFORE SIGNING AT THE BOTTOM:</h1>

        <form onSubmit={handleSubmit}>
          
          {/* Statements */}
          <div className="statements-section">
            <p className="statement-text">
              I certify that all of the information provided in this employment application is true and complete to the best of my knowledge, and I authorize investigation of all statements contained in this application, including a criminal background check and credit history check. I understand that any false or incomplete information may disqualify me from further consideration for employment and may result in my immediate discharge if discovered at a later date.
            </p>

            <p className="statement-text">
              I understand and acknowledge that unless otherwise defined by applicable law or written agreement with CORNERSTONE HOME CARE SERVICES, any employment/independent contractor relationship will be considered "employment at will." This means the employee/independent contractor may resign at any time and CORNERSTONE HOME CARE SERVICES may discharge the employee/independent contractor at any time, with or without cause, and with or without advance notice.
            </p>

            <p className="statement-text">
              I authorize the investigation of any or all statements contained in this application and also authorize any person, school, current employer, past employer, and other organization to provide information concerning my previous employment and other relevant information that may be useful in making a hiring decision. I release such persons and organizations from any legal liability in making such statements.
            </p>

            <div className="agreement-checkbox">
              <label className="checkbox-label">
                <input 
                  type="checkbox" 
                  name="agreeStatements" 
                  checked={formData.agreeStatements} 
                  onChange={handleInputChange}
                  required
                />
                <span><strong>I have read, understand, and agree to the above statements:</strong></span>
              </label>
            </div>
          </div>

          {/* Signature Section */}
          <div className="signature-section">
            <label className="section-label">Signature <span className="required">*</span></label>
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
              <button type="button" className="clear-signature-btn" onClick={clearSignature}>
                ↻
              </button>
            </div>
          </div>

          {/* Date */}
          <div className="form-section">
            <label className="section-label">Date <span className="required">*</span></label>
            <div className="form-field half-width">
              <input 
                type="date" 
                name="signatureDate" 
                value={formData.signatureDate}
                disabled
                onChange={handleInputChange}
                required
              />
            </div>
          </div>

          {/* Submit Buttons */}
          <div className="form-actions">
            <button type="button" className="btn-previous" onClick={onPrevious}>Previous</button>
            <button type="submit" className="btn-submit">Submit</button>
          </div>
        </form>
      </div>

      {/* Footer */}
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

export default Step7;
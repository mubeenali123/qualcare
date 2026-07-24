import React, { useState, useRef } from 'react';
import './ApplicationForm.css';
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from 'react';
import * as types from '../../redux/type';

const Step7 = ({ onPrevious, onBack, onNext, goToStep }) => {
  console.log('updated');
  const today = new Date().toISOString().split("T")[0];
  const { loading, error, review: savedData } = useSelector(state => state.applicationReducer);
  const [submitted, setSubmitted] = useState(false);
  const dispatch = useDispatch();
  
  const referenceId = localStorage.getItem('applicationReferenceId');

  const [formData, setFormData] = useState({
    agreeStatements: false,
    signatureDate: today,
  });
    useEffect(() => {
    if (referenceId) {
      dispatch({
        type: types.FETCH_REVIEW_DATA_REQUEST,
        payload: referenceId
      });
    }
  }, [dispatch, referenceId]);

  // Update form when saved data is loaded from Redux
  useEffect(() => {
    if (savedData && Object.keys(savedData).length > 0) {
      setFormData(prev => ({
        ...prev,
        ...savedData
      }));
    }
  }, [savedData]);
const signaturePadRef = useRef(null);
const [signatureData, setSignatureData] = useState(null);
const [isDrawing, setIsDrawing] = useState(false);
const canvasRef = useRef(null);

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? checked : value
    });
  };

  const startDrawing = (e) => {
  e.preventDefault();
  const canvas = canvasRef.current;
  const ctx = canvas.getContext('2d');
  const rect = canvas.getBoundingClientRect();
  
  let clientX, clientY;
  if (e.touches) {
    clientX = e.touches[0].clientX;
    clientY = e.touches[0].clientY;
  } else {
    clientX = e.clientX;
    clientY = e.clientY;
  }
  
  const x = clientX - rect.left;
  const y = clientY - rect.top;
  
  ctx.beginPath();
  ctx.moveTo(x, y);
  setIsDrawing(true);
};

const draw = (e) => {
  e.preventDefault();
  if (!isDrawing) return;
  
  const canvas = canvasRef.current;
  const ctx = canvas.getContext('2d');
  const rect = canvas.getBoundingClientRect();
  
  let clientX, clientY;
  if (e.touches) {
    clientX = e.touches[0].clientX;
    clientY = e.touches[0].clientY;
  } else {
    clientX = e.clientX;
    clientY = e.clientY;
  }
  
  const x = clientX - rect.left;
  const y = clientY - rect.top;
  
  ctx.lineWidth = 2;
  ctx.lineCap = 'round';
  ctx.lineJoin = 'round';
  ctx.strokeStyle = '#000';
  ctx.lineTo(x, y);
  ctx.stroke();
};

const stopDrawing = (e) => {
  e.preventDefault();
  setIsDrawing(false);
  // Save the signature data
  const canvas = canvasRef.current;
  setSignatureData(canvas.toDataURL('image/png'));
};

const clearSignature = () => {
  const canvas = canvasRef.current;
  const ctx = canvas.getContext('2d');
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  setSignatureData(null);
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

  if (!referenceId) {
    alert("Application session expired. Please restart.");
    return;
  }

  const canvas = canvasRef.current;
  const signatureData = canvas.toDataURL("image/png");

  // Prepare FormData for submission
  const submissionData = new FormData();
  submissionData.append("referenceId", referenceId);
  submissionData.append("step", "review");
  
  // Create data object with signature as base64
  const reviewData = {
    signatureDate: formData.signatureDate,
    agreeStatements: formData.agreeStatements,
    signature_base64: signatureData
  };
  
  submissionData.append("data", JSON.stringify(reviewData));

  // Dispatch action
  dispatch({
    type: "SUBMIT_APPLICATION_REQUEST",
    payload: submissionData
  });

  goToStep(9);
  setSubmitted(true);
};
useEffect(() => {
    if (submitted && !loading && !error) {
      onNext();
    }
  }, [loading, error, submitted]);
function dataURLtoFile(dataurl, filename) {
  const arr = dataurl.split(',');
  const mime = arr[0].match(/:(.*?);/)[1];
  const bstr = atob(arr[1]);
  let n = bstr.length;
  const u8arr = new Uint8Array(n);
  while(n--){
      u8arr[n] = bstr.charCodeAt(n);
  }
  return new File([u8arr], filename, { type: mime });
}

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
    <span className="step-label">Availability</span>
  </div>
  <div className="step completed" onClick={() => goToStep(4)}>
    <div className="step-number">✓</div>
    <span className="step-label">References</span>
  </div>
  <div className="step completed" onClick={() => goToStep(5)}>
    <div className="step-number">5</div>
    <span className="step-label">Employment History</span>
  </div>
  <div className="step completed" onClick={() => goToStep(6)}>
    <div className="step-number">6</div>
    <span className="step-label">Documents</span>
  </div>
            <div className="step completed" onClick={() => goToStep(8)}>
            <div className="step-number">7</div>
            <span className="step-label">Certifications Upload</span>
          </div>
  <div className="step active" onClick={() => goToStep(7)}>
    <div className="step-number">8</div>
    <span className="step-label">Review</span>
  </div>
</div>

        {/* Progress Bar */}
        <div className="progress-bar">
          <div className="progress-text">Step 7 of 8</div>
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
              I understand and acknowledge that unless otherwise defined by applicable law or written agreement with QUALCARE NURSE REGISTRY INC, any employment/independent contractor relationship will be considered "employment at will." This means the employee/independent contractor may resign at any time and QUALCARE NURSE REGISTRY INC may discharge the employee/independent contractor at any time, with or without cause, and with or without advance notice.
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
    style={{ touchAction: 'none' }}
    onMouseDown={startDrawing}
    onMouseMove={draw}
    onMouseUp={stopDrawing}
    onMouseLeave={stopDrawing}
    onTouchStart={startDrawing}
    onTouchMove={draw}
    onTouchEnd={stopDrawing}
  />
  <button type="button" className="clear-signature-btn" onClick={clearSignature}>
    Clear
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
            <button type="submit" className="btn-submit">{loading ? 'Saving...' : 'Submit'}</button>
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
import React, { useState } from 'react';
import './ApplicationForm.css';

const Step4 = ({ onNext, onPrevious, onBack, goToStep }) => {
  const [formData, setFormData] = useState({
    // Employer 1
    employer1Name: '',
    employer1Last: '',
    employer1City: '',
    employer1Worked: '',
    employer1Phone: '',
    // Employer 2
    employer2Name: '',
    employer2Last: '',
    employer2City: '',
    employer2Worked: '',
    employer2Phone: '',
    // Employer 3
    employer3Name: '',
    employer3Last: '',
    employer3City: '',
    employer3Worked: '',
    employer3Phone: ''
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Step 4 Data:', formData);
    onNext();
  };

  const handleSave = () => {
    console.log('Step 4 Saved:', formData);
    alert('Progress saved!');
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
  <div className="step active" onClick={() => goToStep(4)}>
    <div className="step-number">4</div>
    <span className="step-label">References</span>
  </div>
  <div className="step" onClick={() => goToStep(5)}>
    <div className="step-number">5</div>
    <span className="step-label">Skills</span>
  </div>
  <div className="step" onClick={() => goToStep(6)}>
    <div className="step-number">6</div>
    <span className="step-label">Documents</span>
  </div>
  <div className="step" onClick={() => goToStep(7)}>
    <div className="step-number">7</div>
    <span className="step-label">Review</span>
  </div>
</div>

        {/* Progress Bar */}
        <div className="progress-bar">
          <div className="progress-text">Step 4 of 7</div>
          <div className="progress-track">
            <div className="progress-fill" style={{ width: '57.14%' }}></div>
          </div>
        </div>

        <p className="required-note"><span className="required">*</span> indicates required fields</p>

        <h1 className="form-title">GIVE THREE REFERENCES WHO ARE NOT FORMER EMPLOYERS WHO WE MAY CONTACT</h1>

        <form onSubmit={handleSubmit}>
          
          {/* Employer 1 */}
          <div className="employer-section">
            <h2 className="employer-number">1</h2>
            
            <div className="form-section">
              <label className="section-label">Name</label>
              <div className="address-grid">
                <div className="form-field">
                  <input 
                    type="text" 
                    name="employer1Name" 
                    value={formData.employer1Name} 
                    onChange={handleInputChange} 
                  />
                  <span className="field-label">First</span>
                </div>
                <div className="form-field">
                  <input 
                    type="text" 
                    name="employer1Last" 
                    value={formData.employer1Last} 
                    onChange={handleInputChange} 
                  />
                  <span className="field-label">Last</span>
                </div>
              </div>
            </div>

            <div className="form-section">
              <label className="section-label">City/State</label>
              <div className="form-field full-width">
                <input 
                  type="text" 
                  name="employer1City" 
                  value={formData.employer1City} 
                  onChange={handleInputChange} 
                />
              </div>
            </div>

            <div className="form-section">
              <label className="section-label">How do you know them, and for how long?</label>
              <div className="form-field full-width">
                <input 
                  type="text" 
                  name="employer1Worked" 
                  value={formData.employer1Worked} 
                  onChange={handleInputChange} 
                />
              </div>
            </div>

            <div className="form-section">
              <label className="section-label">Phone Number</label>
              <div className="form-field full-width">
                <input 
                  type="tel" 
                  name="employer1Phone" 
                  value={formData.employer1Phone} 
                  onChange={handleInputChange} 
                />
              </div>
            </div>
          </div>

          {/* Employer 2 */}
          <div className="employer-section">
            <h2 className="employer-number">2</h2>
            
            <div className="form-section">
              <label className="section-label">Name</label>
              <div className="address-grid">
                <div className="form-field">
                  <input 
                    type="text" 
                    name="employer2Name" 
                    value={formData.employer2Name} 
                    onChange={handleInputChange} 
                  />
                  <span className="field-label">First</span>
                </div>
                <div className="form-field">
                  <input 
                    type="text" 
                    name="employer2Last" 
                    value={formData.employer2Last} 
                    onChange={handleInputChange} 
                  />
                  <span className="field-label">Last</span>
                </div>
              </div>
            </div>

            <div className="form-section">
              <label className="section-label">City/State</label>
              <div className="form-field full-width">
                <input 
                  type="text" 
                  name="employer2City" 
                  value={formData.employer2City} 
                  onChange={handleInputChange} 
                />
              </div>
            </div>

            <div className="form-section">
              <label className="section-label">How do you know them, and for how long?</label>
              <div className="form-field full-width">
                <input 
                  type="text" 
                  name="employer2Worked" 
                  value={formData.employer2Worked} 
                  onChange={handleInputChange} 
                />
              </div>
            </div>

            <div className="form-section">
              <label className="section-label">Phone Number</label>
              <div className="form-field full-width">
                <input 
                  type="tel" 
                  name="employer2Phone" 
                  value={formData.employer2Phone} 
                  onChange={handleInputChange} 
                />
              </div>
            </div>
          </div>

          {/* Employer 3 */}
          <div className="employer-section">
            <h2 className="employer-number">3</h2>
            
            <div className="form-section">
              <label className="section-label">Name</label>
              <div className="address-grid">
                <div className="form-field">
                  <input 
                    type="text" 
                    name="employer3Name" 
                    value={formData.employer3Name} 
                    onChange={handleInputChange} 
                  />
                  <span className="field-label">First</span>
                </div>
                <div className="form-field">
                  <input 
                    type="text" 
                    name="employer3Last" 
                    value={formData.employer3Last} 
                    onChange={handleInputChange} 
                  />
                  <span className="field-label">Last</span>
                </div>
              </div>
            </div>

            <div className="form-section">
              <label className="section-label">City/State</label>
              <div className="form-field full-width">
                <input 
                  type="text" 
                  name="employer3City" 
                  value={formData.employer3City} 
                  onChange={handleInputChange} 
                />
              </div>
            </div>

            <div className="form-section">
              <label className="section-label">How do you know them, and for how long?</label>
              <div className="form-field full-width">
                <input 
                  type="text" 
                  name="employer3Worked" 
                  value={formData.employer3Worked} 
                  onChange={handleInputChange} 
                />
              </div>
            </div>

            <div className="form-section">
              <label className="section-label">Phone Number</label>
              <div className="form-field full-width">
                <input 
                  type="tel" 
                  name="employer3Phone" 
                  value={formData.employer3Phone} 
                  onChange={handleInputChange} 
                />
              </div>
            </div>
          </div>

          {/* Submit Buttons */}
          <div className="form-actions">
            <button type="button" className="btn-previous" onClick={onPrevious}>Previous</button>
            <button type="button" className="btn-save" onClick={handleSave}>Save</button>
            <button type="submit" className="btn-next">Save and Next</button>
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

export default Step4;
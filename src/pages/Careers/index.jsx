import React, { useState } from 'react';
import './Careers.css';
import heroBg from './hero-bg.jpg';
import whyBg from './why-bg.jpg';
import requirementsBg from './requirements-bg.jpg';
import ApplicationForm from './ApplicationForm';
import Step2 from './Step2';
import Step3 from './Step3';
import Step4 from './Step4';
import Step5 from './Step5';
import Step6 from './Step6';
import Step7 from './Step7';
import Step8 from './Step8';
import ThankYou from './ThankYou';
import { useSelector } from 'react-redux';

const Careers = () => {
  const [showApplicationForm, setShowApplicationForm] = useState(false);
  const [currentStep, setCurrentStep] = useState(1);
  const { loading, error } = useSelector((state) => state.applicationReducer);

  const goToStep = (step) => setCurrentStep(step);

  const renderStep = () => {
    switch (currentStep) {
      case 1:
        return <ApplicationForm onBack={() => setShowApplicationForm(false)} onNext={() => setCurrentStep(2)} goToStep={goToStep} />;
      case 2:
        return <Step2 onBack={() => setShowApplicationForm(false)} onPrevious={() => setCurrentStep(1)} onNext={() => setCurrentStep(3)} goToStep={goToStep} />;
      case 3:
        return <Step3 onBack={() => setShowApplicationForm(false)} onPrevious={() => setCurrentStep(2)} onNext={() => setCurrentStep(4)} goToStep={goToStep} />;
      case 4:
        return <Step4 onBack={() => setShowApplicationForm(false)} onPrevious={() => setCurrentStep(3)} onNext={() => setCurrentStep(5)} goToStep={goToStep} />;
      case 5:
        return <Step5 onBack={() => setShowApplicationForm(false)} onPrevious={() => setCurrentStep(4)} onNext={() => setCurrentStep(6)} goToStep={goToStep} />;
      case 6:
        return <Step6 onBack={() => setShowApplicationForm(false)} onPrevious={() => setCurrentStep(5)} onNext={() => setCurrentStep(7)} goToStep={goToStep} />;
      case 7:
        return <Step7 onBack={() => setShowApplicationForm(false)} onPrevious={() => setCurrentStep(6)} onNext={() => setCurrentStep(8)} goToStep={goToStep} />;
      case 8:
        return <Step8 onBack={() => setShowApplicationForm(false)} onPrevious={() => setCurrentStep(7)} onNext={() => setCurrentStep(9)} goToStep={goToStep} />;
      case 9:
        return <ThankYou onBack={() => { setShowApplicationForm(false); setCurrentStep(1); }} />;
      default:
        return null;
    }
  };

  // If Form is open, show the form wrapped with Global Loader/Error
  if (showApplicationForm) {
    return (
      <div className="application-wrapper">
        {/* GLOBAL LOADER - Always visible during requests */}
        {loading && (
          <div className="loader-overlay">
            <div className="spinner"></div>
            <p style={{ marginTop: '15px', fontWeight: 'bold', color: '#094a87' }}>
              Processing Request...
            </p>
          </div>
        )}

        {/* GLOBAL ERROR BANNER */}
        {error && (
          <div className="error-banner">
            <strong>Submission Error:</strong> {typeof error === 'string' ? error : 'Something went wrong.'}
          </div>
        )}

        {renderStep()}
      </div>
    );
  }

  // ELSE: Show Landing Page
  return (
    <div className="careers-page">
      <header className="header">
        <div className="header-container">
          <div className="logo"><img src="./logo.png.png" alt="QualCare Logo" /></div>
          <button className="home-btn" onClick={() => window.location.href = '/'}>Home</button>
          <div className="header-right">
            <div className="social-icons">
              <a href="#"><i className="fab fa-facebook-f"></i></a>
              <a href="#"><i className="fab fa-linkedin-in"></i></a>
              <a href="#"><i className="fab fa-twitter"></i></a>
              <a href="#"><i className="fab fa-instagram"></i></a>
            </div>
          </div>
        </div>
      </header>

      <section className="hero" style={{ backgroundImage: `linear-gradient(rgba(9, 74, 135, 0.6), rgba(9, 74, 135, 0.6)), url(${heroBg})` }}>
        <div className="hero-content">
          <h1>Build a Rewarding Career in Home Care</h1>
          <p>Join Qualcare Nursing — where compassion meets opportunity.</p>
          <button className="btn-primary" onClick={() => setShowApplicationForm(true)}>Apply Now</button>
        </div>
      </section>

      {/* Simplified landing sections for brevity */}
      <section className="intro-section">
        <div className="container">
          <h2>Join Our Team</h2>
          <p>At Qualcare Nursing, we focus on long-term professional relationships.</p>
          <button className="btn-primary" onClick={() => setShowApplicationForm(true)}>Start Application</button>
        </div>
      </section>

      <footer className="footer">
        <div className="footer-container">
          <div className="footer-logo"><img src="/ncpc-logo.jpg" alt="NCPC Member" /></div>
          <div className="footer-content">
            <p>QUALCARE NURSE REGISTRY INC. © 2025. All Rights Reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Careers;
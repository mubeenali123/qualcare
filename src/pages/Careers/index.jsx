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
import ThankYou from './ThankYou';
import Step8 from './Step8';

const Careers = () => {
  const [showApplicationForm, setShowApplicationForm] = useState(false);
  const [currentStep, setCurrentStep] = useState(1);
  const goToStep = (step) => {
  setCurrentStep(step);
};

  const whyChoose = [
    "Flexible work schedules that fit your lifestyle",
    "Immediate client referrals (hourly contracts available)",
    "Supportive coordination team",
    "Opportunities across multiple Florida counties",
    "A chance to truly make a difference in people's lives"
  ];

  

  const requirements = [
    "Valid Florida license or certification (if applicable)",
    "CNA or HHA certificate (minimum 75 hours)",
    "Current CPR / BLS certification",
    "Level 2 background screening",
    "Two professional references",
    "Physical exam & TB clearance",
    "Required CEU certificates (HIV/AIDS, OSHA, Alzheimer's, etc.)"
  ];

  const positions = [
  {
    title: "Home Health Aides (HHA)",
    description: "Assist clients with daily living activities, personal care, companionship, and light household tasks.",
    icon: "fa-hand-holding-heart"
  },
  {
    title: "Certified Nursing Assistants (CNA)",
    description: "Provide hands-on patient care with dignity, safety, and professionalism.",
    icon: "fa-user-nurse"
  },
  {
    title: "Companion Caregivers & Hospital Sitters",
    description: "Offer comfort, supervision, and support for clients at home or in hospital settings.",
    icon: "fa-hospital-user"
  }
];

  const steps = [
    "Click Apply Now and complete the short application form",
    "Upload your resume and required documents",
    "Our team reviews your profile and contacts you for next steps"
  ];

// Agar form show karna hai to ApplicationForm dikhao
// Agar form show karna hai to ApplicationForm dikhao
if (showApplicationForm) {
  if (currentStep === 1) {
    return <ApplicationForm onBack={() => setShowApplicationForm(false)} onNext={() => setCurrentStep(2)} goToStep={goToStep} />;
  }
  if (currentStep === 2) {
    return <Step2 onBack={() => setShowApplicationForm(false)} onPrevious={() => setCurrentStep(1)} onNext={() => setCurrentStep(3)} goToStep={goToStep} />;
  }
  if (currentStep === 3) {
    return <Step3 onBack={() => setShowApplicationForm(false)} onPrevious={() => setCurrentStep(2)} onNext={() => setCurrentStep(4)} goToStep={goToStep} />;
  }
  if (currentStep === 4) {
    return <Step4 onBack={() => setShowApplicationForm(false)} onPrevious={() => setCurrentStep(3)} onNext={() => setCurrentStep(5)} goToStep={goToStep} />;
  }
  if (currentStep === 5) {
    return <Step5 onBack={() => setShowApplicationForm(false)} onPrevious={() => setCurrentStep(4)} onNext={() => setCurrentStep(6)} goToStep={goToStep} />;
  }
  if (currentStep === 6) {
    return <Step6 onBack={() => setShowApplicationForm(false)} onPrevious={() => setCurrentStep(5)} onNext={() => setCurrentStep(7)} goToStep={goToStep} />;
  }
  if (currentStep === 7) {
    return <Step7 onBack={() => setShowApplicationForm(false)} onPrevious={() => setCurrentStep(6)} onNext={() => setCurrentStep(8)} goToStep={goToStep} />;
  }
if (currentStep === 8) {
  return <Step8 
    onBack={() => setShowApplicationForm(false)} 
    onPrevious={() => setCurrentStep(7)}  // ✅ FIXED
    onNext={() => setCurrentStep(9)} 
    goToStep={goToStep} 
  />;
}

  if (currentStep === 9) {
    return <ThankYou onBack={() => { setShowApplicationForm(false); setCurrentStep(1); }} />;
  }
}
  return (
    <div className="careers-page">
      {/* Header */}
<header className="header">
  <div className="header-container">
    <div className="logo">
      <img src="./logo.png.png" alt="QualCare Logo" />
    </div>
    <button className="home-btn" onClick={() => window.location.href = '/'}>Home</button>
    <div className="header-right">
      <div className="social-icons">
        <a href="https://facebook.com" target="_blank" rel="noopener noreferrer"><i className="fab fa-facebook-f"></i></a>
        <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer"><i className="fab fa-linkedin-in"></i></a>
        <a href="https://twitter.com" target="_blank" rel="noopener noreferrer"><i className="fab fa-twitter"></i></a>
        <a href="https://instagram.com" target="_blank" rel="noopener noreferrer"><i className="fab fa-instagram"></i></a>
      </div>
      {/* <a href="tel:8334758176" className="phone">(833) 475 8176</a> */}
    </div>
  </div>
</header>

      {/* Hero Section */}
      <section className="hero" style={{backgroundImage: `linear-gradient(rgba(9, 74, 135, 0.6), rgba(9, 74, 135, 0.6)), url(${heroBg})`}}>
        <div className="hero-content">
          <h1>Build a Rewarding Career in Home Care</h1>
          <p>Join Qualcare Nursing — where compassion meets opportunity. Flexible schedules, immediate client referrals, and a supportive care team waiting for you.</p>
          <button className="btn-primary" onClick={() => setShowApplicationForm(true)}>Apply Now</button>
          <br />
          <br />
          <br />
          <span className="btn-subtext">Start your application in minutes</span>
        </div>
      </section>

      {/* Intro Section */}
      <section className="intro-section">
        <div className="container">
          <p>At Qualcare Nursing, we understand that caregivers are the heart of quality home care. That's why we offer a respectful, professional environment where your skills are valued and your time matters.</p>
          <p>We work with dedicated CNAs, HHAs, nurses, and caregivers who want flexible work, reliable referrals, and meaningful careers in home healthcare.</p>
          <button className="btn-primary" onClick={() => setShowApplicationForm(true)}>Apply Now</button>
          <br />
          <br />
          <br />
          <span className="btn-subtext">Tell us about yourself and get matched with available shifts</span>
        </div>
      </section>

      {/* Why Choose Section */}
      <section className="why-section" style={{backgroundImage: `linear-gradient(rgba(154, 189, 255, 0.9), rgba(255, 255, 255, 0.9)), url(${whyBg})`}}>
        <div className="container">
          <h2>Why Caregivers Choose Qualcare</h2>
          <ul className="why-list">
            {whyChoose.map((item, index) => (
              <li key={index}>{item}</li>
            ))}
          </ul>
          <p className="section-note">We focus on long-term professional relationships — not just filling shifts.</p>
          <button className="btn-primary" onClick={() => setShowApplicationForm(true)}>Apply Now</button>
          <br />
          <br />
          <br />
          <span className="btn-subtext">Join a team that values your dedication</span>
        </div>
      </section>

      {/* Open Positions Section */}
      <section className="positions-section">
        <div className="container">
          <h2>Current Opportunities</h2>
          <div className="positions-grid">
  {positions.map((position, index) => (
    <div className="position-card" key={index}>
      <div className="position-icon">
        <i className={`fas ${position.icon}`}></i>
      </div>
      <h3>{position.title}</h3>
      <p>{position.description}</p>
    </div>
  ))}
</div>
          <button className="btn-primary" onClick={() => setShowApplicationForm(true)}>Apply Now</button>
          <br />
          <br />
          <br />
          <span className="btn-subtext">Apply for any position — we'll place you where you fit best</span>
        </div>
      </section>

      {/* Requirements Section */}
      <section className="requirements-section" style={{backgroundImage: `linear-gradient(rgba(9, 74, 135, 0.85), rgba(9, 74, 135, 0.85)), url(${requirementsBg})`}}>
        <div className="container">
          <h2>What You'll Need to Apply</h2>
          <ul className="requirements-list">
            {requirements.map((req, index) => (
              <li key={index}>{req}</li>
            ))}
          </ul>
          <p className="section-note">Don't worry if something is pending — you can still apply.</p>
          <button className="btn-primary" onClick={() => setShowApplicationForm(true)}>Apply Now</button>
          <br />
          <br />
          <span className="btn-subtext">Upload your documents and continue the process</span>
        </div>
      </section>

      {/* Process Section
      <section className="process-section">
        <div className="container">
          <h2>Simple 3-Step Application Process</h2>
          <div className="steps-grid">
            {steps.map((step, index) => (
              <div className="step-card" key={index}>
                <div className="step-number">{index + 1}</div>
                <p>{step}</p>
              </div>
            ))}
          </div>
          <p className="section-note">Most qualified applicants are contacted quickly.</p>
          <a href="#apply" className="btn-primary">Apply Now</a>
          <span className="btn-subtext">Your next opportunity starts here</span>
        </div>
      </section> */}

      {/* Final CTA Section */}
      <section className="cta-section" id="apply">
        <div className="container">
          <h2>Ready to Start Your Career with Qualcare?</h2>
          <p>If you're compassionate, dependable, and ready to work in a supportive home-care environment, we'd love to hear from you.</p>
          <button className="btn-primary btn-large" onClick={() => setShowApplicationForm(true)}>Apply Now</button>
          <br />
          <br />
          <span className="btn-subtext">Apply today and take the next step in your caregiving career</span>
        </div>
      </section>


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

export default Careers;
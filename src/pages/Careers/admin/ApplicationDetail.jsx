import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import '../ApplicationForm.css';
const ApplicationDetail = () => {
  const { id } = useParams(); // Get application ID from URL
  
  // This will be replaced with actual API call to fetch application data
  const [applicationData, setApplicationData] = useState({
    // Step 1 - Pre-Employment
    preEmployment: {
      firstName: 'John',
      middleName: 'Michael',
      lastName: 'Smith',
      streetAddress: '123 Main Street',
      city: 'Miami',
      state: 'Florida',
      zipCode: '33101',
      ssn: '***-**-1234',
      phone: '(555) 123-4567',
      legalEligibility: 'yes',
      email: 'john.smith@email.com',
      positionDesired: 'Registered Nurse',
      wageDesired: '$25-30/hr',
      dateOfBirth: '1990-05-15',
      felonyConviction: 'no',
      startDate: '2025-02-01',
      isOver18: 'yes'
    },
    // Step 2 - Education
    education: {
      highSchoolName: 'Miami High School',
      highSchoolCity: 'Miami',
      highSchoolState: 'Florida',
      highSchoolGraduate: 'yes',
      collegeName: 'Florida State University',
      collegeCity: 'Tallahassee',
      collegeState: 'Florida',
      collegeGraduate: 'yes',
      degree: 'Bachelor of Science',
      major: 'Nursing',
      certificate: 'RN License',
      currentlyEnrolled: 'no',
      skills: 'Patient care, medication administration, wound care'
    },
    // Step 3 - Availability
    availability: {
      mondayAvailable: true,
      mondayStartTime: '08:00',
      mondayEndTime: '17:00',
      tuesdayAvailable: true,
      tuesdayStartTime: '08:00',
      tuesdayEndTime: '17:00',
      wednesdayAvailable: true,
      wednesdayStartTime: '08:00',
      wednesdayEndTime: '17:00',
      thursdayAvailable: true,
      thursdayStartTime: '08:00',
      thursdayEndTime: '17:00',
      fridayAvailable: true,
      fridayStartTime: '08:00',
      fridayEndTime: '17:00',
      saturdayAvailable: false,
      saturdayStartTime: '',
      saturdayEndTime: '',
      sundayAvailable: false,
      sundayStartTime: '',
      sundayEndTime: '',
      totalHours: '40',
      specialRequests: 'None'
    },
    // Step 4 - References
    references: {
      employer1Name: 'Jane',
      employer1Last: 'Doe',
      employer1City: 'Miami, FL',
      employer1Worked: 'Former colleague, 5 years',
      employer1Phone: '(555) 234-5678',
      employer2Name: 'Robert',
      employer2Last: 'Johnson',
      employer2City: 'Fort Lauderdale, FL',
      employer2Worked: 'Nursing school professor, 4 years',
      employer2Phone: '(555) 345-6789',
      employer3Name: 'Sarah',
      employer3Last: 'Williams',
      employer3City: 'Miami, FL',
      employer3Worked: 'Friend, 10 years',
      employer3Phone: '(555) 456-7890'
    },
    // Step 5 - Experience
    experience: {
      emp1FirstName: 'Memorial',
      emp1MiddleName: '',
      emp1LastName: 'Hospital',
      emp1JobTitle: 'Registered Nurse',
      emp1Duties: 'Patient care, medication administration',
      emp1Address: '456 Hospital Blvd',
      emp1City: 'Miami',
      emp1State: 'FL',
      emp1Zip: '33101',
      emp1StartDate: '2020-01-15',
      emp1EndDate: '2024-12-31',
      emp1SupervisorFirst: 'Dr. Emily',
      emp1SupervisorMiddle: '',
      emp1SupervisorLast: 'Davis',
      emp1StartingPay: '20-25',
      emp1EndingPay: '25-30',
      emp1Phone: '(555) 111-2222',
      emp1Leaving: 'Career advancement',
      
      emp2FirstName: 'Sunrise',
      emp2MiddleName: '',
      emp2LastName: 'Medical Center',
      emp2JobTitle: 'Nursing Assistant',
      emp2Duties: 'Assisted nurses with patient care',
      emp2Address: '789 Care Lane',
      emp2City: 'Fort Lauderdale',
      emp2State: 'FL',
      emp2Zip: '33301',
      emp2StartDate: '2018-06-01',
      emp2EndDate: '2019-12-31',
      emp2SupervisorFirst: 'Linda',
      emp2SupervisorMiddle: '',
      emp2SupervisorLast: 'Martinez',
      emp2StartingPay: '15-20',
      emp2EndingPay: '20-25',
      emp2Phone: '(555) 222-3333',
      emp2Leaving: 'Returned to school',
      
      emp3FirstName: '',
      emp3MiddleName: '',
      emp3LastName: '',
      emp3JobTitle: '',
      emp3Duties: '',
      emp3Address: '',
      emp3City: '',
      emp3State: '',
      emp3Zip: '',
      emp3StartDate: '',
      emp3EndDate: '',
      emp3SupervisorFirst: '',
      emp3SupervisorMiddle: '',
      emp3SupervisorLast: '',
      emp3StartingPay: '',
      emp3EndingPay: '',
      emp3Phone: '',
      emp3Leaving: ''
    },
    // Step 6 - Documents
    documents: {
      physicalExam: 'physical_exam.pdf',
      physicalExamExpiry: '2025-06-15',
      cprCard: 'cpr_card.pdf',
      cprExpiry: '2026-01-20',
      driversLicense: 'drivers_license.pdf',
      driversLicenseExpiry: '2027-05-15',
      professionalLicense: 'rn_license.pdf',
      professionalLicenseExpiry: '2026-12-31',
      liabilityInsurance: 'liability_insurance.pdf',
      liabilityInsuranceExpiry: '2025-12-31',
      autoInsurance: 'auto_insurance.pdf',
      autoInsuranceExpiry: '2025-08-30',
      workAuthorization: 'work_auth.pdf',
      workAuthorizationExpiry: '2030-01-01',
      backgroundScreening: 'background_check.pdf',
      backgroundScreeningExpiry: '2027-01-15',
      palmBeachBadge: null,
      palmBeachBadgeExpiry: '',
      hivCertificate: 'hiv_cert.pdf',
      domesticViolence: 'domestic_violence.pdf',
      alzheimersCertificate: 'alzheimers_cert.pdf',
      alzheimersTraining: 'alzheimers_training.pdf',
      hipaa: 'hipaa.pdf',
      osha: 'osha.pdf',
      medicationCertificate: 'medication_cert.pdf',
      communicationTraining: 'communication_training.pdf',
      patientRights: 'patient_rights.pdf',
      medicalRecords: 'medical_records.pdf',
      medicalErrors: 'medical_errors.pdf',
      floridaLaws: 'florida_laws.pdf'
    },
    // Step 7 - Review/Signature
    review: {
      agreeStatements: true,
      signatureDate: '2025-01-15',
      signature: '/signatures/john_smith_signature.png'
    }
  });

  const [activeStep, setActiveStep] = useState(1);

  // Fetch application data on component mount
  useEffect(() => {
    // TODO: Replace with actual API call
    // fetchApplicationData(id);
  }, [id]);

  return (
    <>
      <div className="page-header">
        <h2>Application Details - #{id?.padStart(4, '0')}</h2>
        <p>View complete application submission</p>
      </div>

      {/* Step Navigation */}
      <div className="application-detail-nav">
        <div className="progress-steps">
          {[
            { num: 1, label: 'Pre-Employment' },
            { num: 2, label: 'Education' },
            { num: 3, label: 'Availability' },
            { num: 4, label: 'References' },
            { num: 5, label: 'Experience' },
            { num: 6, label: 'Documents' },
            { num: 7, label: 'Review' }
          ].map(step => (
            <div
              key={step.num}
              className={`step ${activeStep === step.num ? 'active' : 'completed'}`}
              onClick={() => setActiveStep(step.num)}
            >
              <div className="step-number">
                {activeStep > step.num ? '✓' : step.num}
              </div>
              <span className="step-label">{step.label}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Application Content */}
      <div className="application-detail-content">
        {/* STEP 1 - PRE-EMPLOYMENT */}
        {activeStep === 1 && (
          <div className="detail-step">
            <h1 className="form-title">PRE-EMPLOYMENT REQUIREMENTS</h1>

            <div className="detail-section">
              <label className="section-label">Name</label>
              <div className="detail-grid">
                <div className="detail-field">
                  <span className="field-label">First</span>
                  <p className="field-value">{applicationData.preEmployment.firstName}</p>
                </div>
                <div className="detail-field">
                  <span className="field-label">Middle</span>
                  <p className="field-value">{applicationData.preEmployment.middleName || '-'}</p>
                </div>
                <div className="detail-field">
                  <span className="field-label">Last</span>
                  <p className="field-value">{applicationData.preEmployment.lastName}</p>
                </div>
              </div>
            </div>

            <div className="detail-section">
              <label className="section-label">Address</label>
              <div className="detail-field">
                <span className="field-label">Street Address</span>
                <p className="field-value">{applicationData.preEmployment.streetAddress}</p>
              </div>
              <div className="detail-grid">
                <div className="detail-field">
                  <span className="field-label">City</span>
                  <p className="field-value">{applicationData.preEmployment.city}</p>
                </div>
                <div className="detail-field">
                  <span className="field-label">State</span>
                  <p className="field-value">{applicationData.preEmployment.state}</p>
                </div>
              </div>
              <div className="detail-field half-width">
                <span className="field-label">ZIP Code</span>
                <p className="field-value">{applicationData.preEmployment.zipCode}</p>
              </div>
            </div>

            <div className="detail-row">
              <div className="detail-field">
                <label className="section-label">Social Security Number</label>
                <p className="field-value">{applicationData.preEmployment.ssn}</p>
              </div>
              <div className="detail-field">
                <label className="section-label">Phone Number</label>
                <p className="field-value">{applicationData.preEmployment.phone}</p>
              </div>
            </div>

            <div className="detail-section">
              <label className="section-label">
                If hired can you provide evidence of legal eligibility to work in the United States?
              </label>
              <p className="field-value capitalize">{applicationData.preEmployment.legalEligibility}</p>
            </div>

            <div className="detail-row">
              <div className="detail-field">
                <label className="section-label">Email</label>
                <p className="field-value">{applicationData.preEmployment.email}</p>
              </div>
              <div className="detail-field">
                <label className="section-label">Position Desired</label>
                <p className="field-value">{applicationData.preEmployment.positionDesired}</p>
              </div>
            </div>

            <div className="detail-row">
              <div className="detail-field">
                <label className="section-label">Wage/Salary Desired</label>
                <p className="field-value">{applicationData.preEmployment.wageDesired}</p>
              </div>
              <div className="detail-field">
                <label className="section-label">Date of Birth</label>
                <p className="field-value">{applicationData.preEmployment.dateOfBirth}</p>
              </div>
            </div>

            <div className="detail-section">
              <label className="section-label">
                Have you EVER been convicted of a felony?
              </label>
              <p className="field-value capitalize">{applicationData.preEmployment.felonyConviction}</p>
            </div>

            <div className="detail-section">
              <label className="section-label">Date you can begin work?</label>
              <p className="field-value">{applicationData.preEmployment.startDate}</p>
            </div>

            <div className="detail-section">
              <label className="section-label">Are you 18 years or older?</label>
              <p className="field-value capitalize">{applicationData.preEmployment.isOver18}</p>
            </div>
          </div>
        )}

        {/* STEP 2 - EDUCATION */}
        {activeStep === 2 && (
          <div className="detail-step">
            <h1 className="form-title">EDUCATION</h1>

            <div className="detail-section">
              <label className="section-label">Name of high school attended</label>
              <p className="field-value">{applicationData.education.highSchoolName}</p>
            </div>

            <div className="detail-section">
              <label className="section-label">City and State</label>
              <div className="detail-grid">
                <div className="detail-field">
                  <span className="field-label">City</span>
                  <p className="field-value">{applicationData.education.highSchoolCity}</p>
                </div>
                <div className="detail-field">
                  <span className="field-label">State</span>
                  <p className="field-value">{applicationData.education.highSchoolState}</p>
                </div>
              </div>
            </div>

            <div className="detail-section">
              <label className="section-label">Did you Graduate?</label>
              <p className="field-value capitalize">{applicationData.education.highSchoolGraduate}</p>
            </div>

            <hr className="section-divider" />

            <div className="detail-section">
              <label className="section-label">Name of College or technical school</label>
              <p className="field-value">{applicationData.education.collegeName || '-'}</p>
            </div>

            <div className="detail-section">
              <label className="section-label">City and State</label>
              <div className="detail-grid">
                <div className="detail-field">
                  <span className="field-label">City</span>
                  <p className="field-value">{applicationData.education.collegeCity || '-'}</p>
                </div>
                <div className="detail-field">
                  <span className="field-label">State</span>
                  <p className="field-value">{applicationData.education.collegeState || '-'}</p>
                </div>
              </div>
            </div>

            <div className="detail-section">
              <label className="section-label">Did you Graduate?</label>
              <p className="field-value capitalize">{applicationData.education.collegeGraduate || '-'}</p>
            </div>

            <div className="detail-row">
              <div className="detail-field">
                <label className="section-label">Degree</label>
                <p className="field-value">{applicationData.education.degree || '-'}</p>
              </div>
              <div className="detail-field">
                <label className="section-label">Major</label>
                <p className="field-value">{applicationData.education.major || '-'}</p>
              </div>
              <div className="detail-field">
                <label className="section-label">Certificate/Diploma</label>
                <p className="field-value">{applicationData.education.certificate || '-'}</p>
              </div>
            </div>

            <div className="detail-section">
              <label className="section-label">Are you presently enrolled in School?</label>
              <p className="field-value capitalize">{applicationData.education.currentlyEnrolled || '-'}</p>
            </div>

            <div className="detail-section">
              <label className="section-label">List any job-related skills or accomplishments</label>
              <p className="field-value">{applicationData.education.skills || '-'}</p>
            </div>
          </div>
        )}

        {/* STEP 3 - AVAILABILITY */}
        {activeStep === 3 && (
          <div className="detail-step">
            <h1 className="form-title">YOUR AVAILABILITY FOR WORK</h1>

            <div className="detail-section">
              <div className="availability-detail-grid">
                {['monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday', 'sunday'].map((day) => (
                  <div key={day} className="availability-day-detail">
                    <h4 className="day-label">{day.charAt(0).toUpperCase() + day.slice(1)}</h4>
                    {applicationData.availability[`${day}Available`] ? (
                      <p className="field-value">
                        {applicationData.availability[`${day}StartTime`]} - {applicationData.availability[`${day}EndTime`]}
                      </p>
                    ) : (
                      <p className="field-value text-muted">Not Available</p>
                    )}
                  </div>
                ))}
              </div>
            </div>

            <div className="detail-section">
              <label className="section-label">Total number of hours per week available</label>
              <p className="field-value">{applicationData.availability.totalHours} hours</p>
            </div>

            <div className="detail-section">
              <label className="section-label">Special requests or needs for work schedule</label>
              <p className="field-value">{applicationData.availability.specialRequests || '-'}</p>
            </div>
          </div>
        )}

        {/* STEP 4 - REFERENCES */}
        {activeStep === 4 && (
          <div className="detail-step">
            <h1 className="form-title">REFERENCES</h1>

            {[1, 2, 3].map(num => (
              <div className="employer-section" key={num}>
                <h2 className="employer-number">{num}</h2>

                <div className="detail-section">
                  <label className="section-label">Name</label>
                  <div className="detail-grid">
                    <div className="detail-field">
                      <span className="field-label">First</span>
                      <p className="field-value">{applicationData.references[`employer${num}Name`] || '-'}</p>
                    </div>
                    <div className="detail-field">
                      <span className="field-label">Last</span>
                      <p className="field-value">{applicationData.references[`employer${num}Last`] || '-'}</p>
                    </div>
                  </div>
                </div>

                <div className="detail-section">
                  <label className="section-label">City/State</label>
                  <p className="field-value">{applicationData.references[`employer${num}City`] || '-'}</p>
                </div>

                <div className="detail-section">
                  <label className="section-label">How do you know them, and for how long?</label>
                  <p className="field-value">{applicationData.references[`employer${num}Worked`] || '-'}</p>
                </div>

                <div className="detail-section">
                  <label className="section-label">Phone Number</label>
                  <p className="field-value">{applicationData.references[`employer${num}Phone`] || '-'}</p>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* STEP 5 - EXPERIENCE */}
        {activeStep === 5 && (
          <div className="detail-step">
            <h1 className="form-title">EMPLOYMENT HISTORY</h1>

            {['emp1', 'emp2', 'emp3'].map((prefix, index) => {
              const title = ['First Employer', 'Second Employer', 'Third Employer'][index];
              
              // Skip if employer data is empty
              if (!applicationData.experience[`${prefix}FirstName`] && 
                  !applicationData.experience[`${prefix}LastName`]) {
                return null;
              }

              return (
                <div className="employer-section" key={prefix}>
                  <h2 className="employer-title">{title}</h2>

                  <div className="detail-section">
                    <label className="section-label">Name of Employer</label>
                    <div className="detail-grid">
                      <div className="detail-field">
                        <span className="field-label">First</span>
                        <p className="field-value">{applicationData.experience[`${prefix}FirstName`] || '-'}</p>
                      </div>
                      <div className="detail-field">
                        <span className="field-label">Middle</span>
                        <p className="field-value">{applicationData.experience[`${prefix}MiddleName`] || '-'}</p>
                      </div>
                      <div className="detail-field">
                        <span className="field-label">Last</span>
                        <p className="field-value">{applicationData.experience[`${prefix}LastName`] || '-'}</p>
                      </div>
                    </div>
                  </div>

                  <div className="detail-section">
                    <label className="section-label">Job Title</label>
                    <p className="field-value">{applicationData.experience[`${prefix}JobTitle`] || '-'}</p>
                  </div>

                  <div className="detail-section">
                    <label className="section-label">Duties</label>
                    <p className="field-value">{applicationData.experience[`${prefix}Duties`] || '-'}</p>
                  </div>

                  <div className="detail-section">
                    <label className="section-label">Address</label>
                    <div className="detail-field">
                      <span className="field-label">Street Address</span>
                      <p className="field-value">{applicationData.experience[`${prefix}Address`] || '-'}</p>
                    </div>
                    <div className="detail-grid">
                      <div className="detail-field">
                        <span className="field-label">City</span>
                        <p className="field-value">{applicationData.experience[`${prefix}City`] || '-'}</p>
                      </div>
                      <div className="detail-field">
                        <span className="field-label">State</span>
                        <p className="field-value">{applicationData.experience[`${prefix}State`] || '-'}</p>
                      </div>
                    </div>
                    <div className="detail-field half-width">
                      <span className="field-label">ZIP Code</span>
                      <p className="field-value">{applicationData.experience[`${prefix}Zip`] || '-'}</p>
                    </div>
                  </div>

                  <div className="detail-row">
                    <div className="detail-field">
                      <label className="section-label">Start Date</label>
                      <p className="field-value">{applicationData.experience[`${prefix}StartDate`] || '-'}</p>
                    </div>
                    <div className="detail-field">
                      <label className="section-label">End Date</label>
                      <p className="field-value">{applicationData.experience[`${prefix}EndDate`] || '-'}</p>
                    </div>
                  </div>

                  <div className="detail-section">
                    <label className="section-label">Supervisor's Name</label>
                    <div className="detail-grid">
                      <div className="detail-field">
                        <span className="field-label">First</span>
                        <p className="field-value">{applicationData.experience[`${prefix}SupervisorFirst`] || '-'}</p>
                      </div>
                      <div className="detail-field">
                        <span className="field-label">Middle</span>
                        <p className="field-value">{applicationData.experience[`${prefix}SupervisorMiddle`] || '-'}</p>
                      </div>
                      <div className="detail-field">
                        <span className="field-label">Last</span>
                        <p className="field-value">{applicationData.experience[`${prefix}SupervisorLast`] || '-'}</p>
                      </div>
                    </div>
                  </div>

                  <div className="detail-row">
                    <div className="detail-field">
                      <label className="section-label">Starting Pay</label>
                      <p className="field-value">${applicationData.experience[`${prefix}StartingPay`] || '-'}/hr</p>
                    </div>
                    <div className="detail-field">
                      <label className="section-label">Ending Pay</label>
                      <p className="field-value">${applicationData.experience[`${prefix}EndingPay`] || '-'}/hr</p>
                    </div>
                  </div>

                  <div className="detail-section">
                    <label className="section-label">Telephone Number</label>
                    <p className="field-value">{applicationData.experience[`${prefix}Phone`] || '-'}</p>
                  </div>

                  <div className="detail-section">
                    <label className="section-label">Reason for leaving</label>
                    <p className="field-value">{applicationData.experience[`${prefix}Leaving`] || '-'}</p>
                  </div>
                </div>
              );
            })}
          </div>
        )}

        {/* STEP 6 - DOCUMENTS */}
        {activeStep === 6 && (
          <div className="detail-step">
            <h1 className="form-title">DOCUMENT UPLOADS</h1>

            {/* Documents with Expiry */}
            {[
              { label: 'Physical Examination', name: 'physicalExam', expiry: 'physicalExamExpiry' },
              { label: 'CPR Card', name: 'cprCard', expiry: 'cprExpiry' },
              { label: "Driver's License", name: 'driversLicense', expiry: 'driversLicenseExpiry' },
              { label: 'Professional License', name: 'professionalLicense', expiry: 'professionalLicenseExpiry' },
              { label: 'Liability Insurance', name: 'liabilityInsurance', expiry: 'liabilityInsuranceExpiry' },
              { label: 'Auto Insurance', name: 'autoInsurance', expiry: 'autoInsuranceExpiry' },
              { label: 'Work Authorization', name: 'workAuthorization', expiry: 'workAuthorizationExpiry' },
              { label: 'Background Screening', name: 'backgroundScreening', expiry: 'backgroundScreeningExpiry' },
              { label: 'Palm Beach Badge', name: 'palmBeachBadge', expiry: 'palmBeachBadgeExpiry' }
            ].map(doc => (
              <div className="document-detail-section" key={doc.name}>
                <label className="section-label">{doc.label}</label>
                {applicationData.documents[doc.name] ? (
                  <>
                    <div className="document-file">
                      <i className="fas fa-file-pdf"></i>
                      <a href={`/uploads/${applicationData.documents[doc.name]}`} target="_blank" rel="noopener noreferrer">
                        {applicationData.documents[doc.name]}
                      </a>
                    </div>
                    {applicationData.documents[doc.expiry] && (
                      <p className="field-value">
                        <strong>Expires:</strong> {applicationData.documents[doc.expiry]}
                      </p>
                    )}
                  </>
                ) : (
                  <p className="field-value text-muted">Not uploaded</p>
                )}
              </div>
            ))}

            <hr className="section-divider" />

            {/* Documents without Expiry */}
            {[
              { label: 'HIV/AIDS Certificate', name: 'hivCertificate' },
              { label: 'Domestic Violence Certificate', name: 'domesticViolence' },
              { label: 'Alzheimer/Dementia Certificate', name: 'alzheimersCertificate' },
              { label: '1 Hour Alzheimer Training', name: 'alzheimersTraining' },
              { label: 'HIPAA Update', name: 'hipaa' },
              { label: 'OSHA Update', name: 'osha' },
              { label: 'Medication Certificate', name: 'medicationCertificate' },
              { label: 'Communication Training', name: 'communicationTraining' },
              { label: 'Patient Rights', name: 'patientRights' },
              { label: 'Medical Records', name: 'medicalRecords' },
              { label: 'Medical Errors', name: 'medicalErrors' },
              { label: 'Florida Laws & Rules', name: 'floridaLaws' }
            ].map(doc => (
              <div className="document-detail-section" key={doc.name}>
                <label className="section-label">{doc.label}</label>
                {applicationData.documents[doc.name] ? (
                  <div className="document-file">
                    <i className="fas fa-file-pdf"></i>
                    <a href={`/uploads/${applicationData.documents[doc.name]}`} target="_blank" rel="noopener noreferrer">
                      {applicationData.documents[doc.name]}
                    </a>
                  </div>
                ) : (
                  <p className="field-value text-muted">Not uploaded</p>
                )}
              </div>
            ))}
          </div>
        )}

        {/* STEP 7 - REVIEW/SIGNATURE */}
        {activeStep === 7 && (
          <div className="detail-step">
            <h1 className="form-title">REVIEW & SIGNATURE</h1>

            <div className="detail-section">
              <label className="section-label">Agreement</label>
              <p className="field-value">
                {applicationData.review.agreeStatements ? (
                  <span className="text-success"><i className="fas fa-check-circle"></i> Agreed to all statements</span>
                ) : (
                  <span className="text-danger"><i className="fas fa-times-circle"></i> Not agreed</span>
                )}
              </p>
            </div>

            <div className="detail-section">
              <label className="section-label">Signature</label>
              {applicationData.review.signature ? (
                <div className="signature-display">
                  <img src={applicationData.review.signature} alt="Applicant Signature" />
                </div>
              ) : (
                <p className="field-value text-muted">No signature</p>
              )}
            </div>

            <div className="detail-section">
              <label className="section-label">Date Signed</label>
              <p className="field-value">{applicationData.review.signatureDate}</p>
            </div>
          </div>
        )}
      </div>

      {/* Navigation Buttons */}
      <div className="detail-navigation">
        {activeStep > 1 && (
          <button 
            className="btn-previous" 
            onClick={() => setActiveStep(activeStep - 1)}
          >
            <i className="fas fa-arrow-left"></i> Previous
          </button>
        )}
        {activeStep < 7 && (
          <button 
            className="btn-next" 
            onClick={() => setActiveStep(activeStep + 1)}
          >
            Next <i className="fas fa-arrow-right"></i>
          </button>
        )}
      </div>
    </>
  );
};

export default ApplicationDetail;
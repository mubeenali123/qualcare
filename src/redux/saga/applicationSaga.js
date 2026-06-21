import { call, put, takeLatest, all } from "redux-saga/effects";
import axios from "axios";
import { base_url } from "../../components/config";
import * as types from '../../redux/type';

// 1. Submit/Save Application Step
function* submitApplication(action) {
  try {
    const storedReferenceId =
      action.payload.referenceId ||
      localStorage.getItem("applicationReferenceId");

    let payloadToSend;

    if (action.payload instanceof FormData) {
      payloadToSend = action.payload;
      if (storedReferenceId) {
        payloadToSend.set("referenceId", storedReferenceId);
      }
    } else {
      payloadToSend = {
        ...action.payload,
        referenceId: storedReferenceId,
      };
    }

    const response = yield call(() =>
      axios.post(`${base_url}/applications-save`, payloadToSend, {
        headers:
          payloadToSend instanceof FormData
            ? { "Content-Type": "multipart/form-data" }
            : {},
      })
    );

    if (!storedReferenceId && response.data.referenceId) {
      localStorage.setItem("applicationReferenceId", response.data.referenceId);
    }

    yield put({
      type: types.SUBMIT_APPLICATION_SUCCESS,
      payload: response.data,
    });

  } catch (error) {
    yield put({
      type: types.SUBMIT_APPLICATION_FAILURE,
      payload: error.response?.data || error.message,
    });
  }
}

// 2. Fetch All Applications (Admin)
function* fetchAdminApplications() {
  try {
    const response = yield call(() => axios.get(`${base_url}/admin/applications`));
    yield put({
      type: types.FETCH_ADMIN_APPS_SUCCESS,
      payload: response.data,
    });
  } catch (error) {
    yield put({
      type: types.FETCH_ADMIN_APPS_FAILURE,
      payload: error.response?.data || error.message,
    });
  }
}

// 3. Delete Application (Admin)
function* deleteAdminApplication(action) {
  try {
    // action.payload is the ID
    yield call(() => axios.delete(`${base_url}/admin/applications/${action.payload}`));
    yield put({
      type: types.DELETE_ADMIN_APP_SUCCESS,
      payload: action.payload, // Send ID to reducer to filter it out
    });
  } catch (error) {
    yield put({
      type: types.DELETE_ADMIN_APP_FAILURE,
      payload: error.response?.data || error.message,
    });
  }
}

function* fetchApplicationDetail(action) {
  try {
    const response = yield call(() => axios.get(`${base_url}/admin/applications/${action.payload}`));
    yield put({
      type: types.FETCH_APPLICATION_DETAIL_SUCCESS,
      payload: response.data,
    });
  } catch (error) {
    yield put({
      type: types.FETCH_APPLICATION_DETAIL_FAILURE,
      payload: error.response?.data || error.message,
    });
  }
}

function* approveApplication(action) {
  try {
    const response = yield call(() => 
      axios.put(`${base_url}/admin/applications/${action.payload}/approve`)
    );
    yield put({
      type: types.APPROVE_APPLICATION_SUCCESS,
      payload: response.data,
    });
    // Optionally refetch the application details
    yield put({
      type: types.FETCH_APPLICATION_DETAIL_REQUEST,
      payload: action.payload
    });
  } catch (error) {
    yield put({
      type: types.APPROVE_APPLICATION_FAILURE,
      payload: error.response?.data || error.message,
    });
  }
}

function* rejectApplication(action) {
  try {
    const response = yield call(() => 
      axios.put(`${base_url}/admin/applications/${action.payload}/reject`)
    );
    yield put({
      type: types.REJECT_APPLICATION_SUCCESS,
      payload: response.data,
    });
    // Optionally refetch the application details
    yield put({
      type: types.FETCH_APPLICATION_DETAIL_REQUEST,
      payload: action.payload
    });
  } catch (error) {
    yield put({
      type: types.REJECT_APPLICATION_FAILURE,
      payload: error.response?.data || error.message,
    });
  }
}

function* fetchApplicationNotes(action) {
  try {
    const response = yield call(() => 
      axios.get(`${base_url}/admin/applications/${action.payload}/notes`)
    );
    yield put({
      type: types.FETCH_APPLICATION_NOTES_SUCCESS,
      payload: response.data,
    });
  } catch (error) {
    yield put({
      type: types.FETCH_APPLICATION_NOTES_FAILURE,
      payload: error.response?.data || error.message,
    });
  }
}

function* addApplicationNote(action) {
  try {
    const response = yield call(() => 
      axios.post(`${base_url}/admin/applications/${action.payload.applicationId}/notes`, {
        note: action.payload.note,
        admin_user: action.payload.admin_user,
        priority: action.payload.priority
      })
    );
    yield put({
      type: types.ADD_APPLICATION_NOTE_SUCCESS,
      payload: response.data,
    });
    // Refetch notes after adding
    yield put({
      type: types.FETCH_APPLICATION_NOTES_REQUEST,
      payload: action.payload.applicationId
    });
  } catch (error) {
    yield put({
      type: types.ADD_APPLICATION_NOTE_FAILURE,
      payload: error.response?.data || error.message,
    });
  }
}

function* deleteApplicationNote(action) {
  try {
    yield call(() => 
      axios.delete(`${base_url}/admin/applications/notes/${action.payload.noteId}`)
    );
    yield put({
      type: types.DELETE_APPLICATION_NOTE_SUCCESS,
      payload: action.payload.noteId,
    });
    // Refetch notes after deleting
    yield put({
      type: types.FETCH_APPLICATION_NOTES_REQUEST,
      payload: action.payload.applicationId
    });
  } catch (error) {
    yield put({
      type: types.DELETE_APPLICATION_NOTE_FAILURE,
      payload: error.response?.data || error.message,
    });
  }
}

function* fetchAllStatusLogs() {
  try {
    const response = yield call(() => 
      axios.get(`${base_url}/admin/status-logs`)
    );
    yield put({
      type: types.FETCH_ALL_STATUS_LOGS_SUCCESS,
      payload: response.data,
    });
  } catch (error) {
    yield put({
      type: types.FETCH_ALL_STATUS_LOGS_FAILURE,
      payload: error.response?.data || error.message,
    });
  }
}

function* fetchStatusLogs(action) {
  try {
    const response = yield call(() => 
      axios.get(`${base_url}/admin/applications/${action.payload}/status-logs`)
    );
    yield put({
      type: types.FETCH_STATUS_LOGS_SUCCESS,
      payload: response.data,
    });
  } catch (error) {
    yield put({
      type: types.FETCH_STATUS_LOGS_FAILURE,
      payload: error.response?.data || error.message,
    });
  }
}

function* fetchDashboardStats() {
  try {
    const response = yield call(() => 
      axios.get(`${base_url}/admin/dashboard-stats`)
    );
    yield put({
      type: types.FETCH_DASHBOARD_STATS_SUCCESS,
      payload: response.data,
    });
  } catch (error) {
    yield put({
      type: types.FETCH_DASHBOARD_STATS_FAILURE,
      payload: error.response?.data || error.message,
    });
  }
}
function* lockApplicantAccount(action) {
  try {
    const response = yield call(() =>
      axios.put(`${base_url}/admin/applicants/${action.payload}/lock`)
    );
    yield put({
      type: types.LOCK_APPLICANT_ACCOUNT_SUCCESS,
      payload: response.data,
    });
    // Refetch applicants list
    yield put({ type: types.FETCH_APPLICANTS_REQUEST });
  } catch (error) {
    yield put({
      type: types.LOCK_APPLICANT_ACCOUNT_FAILURE,
      payload: error.response?.data || error.message,
    });
  }
}

function* unlockApplicantAccount(action) {
  try {
    const response = yield call(() =>
      axios.put(`${base_url}/admin/applicants/${action.payload}/unlock`)
    );
    yield put({
      type: types.UNLOCK_APPLICANT_ACCOUNT_SUCCESS,
      payload: response.data,
    });
    yield put({ type: types.FETCH_APPLICANTS_REQUEST });
  } catch (error) {
    yield put({
      type: types.UNLOCK_APPLICANT_ACCOUNT_FAILURE,
      payload: error.response?.data || error.message,
    });
  }
}

function* archiveApplicantAccount(action) {
  try {
    const response = yield call(() =>
      axios.put(`${base_url}/admin/applicants/${action.payload}/archive`)
    );
    yield put({
      type: types.ARCHIVE_APPLICANT_ACCOUNT_SUCCESS,
      payload: response.data,
    });
    yield put({ type: types.FETCH_APPLICANTS_REQUEST });
  } catch (error) {
    yield put({
      type: types.ARCHIVE_APPLICANT_ACCOUNT_FAILURE,
      payload: error.response?.data || error.message,
    });
  }
}

function* resetApplicantPassword(action) {
  try {
    const response = yield call(() =>
      axios.put(`${base_url}/admin/applicants/${action.payload.id}/reset-password`, {
        new_password: action.payload.new_password
      })
    );
    yield put({
      type: types.RESET_APPLICANT_PASSWORD_SUCCESS,
      payload: response.data,
    });
  } catch (error) {
    yield put({
      type: types.RESET_APPLICANT_PASSWORD_FAILURE,
      payload: error.response?.data || error.message,
    });
  }
}
const STEP_NAME_MAP = {
  1:  'final_eligibility',
  2:  'final_w9',
  3:  'final_attest_compliance',
  4:  'final_attest_offenses',
  5:  'final_bg_screening',
  6:  'final_employee_attest',
  7:  'final_policy_ack',
  8:  'final_bg_attest',
  9:  'final_patient_abandon',
  10: 'final_charges_1',
  11: 'final_charges_2',
  12: 'final_charges_3',
  13: 'final_bg_auth',
};
// function* saveFinalFormStep(action) {
//   try {
//     // Destructure including stepName from payload
//     const { stepNumber, stepName, formData, signatureData, pdfFieldData, referenceId } = action.payload;
    
//     // Use stepName from payload or fallback to mapping
//     const finalStepName = stepName || STEP_NAME_MAP[stepNumber];
//     const storedReferenceId = referenceId || localStorage.getItem('applicationReferenceId');
    
//     console.log('Saving final step:', { stepNumber, finalStepName, storedReferenceId });

//     const payload = new FormData();
//     payload.append('referenceId', storedReferenceId);
//     payload.append('step', finalStepName); // Use the step name
//     payload.append('stepNumber', stepNumber);

//     // Append regular form fields as JSON
//     if (formData && Object.keys(formData).length > 0) {
//       payload.append('data', JSON.stringify(formData));
//     }

//     // Append PDF field data if provided and not empty
//     if (pdfFieldData && Object.keys(pdfFieldData).length > 0) {
//       payload.append('pdfFieldData', JSON.stringify(pdfFieldData));
//     }

//     // Append signature as blob if present
//     if (signatureData) {
//       const blob = dataURItoBlob(signatureData);
//       payload.append('signature', blob, `signature_step${stepNumber}.png`);
//     }

//     const response = yield call(() =>
//       axios.post(`${base_url}/applications-final-save`, payload, {
//         headers: { 'Content-Type': 'multipart/form-data' },
//       })
//     );

//     yield put({
//       type: types.SAVE_FINAL_FORM_STEP_SUCCESS,
//       payload: {
//         stepName: finalStepName,
//         data: formData,
//         progress: response.data.progress,
//       },
//     });

//   } catch (error) {
//     console.error('Save final step error:', error);
//     yield put({
//       type: types.SAVE_FINAL_FORM_STEP_FAILURE,
//       payload: error.response?.data || error.message,
//     });
//   }
// }
function* saveFinalFormStep(action) {
  try {
    let stepNumber, finalStepName, formData, signatureData, pdfFieldData, storedReferenceId;
    let payload;
    
    // Check if payload is FormData (file upload from FinalApplicationForm4)
    if (action.payload instanceof FormData) {
      // It's a FormData object - extract values
      payload = action.payload;
      storedReferenceId = payload.get('referenceId');
      finalStepName = payload.get('step');
      stepNumber = parseInt(payload.get('stepNumber'), 10);
      
      console.log('Saving final step (FormData):', { stepNumber, finalStepName, storedReferenceId });
      
      // For file uploads, we don't have these
      formData = null;
      signatureData = null;
      pdfFieldData = null;
    } 
    else {
      // Regular object payload (from other forms)
      const { stepNumber: sn, stepName, formData: fd, signatureData: sd, pdfFieldData: pfd, referenceId } = action.payload;
      
      stepNumber = sn;
      finalStepName = stepName || STEP_NAME_MAP[stepNumber];
      storedReferenceId = referenceId || localStorage.getItem('applicationReferenceId');
      formData = fd;
      signatureData = sd;
      pdfFieldData = pfd;
      
      console.log('Saving final step (Object):', { stepNumber, finalStepName, storedReferenceId });
      
      // Create FormData for non-file uploads
      payload = new FormData();
      payload.append('referenceId', storedReferenceId);
      payload.append('step', finalStepName);
      payload.append('stepNumber', stepNumber);
      
      if (formData && Object.keys(formData).length > 0) {
        payload.append('data', JSON.stringify(formData));
      }
      if (pdfFieldData && Object.keys(pdfFieldData).length > 0) {
        payload.append('pdfFieldData', JSON.stringify(pdfFieldData));
      }
      if (signatureData) {
        const blob = dataURItoBlob(signatureData);
        payload.append('signature', blob, `signature_step${stepNumber}.png`);
      }
    }
    
    // Make the API call
    const response = yield call(() =>
      axios.post(`${base_url}/applications-final-save`, payload, {
        headers: { 'Content-Type': 'multipart/form-data' },
      })
    );
    
    yield put({
      type: types.SAVE_FINAL_FORM_STEP_SUCCESS,
      payload: {
        stepName: finalStepName,
        data: formData || {},
        progress: response.data.progress,
      },
    });
    
  } catch (error) {
    console.error('Save final step error:', error);
    yield put({
      type: types.SAVE_FINAL_FORM_STEP_FAILURE,
      payload: error.response?.data?.message || error.message || 'Failed to save step',
    });
  }
}
function* fetchFormProgress(action) {
  try {
    const referenceId = action.payload || localStorage.getItem('applicationReferenceId');
    const response = yield call(() =>
      axios.get(`${base_url}/applications-progress/${referenceId}`)
    );
    yield put({
      type: types.FETCH_FORM_PROGRESS_SUCCESS,
      payload: response.data,
    });
  } catch (error) {
    yield put({
      type: types.FETCH_FORM_PROGRESS_FAILURE,
      payload: error.response?.data || error.message,
    });
  }
}

function* fetchFinalFormData(action) {
  try {
    const referenceId = action.payload || localStorage.getItem('applicationReferenceId');
    const response = yield call(() =>
      axios.get(`${base_url}/applications-final-data/${referenceId}`)
    );
    yield put({
      type: types.FETCH_FINAL_FORM_DATA_SUCCESS,
      payload: response.data,
    });
  } catch (error) {
    yield put({
      type: types.FETCH_FINAL_FORM_DATA_FAILURE,
      payload: error.response?.data || error.message,
    });
  }
}
function* sendToTablet(action) {
  try {
    const response = yield call(() =>
      axios.post(`${base_url}/applications-send-to-tablet`, {
        reference_id: action.payload.referenceId,
        applicant_id: action.payload.applicantId
      })
    );

    yield put({
      type: types.SEND_TO_TABLET_SUCCESS,
      payload: response.data
    });

    alert('✅ Application details sent to office tablet successfully!');
    
    // Optionally refresh application data
    yield put({
      type: types.FETCH_APPLICATION_DETAIL_REQUEST,
      payload: action.payload.referenceId
    });

  } catch (error) {
    yield put({
      type: types.SEND_TO_TABLET_FAILURE,
      payload: error.response?.data?.message || 'Failed to send to tablet'
    });

    alert('❌ Failed to send to tablet. Please try again.');
  }
}

// Helper: convert base64 to Blob for signature upload
function dataURItoBlob(dataURI) {
  const byteString = atob(dataURI.split(',')[1]);
  const mimeString = dataURI.split(',')[0].split(':')[1].split(';')[0];
  const ab = new ArrayBuffer(byteString.length);
  const ia = new Uint8Array(ab);
  for (let i = 0; i < byteString.length; i++) ia[i] = byteString.charCodeAt(i);
  return new Blob([ab], { type: mimeString });
}
function* unarchiveApplicantAccount(action) {
  try {
    yield call(() =>
      axios.post(`${base_url}/admin/applicants/${action.payload}/unarchive`)
    );

    yield put({
      type: types.UNARCHIVE_APPLICANT_ACCOUNT_SUCCESS,
      payload: action.payload
    });

    // Refresh applicants list
    yield put({ type: types.FETCH_APPLICANTS_REQUEST });

  } catch (error) {
    yield put({
      type: types.UNARCHIVE_APPLICANT_ACCOUNT_FAILURE,
      payload: error.response?.data?.message || 'Failed to unarchive account'
    });
  }
}
function* fetchPreEmploymentData(action) {
  try {
    const referenceId = action.payload || localStorage.getItem('applicationReferenceId');
    const response = yield call(() =>
      axios.get(`${base_url}/applications-step-data/${referenceId}/pre_employment`)
    );
    
    yield put({
      type: types.FETCH_PRE_EMPLOYMENT_DATA_SUCCESS,
      payload: response.data.data || {}
    });
  } catch (error) {
    yield put({
      type: types.FETCH_PRE_EMPLOYMENT_DATA_FAILURE,
      payload: error.response?.data || error.message
    });
  }
}

function* fetchEducationData(action) {
  try {
    const referenceId = action.payload || localStorage.getItem('applicationReferenceId');
    const response = yield call(() =>
      axios.get(`${base_url}/applications-step-data/${referenceId}/education`)
    );
    
    yield put({
      type: types.FETCH_EDUCATION_DATA_SUCCESS,
      payload: response.data.data || {}
    });
  } catch (error) {
    yield put({
      type: types.FETCH_EDUCATION_DATA_FAILURE,
      payload: error.response?.data || error.message
    });
  }
}

function* fetchAvailabilityData(action) {
  try {
    const referenceId = action.payload || localStorage.getItem('applicationReferenceId');
    const response = yield call(() =>
      axios.get(`${base_url}/applications-step-data/${referenceId}/availability`)
    );
    
    yield put({
      type: types.FETCH_AVAILABILITY_DATA_SUCCESS,
      payload: response.data.data || {}
    });
  } catch (error) {
    yield put({
      type: types.FETCH_AVAILABILITY_DATA_FAILURE,
      payload: error.response?.data || error.message
    });
  }
}

function* fetchReferencesData(action) {
  try {
    const referenceId = action.payload || localStorage.getItem('applicationReferenceId');
    const response = yield call(() =>
      axios.get(`${base_url}/applications-step-data/${referenceId}/references`)
    );
    
    yield put({
      type: types.FETCH_REFERENCES_DATA_SUCCESS,
      payload: response.data.data || {}
    });
  } catch (error) {
    yield put({
      type: types.FETCH_REFERENCES_DATA_FAILURE,
      payload: error.response?.data || error.message
    });
  }
}

function* fetchExperienceData(action) {
  try {
    const referenceId = action.payload || localStorage.getItem('applicationReferenceId');
    const response = yield call(() =>
      axios.get(`${base_url}/applications-step-data/${referenceId}/experience`)
    );
    
    yield put({
      type: types.FETCH_EXPERIENCE_DATA_SUCCESS,
      payload: response.data.data || {}
    });
  } catch (error) {
    yield put({
      type: types.FETCH_EXPERIENCE_DATA_FAILURE,
      payload: error.response?.data || error.message
    });
  }
}

function* fetchDocumentsData(action) {
  try {
    const referenceId = action.payload || localStorage.getItem('applicationReferenceId');
    const response = yield call(() =>
      axios.get(`${base_url}/applications-step-data/${referenceId}/documents`)
    );
    
    yield put({
      type: types.FETCH_DOCUMENTS_DATA_SUCCESS,
      payload: response.data.data || {}
    });
  } catch (error) {
    yield put({
      type: types.FETCH_DOCUMENTS_DATA_FAILURE,
      payload: error.response?.data || error.message
    });
  }
}

function* fetchCertificationData(action) {
  try {
    const referenceId = action.payload || localStorage.getItem('applicationReferenceId');
    const response = yield call(() =>
      axios.get(`${base_url}/applications-step-data/${referenceId}/certifications`)
    );
    
    yield put({
      type: types.FETCH_CERTIFICATION_DATA_SUCCESS,
      payload: response.data.data || {}
    });
  } catch (error) {
    yield put({
      type: types.FETCH_CERTIFICATION_DATA_FAILURE,
      payload: error.response?.data || error.message
    });
  }
}

function* fetchReviewData(action) {
  try {
    const referenceId = action.payload || localStorage.getItem('applicationReferenceId');
    const response = yield call(() =>
      axios.get(`${base_url}/applications-step-data/${referenceId}/review`)
    );
    
    yield put({
      type: types.FETCH_REVIEW_DATA_SUCCESS,
      payload: response.data.data || {}
    });
  } catch (error) {
    yield put({
      type: types.FETCH_REVIEW_DATA_FAILURE,
      payload: error.response?.data || error.message
    });
  }
}
function* resendEmail(action) {
  try {
    const response = yield call(() =>
      axios.post(`${base_url}/admin/applications/${action.payload}/resend-email`)
    );

    yield put({
      type: types.RESEND_EMAIL_SUCCESS,
      payload: response.data
    });

    alert('✅ Email resent successfully! Power Automate flow has been triggered.');
    
    // Optionally refresh application data to show updated status logs
    yield put({
      type: types.FETCH_APPLICATION_DETAIL_REQUEST,
      payload: action.payload
    });

    // Refresh status logs to show the resend action
    yield put({
      type: types.FETCH_STATUS_LOGS_REQUEST,
      payload: action.payload
    });

  } catch (error) {
    yield put({
      type: types.RESEND_EMAIL_FAIL,
      payload: error.response?.data?.message || 'Failed to resend email'
    });

    alert('❌ Failed to resend email: ' + (error.response?.data?.message || 'Please try again'));
  }
}
// Watcher
export function* watchApplicationActions() {
  yield takeLatest(types.SUBMIT_APPLICATION_REQUEST, submitApplication);
  yield takeLatest(types.FETCH_ADMIN_APPS_REQUEST, fetchAdminApplications);
  yield takeLatest(types.DELETE_ADMIN_APP_REQUEST, deleteAdminApplication);
    yield takeLatest(types.FETCH_APPLICATION_DETAIL_REQUEST, fetchApplicationDetail);
    yield takeLatest(types.APPROVE_APPLICATION_REQUEST, approveApplication);
  yield takeLatest(types.REJECT_APPLICATION_REQUEST, rejectApplication);
    yield takeLatest(types.FETCH_APPLICATION_NOTES_REQUEST, fetchApplicationNotes);
  yield takeLatest(types.ADD_APPLICATION_NOTE_REQUEST, addApplicationNote);
  yield takeLatest(types.DELETE_APPLICATION_NOTE_REQUEST, deleteApplicationNote);
  yield takeLatest(types.FETCH_STATUS_LOGS_REQUEST, fetchStatusLogs);
  yield takeLatest(types.FETCH_ALL_STATUS_LOGS_REQUEST, fetchAllStatusLogs);
    yield takeLatest(types.FETCH_DASHBOARD_STATS_REQUEST, fetchDashboardStats);
      yield takeLatest(types.LOCK_APPLICANT_ACCOUNT_REQUEST, lockApplicantAccount);
  yield takeLatest(types.UNLOCK_APPLICANT_ACCOUNT_REQUEST, unlockApplicantAccount);
  yield takeLatest(types.ARCHIVE_APPLICANT_ACCOUNT_REQUEST, archiveApplicantAccount);
    yield takeLatest(types.UNARCHIVE_APPLICANT_ACCOUNT_REQUEST, unarchiveApplicantAccount); // NEW

  yield takeLatest(types.RESET_APPLICANT_PASSWORD_REQUEST, resetApplicantPassword);
   yield takeLatest(types.SAVE_FINAL_FORM_STEP_REQUEST, saveFinalFormStep);
  yield takeLatest(types.FETCH_FORM_PROGRESS_REQUEST, fetchFormProgress);
  yield takeLatest(types.FETCH_FINAL_FORM_DATA_REQUEST, fetchFinalFormData);
  yield takeLatest(types.SEND_TO_TABLET_REQUEST, sendToTablet);
  yield takeLatest(types.RESEND_EMAIL_REQUEST, resendEmail);

    yield takeLatest(types.FETCH_PRE_EMPLOYMENT_DATA_REQUEST, fetchPreEmploymentData);
  yield takeLatest(types.FETCH_EDUCATION_DATA_REQUEST, fetchEducationData);
  yield takeLatest(types.FETCH_AVAILABILITY_DATA_REQUEST, fetchAvailabilityData);
  yield takeLatest(types.FETCH_REFERENCES_DATA_REQUEST, fetchReferencesData);
  yield takeLatest(types.FETCH_EXPERIENCE_DATA_REQUEST, fetchExperienceData);
  yield takeLatest(types.FETCH_DOCUMENTS_DATA_REQUEST, fetchDocumentsData);
  yield takeLatest(types.FETCH_CERTIFICATION_DATA_REQUEST, fetchCertificationData);
  yield takeLatest(types.FETCH_REVIEW_DATA_REQUEST, fetchReviewData);

}
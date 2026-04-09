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
  yield takeLatest(types.RESET_APPLICANT_PASSWORD_REQUEST, resetApplicantPassword);

}
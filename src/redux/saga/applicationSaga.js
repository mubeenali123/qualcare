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

// Watcher
export function* watchApplicationActions() {
  yield takeLatest(types.SUBMIT_APPLICATION_REQUEST, submitApplication);
  yield takeLatest(types.FETCH_ADMIN_APPS_REQUEST, fetchAdminApplications);
  yield takeLatest(types.DELETE_ADMIN_APP_REQUEST, deleteAdminApplication);
}
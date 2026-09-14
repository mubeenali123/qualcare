import { call, put, takeLatest } from "redux-saga/effects";
import axios from "axios";
import { base_url } from "../../components/config";
import * as types from "../type";

axios.defaults.withCredentials = true;

// --- ADMIN SAGA ---
function* adminLogin(action) {
  try {
    const response = yield call(() =>
      axios.post(`${base_url}/admin/login`, action.payload)
    );
    const { token } = response.data;
    localStorage.setItem("authToken", token); // Generic key for simplicity
    yield put({ type: types.ADMIN_LOGIN_SUCCESS, payload: response.data });
  } catch (error) {
    yield put({
      type: types.ADMIN_LOGIN_FAILURE,
      payload: error.response?.data?.message || "Login failed."
    });
  }
}

function* adminLogout() {
  try {
    const token = localStorage.getItem("authToken");
    yield call(() =>
      axios.post(`${base_url}/admin/logout`, {}, {
        headers: { Authorization: `Bearer ${token}` }
      })
    );
  } catch (error) {
    console.error("Admin Logout API failed", error);
  } finally {
    localStorage.removeItem("authToken");
    yield put({ type: types.ADMIN_LOGOUT_SUCCESS });
  }
}

// --- USER (APPLICANT) SAGA ---
function* userLogin(action) {
  try {
    const response = yield call(() =>
      axios.post(`${base_url}/applicant/login`, action.payload)
    );
    const { token, application } = response.data;
    localStorage.setItem("authToken", token); // Store under generic key
        if (application && application.reference_id) {
      localStorage.setItem("applicationReferenceId", application.reference_id);
      console.log('Reference ID stored:', application.reference_id);
    }
    yield put({ type: types.USER_LOGIN_SUCCESS, payload: response.data });
  } catch (error) {
    yield put({
      type: types.USER_LOGIN_FAILURE,
      payload: error.response?.data?.message || "Login failed."
    });
  }
}

// ✅ NEW USER LOGOUT SAGA
function* userLogout() {
  try {
    const token = localStorage.getItem("authToken");
    // Hit the user-specific logout endpoint if different, 
    // or use a shared one if the backend handles it via token
    yield call(() =>
      axios.post(`${base_url}/applicant/logout`, {}, {
        headers: { Authorization: `Bearer ${token}` }
      })
    );
  } catch (error) {
    console.error("User Logout API failed", error);
  } finally {
    // ALWAYS clean up locally
    localStorage.removeItem("authToken");
    localStorage.removeItem("applicationReferenceId");
    yield put({ type: types.USER_LOGOUT_SUCCESS });
  }
}
function* changePassword(action) {
  try {
    const token = localStorage.getItem("authToken");
    const response = yield call(() =>
      axios.post(`${base_url}/applicant/change-password`, action.payload, {
        headers: { Authorization: `Bearer ${token}` }
      })
    );

    yield put({
      type: types.CHANGE_PASSWORD_SUCCESS,
      payload: response.data.message // "Password updated successfully"
    });
  } catch (error) {
    yield put({
      type: types.CHANGE_PASSWORD_FAILURE,
      payload: error.response?.data?.message || "Failed to update password."
    });
  }
}
// --- WATCHER ---
export function* watchAuth() {
  yield takeLatest(types.ADMIN_LOGIN_REQUEST, adminLogin);
  yield takeLatest(types.ADMIN_LOGOUT_REQUEST, adminLogout);
  yield takeLatest(types.USER_LOGIN_REQUEST, userLogin);
  yield takeLatest(types.USER_LOGOUT_REQUEST, userLogout); // Linked to your sidebar click
  yield takeLatest(types.CHANGE_PASSWORD_REQUEST, changePassword);
}
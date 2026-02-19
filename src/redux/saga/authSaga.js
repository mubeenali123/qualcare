import { call, put, takeLatest } from "redux-saga/effects";
import axios from "axios";
import { base_url } from "../../components/config";
import * as types from "../type";

axios.defaults.withCredentials = true;

function* adminLogin(action) {
  try {
    const response = yield call(() =>
      axios.post(`${base_url}/admin/login`, action.payload, {
        withCredentials: true
      })
    );

    // ✅ SAVE THE TOKEN TO LOCALSTORAGE
    const { token, user } = response.data;
    localStorage.setItem("adminToken", token);

    yield put({
      type: types.ADMIN_LOGIN_SUCCESS,
      payload: response.data // This contains user and token
    });

  } catch (error) {
    yield put({
      type: types.ADMIN_LOGIN_FAILURE,
      payload: error.response?.data?.message || "Login failed."
    });
  }
}

function* adminLogout() {
  try {
    const token = localStorage.getItem("adminToken");

    yield call(() =>
      axios.post(`${base_url}/admin/logout`, {}, {
        headers: {
          Authorization: `Bearer ${token}` // ✅ Send the token back
        }
      })
    );
  } catch (error) {
    console.error("Logout API failed", error);
  } finally {
    // ✅ ALWAYS clear local storage and state, even if the API fails
    localStorage.removeItem("adminToken");
    yield put({ type: types.ADMIN_LOGOUT_SUCCESS });
  }
}


export function* watchAuth() {
  yield takeLatest(types.ADMIN_LOGIN_REQUEST, adminLogin);
  yield takeLatest(types.ADMIN_LOGOUT_REQUEST, adminLogout);
}

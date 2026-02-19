import { call, put, takeLatest } from "redux-saga/effects";
import axios from "axios";
import { base_url } from "../../../components/config";
import * as types from '../../type';

function* fetchApplicants() {
  try {
    const response = yield call(() => axios.get(`${base_url}/applicants`));
    yield put({ type: types.FETCH_APPLICANTS_SUCCESS, payload: response.data });
  } catch (error) {
    yield put({ type: types.FETCH_APPLICANTS_FAILURE, payload: error.message });
  }
}

function* deleteApplicant(action) {
  try {
    // action.payload is the ID
    yield call(() => axios.delete(`${base_url}/applicants/${action.payload}`));
    
    yield put({ type: types.DELETE_APPLICANT_SUCCESS, payload: action.payload });
  } catch (error) {
    yield put({ type: types.DELETE_APPLICANT_FAILURE, payload: error.message });
  }
}

export function* watchApplicantActions() {
  yield takeLatest(types.FETCH_APPLICANTS_REQUEST, fetchApplicants);
  yield takeLatest(types.DELETE_APPLICANT_REQUEST, deleteApplicant);
}
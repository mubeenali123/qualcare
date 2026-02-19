import {all, fork} from 'redux-saga/effects';
import { watchApplicationActions } from "./saga/applicationSaga";
import { watchAuth } from "./saga/authSaga";
import { watchApplicantActions } from "./saga/admin/applicantSaga";


export function* rootSaga() {
    yield all([fork(watchApplicationActions)])
    yield all([fork(watchAuth)])
    yield all([fork(watchApplicantActions)])
}
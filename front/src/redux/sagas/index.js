import { takeLatest, all } from 'redux-saga/effects';
import { FETCH_LOGIN} from './../actions/login';

import {fetchLogin} from './login';

function* actionWatcher() {
    yield takeLatest(FETCH_LOGIN, fetchLogin)
}

export default function* rootSaga() {
    yield all([
        actionWatcher(),
    ]);
}
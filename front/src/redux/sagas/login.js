import { put } from 'redux-saga/effects';

import authService from './../../services/auth';
import services from './../../services/api';

import { RECEIVED_LOGIN, ERROR_LOGIN } from './../actions/login';

export function* fetchLogin({ payload }) {
    try {
        const {data} = yield authService.login(payload);
        
        if (data.ok) {
            new services().saveToken(data.token);

            yield put({
                type: RECEIVED_LOGIN,
                payload: data
            });
        } else {

            yield put({
                type: ERROR_LOGIN,
                payload: data
            });
        }

    } catch ({response}) {
        console.log(response)
        yield put({
            type: ERROR_LOGIN,
            payload: response.data
        });
    }


}

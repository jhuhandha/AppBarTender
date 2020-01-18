import { put } from 'redux-saga/effects';

import drinkService from './../../services/drink';

import { RECEIVED_INDEX_DRINK, FETCH_INDEX_DRINK, RECEIVED_SAVE_DRINK, RECEIVED_EDIT_DRINK, RECEIVED_MODIFY_DRINK, ERROR } from './../actions/drink';

export function* fetchIndex() {
    try {
        const {data} = yield drinkService.index();
        if (data.ok) {
            yield put({
                type: RECEIVED_INDEX_DRINK,
                payload: data
            });
        } else {
            yield put({
                type: ERROR,
                payload: data
            });
        }

    } catch ({response}) {
        yield put({
            type: ERROR,
            payload: response.data
        });
    }
}

export function* fetchSave({ payload }) {
    try {
        const {data} = yield drinkService.save(payload);
        if (data.ok) {
            yield put({
                type: RECEIVED_SAVE_DRINK,
                payload: data
            });
            yield put({
                type: FETCH_INDEX_DRINK
            });
        } else {
            yield put({
                type: ERROR,
                payload: data
            });
        }

    } catch ({response}) {
        yield put({
            type: ERROR,
            payload: response.data
        });
    }
}

export function* fetchEdit({ id }) {
    try {
        const {data} = yield drinkService.edit(id);
        if (data.ok) {
            yield put({
                type: RECEIVED_EDIT_DRINK,
                payload: data
            });
        } else {
            yield put({
                type: ERROR,
                payload: data
            });
        }

    } catch ({response}) {
        yield put({
            type: ERROR,
            payload: response.data
        });
    }
}

export function* fetchModify({ payload, id }) {
    try {
        const {data} = yield drinkService.modify(payload, id);
        
        if (data.ok) {
            yield put({
                type: RECEIVED_MODIFY_DRINK,
                payload: data
            });
            yield put({
                type: FETCH_INDEX_DRINK
            });
        } else {
            yield put({
                type: ERROR,
                payload: data
            });
        }

    } catch ({response}) {
        yield put({
            type: ERROR,
            payload: response.data
        });
    }
}
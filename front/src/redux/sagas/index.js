import { takeLatest, all } from 'redux-saga/effects';

import { FETCH_INDEX_DRINK, FETCH_SAVE_DRINK, FETCH_EDIT_DRINK, FETCH_MODIFY_DRINK } from './../actions/drink';
import { FETCH_INDEX_ORDER, FETCH_SAVE_ORDER, FETCH_CLEAR_ORDER, FETCH_UPDATE_AMOUNT_ORDER, FETCH_ADD_ORDER, FETCH_DELETE_ORDER, FETCH_VALID_ORDER } from './../actions/order';
import { FETCH_LOGIN } from './../actions/login';

import { fetchLogin } from './login';
import * as drink from './drink';
import * as order from './order';

function* actionWatcher() {
    yield takeLatest(FETCH_LOGIN, fetchLogin);
    yield takeLatest(FETCH_INDEX_DRINK, drink.fetchIndex);
    yield takeLatest(FETCH_SAVE_DRINK, drink.fetchSave);
    yield takeLatest(FETCH_EDIT_DRINK, drink.fetchEdit);
    yield takeLatest(FETCH_MODIFY_DRINK, drink.fetchModify);
    yield takeLatest(FETCH_ADD_ORDER, order.fetchAdd);
    yield takeLatest(FETCH_DELETE_ORDER, order.fetchDelete);
    yield takeLatest(FETCH_VALID_ORDER, order.fetchValid);
    yield takeLatest(FETCH_CLEAR_ORDER, order.fetchClear);
    yield takeLatest(FETCH_UPDATE_AMOUNT_ORDER, order.fetchUpdateAmount);
    yield takeLatest(FETCH_INDEX_ORDER, order.fetchIndex);
    yield takeLatest(FETCH_SAVE_ORDER, order.fetchSave);
}

export default function* rootSaga() {
    yield all([
        actionWatcher(),
    ]);
}
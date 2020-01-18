import { put, select } from 'redux-saga/effects';

// import authService from './../../services/auth';
// import services from './../../services/api';

import { RECEIVED_ADD_ORDER } from './../actions/order';

const getOrderDrink = state => state.order.order_drink;

export function* fetchValid({ payload }) {

    if (window.localStorage.order_drink) {
        let datos = JSON.parse(window.localStorage.order_drink);

        if (datos) {
            yield put({
                type: RECEIVED_ADD_ORDER,
                payload: [...datos],
                storage: true
            });
        }
    }
}

export function* fetchAdd({ payload }) {
    let items = yield select(getOrderDrink);

    let filter = items.findIndex(e => e.drink.value == payload.drink.value);

    if (filter != -1) {
        items[filter].amount += payload.amount;
        items[filter].subtotal = items[filter].amount * payload.drink.unit_price;
    } else {
        items.push(payload);
    }

    window.localStorage.order_drink = JSON.stringify(items);

    yield put({
        type: RECEIVED_ADD_ORDER,
        payload: [...items]
    });
}

export function* fetchDelete({ id }) {
    let items = yield select(getOrderDrink);

    let filter = items.findIndex(e => e.drink.value == id);

    if (filter != -1) {
        items.splice(filter, 1);
    }

    window.localStorage.order_drink = JSON.stringify(items);

    yield put({
        type: RECEIVED_ADD_ORDER,
        payload: [...items]
    });
}

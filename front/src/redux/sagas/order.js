import { put, select } from 'redux-saga/effects';

import orderService from './../../services/order';

import { RECEIVED_ADD_ORDER, RECEIVED_SAVE_ORDER, ERROR, FETCH_CLEAR_ORDER, RECEIVED_INDEX_ORDER } from './../actions/order';

const getOrderDrink = state => state.order.order_drink;

export function* fetchValid({ payload }) {

    if (window.localStorage.order_drink) {
        let datos = JSON.parse(window.localStorage.order_drink);

        if (datos) {
            console.log("datos", datos)
            yield put({
                type: RECEIVED_ADD_ORDER,
                payload: [...datos],
                storage: true
            });
        }
    }
}

export function* fetchClear() {

    window.localStorage.order_drink = "";

    yield put({
        type: RECEIVED_ADD_ORDER,
        payload: null
    });
}

export function* fetchUpdateAmount({ index, amount }) {
    let items = yield select(getOrderDrink);

    if (index >= 0) {
        items[index].amount = parseInt(amount);

        window.localStorage.order_drink = JSON.stringify(items);

        yield put({
            type: RECEIVED_ADD_ORDER,
            payload: [...items]
        });
    }
}

export function* fetchAdd({ payload }) {
    let items = yield select(getOrderDrink);

    let filter = items ? items.findIndex(e => e.drink.value == payload.drink.value) : -1;

    if (filter != -1) {
        items[filter].amount += payload.amount;
        items[filter].subtotal = items[filter].amount * payload.drink.unit_price;
    } else {
        items = items || [];
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


export function* fetchSave({ payload }) {

    let items = yield select(getOrderDrink);

    let total = 0;
    let subtotal = 0;
    let drinks = items.map(e => {
        subtotal += e.subtotal;
        return { amount: e.amount, drink_id: e.drink.value, subtotal: e.subtotal };
    });

    if (payload == "10%") {
        total = (subtotal * 0.1) + subtotal;
    } else if (payload == "20%") {
        total = (subtotal * 0.2) + subtotal;
    } else {
        total = subtotal;
    }

    let full_data = {
        tip: payload,
        subtotal: subtotal,
        total: total,
        drinks
    }

    try {
        const { data } = yield orderService.save(full_data);

        if (data.ok) {
            yield put({
                type: FETCH_CLEAR_ORDER
            });
            yield put({
                type: RECEIVED_SAVE_ORDER,
                payload: { ...data, items }
            });
        } else {
            yield put({
                type: ERROR,
                payload: data
            });
        }

    } catch ({ response }) {
        yield put({
            type: ERROR,
            payload: response.data
        });
    }
}

export function* fetchIndex() {
    try {
        const {data} = yield orderService.index();
        if (data.ok) {
            yield put({
                type: RECEIVED_INDEX_ORDER,
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
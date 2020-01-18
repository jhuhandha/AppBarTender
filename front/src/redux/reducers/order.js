import { FETCH_INDEX_ORDER, RECEIVED_INDEX_ORDER, FETCH_SAVE_ORDER, RECEIVED_SAVE_ORDER, RECEIVED_ADD_ORDER, ERROR, RECEIVED_VALID_ORDER } from '../actions/order';

const initialState = {
    payload: null,
    orders: null,
    loading: false,
    error: null,
    order_drink: [],
    storage: false
}

export default (state = initialState, action) => {
    switch (action.type) {
        case FETCH_INDEX_ORDER:
            return { ...state, loading: true, error: null, orders: null };
        case RECEIVED_INDEX_ORDER:
            return { ...state, loading: false, orders: action.payload };
        case FETCH_SAVE_ORDER:
            return { ...state, loading: true, error: null, payload: null };
        case RECEIVED_SAVE_ORDER:
            return { ...state, loading: false, payload: action.payload };
        case RECEIVED_ADD_ORDER:
            return { ...state, order_drink: action.payload, storage: action.storage ? action.storage : false };
        case ERROR:
            return { ...state, loading: false, error: action.payload };
        default:
            return state;
    }
}
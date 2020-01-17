import { FETCH_LOGIN, RECEIVED_LOGIN, ERROR_LOGIN } from '../actions/login';

const initialState = {
    payload: null,
    loading: false,
    error: null
}

export default (state = initialState, action) => {
    switch (action.type) {
        case FETCH_LOGIN : 
            return {...state, loading: true, error: null, payload: null};
        case RECEIVED_LOGIN:
            return {...state, loading: false, payload: action.payload};
        case ERROR_LOGIN:
            return {...state, loading: false, error: action.payload};
        default:
            return state;
    }
}
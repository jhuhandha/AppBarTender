import {
    FETCH_INDEX_DRINK,
    RECEIVED_INDEX_DRINK,
    FETCH_SAVE_DRINK,
    RECEIVED_SAVE_DRINK,
    FETCH_EDIT_DRINK,
    RECEIVED_EDIT_DRINK,
    FETCH_MODIFY_DRINK,
    RECEIVED_MODIFY_DRINK,
    ERROR
} from '../actions/drink';

const initialState = {
    payload: null,
    drinks: null,
    drink: null,
    loading: false,
    error: null
}

export default (state = initialState, action) => {
    switch (action.type) {
        case FETCH_INDEX_DRINK:
            return { ...state, loading: true, error: null, drinks: null };
        case RECEIVED_INDEX_DRINK:
            return { ...state, loading: false, drinks: action.payload };

        case FETCH_SAVE_DRINK:
            return { ...state, loading: true, error: null, payload: null };
        case RECEIVED_SAVE_DRINK:
            return { ...state, loading: false, payload: action.payload };

        case FETCH_EDIT_DRINK:
            return { ...state, loading: true, error: null, drink: null };
        case RECEIVED_EDIT_DRINK:
            return { ...state, loading: false, drink: action.payload };

        case FETCH_MODIFY_DRINK:
            return { ...state, loading: true, error: null, payload: null };
        case RECEIVED_MODIFY_DRINK:
            return { ...state, loading: false, payload: action.payload };

        case ERROR:
            return { ...state, loading: false, error: action.payload };
        default:
            return state;
    }
}
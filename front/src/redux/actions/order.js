export const FETCH_INDEX_ORDER = 'FETCH_INDEX_ORDER';
export const RECEIVED_INDEX_ORDER = 'RECEIVED_INDEX_ORDER';
export const FETCH_SAVE_ORDER = 'FETCH_SAVE_ORDER';
export const RECEIVED_SAVE_ORDER = 'RECEIVED_SAVE_ORDER';
export const FETCH_ADD_ORDER = 'FETCH_ADD_ORDER';
export const RECEIVED_ADD_ORDER = 'RECEIVED_ADD_ORDER';
export const FETCH_DELETE_ORDER = 'FETCH_DELETE_ORDER';
export const FETCH_VALID_ORDER = 'FETCH_VALID_ORDER';
export const RECEIVED_VALID_ORDER = 'RECEIVED_VALID_ORDER';
export const ERROR = 'ERROR';

export const fetchIndex = () => ({type: FETCH_INDEX_ORDER});
export const fetchSave = data => ({type: FETCH_SAVE_ORDER, payload: data});
export const fetchAdd = data => ({type: FETCH_ADD_ORDER, payload: data});
export const fetchDelete = id => ({type: FETCH_DELETE_ORDER, id});
export const fetchValid = () => ({type: FETCH_VALID_ORDER});
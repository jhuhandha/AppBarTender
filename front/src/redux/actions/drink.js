export const FETCH_INDEX_DRINK = 'FETCH_INDEX_DRINK';
export const RECEIVED_INDEX_DRINK = 'RECEIVED_INDEX_DRINK';
export const FETCH_SAVE_DRINK = 'FETCH_SAVE_DRINK';
export const RECEIVED_SAVE_DRINK = 'RECEIVED_SAVE_DRINK';
export const FETCH_EDIT_DRINK = 'FETCH_EDIT_DRINK';
export const RECEIVED_EDIT_DRINK = 'RECEIVED_EDIT_DRINK';
export const FETCH_MODIFY_DRINK = 'FETCH_MODIFY_DRINK';
export const RECEIVED_MODIFY_DRINK = 'RECEIVED_MODIFY_DRINK';
export const ERROR = 'ERROR';

export const fetchIndex = () => ({type: FETCH_INDEX_DRINK});
export const fetchSave = data => ({type: FETCH_SAVE_DRINK, payload: data});
export const fetchEdit = id => ({type: FETCH_EDIT_DRINK, id});
export const fetchModify = (data, id) => ({type: FETCH_MODIFY_DRINK, payload: data, id});
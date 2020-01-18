import { combineReducers } from 'redux';

import login from './login';
import drink from './drink';
import order from './order';

export default combineReducers({
    login,
    drink,
    order
});
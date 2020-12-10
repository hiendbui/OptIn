import sessionErrorsReducer from './user_auth_reducers/session_errors_reducer';
import { combineReducers } from 'redux';

const errorsReducer = combineReducers({
    session: sessionErrorsReducer
})

export default errorsReducer;
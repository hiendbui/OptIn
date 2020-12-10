import usersReducer from './user_auth_reducers/users_reducer';
import { combineReducers } from 'redux';

const entitiesReducer = combineReducers({
    users: usersReducer
})
export default entitiesReducer;
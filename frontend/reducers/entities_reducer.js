import usersReducer from './user_auth_reducers/users_reducer';
import { combineReducers } from 'redux';
import  profilesReducer  from './profiles_reducers/profiles_reducer';

const entitiesReducer = combineReducers({
    users: usersReducer,
    profiles: profilesReducer
})
export default entitiesReducer;
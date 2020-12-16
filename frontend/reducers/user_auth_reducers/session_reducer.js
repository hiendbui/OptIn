import { RECEIVE_CURRENT_USER, LOGOUT_CURRENT_USER } from '../../actions/user_auth_actions/session_actions';
import { RECEIVE_PROFILE, RECEIVE_ALL_PROFILES } from '../../actions/profile_actions/profile_actions';

const sessionReducer = (state = {id: null, rerender: 0}, action) => {
    Object.freeze(state);
    const newState = { ...state }
    switch (action.type) {
        case RECEIVE_CURRENT_USER:
            newState.id = action.user.id
            return newState;
        case LOGOUT_CURRENT_USER:
            newState.id = null
            return newState;
        case RECEIVE_PROFILE:
            newState.rerender += 1
            return newState
        case RECEIVE_ALL_PROFILES:
            newState.rerender += 1
            return newState
        default:
            return state;
    }
}

export default sessionReducer;
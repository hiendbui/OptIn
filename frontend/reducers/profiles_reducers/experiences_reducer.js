import { RECEIVE_PROFILE } from '../../actions/profile_actions/profile_actions';
// import { LOGOUT_CURRENT_USER } from '../../actions/user_auth_actions/session_actions';

//reset state when user logs out here?
const experiencesReducer = (state = {}, action) => {
    Object.freeze(state);
    let newState = { ...state }

    switch (action.type) {
        case RECEIVE_PROFILE:
            if (action.profile.experiences) newState = action.profile.experiences;
            return newState;
        default:
            return state;
    }
}

export default experiencesReducer;

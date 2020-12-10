import { RECEIVE_PROFILE } from '../../actions/profile_actions/profile_actions';
import { RECEIVE_CURRENT_USER } from '../../actions/user_auth_actions/session_actions';

const profilesReducer = (state = {}, action) => {
    Object.freeze(state);
    const newState = { ...state }

    switch (action.type) {
        case RECEIVE_PROFILE:
            newState[action.profile.id] = action.profile
            return newState;
        default:
            return state;
    }
}

export default profilesReducer;
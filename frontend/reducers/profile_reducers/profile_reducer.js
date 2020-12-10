import { RECEIVE_PROFILE } from '../../actions/profile_actions/profile_actions';

const profileReducer = (state = {}, action) => {
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

export default profileReducer;
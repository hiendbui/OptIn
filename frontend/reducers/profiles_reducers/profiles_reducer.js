import { RECEIVE_PROFILE, RECEIVE_ALL_PROFILES } from '../../actions/profile_actions/profile_actions';

const profilesReducer = (state = {}, action) => {
    Object.freeze(state);
    let newState = { ...state }

    switch (action.type) {
        case RECEIVE_PROFILE:
            newState[action.profile.id] = (({ userId, fullName, headline, location, description, photoUrl }) => ({ userId, fullName, headline, location, description, photoUrl }))(action.profile);
            return newState;
        case RECEIVE_ALL_PROFILES:
            newState = action.profiles;
            return newState;
        default:
            return state;
    }
}

export default profilesReducer;
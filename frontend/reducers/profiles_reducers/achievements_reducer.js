import { RECEIVE_PROFILE } from '../../actions/profile_actions/profile_actions';

const achievementsReducer = (state = {}, action) => {
    Object.freeze(state);
    let newState = { ...state }

    switch (action.type) {
        case RECEIVE_PROFILE:
            if (action.profile.achievements) newState = action.profile.achievements;
            return newState;
        default:
            return state;
    }
}

export default achievementsReducer;

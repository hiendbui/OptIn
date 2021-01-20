import { RECEIVE_PROFILE, CLEAR_PROFILE_ITEMS } from '../../actions/profile_actions/profile_actions';
import { RECEIVE_EXPERIENCE, REMOVE_EXPERIENCE } from '../../actions/profile_actions/profile_item_actions'
//reset state when user logs out here?
const experiencesReducer = (state = {}, action) => {
    Object.freeze(state);
    let newState = { ...state }

    switch (action.type) {
        case CLEAR_PROFILE_ITEMS:
            return [];
        case RECEIVE_PROFILE:
            (action.profile.experiences) ? newState = action.profile.experiences : newState = {};
            return newState;
        case RECEIVE_EXPERIENCE:
            newState[action.experience.id] = action.experience;
            return newState;
        case REMOVE_EXPERIENCE:
            delete newState[action.experienceId];
            return newState;
        default:
            return state;
    }
}

export default experiencesReducer;

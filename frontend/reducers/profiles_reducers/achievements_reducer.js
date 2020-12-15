import { RECEIVE_PROFILE } from '../../actions/profile_actions/profile_actions';
import { RECEIVE_ACHIEVEMENT, REMOVE_ACHIEVEMENT } from '../../actions/profile_actions/profile_item_actions'

const achievementsReducer = (state = {}, action) => {
    Object.freeze(state);
    let newState = { ...state }

    switch (action.type) {
        case RECEIVE_PROFILE:
            (action.profile.achievements) ? newState = action.profile.achievements : newState = {};
            return newState;
        case RECEIVE_ACHIEVEMENT:
            newState[action.achievement.id] = action.achievement;
            return newState;
        case REMOVE_ACHIEVEMENT:
            delete newState[action.achievementId];
            return newState
        default:
            return state;
    }
}

export default achievementsReducer;

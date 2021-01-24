import { RECEIVE_PROFILE, CLEAR_PROFILE_ITEMS} from '../../actions/profile_actions/profile_actions';
import { RECEIVE_EDUCATION, REMOVE_EDUCATION, RECEIVE_ALL_EDUCATIONS } from '../../actions/profile_actions/profile_item_actions'

const educationsReducer = (state = {}, action) => {
    Object.freeze(state);
    let newState = { ...state }

    switch (action.type) {
        case CLEAR_PROFILE_ITEMS:
            return {};
        case RECEIVE_PROFILE:
            (action.profile.educations) ? newState = action.profile.educations : newState={};
            return newState;
        case RECEIVE_EDUCATION:
            newState[action.education.id] = action.education;
            return newState;
        case RECEIVE_ALL_EDUCATIONS:
            newState = action.educations;
            return newState;
        case REMOVE_EDUCATION:
            delete newState[action.educationId];
            return newState
        default:
            return state;
    }
}

export default educationsReducer;

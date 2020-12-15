import { RECEIVE_PROFILE } from '../../actions/profile_actions/profile_actions';

const educationsReducer = (state = {}, action) => {
    Object.freeze(state);
    let newState = { ...state }

    switch (action.type) {
        case RECEIVE_PROFILE:
            (action.profile.educations) ? newState = action.profile.educations : newState={};
            return newState;
        default:
            return state;
    }
}

export default educationsReducer;

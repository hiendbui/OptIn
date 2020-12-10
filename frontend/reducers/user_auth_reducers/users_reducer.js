import { RECEIVE_CURRENT_USER, REMOVE_USER } from '../../actions/user_auth_actions/session_actions';

const usersReducer = (state = {}, action) => {
    Object.freeze(state);
    const newState = { ...state };

    switch (action.type) {
        case RECEIVE_CURRENT_USER:
            newState[action.user.id] = action.user;
            return newState;
        case REMOVE_USER:
            delete newState[action.userId];
            return newState
        default:
            return state;
    }

}

export default usersReducer;
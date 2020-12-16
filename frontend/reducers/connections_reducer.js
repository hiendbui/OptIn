import { RECEIVE_PROFILE } from '../actions/profile_actions/profile_actions'
import { RECEIVE_CONNECTION, REMOVE_CONNECTION } from '../actions/connection_actions/connection_actions'

const connectionsReducer = (state = {}, action) => {
    Object.freeze(state);
    let newState = {...state};

    switch (action.type) {
        case RECEIVE_PROFILE:
            newState.followers = action.profile.followers;
            newState.followed = action.profile.followed;
            return newState;
        case RECEIVE_CONNECTION:
            newState.followed.push(action.followeeId)
            return newState;
        case REMOVE_CONNECTION:
            newState.followed.splice(newState.followed.indexOf(action.followeeId), 1);
            return newState
        default:
            return state;
    }
}

export default connectionsReducer
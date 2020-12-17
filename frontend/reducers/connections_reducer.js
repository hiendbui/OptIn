import { RECEIVE_PROFILE } from '../actions/profile_actions/profile_actions'
import { RECEIVE_CONNECTION, REMOVE_CONNECTION, RECEIVE_CURRENT_PROF_CONNECTIONS } from '../actions/connection_actions/connection_actions'

const connectionsReducer = (state = {}, action) => {
    Object.freeze(state);
    let newState = {...state};

    switch (action.type) {
        case RECEIVE_PROFILE:
            newState.profile.followers = action.profile.followers;
            newState.profile.followed = action.profile.followed;
            return newState;
        case RECEIVE_CURRENT_PROF_CONNECTIONS:
            newState.current.followers = action.profile.followers;
            newState.current.followed = action.current.followed;
        case RECEIVE_CONNECTION:
            newState.current.followed.push(action.followeeId)
            return newState;
        case REMOVE_CONNECTION:
            newState.current.followed.splice(newState.followed.indexOf(action.followeeId), 1);
            return newState
        default:
            return state;
    }
}

export default connectionsReducer
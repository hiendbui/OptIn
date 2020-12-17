import * as APIUtil from '../../util/connection_api_util'

export const RECEIVE_CONNECTION = 'RECEIVE_CONNECTION';
export const REMOVE_CONNECTION = 'REMOVE_CONNECTION';
export const RECEIVE_CURRENT_PROF_CONNECTIONS = 'RECEIVE_CURRENT_PROF_CONNECTIONS'

const receiveConnection = followeeId => ({
    type: RECEIVE_CONNECTION,
    followeeId
})

const removeConnection = followeeId => ({
    type: REMOVE_CONNECTION,
    followeeId
})

const receiveCurrentProfConnections = () => ({
    type: RECEIVE_CURRENT_PROF_CONNECTIONS,
    connections
})

export const createConnection = profileId => dispatch => {
    return APIUtil.createConnection(profileId)
        .then(
            () => dispatch(receiveConnection(profileId)),
        );
}

export const destroyConnection = profileId => dispatch => {
    return APIUtil.destroyConnection(profileId)
        .then(
            () => dispatch(removeConnection(profileId)),
        );
}

export const fetchCurrentProfConnections = () => dispatch => {
    return APIUtil.fetchCurrentProfConnections()
        .then(
            () => dispatch(receiveCurrentProfConnections())
        );
}


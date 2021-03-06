import * as APIUtil from '../../util/session_api_util';
import { createProfile, fetchProfile } from '../profile_actions/profile_actions'

export const RECEIVE_CURRENT_USER = 'RECEIVE_CURRENT_USER';
export const LOGOUT_CURRENT_USER = 'LOGOUT_CURRENT_USER';
export const RECEIVE_SESSION_ERRORS = 'RECEIVE_SESSION_ERRORS';
export const CLEAR_SESSION_ERRORS = 'CLEAR_SESSION_ERRORS';
export const REMOVE_USER = 'REMOVE_USER';

const receiveCurrentUser = user => ({
    type: RECEIVE_CURRENT_USER,
    user
});

const receiveUserNProfile = user => dispatch => {
    dispatch(receiveCurrentUser(user));
    dispatch(fetchProfile(user.profile));
}
const logoutCurrentUser = () => ({
    type: LOGOUT_CURRENT_USER
});

const receiveSessionErrors = errors => ({
    type: RECEIVE_SESSION_ERRORS,
    errors
});

const removeUser = userId => ({
    type: REMOVE_USER,
    userId
})

export const clearSessionErrors = () => ({
    type: CLEAR_SESSION_ERRORS
})

export const login = user => dispatch => {
    return APIUtil.login(user)
        .then(
            (savedUser) => dispatch(receiveUserNProfile(savedUser)),
            (errors) => dispatch(receiveSessionErrors(errors.responseJSON))
        )
};



export const logout = () => dispatch => {
    return APIUtil.logout()
        .then(
            () => dispatch(logoutCurrentUser()),
            (errors) => dispatch(receiveSessionErrors(errors.responseJSON))
        );
};

export const signup = (user,profile) => dispatch => {
    return APIUtil.signup(user)
        .then(
            (savedUser) => dispatch(receiveCurrentUser(savedUser)),
            (errors) => dispatch(receiveSessionErrors(errors.responseJSON))
        )
            .then(
                () => dispatch(createProfile(profile))
            )
                .then(
                    () => dispatch(login(user))
                )
};

export const destroy = (userId) => dispatch => {
    return APIUtil.destroy(userId)
        .then(
            () => dispatch(removeUser(userId)),
            (errors) => dispatch(receiveSessionErrors(errors.responseJSON))
        );
};


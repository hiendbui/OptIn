import * as APIUtil from '../../util/session_api_util';

export const RECEIVE_CURRENT_USER = 'RECEIVE_CURRENT_USER';
export const LOGOUT_CURRENT_USER = 'LOGOUT_CURRENT_USER';
export const RECEIVE_SESSION_ERRORS = 'RECEIVE_SESSION_ERRORS';
export const CLEAR_SESSION_ERRORS = 'CLEAR_SESSION_ERRORS';

const receiveCurrentUser = user => ({
    type: RECEIVE_CURRENT_USER,
    user
});

const logoutCurrentUser = () => ({
    type: LOGOUT_CURRENT_USER
});

const receiveSessionErrors = errors => ({
    type: RECEIVE_SESSION_ERRORS,
    errors
});

export const login = user => dispatch => {
    return APIUtil.login(user)
        .then(
            (savedUser) => dispatch(receiveCurrentUser(savedUser)),
            (errors) => dispatch(receiveSessionErrors(errors.responseJSON))
        );
};

export const logout = () => dispatch => {
    return APIUtil.logout()
        .then(
            () => dispatch(logoutCurrentUser()),
            (errors) => dispatch(receiveSessionErrors(errors.responseJSON))
        );
};

export const signup = user => dispatch => {
    return APIUtil.signup(user)
        .then(
            (savedUser) => dispatch(receiveCurrentUser(savedUser)),
            (errors) => dispatch(receiveSessionErrors(errors.responseJSON))
        );
};

export const clearSessionErrors = () => ({
    type: CLEAR_SESSION_ERRORS
})
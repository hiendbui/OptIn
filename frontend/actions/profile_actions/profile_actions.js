import * as APIUtil from '../../util/profile_api_util';

export const RECEIVE_PROFILE = 'RECEIVE_PROFILE';
export const RECEIVE_PROFILE_ERRORS = 'RECEIVE_PROFILE_ERRORS';

const receiveProfile = profile => ({
    type: receiveProfile,
    profile
});

const receiveProfileErrors = errors => ({
    type: RECEIVE_PROFILE_ERRORS,
    errors
});

export const createProfile = profile => dispatch => {
    return APIUtil.createProfile(profile)
        .then(
            (savedProfile) => dispatch(receiveProfile(savedProfile)),
            (errors) => dispatch(receiveProfileErrors(errors.responseJSON))
        );
};

export const updateProfile = profile => dispatch => {
    return APIUtil.updateProfile(profile)
        .then(
            (savedProfile) => dispatch(receiveCurrentUser(savedProfile)),
            (errors) => dispatch(receiveProfileErrors(errors.responseJSON))
        );
};

import * as APIUtil from '../../util/profile_api_util';

export const RECEIVE_PROFILE = 'RECEIVE_PROFILE';
export const RECEIVE_PROFILE_ERRORS = 'RECEIVE_PROFILE_ERRORS';
export const CLEAR_PROFILE_ERRORS = 'CLEAR_PROFILE_ERRORS';
export const RECEIVE_ALL_PROFILES = 'RECEIVE_ALL_PROFILES'

const receiveProfile = profile => ({
    type: RECEIVE_PROFILE,
    profile
});

const receiveProfileErrors = errors => ({
    type: RECEIVE_PROFILE_ERRORS,
    errors
});

export const clearProfileErrors = () => ({
    type: CLEAR_PROFILE_ERRORS
})

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
            (savedProfile) => dispatch(receiveProfile(savedProfile)),
            (errors) => dispatch(receiveProfileErrors(errors.responseJSON))
        );
};

export const fetchProfile = profile => dispatch => {
    return APIUtil.fetchProfile(profile)
        .then(
            (savedProfile) => dispatch(receiveProfile(savedProfile)),
            (errors) => dispatch(receiveProfileErrors(errors.responseJSON))
        );
}

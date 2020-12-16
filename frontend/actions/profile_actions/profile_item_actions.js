import * as ExpUtil from '../../util/experience_api_util';
import * as EduUtil from '../../util/education_api_util';
import * as AchUtil from '../../util/achievement_api_util';


export const RECEIVE_EXPERIENCE = 'RECEIVE_EXPERIENCE';
export const RECEIVE_EDUCATION = 'RECEIVE_EDUCATION';
export const RECEIVE_ACHIEVEMENT = 'RECEIVE_ACHIEVEMENT';
export const REMOVE_EXPERIENCE = 'REMOVE_EXPERIENCE';
export const REMOVE_EDUCATION = 'REMOVE_EDUCATION';
export const REMOVE_ACHIEVEMENT = 'REMOVE_ACHIEVEMENT';

const receiveExperience = experience => ({
    type: RECEIVE_EXPERIENCE,
    experience: experience
})

const receiveEducation = education => ({
    type: RECEIVE_EDUCATION,
    education: education
})

const receiveAchievement = achievement => ({
    type: RECEIVE_ACHIEVEMENT,
    achievement: achievement
})

const removeExperience = experienceId => ({
    type: REMOVE_EXPERIENCE,
    experienceId: experienceId
})

const removeEducation = educationId => ({
    type: REMOVE_EDUCATION,
    educationId: educationId
})

const removeAchievement = achievementId => ({
    type: REMOVE_ACHIEVEMENT,
    achievementId: achievementId
})

export const createExperience = experience => dispatch => {
    return ExpUtil.createExperience(experience)
        .then((experience) => dispatch(receiveExperience(experience)))
}

export const createEducation = education => dispatch => {
    return EduUtil.createEducation(education)
        .then((education) => dispatch(receiveEducation(education)))
}

export const createAchievement = achievement => dispatch => {
    return AchUtil.createAchievement(achievement)
        .then((achievement) => dispatch(receiveAchievement(achievement)))
}

export const updateExperience = experience => dispatch => {
    return ExpUtil.updateExperience(experience)
        .then((experience) => dispatch(receiveExperience(experience)))
}

export const updateEducation = education => dispatch => {
    return EduUtil.updateEducation(education)
        .then((education) => dispatch(receiveEducation(education)))
}

export const updateAchievement = achievement => dispatch => {
    return AchUtil.updateAchievement(achievement)
        .then((achievement) => dispatch(receiveAchievement(achievement)))
}

export const destroyExperience = experienceId => dispatch => {
    return ExpUtil.destroyExperience(experienceId)
        .then(() => dispatch(removeExperience(experienceId)))
}

export const destroyEducation = educationId => dispatch => {
    return EduUtil.destroyEducation(educationId)
        .then(() => dispatch(removeEducation(educationId)))
}

export const destroyAchievement = achievementId => dispatch => {
    return AchUtil.destroyAchievement(achievementId)
        .then(() => dispatch(removeAchievement(achievementId)))
}


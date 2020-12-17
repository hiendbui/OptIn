import { connect } from 'react-redux';
import Profile from './profile';
import { updateProfile, fetchProfile, fetchAllProfiles } from '../../actions/profile_actions/profile_actions'
import { createConnection, destroyConnection, fetchCurrentProfConnections } from '../../actions/connection_actions/connection_actions'
import { 
    createExperience,
    createEducation,
    createAchievement,
    updateExperience,
    updateEducation,
    updateAchievement,
    destroyExperience,
    destroyEducation,
    destroyAchievement
}   from '../../actions/profile_actions/profile_item_actions'


const mapStateToProps = (state, ownProps) => ({
    profile: state.profile ? state.profile : state.entities.profiles[ownProps.match.params.fullNameprofileId.split('-').slice(-1)[0]],
    profiles: state.entities.profiles,
    profileId: ownProps.match.params.fullNameprofileId.split('-').slice(-1)[0],
    currentUser: state.entities.users[state.session.id],
    experiences: Object.values(state.entities.experiences),
    educations: Object.values(state.entities.educations),
    achievements: Object.values(state.entities.achievements),
    connected: state.entities.connections.current.followed,
    connections: state.entities.connections.profile.followed?.length + state.entities.connections.profile.followers?.length
})

const mapDispatchToProps = dispatch => ({
    updateProfile: (profile, profileId) => dispatch(updateProfile(profile, profileId)),
    fetchAllProfiles: () => dispatch(fetchAllProfiles()),
    fetchProfile: (profile) => dispatch(fetchProfile(profile)),
    createExperience: (experience) => dispatch(createExperience(experience)),
    createEducation: (education) => dispatch(createEducation(education)),
    createAchievement: (achievement) => dispatch(createAchievement(achievement)),
    updateExperience: (experience) => dispatch(updateExperience(experience)),
    updateEducation: (education) => dispatch(updateEducation(education)),
    updateAchievement: (achievement) => dispatch(updateAchievement(achievement)),
    destroyExperience: (experienceId) => dispatch(destroyExperience(experienceId)),
    destroyEducation: (educationId) => dispatch(destroyEducation(educationId)),
    destroyAchievement: (achievementId) => dispatch(destroyAchievement(achievementId)),
    createConnection: (id) => dispatch(createConnection(id)),
    destroyConnection: (id) => dispatch(destroyConnection(id)),
    fetchCurrentProfConnections: () => dispatch(fetchCurrentProfConnections())
})

const ProfileContainer = connect(mapStateToProps, mapDispatchToProps)(Profile);
export default ProfileContainer;
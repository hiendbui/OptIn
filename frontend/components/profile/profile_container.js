import { connect } from 'react-redux';
import Profile from './profile';
import { updateProfile, fetchProfile, fetchAllProfiles } from '../../actions/profile_actions/profile_actions'

const mapStateToProps = (state, ownProps) => ({
    profile: state.entities.profiles[ownProps.match.params.fullNameprofileId.split('-').slice(-1)[0]],
    profiles: state.entities.profiles,
    profileId: ownProps.match.params.fullNameprofileId.split('-').slice(-1)[0],
    currentUser: state.entities.users[state.session.id],
    experiences: Object.values(state.entities.experiences),
    educations: Object.values(state.entities.educations),
    achievements: Object.values(state.entities.achievements)
})

const mapDispatchToProps = dispatch => ({
    updateProfile: (profile, profileId) => dispatch(updateProfile(profile, profileId)),
    fetchAllProfiles: () => dispatch(fetchAllProfiles()),
    fetchProfile: (profile) => dispatch(fetchProfile(profile))
})

const ProfileContainer = connect(mapStateToProps, mapDispatchToProps)(Profile);
export default ProfileContainer;
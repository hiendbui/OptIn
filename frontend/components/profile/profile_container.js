import { connect } from 'react-redux';
import Profile from './profile';
import { updateProfile, fetchProfile, fetchAllProfiles } from '../../actions/profile_actions/profile_actions'

const mapStateToProps = (state, ownProps) => ({
    profile: state.entities.profiles[ownProps.match.params.fullNameprofileId.split('-').slice(-1)[0]],
    profileId: ownProps.match.params.fullNameprofileId.split('-').slice(-1)[0],
    currentUser: state.entities.users[state.session.id] 
})

const mapDispatchToProps = dispatch => ({
    updateProfile: (profile) => dispatch(updateProfile(profile)),
    fetchAllProfiles: () => dispatch(fetchAllProfiles()),
    fetchProfile: (profile) => dispatch(fetchProfile(profile))
})

const ProfileContainer = connect(mapStateToProps, mapDispatchToProps)(Profile);
export default ProfileContainer;
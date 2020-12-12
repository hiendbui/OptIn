import { connect } from 'react-redux';
import Profile from './profile';
import { updateProfile } from '../../actions/profile_actions/profile_actions'

const mapStateToProps = (state, ownProps) => ({
    profile: state.entities.users[ownProps.match.params.fullNameuserId.split('-').slice(-1)[0]].profile
})

const mapDispatchToProps = dispatch => ({
    updateProfile: () => dispatch(updateProfile)
})

const ProfileContainer = connect(mapStateToProps, mapDispatchToProps)(Profile);
export default ProfileContainer;
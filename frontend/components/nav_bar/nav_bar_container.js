import { connect } from 'react-redux';
import { logout } from '../../actions/user_auth_actions/session_actions'
import { fetchProfile, fetchAllProfiles, clearProfileItems } from '../../actions/profile_actions/profile_actions'
import NavBar from './nav_bar';

const mapStateToProps = (state,ownProps) => ({
    session: state.session,
    users: state.entities.users,
    profiles: state.entities.profiles,
    history: ownProps.history,
    profile: state.entities.profiles[state.entities.users[state.session.id].profile?.id]
})

const mapDispatchToProps = dispatch => ({
    fetchProfile: (profile) => (dispatch(fetchProfile(profile))),
    fetchAllProfiles: () => (dispatch(fetchAllProfiles())),
    logout: () => dispatch(logout()),
    clearProfileItems: () => dispatch(clearProfileItems())
})

const NavBarContainer = connect(mapStateToProps, mapDispatchToProps)(NavBar);
export default NavBarContainer;
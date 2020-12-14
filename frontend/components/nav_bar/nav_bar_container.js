import { connect } from 'react-redux';
import { logout } from '../../actions/user_auth_actions/session_actions'
import { fetchProfile, fetchAllProfiles } from '../../actions/profile_actions/profile_actions'
import NavBar from './nav_bar';

const mapStateToProps = state => ({
    session: state.session,
    users: state.entities.users,
    profiles: state.entities.profiles
})

const mapDispatchToProps = dispatch => ({
    fetchProfile: (profile) => (dispatch(fetchProfile(profile))),
    fetchAllProfiles: () => (dispatch(fetchAllProfiles())),
    logout: () => dispatch(logout())
})

const NavBarContainer = connect(mapStateToProps, mapDispatchToProps)(NavBar);
export default NavBarContainer;
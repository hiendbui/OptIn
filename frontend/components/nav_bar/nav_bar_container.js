import { connect } from 'react-redux';
import { logout } from '../../actions/user_auth_actions/session_actions'
import { fetchProfile } from '../../actions/profile_actions/profile_actions'
import NavBar from './nav_bar';

const mapStateToProps = state => ({
    currentUser: state.entities.users[state.session.id],
    userProfile: state.entities.profiles[state.entities.users[state.session.id].profile.id]
})

const mapDispatchToProps = dispatch => ({
    fetchProfile: (profile) => (dispatch(fetchProfile(profile))),
    logout: () => dispatch(logout())
})

const NavBarContainer = connect(mapStateToProps, mapDispatchToProps)(NavBar);
export default NavBarContainer;
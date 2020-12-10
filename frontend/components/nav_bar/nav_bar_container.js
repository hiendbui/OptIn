import { connect } from 'react-redux';
import { logout } from '../../actions/user_auth_actions/session_actions'
import NavBar from './nav_bar';

const mapStateToProps = state => ({
    currentUser: state.entities.users[state.session.id],
    userProfile: state.entities.profiles[24]
})

const mapDispatchToProps = dispatch => ({
    logout: () => dispatch(logout())
})

const NavBarContainer = connect(mapStateToProps, mapDispatchToProps)(NavBar);
export default NavBarContainer;
import { connect } from 'react-redux';
import Profile from './profile';

const mapStateToProps = (state, ownProps) => ({
    profile: state.entities.users[ownProps.match.params.fullNameuserId.split('-').slice(-1)[0]].profile
})

const mapDispatchToProps = dispatch => ({
    
})

const ProfileContainer = connect(mapStateToProps, mapDispatchToProps)(Profile);
export default ProfileContainer;
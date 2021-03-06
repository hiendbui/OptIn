import Network from './network';
import { connect } from 'react-redux';
import { createConnection, destroyConnection, fetchCurrentProfConnections } from '../../actions/connection_actions/connection_actions';
import {fetchAllProfiles , fetchProfile, clearProfileItems} from '../../actions/profile_actions/profile_actions';


const mapStateToProps = state => ({
    connected: state.entities.connections.current.followed ? state.entities.connections.current.followed.map((id) => state.entities.profiles[id]) : [],
    notConnected: state.entities.connections.current.followed ? Object.keys(state.entities.profiles).filter((id) => (!state.entities.connections.current.followed.includes(id))).map((id) => state.entities.profiles[id]) : [],
    userProfile: state.entities.users[state.session.id].profile
})

const mapDispatchToProps = dispatch => ({
    createConnection: (id) => dispatch(createConnection(id)),
    destroyConnection: (id) => dispatch(destroyConnection(id)),
    fetchAllProfiles: () => dispatch(fetchAllProfiles()),
    fetchProfile: (profile) => dispatch(fetchProfile(profile)),
    fetchCurrentProfConnections: () => dispatch(fetchCurrentProfConnections()),
    clearProfileItems: () => dispatch(clearProfileItems()),
})

const NetworkContainer = connect(mapStateToProps, mapDispatchToProps)(Network);
export default NetworkContainer;
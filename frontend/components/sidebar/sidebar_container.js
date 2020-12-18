import { connect } from 'react-redux';
import { fetchAllProfiles } from '../../actions/profile_actions/profile_actions'
import SideBar from './sidebar';

const mapStateToProps = (state) => ({
    profiles: Object.values(state.entities.profiles)
})

const mapDispatchToProps = (dispatch) => ({
    fetchAllProfiles: () => dispatch(fetchAllProfiles())
})

const SideBarContainer = connect(mapStateToProps, mapDispatchToProps)(SideBar);
export default SideBarContainer;
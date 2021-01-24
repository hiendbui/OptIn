import JobsFeed from './jobs_feed';
import { connect } from 'react-redux';
import {fetchAllExperiences, fetchAllEducations} from '../../actions/profile_actions/profile_item_actions';
import { clearProfileItems } from '../../actions/profile_actions/profile_actions';


const mapStateToProps = state => ({
    experiences: Object.values(state.entities.experiences),
    educations: Object.values(state.entities.educations),
})

const mapDispatchToProps = dispatch => ({
    fetchAllExperiences: () => dispatch(fetchAllExperiences()),
    fetchAllEducations: () => dispatch(fetchAllEducations()),
    clearProfileItems: () => dispatch(clearProfileItems())
})

const JobsFeedContainer = connect(mapStateToProps, mapDispatchToProps)(JobsFeed);
export default JobsFeedContainer;
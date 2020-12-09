import NewsFeed from './news_feed';
import { connect } from 'react-redux';
import { logout } from '../../actions/session_actions';


const mapStateToProps = state => ({
    currentUser: state.entities.users[state.session.id]
})

const mapDispatchToProps = dispatch => ({
    logout: () => dispatch(logout())
})

const NewsFeedContainer = connect(mapStateToProps,mapDispatchToProps)(NewsFeed);
export default NewsFeedContainer;
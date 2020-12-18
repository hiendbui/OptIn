import NewsFeed from './news_feed';
import { connect } from 'react-redux';
import { createPost, updatePost, fetchAllPosts, destroyPost } from '../../actions/news_feed_actions/post_actions';
import { createComment, updateComment, destroyComment } from '../../actions/news_feed_actions/comment_action';
import { fetchAllProfiles } from '../../actions/profile_actions/profile_actions';
import { fetchCurrentProfConnections } from '../../actions/connection_actions/connection_actions';


const mapStateToProps = state => ({
    currentUser: state.entities.users[state.session.id],
    connections: state.entities.connections.current.followed?.length + state.entities.connections.current.followers?.length,
    postsArr: Object.values(state.entities.posts),
    posts: state.entities.posts,
    comments: Object.values(state.entities.comments),
    profiles: state.entities.profiles
})

const mapDispatchToProps = dispatch => ({
    fetchAllProfiles: () => dispatch(fetchAllProfiles),
    fetchAllPosts: () => dispatch(fetchAllPosts()),
    createPost: post => dispatch(createPost(post)),
    updatePost: post => dispatch(updatePost(post)),
    destroyPost: postId => dispatch(destroyPost(postId)),
    createComment: (comment, postId) => dispatch(createComment(comment, postId)),
    updateComment: comment => dispatch(updateComment(comment)),
    destroyComment: commentId => dispatch(destroyComment(commentId)),
    fetchCurrentProfConnections: () => dispatch(fetchCurrentProfConnections())
})

const NewsFeedContainer = connect(mapStateToProps,mapDispatchToProps)(NewsFeed);
export default NewsFeedContainer;
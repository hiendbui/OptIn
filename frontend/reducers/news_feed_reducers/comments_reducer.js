import { RECEIVE_COMMENT, REMOVE_COMMENT } from '../../actions/news_feed_actions/comment_action'
import { RECEIVE_ALL_POSTS } from '../../actions/news_feed_actions/post_actions'

const commentsReducer = (state = {}, action) => {
    Object.freeze(state);
    let newState = { ...state };

    switch (action.type) {
        case RECEIVE_COMMENT:
            newState[action.comment.id] = action.comment
            return newState;
        case REMOVE_COMMENT:
            delete newState[action.commentId];
            return newState;
        case RECEIVE_ALL_POSTS: 
            console.log(action.posts)
            newState = action.posts.comments;
            return newState;
        default:
            return state;
    }
}

export default commentsReducer;

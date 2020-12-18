import { RECEIVE_POST, REMOVE_POST, RECEIVE_ALL_POSTS } from '../../actions/news_feed_actions/post_actions'

const postsReducer = (state = {}, action) => {
    Object.freeze(state);
    let newState = { ...state };

    switch (action.type) {
        case RECEIVE_POST:
            newState[action.post.id] = post
            return newState;
        case RECEIVE_ALL_POSTS:
            newState = action.posts
            return newState;
        case REMOVE_POST:
            delete newState[action.postId];
            return newState
        default:
            return state;
    }
}

export default postsReducer;

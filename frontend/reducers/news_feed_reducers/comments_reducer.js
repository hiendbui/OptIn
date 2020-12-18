import { RECEIVE_COMMENT, REMOVE_COMMENT } from '../../actions/news_feed_actions/comment_action'

const commentsReducer = (state = {}, action) => {
    Object.freeze(state);
    let newState = { ...state };

    switch (action.type) {
        case RECEIVE_POST:
            newState[action.comment.id] = comment
            return newState;
        case REMOVE_POST:
            delete newState[action.commentId];
            return newState
        default:
            return state;
    }
}

export default commentsReducer;

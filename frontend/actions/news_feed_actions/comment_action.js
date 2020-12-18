import * as APIUtil from '../../util/post_api_util'

export const RECEIVE_COMMENT = 'RECEIVE_COMMENT';
export const REMOVE_COMMENT = 'REMOVE_COMMENT';


const receiveComment = comment => ({
    type: RECEIVE_CONNECTION,
    comment
})

const removeComment = commentId => ({
    type: REMOVE_CONNECTION,
    commentId
})



export const createComment = (comment, postId) => dispatch => (
    APIUtil.createComment(comment, postId)
        .then(comment => dispatch(receiveComment(comment)))
)

export const updateComment = comment => dispatch => (
    APIUtil.updateComment(comment)
        .then(comment => dispatch(receiveComment(comment)))
) //remember to append comment id to comment data

export const destroyComment = commentId => dispatch => (
    APIUtil.destroyComment(commentId)
        .then(() => dispatch(removeComment(commentId)))
)

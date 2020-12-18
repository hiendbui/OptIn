import * as APIUtil from '../../util/post_api_util'

export const RECEIVE_POST = 'RECEIVE_POST';
export const REMOVE_POST = 'REMOVE_POST';
export const RECEIVE_ALL_POSTS = 'RECEIVE_ALL_POSTS';

const receivePost = post => ({
    type: RECEIVE_CONNECTION,
    post
})

const removePost = postId => ({
    type: REMOVE_CONNECTION,
    postId
})

const receiveAllPosts = (posts) => ({
    type: RECEIVE_ALL_POSTS,
    posts
})


export const createPost = post => dispatch => (
    APIUtil.createPost(post)
        .then(post => dispatch(receivePost(post)))
)

export const updatePost = post => dispatch => (
    APIUtil.updatePost(post)
        .then(post => dispatch(receivePost(post)))
) //remember to append post id to post data


export const fetchAllPosts = () => dispatch => (
    APIUtil.fetchAllPosts()
        .then(posts => dispatch(receiveAllPosts(posts)))
)

export const destroyPost = postId => dispatch => (
    APIUtil.destroyPost(postId)
        .then(() => dispatch(removePost(postId)))
)
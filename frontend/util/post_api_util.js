export const createPost = (post) => (
    $.ajax({
        method: 'POST',
        url: '/api/posts',
        data:  post,
        contentType: false,
        processData: false 
    })
)

//remember to append post id to post data
export const updatePost = (post) => {
    return $.ajax({
        method: 'PATCH',
        url: `/api/posts/${post.id}`,
        data: {post}
    })
}

export const fetchAllPosts = () => (
    $.ajax({
        url: '/api/posts',
    })
)

export const destroyPost = (postId) => (
    $.ajax({
        method: 'DELETE',
        url: `/api/posts/${postId}`,
    })
)
export const createComment = (comment, postId) => (
    $.ajax({
        method: 'POST',
        url: `/api/posts/${postId}/comments`,
        data: {comment:{...comment, post_id: postId}} ,
    })
)


export const updateComment = (comment) => (
    $.ajax({
        method: 'PATCH',
        url: `/api/comments/${comment.id}`,
        data: { comment },

    })
)

export const destroyComment = (commentId) => (
    $.ajax({
        method: 'DELETE',
        url: `/api/comments/${commentId}`,
    })
)
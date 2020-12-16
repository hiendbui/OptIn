export const createConnection = (followeeId) => (
    $.ajax({
        method: 'POST',
        url: '/api/connections',
        data: { connection: {followee_id: followeeId }}
    })
)

export const destroyConnection = (followeeId) => (
    $.ajax({
        method: 'DELETE',
        url: `/api/connections/${followeeId}`,
    })
)
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

export const fetchCurrentProfConnections = () => (
    $.ajax({
        url: `/api/connections/0` //id doesn't matter here since backend will know who current user is 
    })
)
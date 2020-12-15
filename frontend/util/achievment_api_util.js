export const createAchievement = (achievement) => (
    $.ajax({
        method: 'POST',
        url: '/api/achievements',
        data: { achievement }
    })
)

export const updateAchievement = (achievement) => (
    $.ajax({
        method: 'PATCH',
        url: `/api/achievements/${achievement.id}`,
        data: { achievement },
    })
)

export const destroyAchievement = (achievement) => (
    $.ajax({
        method: 'DELETE',
        url: `/api/achievements/${achievement.id}`,
    })
)
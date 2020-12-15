export const createEducation = (education) => (
    $.ajax({
        method: 'POST',
        url: '/api/educations',
        data: { education }
    })
)

export const updateEducation = (education) => (
    $.ajax({
        method: 'PATCH',
        url: `/api/educations/${education.id}`,
        data: { education },
    })
)

export const destroyEducation = (education) => (
    $.ajax({
        method: 'DELETE',
        url: `/api/educations/${education.id}`,
    })
)
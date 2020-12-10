export const createProfile = (profile) => (
    $.ajax({
        method: 'POST',
        url: '/api/profiles',
        data: { profile }
    })
)

export const updateProfile = (profile) => (
    $.ajax({
        method: 'POST',
        url: `/api/profile/${profile.userId}`,
        data: { profile }
    })
)

//sample AJAX requests
// $.ajax({ 
//     method: 'POST', 
//     url: 'api/profiles', 
//     data: { profile: 
//         { full_name: 'Hien Bui', 
//         headline: 'Student at App Academy', 
//         location: 'San Francisco Bay Area', 
//         description: null 
//     } } })

// $.ajax({
//     method:'PATCH', 
//     url: '/api/profiles/3', 
//     data: {profile: 
//         {full_name:'Hien Duy Bui'
//     }}})
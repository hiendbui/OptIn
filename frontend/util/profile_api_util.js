export const createProfile = (profile) => (
    $.ajax({
        method: 'POST',
        url: '/api/profiles',
        data: { profile }
    })
)

export const updateProfile = (profile) => (
    $.ajax({
        method: 'PATCH',
        url: `/api/profiles/${profile.id}`,
        data: { profile }
    })
)

export const fetchProfile = (profile) => (
    $.ajax({
        url: `/api/profiles/${profile.id}`
    })
)

export const fetchProfiles = () => ()
    $.ajax({
        url: '/api/profiles',
    })
)

//sample AJAX requests
// $.ajax({ 
//     method: 'POST', 
//     url: 'api/profiles', 
//     data: { profile: 
    //     { full_name: 'Hien Bui', 
    //     headline: 'Student at App Academy', 
    //     location: 'San Francisco Bay Area', 
    //     description: null 
    // } } })

// $.ajax({
//     method:'PATCH', 
//     url: '/api/profiles/3', 
//     data: {profile: 
//         {full_name:'Hien Duy Bui'
//     }}})
export const createProfile = (profile) => (
    $.ajax({
        method: 'POST',
        url: '/api/profiles',
        data: { profile }  
    })
)

export const updateProfile = (profile, profileId) => {
    return $.ajax({
        method: 'PATCH',
        url: `/api/profiles/${profileId}`,
        data: profile,
        contentType: false,
        processData: false
    })
}

export const fetchProfile = (profile) => (
    $.ajax({
        url: `/api/profiles/${profile.id}`
    })
)

export const fetchAllProfiles = () => (
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
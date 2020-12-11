json.extract! user, :id, :email
json.profile do
    json.photoUrl url_for(user.profile.profile_pic) if user.profile && user.profile.profile_pic.attached?
end



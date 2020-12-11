json.extract! user, :id, :email
json.profile do
    if user.profile 
        json.extract! user.profile, :id, :user_id, :full_name, :headline, :location, :description
        json.photoUrl url_for(user.profile.profile_pic) if user.profile.profile_pic.attached?
    end
end



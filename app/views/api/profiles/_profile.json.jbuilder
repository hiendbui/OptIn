json.extract! profile, :id, :full_name, :headline, :location
json.photoUrl url_for(profile.profile_pic) if profile.profile_pic.attached?
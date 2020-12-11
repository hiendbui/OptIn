json.extract! @profile, :id, :user_id, :full_name, :headline, :location, :description
json.photoUrl url_for(@profile.profile_pic) if @profile.profile_pic.attached?
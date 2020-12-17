json.followers do
    json.array! current_user.profile.followers.map {|follower| follower.id}
end

json.followed do
    json.array! current_user.profile.followed.map {|followed| followed.id}
end

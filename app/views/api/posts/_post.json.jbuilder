json.extract! post, :id, :body, :author_id, :created_at, :updated_at
json.photoUrl url_for(post.photo) if post.photo.attached?

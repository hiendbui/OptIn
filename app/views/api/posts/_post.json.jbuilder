json.extract! post, :id, :body, :author_id, :created_at, :updated_at
json.photoUrl url_for(post.photo) if post.photo.attached?
json.comments do
post.comments.each do |comment|
    json.set! comment.id do
    json.extract! comment, :id, :body, :author_id, :post_id, :created_at, :updated_at
    end
end
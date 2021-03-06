@posts.each do |post|
  json.set! post.id do
    json.partial! "api/posts/post", post: post
  end
end

json.comments do
    Comment.all.each do |comment|
        json.set! comment.id do
        json.extract! comment, :id, :body, :author_id, :post_id, :created_at, :updated_at
        end
    end
end
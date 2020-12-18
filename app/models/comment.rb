class Comment < ApplicationRecord
    validates :body, :author_id, :post_id, presence: true

    belongs_to :profile,
        primary_key: :id,
        foreign_key: :author_id,
        class_name: :Profile
    
    belongs_to :post, 
        primary_key: :id,
        foreign_key: :post_id,
        class_name: :Post
end

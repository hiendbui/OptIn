class Post < ApplicationRecord
    validates :body, :author_id, presence: true 

    has_one_attached :photo

    belongs_to :profile,
        primary_key: :id,
        foreign_key: :author_id,
        class_name: :Profile
    
    has_many :comments,
        primary_key: :id,
        foreign_key: :post_id,
        class_name: :Comment
end

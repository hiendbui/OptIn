# == Schema Information
#
# Table name: profiles
#
#  id          :bigint           not null, primary key
#  user_id     :integer          not null
#  full_name   :string           not null
#  headline    :string           not null
#  location    :string           not null
#  description :text
#  created_at  :datetime         not null
#  updated_at  :datetime         not null
#
class Profile < ApplicationRecord
    validates :user_id, :full_name, :headline, :location, presence: true
    validates :user_id, uniqueness: true
    
    
    belongs_to :user
    has_one_attached :profile_pic

    

    has_many :experiences,
        primary_key: :id,
        foreign_key: :profile_id,
        class_name: :Experience,
        dependent: :destroy
    
    has_many :educations,
        primary_key: :id,
        foreign_key: :profile_id,
        class_name: :Education,
        dependent: :destroy

    has_many :achievements,
        primary_key: :id,
        foreign_key: :profile_id,
        class_name: :Achievement,
        dependent: :destroy

    has_many :active_connections, 
        primary_key: :id,
        foreign_key: :follower_id,
        class_name: :Connection
    
    has_many :passive_connections,
        primary_key: :id,
        foreign_key: :followee_id,
        class_name: :Connection
    
    has_many :followers, #aka profiles that are following this profile
        through: :passive_connections,
        source: :follower
    
    has_many :followed, #aka profiles that his profile is following
        through: :active_connections,
        source: :followee
end

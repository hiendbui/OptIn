# == Schema Information
#
# Table name: connections
#
#  id          :bigint           not null, primary key
#  follower_id :integer          not null
#  followee_id :integer          not null
#  created_at  :datetime         not null
#  updated_at  :datetime         not null
#
class Connection < ApplicationRecord
    validates :follower_id, :followed_id, presence: true

    belongs_to :follower, #aka profile that is following
        primary_key: :id,
        foreign_key: :follower_id,
        class_name: :Profile

    belongs_to :followee, #aka profile that is being followed
        primary_key: :id,
        foreign_key: :followee_id,
        class_name: :Profile
end

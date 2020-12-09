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
end

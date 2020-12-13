# == Schema Information
#
# Table name: achievements
#
#  id          :bigint           not null, primary key
#  profile_id  :integer          not null
#  title       :string           not null
#  issuer      :string
#  year        :integer
#  description :text
#  created_at  :datetime         not null
#  updated_at  :datetime         not null
#
class Achievement < ApplicationRecord
        validates :profile_id, :title, presence: true
end

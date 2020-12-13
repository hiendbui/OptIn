# == Schema Information
#
# Table name: experiences
#
#  id          :bigint           not null, primary key
#  profile_id  :integer          not null
#  title       :string           not null
#  company     :string           not null
#  start_date  :string           not null
#  end_date    :string           not null
#  location    :string
#  description :text
#  created_at  :datetime         not null
#  updated_at  :datetime         not null
#
class Experience < ApplicationRecord
    validates :profile_id, :title, :company, :start_date, :end_date, presence: true
end

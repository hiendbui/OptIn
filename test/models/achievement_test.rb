# == Schema Information
#
# Table name: achievements
#
#  id          :bigint           not null, primary key
#  profile_id  :integer          not null
#  title       :string           not null
#  issuer      :string
#  year        :string
#  description :text
#  created_at  :datetime         not null
#  updated_at  :datetime         not null
#
require 'test_helper'

class AchievementTest < ActiveSupport::TestCase
  # test "the truth" do
  #   assert true
  # end
end

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
require 'test_helper'

class ExperienceTest < ActiveSupport::TestCase
  # test "the truth" do
  #   assert true
  # end
end

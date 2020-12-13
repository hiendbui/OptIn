# == Schema Information
#
# Table name: educations
#
#  id          :bigint           not null, primary key
#  profile_id  :integer          not null
#  school      :string           not null
#  degree      :string
#  subject     :string
#  start_year  :integer
#  end_year    :integer
#  description :text
#  created_at  :datetime         not null
#  updated_at  :datetime         not null
#
require 'test_helper'

class EducationTest < ActiveSupport::TestCase
  # test "the truth" do
  #   assert true
  # end
end

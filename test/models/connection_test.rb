# == Schema Information
#
# Table name: connections
#
#  id          :bigint           not null, primary key
#  follower_id :integer          not null
#  created_at  :datetime         not null
#  updated_at  :datetime         not null
#  followee_id :integer          not null
#
require 'test_helper'

class ConnectionTest < ActiveSupport::TestCase
  # test "the truth" do
  #   assert true
  # end
end

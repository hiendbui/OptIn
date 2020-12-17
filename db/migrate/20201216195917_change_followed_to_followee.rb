class ChangeFollowedToFollowee < ActiveRecord::Migration[5.2]
  def change
    remove_column :connections, :followed_id, :integer
    add_column :connections, :followee_id, :integer, null:false
    add_index :connections, :followee_id
  end
end

class MakeConnectionsUnique < ActiveRecord::Migration[5.2]
  def change
    add_index :connections, [:follower_id, :followee_id], unique: true
  end
end

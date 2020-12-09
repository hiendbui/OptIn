class CreateProfiles < ActiveRecord::Migration[5.2]
  def change
    create_table :profiles do |t|
      t.integer :user_id, null:false
      t.string :full_name, null:false
      t.string :headline, null:false
      t.string :location, null:false
      t.text :description

      t.timestamps
    end
    add_index :profiles, :user_id, unique: true
    add_index :profiles, :full_name
    add_index :profiles, :headline
  end
end
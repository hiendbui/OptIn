class CreateAchievements < ActiveRecord::Migration[5.2]
  def change
    create_table :achievements do |t|
      t.integer :profile_id, null: false
      t.string :title, null:false 
      t.string :issuer
      t.integer :year
      t.text :description

      t.timestamps
    end
    add_index :achievements, :profile_id
  end
end

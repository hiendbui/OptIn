class CreateExperiences < ActiveRecord::Migration[5.2]
  def change
    create_table :experiences do |t|
      t.integer :profile_id, null:false
      t.string :title, null:false
      t.string :company, null:false
      t.string :start_date, null:false
      t.string :end_date, null:false
      t.string :location
      t.text :description

      t.timestamps
    end
    add_index :experiences, :profile_id
  end
end

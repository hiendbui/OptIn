class CreateEducations < ActiveRecord::Migration[5.2]
  def change
    create_table :educations do |t|
      t.integer :profile_id, null:false
      t.string :school, null:false 
      t.string :degree
      t.string :subject
      t.integer :start_year
      t.integer :end_year
      t.text :description

      t.timestamps
    end
    add_index :educations, :profile_id
  end
end

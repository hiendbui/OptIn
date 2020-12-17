class ChangeAchievementYearsToStringDataType < ActiveRecord::Migration[5.2]
  def change
    change_column :achievements, :year, :string
  end
end

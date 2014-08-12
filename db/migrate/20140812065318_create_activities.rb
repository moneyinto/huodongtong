class CreateActivities < ActiveRecord::Migration
  def change
    create_table :activities do |t|
      t.string :username
      t.string :activityname
      t.string :name
      t.string :phone

      t.timestamps
    end
  end
end

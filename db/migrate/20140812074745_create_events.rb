class CreateEvents < ActiveRecord::Migration
  def change
    create_table :events do |t|
      t.string :username
      t.string :activityname

      t.timestamps
    end
  end
end

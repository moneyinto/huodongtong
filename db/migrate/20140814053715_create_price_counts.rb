class CreatePriceCounts < ActiveRecord::Migration
  def change
    create_table :price_counts do |t|
      t.string :username
      t.string :activityname
      t.string :bidname
      t.string :price
      t.string :count

      t.timestamps
    end
  end
end

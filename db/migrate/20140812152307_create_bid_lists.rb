class CreateBidLists < ActiveRecord::Migration
  def change
    create_table :bid_lists do |t|
      t.string :username
      t.string :activityname
      t.string :bidname
      t.string :status

      t.timestamps
    end
  end
end

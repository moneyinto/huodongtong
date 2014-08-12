class CreateBidMessages < ActiveRecord::Migration
  def change
    create_table :bid_messages do |t|
      t.string :username
      t.string :activityname
      t.string :bidname
      t.string :name
      t.string :phone
      t.string :price

      t.timestamps
    end
  end
end

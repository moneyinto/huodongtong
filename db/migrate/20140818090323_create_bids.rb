class CreateBids < ActiveRecord::Migration
  def change
    create_table :bids do |t|
      t.string :name
      t.string :phone
      t.string :price
      t.string :count

      t.timestamps
    end
  end
end

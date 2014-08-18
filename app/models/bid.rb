class Bid < ActiveRecord::Base
  attr_accessible :name, :phone, :price, :count

  def self.create(list)
    if list
      Bid.delete_all
      bid_list = list
      bid_list.each do |l|
        new_list = Bid.new(l)
        new_list.save
      end
    end
  end
end

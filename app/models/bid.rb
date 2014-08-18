class Bid < ActiveRecord::Base
  attr_accessible :name, :phone, :price, :count

  def self.create(list)
    if list
      Bid.delete_all
      bid_list = list
      bid_list.each do |l|
        if l[:count] == 1
          new_list = Bid.new(l)
          new_list.save
        end
      end
    end
  end
end

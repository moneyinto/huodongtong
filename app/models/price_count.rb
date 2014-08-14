class PriceCount < ActiveRecord::Base
  attr_accessible :username, :activityname, :bidname, :price, :count
  def self.update_price_count(username,pricecount)
    PriceCount.delete_all(:username => username)
    price_count = pricecount
    price_count.each do |p|
      new_message = PriceCount.new(p)
      new_message.save
    end
  end
end

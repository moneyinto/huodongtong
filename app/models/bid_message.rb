class BidMessage < ActiveRecord::Base
  attr_accessible :username, :activityname, :bidname, :name, :phone, :price
  def self.update_bid_message(username,bidmessage)
    if bidmessage
      BidMessage.delete_all(:username => username)
      bid_message = bidmessage
      bid_message.each do |m|
        new_message = BidMessage.new(m)
        new_message.save
      end
    end
  end
end

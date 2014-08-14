class BidList < ActiveRecord::Base
  attr_accessible :username, :activityname, :bidname, :status
  def self.update_bid_list(username,bidlist)
    if bidlist
      BidList.delete_all(:username => username)
      bid_list = bidlist
      bid_list.each do |b|
        new_list = BidList.new(b)
        new_list.save
      end
    end
  end
end

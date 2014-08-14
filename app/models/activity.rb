class Activity < ActiveRecord::Base
  attr_accessible :username, :activityname, :name, :phone

  def self.update_people_list(username,list)
    if list
      Activity.delete_all(:username => username)
      people_list = list
      people_list.each do |l|
        new_list = Activity.new(l)
        new_list.save
      end
    end
  end
end

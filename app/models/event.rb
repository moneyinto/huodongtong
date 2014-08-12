class Event < ActiveRecord::Base
  attr_accessible :username, :activityname

  def self.update_events(username,activities)
    Event.delete_all(:username => username)
    activity = activities
    activity.each do |a|
      new_activity = Event.new(a)
      new_activity.save
    end
  end
end

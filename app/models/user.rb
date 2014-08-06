class User < ActiveRecord::Base

  attr_accessible :name, :password, :password_confirmation,:forget_issues,:forget_answer,:identity,:token
  before_create { generate_token(:token) }

  validates :name, :presence => true
  validates :password, :presence => true
  validates :password_confirmation, :presence => true
  validates :forget_issues, :presence => true
  validates :forget_answer, :presence => true
  validates :name,:uniqueness => {:case_sensitive => false}
  has_secure_password
  def generate_token(column)
    begin
      self[column] = SecureRandom.urlsafe_base64
    end while User.exists?(column => self[column])
  end
end

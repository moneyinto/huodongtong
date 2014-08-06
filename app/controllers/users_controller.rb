#encoding: utf-8
class UsersController < ApplicationController
  def welcome
    @user = User.paginate(page: params[:page],per_page:10).offset(1)
  end

  def signup
    @user = User.new
  end

  def login
  end

  def create
    @user = User.new(params[:user])
    if current_user
      if current_user.name == "admin"
        if @user.save
          redirect_to  :adduser
        else
          render :adduser
        end
      end
    else
      if @user.save
        cookies.permanent[:token] = @user.token
        redirect_to :welcome
      else
        render :signup
      end
    end
  end

  def logout
    cookies.delete(:token)
    redirect_to :login
  end

  def create_login_session
    user = User.find_by_name(params[:name])
    if user && user.authenticate(params[:password])
      cookies.permanent[:token] = user.token
      redirect_to :welcome
    else
      flash[:error] = "用户名不存在或密码错误"
      redirect_to :login
    end
  end

  def adduser
    @user = User.new
  end
end

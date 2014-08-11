#encoding: utf-8
class AdminsController < ApplicationController
  def password
    if session[:name] == ""
      session[:name] = params[:change_name]
    end
  end

  def admin_welcome
    if current_user
      session[:name] = ""
      user = User.where(:identity => "user")
      @user = user.paginate(page: params[:page],per_page:10)
    else
      redirect_to :login
    end
  end

  def change_password_session
    user = User.find_by_name(session[:name])
    if params[:password] == params[:password_confirmation] && params[:password] != ""
      user.password = params[:password]
      user.password_confirmation = params[:password_confirmation]
      user.save
      flash[:notice] = "ok"
      redirect_to :password
    else
      flash[:error] = "密码输入不一致"
      redirect_to :password
    end
  end
end

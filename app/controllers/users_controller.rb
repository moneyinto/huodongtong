#encoding: utf-8
class UsersController < ApplicationController
  protect_from_forgery with: :null_session, if: Proc.new { |c| c.request.format == 'application/json' }

  def signup
    @user = User.new
  end

  def welcome
    admin_operation
    user_operation
  end

  def admin_operation
    if current_user.identity == "admin" && current_user_two
      activity = Event.where(:username => current_user_two.name)
      @activity = activity.paginate(page: params[:page],per_page:10)
    end
  end

  def user_operation
    if current_user.identity == "user"
      activity = Event.where(:username => current_user.name)
      @activity = activity.paginate(page: params[:page],per_page:10)
    end
  end

  def adduser
    @user = User.new
  end

  def create
    params[:user][:identity] = "user"
    @user = User.new(params[:user])
    if current_user
      admin_add_user
    else
      user_sign_up
    end
  end

  def admin_add_user
    if current_user.identity == "admin"
      if @user.save
        redirect_to :admin_welcome
      else
        render :adduser
      end
    end
  end

  def user_sign_up
    if @user.save
      cookies.permanent[:token] = @user.token
      redirect_to :welcome
    else
      render :signup
    end
  end

  def logout
    cookies.delete(:token)
    redirect_to :login
  end

  def logout_two
    cookies.delete(:token_two)
    redirect_to :admin_welcome
  end

  def create_login_session
    user = User.find_by_name(params[:name])
    if user && user.authenticate(params[:password])
      cookies.permanent[:token] = user.token
      if user.identity == "admin"
        redirect_to :admin_welcome
      else
        redirect_to :welcome
      end
    else
      flash[:error] = "用户名不存在或密码错误"
      redirect_to :login
    end
  end


  def delete_user
    User.find_by_name(params[:delete_name]).delete
    redirect_to :welcome
  end

  def forgot_password_2
    if cookies.permanent[:forget_issues]
      render :forgot_password_2
    else
      redirect_to :forgot_password_1
    end
  end

  def forgot_password_3
    if cookies.permanent[:name]
      render :forgot_password_3
    else
      redirect_to :login
    end
  end

  def forgot_password_one
    if params[:name] == ""
      flash[:error] = "帐号不能为空"
      redirect_to :forgot_password_1
    else
      if User.find_by_name(params[:name])
        cookies.permanent[:name] = User.find_by_name(params[:name]).name
        cookies.permanent[:forget_issues] = User.find_by_name(params[:name]).forget_issues
        redirect_to :forgot_password_2
      else
        flash[:error] = "帐号不存在"
        redirect_to :forgot_password_1
      end
    end
  end

  def forgot_password_two
    if cookies.permanent[:forget_issues]
      if params[:forget_answer] == ""
        flash[:error] = "忘记密码答案不能为空"
        redirect_to :forgot_password_2
      else
        forgot_answer_contains
      end
    else
      redirect_to :forgot_password_1
    end
  end

  def forgot_answer_contains
    if User.find_by_name(cookies.permanent[:name]).forget_answer == params[:forget_answer]
      cookies.delete(:forget_issues)
      redirect_to :forgot_password_3
    else
      flash[:error] = "忘记密码答案错误"
      redirect_to :forgot_password_2
    end
  end

  def forgot_password_three
    if cookies.permanent[:name]
      if params[:password] == "" || params[:password_confirmation] == ""
        flash[:error] = "密码不能为空"
        redirect_to :forgot_password_3
      else
        forgot_password_contains
      end
    else
      redirect_to :login
    end
  end

  def forgot_password_contains
    if params[:password] == params[:password_confirmation]
      user = User.find_by_name(cookies.permanent[:name])
      user.password = params[:password]
      user.password_confirmation = params[:password_confirmation]
      user.save
      cookies.delete(:name)
      cookies.permanent[:token] = user.token
      redirect_to :welcome
    else
      flash[:error] = "两次密码输入不一致，请重新输入"
      redirect_to :forgot_password_3
    end
  end

  def login_activity
    user = User.find_by_name(params[:userName])
    respond_to do |format|
      if user && user.authenticate(params[:userPassword])
        format.json { render json: {data: 'true'} }
      else
        format.json { render json: {data: 'false'} }
      end
    end
  end

  def synchronization
    Event.update_events(params[:username],params[:activity])
    Activity.update_people_list(params[:username],params[:peopleList])
    BidList.update_bid_list(params[:username],params[:bidList])
    BidMessage.update_bid_message(params[:username],params[:bidMessage])
    PriceCount.update_price_count(params[:username],params[:priceCount])
    respond_to do |format|
      format.json {render json: {data:'true'}}
    end
  end

  def synchronization_two
    Activity.update_people_list(params[:username],params[:peopleList])
    respond_to do |format|
      format.json {render json: {data:'true'}}
    end
  end

  def synchronous_bid
    Bid.create(params[:bid])
    respond_to do |format|
      format.json {render json: {data:'true'}}
    end
  end

  def show
    @bid_count = Bid.all
    bid = Bid.where(:count => 1).limit(10)
    @bid = bid
    render :show
  end

  def start
    Bid.delete_all
    Message.delete_all
    Message.create({:name => params[:name],:status => "1"})
    respond_to do |format|
      format.json {render json: {data:'true'}}
    end
  end

  def end
    message = Message.first
    message.status = "0"
    message.save
    respond_to do |format|
      format.json {render json: {data:'true'}}
    end
  end

  def synchronous_show
    message = Message.first
    if message.status == "1"
      redirect_to :show
    else
      redirect_to :welcome
    end
  end
end

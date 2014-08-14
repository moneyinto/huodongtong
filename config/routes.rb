Rails.application.routes.draw do
  root to: "users#login", :as => "login"

  get "/signup" => "users#signup", :as => "signup"

  get "/welcome" => "users#welcome", :as => "welcome"

  get "/admin_welcome" => "admins#admin_welcome", :as => "admin_welcome"

  get "/adduser" => "users#adduser", :as => "adduser"

  get "/password" => "admins#password", :as => "password"

  get "/forgot_password_1" => "users#forgot_password_1"

  get "/forgot_password_2" => "users#forgot_password_2"

  get "/forgot_password_3" => "users#forgot_password_3"

  get "/signuplist" => "users#signuplist"

  get "/bidlist" => "users#bidlist"

  get "/pricelist" => "users#pricelist"

  get "/pricecount" => "users#pricecount"

  get "user_two" => "admins#user_two"

  post "user_two" => "admins#user_two"

  post "forgot_password_one" => "users#forgot_password_one"

  post "forgot_password_two" => "users#forgot_password_two"

  post "forgot_password_three" => "users#forgot_password_three"

  post "create_login_session" => "users#create_login_session"

  post "change_password_session" => "admins#change_password_session"

  post "login_activity"  => "users#login_activity"

  post "synchronization" =>  "users#synchronization"

  delete "delete_user" => "users#delete_user", :as => "delete_user"

  delete "logout" => "users#logout", :as => "logout"

  delete "logout_two" => "users#logout_two"

  resources :users, only: [:create]

  # The priority is based upon order of creation: first created -> highest priority.
  # See how all your routes lay out with "rake routes".

  # You can have the root of your site routed with "root"
  # root 'welcome#index'

  # Example of regular route:
  #   get 'products/:id' => 'catalog#view'

  # Example of named route that can be invoked with purchase_url(id: product.id)
  #   get 'products/:id/purchase' => 'catalog#purchase', as: :purchase

  # Example resource route (maps HTTP verbs to controller actions automatically):
  #   resources :products

  # Example resource route with options:
  #   resources :products do
  #     member do
  #       get 'short'
  #       post 'toggle'
  #     end
  #
  #     collection do
  #       get 'sold'
  #     end
  #   end

  # Example resource route with sub-resources:
  #   resources :products do
  #     resources :comments, :sales
  #     resource :seller
  #   end

  # Example resource route with more complex sub-resources:
  #   resources :products do
  #     resources :comments
  #     resources :sales do
  #       get 'recent', on: :collection
  #     end
  #   end

  # Example resource route with concerns:
  #   concern :toggleable do
  #     post 'toggle'
  #   end
  #   resources :posts, concerns: :toggleable
  #   resources :photos, concerns: :toggleable

  # Example resource route within a namespace:
  #   namespace :admin do
  #     # Directs /admin/products/* to Admin::ProductsController
  #     # (app/controllers/admin/products_controller.rb)
  #     resources :products
  #   end
end

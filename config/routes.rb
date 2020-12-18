Rails.application.routes.draw do
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
  namespace :api, defaults: {format: :json} do
    resources :users, only: [:create, :destroy]
    resource :session, only: [:create, :destroy]
    resources :profiles, only: [:index, :create, :update, :show]
    resources :experiences, only: [ :create, :update, :destroy]
    resources :educations, only: [ :create, :update, :destroy]
    resources :achievements, only: [ :create, :update, :destroy]
    resources :connections, only: [:create, :destroy, :show]
    resources :posts, only: [:create, :index, :update, :destroy] do 
      resources :comments, only: [:create]
    end
    resources :comments, only: [:update, :destroy]
  end

  root 'static_pages#root'
end

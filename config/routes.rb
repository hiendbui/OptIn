Rails.application.routes.draw do
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
  namespace :api, defaults: {format: :json} do
    resources :users, only: [:create, :destroy]
    resource :session, only: [:create, :destroy]
    resources :profiles, only: [:index, :create, :update, :show] do 
      resources :experiences, only: [:index, :create, :update, :destroy]
      resources :educations, only: [:index, :create, :update, :destroy]
      resources :achievements, only: [:index, :create, :update, :destroy]
    end
  end

  root 'static_pages#root'
end

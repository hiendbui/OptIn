class Api::ProfilesController < ApplicationController
    def index
        @profiles = Profile.all
        render 'api/profiles/index'
    end
    def create
        @profile = Profile.new(profile_params)
        @profile.user_id = current_user.id

        if @profile.save
            render "api/profiles/show"
        else
            render json: @profile.errors.full_messages, status: 422
        end
    end

    def show
        @profile = Profile.find(params[:id])
        if @profile
            render "api/profiles/show"
        else
            render json: @profile.errors.full_messages, status: 422
        end
    end
    
    def update
        @profile = Profile.find(params[:id])
        if @profile.update(profile_params)
            render "api/profiles/show"
        else
            render json: @profile.errors.full_messages, status: 422
        end
    end
    
    private
    
    def profile_params
        params.require(:profile).permit(:full_name, :headline, :location, :description) #:profile_pic)
    end
end

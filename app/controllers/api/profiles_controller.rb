class Api::ProfilesController < ApplicationController
    def create
        @profile = Profile.new(profile_params)

        if @profile.save
            login(@user)
            render "api/profiles/show"
        else
            render json: @profile.errors.full_messages, status: 422
        end
    end
    
    private
    
    def profile_params
        params.require(:profile).permit(:full_name, :headline, :location)
    end
end

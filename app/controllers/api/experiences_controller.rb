class Api::ExperiencesController < ApplicationController
    def create
        @experience = Experience.new(experience_params)
        @experience.profile_id = current_user.profile.id

        if @experience.save
            render "api/experiences/show"
        else
            render json: @experience.errors.full_messages, status: 422
        end
    end

    def show
        @experience = Experience.find(params[:id])
        if @experience
            render "api/experiences/show"
        else
            render json: @experience.errors.full_messages, status: 422
        end
    end
    
    def update
        @experience = Experience.find(params[:id])
        if @experience.update(experience_params)
            render "api/experiences/show"
        else
            render json: @experience.errors.full_messages, status: 422
        end
    end

    def experience_params
        params.require(:experience).permit(:title, :company, :start_date, :end_date, :location, :description) #photo?
    end
end

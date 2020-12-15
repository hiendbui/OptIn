class Api::AchievementsController < ApplicationController
    def create
        @achievement = Achievement.new(achievement_params)
        @achievement.profile_id = current_user.profile.id

        if @achievement.save
            render "api/achievements/show"
        else
            render json: @achievement.errors.full_messages, status: 422
        end
    end

    def show
        @achievement = Achievement.find(params[:id])
        if @achievement
            render "api/achievements/show"
        else
            render json: @achievement.errors.full_messages, status: 422
        end
    end
    
    def update
        @achievement = Achievement.find(params[:id])
        if @achievement.update(achievement_params)
            render "api/achievements/show"
        else
            render json: @achievement.errors.full_messages, status: 422
        end
    end

    def achievement_params
        params.require(:achievement).permit(:title, :issuer, :year, :description)
    end
end

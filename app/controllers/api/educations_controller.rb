class Api::EducationsController < ApplicationController
    def create
        @education = Education.new(education_params)
        @education.profile_id = current_user.profile.id

        if @education.save
            render "api/educations/show"
        else
            render json: @education.errors.full_messages, status: 422
        end
    end

    
    def update
        @education = Education.find(params[:id])
        if @education.update(education_params)
            render "api/educations/show"
        else
            render json: @education.errors.full_messages, status: 422
        end
    end
    
    def destroy
        @education = current_user.educations.find_by(id: params[:id])
        @education.delete if @education
    end

    private 
    
    def education_params
        params.require(:education).permit(:school, :degree, :subject, :start_year, :end_year, :description) #photo?
    end
end

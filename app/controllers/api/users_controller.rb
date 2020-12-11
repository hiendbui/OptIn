class Api::UsersController < ApplicationController
    def create
        @user = User.new(user_params)

        if @user.save
            login(@user)
            render "api/users/show"
        else
            render json: @user.errors.full_messages, status: 422
        end
    end
    
    def destroy
        @user = current_user
        if @user
            logout
            @user.destroy
        else
            render json: ["User is not signed in"], status: 404
        end
    end

    private
    
    def user_params
        params.require(:user).permit(:email, :password)
    end
end

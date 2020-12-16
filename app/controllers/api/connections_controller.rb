class Api::ConnectionsController < ApplicationController
    def create
        @profile = Profile.find_by(user_id: current_user.id)
        @connection = @profile.active_connections.new(connection_params)
        if @connection.save
            render 'api/connections/show'
        else
            render json: @connection.errors.full_messages, status: 422
        end
    end

    def destroy
        @profile = Profile.find_by(user_id: current_user.id)
        @connection = @profile.active_connections.find_by(followee_id: params[:id])
        if @connection
            @connection.delete
        else
            render json: params[:followee_id]
        end
    end


    private

    def connection_params
        params.require(:connection).permit(:followee_id)
    end
end

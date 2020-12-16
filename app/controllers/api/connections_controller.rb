class Api::ConnectionsController < ApplicationController
    def create
        @connection = current_user.active_connections.new(connection_params)
        if @connection.save
            render 'api/connections/show'
        else
            render json: @connection.errors.full_messages, status: 422
        end
    end

    def destroy
        @connection = Connection.find(params[:id])
        @connection.delete if @connection
    end


    private

    def connection_params
        params.require(:connection).permit(:followee_id)
    end
end

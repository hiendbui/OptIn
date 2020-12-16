class Api::ConnectionsController < ApplicationController
    def create
        @followee = Profile.find(params[:connection][:followee_id])
        @connection = current_user.active_connections.new(followee_id: @followee.id)

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
end

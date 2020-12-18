class Api::CommentsController < ApplicationController
    def index
        @comments = Comment.all
        render 'api/comments/index'
    end

    def create
        @comment = Comment.new(comment_params)
        @comment.author_id = current_user.profile.id

        if @comment.save
            render 'api/comments/show'
        else
            render json: @comment.errors.full_messages, status: 422
        end
    end

    
    
    def update
        @comment = Comment.find(params[:id])
        if @comment.update(comment_params)
            render "api/comments/show"
        else
            render json: @comment.errors.full_messages, status: 422
        end
    end
    
    def destroy
        @comment = Comment.find(params[:id])
        @comment.delete if (@comment) 
    end
    
    private
    
    def comment_params
        params.require(:comment).permit(:body, :post_id)
    end
end

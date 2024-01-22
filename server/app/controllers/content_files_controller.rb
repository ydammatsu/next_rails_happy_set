class ContentFilesController < ApplicationController
  before_action :set_content_file, only: %i[ show update destroy ]

  # GET /content_files
  def index
    @content_files = ContentFile.all

    render json: @content_files
  end

  # GET /content_files/1
  def show
    render json: @content_file
  end

  # POST /content_files
  def create
    @content_file = ContentFile.new(content_file_params)

    if @content_file.save
      render json: @content_file, status: :created, location: @content_file
    else
      render json: @content_file.errors, status: :unprocessable_entity
    end
  end

  # PATCH/PUT /content_files/1
  def update
    if @content_file.update(content_file_params)
      render json: @content_file
    else
      render json: @content_file.errors, status: :unprocessable_entity
    end
  end

  # DELETE /content_files/1
  def destroy
    @content_file.destroy!
  end

  private
    # Use callbacks to share common setup or constraints between actions.
    def set_content_file
      @content_file = ContentFile.find(params[:id])
    end

    # Only allow a list of trusted parameters through.
    def content_file_params
      params.require(:content_file).permit(:name, :content)
    end
end

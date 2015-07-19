class ProjectsController < ApplicationController
  before_action :set_project, only: [:edit, :update, :destroy, :detail]
  before_action :set_project_with_pictures, only: [:show, :record]
  before_action :authenticate! , only: [:new, :home, :edit, :record, :update, :destroy]

  # GET /projects
  # GET /projects.json
  def index
    @projects = Project.order('updated_at desc').all
  end

  # GET /projects/1
  # GET /projects/1.json
  def show
   render layout: 'player'
  end

  def record
    render layout: 'player'
  end

  def detail

  end

  def home
    @projects = Project.joins(:user).order('updated_at desc').where(:user => current_user)
    render action: :index
  end

  # GET /projects/new
  def new
    @project = Project.new
  end

  # GET /projects/1/edit
  def edit
  end

  def post_order

  end

  # POST /projects
  # POST /projects.json
  def create
    @project = Project.new(project_params)
    @project.user = current_user

    respond_to do |format|
      if @project.save
        format.html { redirect_to record_project_path(@project), notice: 'Project was successfully created.' }
        format.json { render :show, status: :created, location: @project }
      else
        format.html { render :new }
        format.json { render json: @project.errors, status: :unprocessable_entity }
      end
    end
  end

  # PATCH/PUT /projects/1
  # PATCH/PUT /projects/1.json
  def update
    respond_to do |format|
      if @project.update(project_params)
        format.html { redirect_to root_path, notice: 'Project was successfully updated.' }
        format.json { render :show, status: :ok, location: @project }
      else
        format.html { render :edit }
        format.json { render json: @project.errors, status: :unprocessable_entity }
      end
    end
  end

  # DELETE /projects/1
  # DELETE /projects/1.json
  def destroy
    @project.destroy
    flash[:notice] = 'Project was successfully destroyed.' 
    render :json => @project
  end

  private

    def set_project
      @project = Project.find(params[:id])
      unless @project.visible_to_user? current_user
       flash[:alert] = "This project is private"
       redirect_to root_path
      end
    end

    def set_project_with_pictures
      @project = Project.find(params[:id])

      unless @project.visible_to_user? current_user
        flash[:alert] = "This project is private"
        redirect_to root_path
      end
        @pictures = Photo.where(:project => @project)
    end

    # Never trust parameters from the scary internet, only allow the white list through.
    def project_params
      taggings = params.require(:project).permit(:tagging)
      tags = taggings[:tagging].split(",")
      tag_models = tags.collect{|t| Tag.find_or_create_by(name: t)}
      tagging_models = tag_models.collect { |t|  Tagging.new({tag:t, project:@project} ) unless Tagging.where(tag_id: t.id, project_id: @project.id).first}
      tagging_models.each { |t| t.save if t}

      tagginged = Tagging.find_by(project_id: @project.id).collect
      params.require(:project).permit(:project_name, :thumbnail_picture_id,:status, :description)
    end

    def authenticate!
     unless user_signed_in?
      flash[:notice] = "You need to sign in"
      redirect_to root_path
     end
    end
end

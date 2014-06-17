require "socket"
require "json"
require "pp"
require "open-uri"
require "uri"
require "resque"
require "redis"
#require "gd2"
require "camera_api"
require "fabnavi_utils"
require "base64"
require "date"

require "rexml/document"
require "aws-sdk"

include Fabnavi

$host = "10.0.0.1"
$port = 10000

module Gdworker
  class App < Padrino::Application
    use ActiveRecord::ConnectionAdapters::ConnectionManagement
    register ScssInitializer
    register Padrino::Mailer
    register Padrino::Helpers

    disable :sessions
    disable :protect_from_csrf

    Resque.redis = Redis.new

    get '/' do
     @projects= Project.all(:order => 'updated_at desc')
     render 'project/index' 
    end

    get "/project/:author/:project/" do
      id = Project.joins(:author).where(:project_name => params[:project],:authors => {:name => params[:author]}).first.id
      @projectData = Picture.all.where(:project_id => id).order(":order_in_project desc")
      if @projectData == nil then
        render 'errors/404'
      else 
        render 'project/project'
      end
    end

    get "/update/:author/:project/" do
      id = Project.joins(:author).where(:project_name => params[:project],:authors => {:name => params[:author]}).first.id
      @projectData = Picture.all.where(:project_id => id).order(":order_in_project desc")
      if @projectData == nil then
        render 'errors/404'
      else 
        render 'project/update'
      end
    end

    get "/new" do
      render 'project/new'
    end

    get '/test' do
      render 'project/test'
    end

    error 404 do
      render 'errors/404'
    end

  end
end

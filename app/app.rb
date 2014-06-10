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
     @playlists = Playlist.all(:order => 'updated_at desc')
     render 'project/index' 
    end

    get "/project/:user/:project/" do
      @projectData = Playlist.find_by(:projectName => params[:project],:author=>params[:user])
      render 'project/project'
    end

    get '/test' do
      render 'project/test'
    end
  end
end

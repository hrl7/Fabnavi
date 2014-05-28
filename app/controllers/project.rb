require "fabnavi_utils"
Gdworker::App.controllers :project do

  get "/getList" do 
    res = []
    all = Playlist.all(:order => 'updated_at desc')
    all.each{|p|
      res.push({:id=>p.projectName,:thumbnail=>"data/"+p.projectName+"/pict20140418_112846_0.JPG.jpg"})
    }
    res.to_json
  end

  get "/getProject" do 
    id = params[:project_id]
    res = Playlist.find_by(:projectname=>id)
    res.to_json
  end

  get "/getConfigFiles" do
    id = params[:project_id]
    res = Playlist.find_by(:projectname=>id)
    res.to_json
  end

  get "/new" do
    id = params[:projectName]
    if id == nil then
      puts "no given name"
      return 
    end

    res = Playlist.find_by(:projectname => id)
    if res == nil then
     puts id.to_s + " is already exist!"
     return 
    end

    puts id.to_s + " is ok."
    return 
  end

  post "/postConfig" do
    id = params[:project_id]
    data = params[:data]
    backup_config id
    save_config id,data
  end

  post "/postPicture" do
    data = params[:data]
    id = params[:project_id]
    url = params[:url]
    pict = Base64.decode64(data)
    fileName =File.basename(/^http.*.JPG/.match(url)[0])
    filePath = id+'/'+fileName
    save_pict_S3(filePath,pict)
    return "http://files.fabnavi.s3.amazonaws.com/"+filePath
  end 
end

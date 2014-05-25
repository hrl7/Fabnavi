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
#    res = []
#    if id == "undefined" then
#      puts "id is Undefined" 
#    else 
#      Dir.chdir(Fabnavi::DATADIR + id+ "/original")
#      Dir.glob('*.{jpg,JPG}').each do |t|
#        res.push("data/"+id+"/original/"+t)
#      end
#    end
    res.to_json
  end

  get "/getConfigFiles" do
    id = params[:project_id]
    res = Playlist.find_by(:projectname=>id)
    res.to_json
  end

  get "/new" do
    if params[:projectName] == nil then
      id = Time.now.nsec.to_s
    else 
      id = params[:projectName].to_s
    end
    Dir.chdir(Fabnavi::DATADIR)
    Dir.mkdir id
    Dir.chdir(id)
    Dir.mkdir "original"
    Dir.mkdir "note"
    FileUtils.touch "fabnavi.play.config"
    backup_config id
    return {:id=>id}.to_json 
  end

  get "/takePicture" do
    id = params[:project_id]
    api = CameraAPI.new 
    query = api.generateOp("actTakePicture",[])
    doc = api.fire query
    url = doc['result'][0][0]
    save_pict url, id
    fileName = File.basename(/^http.*.JPG/.match(url)[0])
    return {:url=>"data/"+id+"/original/"+fileName}.to_json
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

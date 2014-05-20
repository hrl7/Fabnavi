Gdworker::App.controllers :project do

  get "/getList" do 
    res = []
    Dir.chdir(Fabnavi::DATADIR)
    Dir.glob('*').each do |t|
      Dir.chdir(t)
      picts = Dir.glob('*.{jpg,JPG}')  
      res.push({:id=>t,:thumbnail=>("data/"+t+"/"+picts[0].to_s)})
      Dir.chdir("../")
    end
    res.to_json
  end

  get "/getProject" do 
    id = params[:project_id]
    res = []
    Dir.chdir(Fabnavi::DATADIR + id+ "/original")
    Dir.glob('*.{jpg,JPG}').each do |t|
      res.push("data/"+id+"/original/"+t)
    end
    res.to_json
  end

  get "/getConfigFiles" do
    id = params[:project_id]
    Dir.chdir(Fabnavi::DATADIR + id + "/")
    res = []
    Dir.glob('*.config').each do |file|
      res.push("data/" + id + "/" + file)
    end
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
    filePath = Fabnavi::DATADIR+id+"/original/"+ fileName
    thumnailPath = DATADIR+id+"/thumbnail.jpg" 
    outerfilePath = Fabnavi::OUTER_DATADIR+id+"/original/"+ fileName
    File.binwrite(filePath,pict)
    FileUtils.copy_file(filePath,thumnailPath)
    return outerfilePath.to_json
  end 
  # get :index, :map => '/foo/bar' do
  #   session[:foo] = 'bar'
  #   render 'index'


  # get :sample, :map => '/sample/url', :provides => [:any, :js] do
  #   case content_type
  #     when :js then ...
  #     else ...
  # end

  # get :foo, :with => :id do
  #   'Maps to url '/foo/#{params[:id]}''
  # end

  # get '/example' do
  #   'Hello world!'
  # end


end

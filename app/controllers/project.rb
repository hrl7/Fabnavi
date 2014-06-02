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
    res = Playlist.find_by(:projectName=>id)
    res.to_json
  end

  get "/getConfigFiles" do
    id = params[:project_id]
    res = Backup.where(projectName:id)
    res.to_json
  end

  get "/new" do
    id = params[:projectname]
    if id == nil then
      puts "no given name"
      id = Time.now.strftime("%Y-%m-%d_%H-%M-%S")
    end

    res = Playlist.find_by(:projectName => id)
    if not res == nil then
      puts id.to_s + " is already exist!"
      id = Time.now.strftime("%Y-%m-%d_%H-%M-%S")
    end

    puts id.to_s + " is ok."
    res = id.to_s
    return {:id => res}.to_json
  end

  post "/postConfig" do
    id = params[:project_id]
    prev = Playlist.find_by(:projectName => id)
    if not prev == nil then
      Backup.new do |b|
       b.projectName = prev.projectName
       b.body = prev.body
       b.save
      end
      prev.delete
    end
    data = params[:data]
    Playlist.new do |ls|
     ls.projectName = id
     ls.body = data
     ls.save
    end
  end

  post "/postPicture" do
    data = params[:data]
    id = params[:project_id]
    url = params[:url]
    pict = Base64.decode64(data)
    fileName =File.basename(/^http.*.JPG/.match(url)[0])
    filePath = id+'/'+fileName
    save_pict_S3(filePath,pict)
    res = "https://s3-ap-northeast-1.amazonaws.com/files.fabnavi/"+filePath
    return res
  end 
end

require "fabnavi_utils"
Gdworker::App.controllers :project do

  get "/getList" do 
    res = []
    all = Project.joins(:picture,:author).all(:order => 'updated_at desc')
    all.each{|p|
      res.push({:id=>p.project_name,:user=>p.author.name,:thumbnail=> p.picture[p.thumbnail_picture_id].thumbnail_url.to_s})
    }
    res.to_json
  end

  get "/getProject" do 
    res = Project.joins(:author).where(:project_name => params[:project_id],:authors => {:name => params[:author]})
    res.to_json
  end

  get "/new" do
    id = params[:projectname]
    if id == nil then
      id = Time.now.strftime("%Y-%m-%d_%H-%M-%S")
    end

    res = Project.find_by(:project_name => id)
    if not res == nil then
      id = Time.now.strftime("%Y-%m-%d_%H-%M-%S")
    end
    res = id.to_s
    return {:id => res}.to_json
  end

  post "/postConfig" do
    id = params[:project_id]
    author = params[:author]
    if author == nil then author = "NO_NAME" end
    data = params[:data]
    Project.new do |ls|
     ls.project_name = id
     ls.body = data
     ls.author = author
     ls.save
    end
  end

  get "/delete" do
   res = Project.joins(:author).where(:authors => {:name => params[:author]})
   res.delete
  end

  post "/setThumbnail" do
    thumbnailUrl = params[:thumbnail]
    author = params[:author]
    id = params[:project_id]
    proj = Project.find_by(:project_name => id,:author => author)
    proj.thumbnail = thumbnailUrl
    proj.save
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

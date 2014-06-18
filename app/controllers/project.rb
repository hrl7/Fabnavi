require "fabnavi_utils"
Gdworker::App.controllers :project do

  get "/getList" do 
    res = []
    all = Project.joins(:author).all(:order => 'updated_at desc')
    all.each{|p|
      thumbnail = Picture.where(:project_id => p.id, :order_in_project => p.thumbnail_picture_id).first 
      res.push({:id=>p.project_name,:user=>p.author.name,:thumbnail=> thumbnail.thumbnail_url})
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
    data = params[:data]
    imgURLs = JSON.parse data
    id = Project.joins(:author).where(:project_name => params[:project_id],:authors => {:name => params[:author]}).first.id
    pictureURLs= Picture.all.where(:project_id => id).order(":order_in_project desc")
    imgURLs.each_with_index do |url,i|
      pict = pictureURLs.find_by(:url => imgURLs[i]["globalURL"])
      pict.order_in_project = i+1
      pict.save
    end
    "hoge"
  end

  get "/delete" do
   res = Project.joins(:author).where(:authors => {:name => params[:author]})
   res.delete
  end

  post "/setThumbnail" do
    index = params[:thumbnail]
    puts params.to_s
    proj = Project.joins(:author).where(:project_name => params[:project_id],:authors => {:name => params[:author]}).readonly(false).first
    proj.thumbnail_picture_id = index.to_i+1
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

Gdworker::App.controllers :author do
  get '/register' do
    render :register
  end

  post '/create' do
    a = Author.new
    a.name = params[:username]
    a.email = session["email"]
    if a.save then 
      return "ok"
    else 
      return [params,session].to_json
    end  
  end

end

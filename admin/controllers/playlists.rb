Gdworker::Admin.controllers :playlists do
  get :index do
    @title = "Playlists"
    @playlists = Playlist.all
    render 'playlists/index'
  end

  get :new do
    @title = pat(:new_title, :model => 'playlist')
    @playlist = Playlist.new
    render 'playlists/new'
  end

  post :create do
    @playlist = Playlist.new(params[:playlist])
    if @playlist.save
      @title = pat(:create_title, :model => "playlist #{@playlist.id}")
      flash[:success] = pat(:create_success, :model => 'Playlist')
      params[:save_and_continue] ? redirect(url(:playlists, :index)) : redirect(url(:playlists, :edit, :id => @playlist.id))
    else
      @title = pat(:create_title, :model => 'playlist')
      flash.now[:error] = pat(:create_error, :model => 'playlist')
      render 'playlists/new'
    end
  end

  get :edit, :with => :id do
    @title = pat(:edit_title, :model => "playlist #{params[:id]}")
    @playlist = Playlist.find(params[:id])
    if @playlist
      render 'playlists/edit'
    else
      flash[:warning] = pat(:create_error, :model => 'playlist', :id => "#{params[:id]}")
      halt 404
    end
  end

  put :update, :with => :id do
    @title = pat(:update_title, :model => "playlist #{params[:id]}")
    @playlist = Playlist.find(params[:id])
    if @playlist
      if @playlist.update_attributes(params[:playlist])
        flash[:success] = pat(:update_success, :model => 'Playlist', :id =>  "#{params[:id]}")
        params[:save_and_continue] ?
          redirect(url(:playlists, :index)) :
          redirect(url(:playlists, :edit, :id => @playlist.id))
      else
        flash.now[:error] = pat(:update_error, :model => 'playlist')
        render 'playlists/edit'
      end
    else
      flash[:warning] = pat(:update_warning, :model => 'playlist', :id => "#{params[:id]}")
      halt 404
    end
  end

  delete :destroy, :with => :id do
    @title = "Playlists"
    playlist = Playlist.find(params[:id])
    if playlist
      if playlist.destroy
        flash[:success] = pat(:delete_success, :model => 'Playlist', :id => "#{params[:id]}")
      else
        flash[:error] = pat(:delete_error, :model => 'playlist')
      end
      redirect url(:playlists, :index)
    else
      flash[:warning] = pat(:delete_warning, :model => 'playlist', :id => "#{params[:id]}")
      halt 404
    end
  end

  delete :destroy_many do
    @title = "Playlists"
    unless params[:playlist_ids]
      flash[:error] = pat(:destroy_many_error, :model => 'playlist')
      redirect(url(:playlists, :index))
    end
    ids = params[:playlist_ids].split(',').map(&:strip)
    playlists = Playlist.find(ids)
    
    if Playlist.destroy playlists
    
      flash[:success] = pat(:destroy_many_success, :model => 'Playlists', :ids => "#{ids.to_sentence}")
    end
    redirect url(:playlists, :index)
  end
end

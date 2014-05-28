Gdworker::Admin.controllers :backups do
  get :index do
    @title = "Backups"
    @backups = Backup.all
    render 'backups/index'
  end

  get :new do
    @title = pat(:new_title, :model => 'backup')
    @backup = Backup.new
    render 'backups/new'
  end

  post :create do
    @backup = Backup.new(params[:backup])
    if @backup.save
      @title = pat(:create_title, :model => "backup #{@backup.id}")
      flash[:success] = pat(:create_success, :model => 'Backup')
      params[:save_and_continue] ? redirect(url(:backups, :index)) : redirect(url(:backups, :edit, :id => @backup.id))
    else
      @title = pat(:create_title, :model => 'backup')
      flash.now[:error] = pat(:create_error, :model => 'backup')
      render 'backups/new'
    end
  end

  get :edit, :with => :id do
    @title = pat(:edit_title, :model => "backup #{params[:id]}")
    @backup = Backup.find(params[:id])
    if @backup
      render 'backups/edit'
    else
      flash[:warning] = pat(:create_error, :model => 'backup', :id => "#{params[:id]}")
      halt 404
    end
  end

  put :update, :with => :id do
    @title = pat(:update_title, :model => "backup #{params[:id]}")
    @backup = Backup.find(params[:id])
    if @backup
      if @backup.update_attributes(params[:backup])
        flash[:success] = pat(:update_success, :model => 'Backup', :id =>  "#{params[:id]}")
        params[:save_and_continue] ?
          redirect(url(:backups, :index)) :
          redirect(url(:backups, :edit, :id => @backup.id))
      else
        flash.now[:error] = pat(:update_error, :model => 'backup')
        render 'backups/edit'
      end
    else
      flash[:warning] = pat(:update_warning, :model => 'backup', :id => "#{params[:id]}")
      halt 404
    end
  end

  delete :destroy, :with => :id do
    @title = "Backups"
    backup = Backup.find(params[:id])
    if backup
      if backup.destroy
        flash[:success] = pat(:delete_success, :model => 'Backup', :id => "#{params[:id]}")
      else
        flash[:error] = pat(:delete_error, :model => 'backup')
      end
      redirect url(:backups, :index)
    else
      flash[:warning] = pat(:delete_warning, :model => 'backup', :id => "#{params[:id]}")
      halt 404
    end
  end

  delete :destroy_many do
    @title = "Backups"
    unless params[:backup_ids]
      flash[:error] = pat(:destroy_many_error, :model => 'backup')
      redirect(url(:backups, :index))
    end
    ids = params[:backup_ids].split(',').map(&:strip)
    backups = Backup.find(ids)
    
    if Backup.destroy backups
    
      flash[:success] = pat(:destroy_many_success, :model => 'Backups', :ids => "#{ids.to_sentence}")
    end
    redirect url(:backups, :index)
  end
end

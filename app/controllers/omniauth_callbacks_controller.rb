class OmniauthCallbacksController < Devise::OmniauthCallbacksController
  def persona
    if request.env["omniauth.auth"].try(:extra).try(:raw_info).try(:status) == "okay"
      @user = User.from_omniauth(request.env["omniauth.auth"])

      if @user.persisted?
        sign_in @user
        set_flash_message(:notice, :success, :kind => "Persona") if is_navigational_format?
      else
        session["devise.persona_data"] = request.env["omniauth.auth"]
      end

      if @user.sign_in_count == 1
        render :text => edit_user_registration_path
      else
        render :text => root_path
      end
    else
      flash[:notice] = "Authentication Failed"
      render :text => root_path
    end
  end
end

class OmniauthCallbacksController < Devise::OmniauthCallbacksController
  def persona
    if request.env["omniauth.auth"].try(:extra).try(:raw_info).try(:status) == "okay"
      @user = User.from_omniauth(request.env["omniauth.auth"])
      flash[:notice] = "Signed in"

      if @user.persisted?
        sign_in_and_redirect @user
        set_flash_message(:notice, :success, :kind => "Persona") if is_navigational_format?
      else
        session["devise.persona_data"] = request.env["omniauth.auth"]
        redirect_to new_user_registration_url
      end

    else
      flash[:notice] = "Authentication Failed"
      redirect_to root_path
    end
  end
end


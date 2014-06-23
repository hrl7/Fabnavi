require "net/https"

Gdworker::App.controllers :auth do

  post 'login' do
    https = Net::HTTP.new('verifier.login.persona.org',443)
    https.use_ssl = true
    data = "assertion="+params[:assertion]+"&audience=http://localhost:3000"
    resurl = ""
    https.start do
      res = https.post("/verify",data)
      result = JSON.parse res.body
      if result["status"] == "okay" then
        session[:email] = result["email"]
        unless Author.exists? email: session[:email] then
          resurl = "/author/register"
        else  
          resurl = "/"
        end
      end
    end
    resurl
  end

  post 'logout' do
    session.destroy
  end
end

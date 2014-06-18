require "net/https"

Gdworker::App.controllers :auth do

  post 'login' do
    https = Net::HTTP.new('verifier.login.persona.org',443)
    https.use_ssl = true
    data = "assertion="+params[:assertion]+"&audience=http://localhost:3000"
    puts data
    res = ""
    https.start do
      res = https.post("/verify",data)
      result = JSON.parse res.body
      if result["status"] == "okay" then
        session[:email] = result["email"]
      end
    end
    res.body
  end

  post 'logout' do
    session.destroy
  end
end

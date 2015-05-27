CarrierWave.configure do |config|
  config.fog_credentials = {
    provider:              'AWS',                        # required
    aws_access_key_id:     ENV["AWS_ACCESS_KEY_ID"],                        # required
    aws_secret_access_key: ENV["AWS_SECRET_ACCESS_KEY"],                        # required
    region:                ENV["AWS_REGION"],                  # optional, defaults to 'us-east-1'
    host:                  ENV["AWS_HOST"],
    endpoint:              ENV["AWS_ENDPOINT"],
    path_style:             true
  }
  config.fog_public     = true # optional, defaults to true
  config.fog_attributes = { 'Cache-Control' => "max-age=#{365.day.to_i}" } # optional, defaults to {}
  case Rails.env
  when 'production'
    config.fog_directory = ENV["AWS_DIR"]
    config.asset_host = ENV["AWS_ENDPOINT"]

  when 'development'
    config.fog_directory = ENV["AWS_DIR"]
    config.asset_host = ENV["AWS_ENDPOINT"]

  when 'test'
    config.fog_directory = ENV["AWS_DIR"]
    config.asset_host = ENV["AWS_ENDPOINT"]
  end
end



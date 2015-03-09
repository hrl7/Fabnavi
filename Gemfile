source 'https://rubygems.org'

# Distribute your app as a gem
# gemspec

# Server requirements
# gem 'thin' # or mongrel
# gem 'trinidad', :platform => 'jruby'

# Optional JSON codec (faster performance)
# gem 'oj'

# Project requirements
gem 'rake'

# Component requirements
gem 'slim'
gem 'bcrypt'
gem 'activerecord', '>= 3.1', :require => 'active_record'
gem 'sass'
gem 'haml'
gem 'pg'

# Test requirements

# Padrino Stable Gem
gem 'padrino', '0.12.1'

# Or Padrino Edge
# gem 'padrino', :github => 'padrino/padrino-framework'

# Or Individual Gems
# %w(core support gen helpers cache mailer admin).each do |g|
#   gem 'padrino-' + g, '0.12.1'
# end
#
gem 'resque'
gem 'aws-sdk'
gem 'rspec', '3.1'
gem 'rack-test', :require => 'rack/test'

group :development, :test do
  gem 'factory_girl_rails', '~> 4.4.1'
  gem 'rspec-rails', '~> 3.1.0'
end

group :test do
  gem 'faker' , '~> 1.4.3'
  gem 'capybara', '~> 2.4.3'
  gem 'database_cleaner'
  gem 'launchy'
  gem 'selenium-webdriver'
end

group :development do
  gem 'better_errors'
  gem 'binding_of_caller'
  gem 'guard'
  gem 'guard-livereload'
end

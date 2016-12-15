ENV['RACK_ENV'] ||= 'development'
ENV['APP_NAME'] ||= 'test_app'

require 'sinatra/base'
require 'sinatra/flash'

require './app/app'
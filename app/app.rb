class TestApp < Sinatra::Base
	register Sinatra::Flash
  use Rack::Session::Cookie, :key => 'rack.session',
                             :path => '/',
                             :secret => ENV['SESSION_SECRET']

  get '/' do
    erb(:index)
  end

end

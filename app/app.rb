class TestApp < Sinatra::Base
  get '/' do
    erb(:index)
  end
end

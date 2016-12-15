# Sinatra Scaffold

Scaffolding for a basic Sinatra application, with PSQL and Datamapper.

##Installation & Setup
 - Clone this repo `$ git clone git@github.com:harrim91/sinatra_scaffold.git `
 - Install dependencies - `$ bundle`
 
By default, the app is called TestApp or test_app. If you want to change the name of your app (you probably do), you need to change this in the following places:
 - `app/app.rb`
 - `spec/spec_helper.rb`
 - `config.ru`
 - `server.rb`

 - To set up test database and development databases, run `$ rake db:auto_migrate` and `$ rake db:auto_migrate RACK_ENV=test` This will create databases named using the `APP_NAME` and `RACK_ENV` environment variables (e.g. test_app_development).

 - In general, requiring of files is done in `server.rb`, or in a config file (which should then be required in `server.rb`). e.g. Models are required in `config/datamapper.rb`, and `config/datamapper.rb` is required in `server.rb`.
 
 - Any secret environment variables (SESSION_SECRET etc.) can be loaded in a `.env` file at the root of the application. Variables listed in here are loaded when the server starts, and the file is listed in the `.gitignore`

 - Tests use rspec and capybara. Spec files should be placed in the `spec` directory and follow the naming convention `#{filename}_spec.rb`.

 - Static files are server from `app/public`

## Useage
 - To run the tests, run `$ rspec`
 - To run the app, run `$ shotgun` - this automatically reloads the server when a file is changed.




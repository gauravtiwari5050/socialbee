class MainController < ApplicationController
  def login
  end
  def path
    @degrees = [1,2].sample
    users = User.all
    @intermediaries = users.sample @degrees
    @you  = users[0]
    @targetName = params[:target]
  end
  def facebook_callback
    session[:access_token] = request.env['omniauth.auth']['credentials']['token']
    session[:access_secret] = request.env['omniauth.auth']['credentials']['secret']
      logger.info 'Received from facebook'
      message = "Started reading \" #{session['book_title']}\" here #{session['original_book_url']} "
      begin 

        @graph = Koala::Facebook::API.new(session[:access_token])
        profile = @graph.get_object("me")
        puts @graph.get_picture(profile['id'],{:type => 'normal'})
        user = User.new
        user.first_name = profile['first_name']
        user.last_name = profile['last_name']
        user.fbid = profile['id']
        user.pic = @graph.get_picture(profile['id'],{:type => 'normal'})
        user.save

        friends = @graph.get_connections("me", "friends?fields=id,name,work,picture.type(large)")
        friends.each do |f|
          puts "Printing friend"
          puts f.inspect.to_s
          user = User.new
          names = f['name'].split
          user.first_name = names[0]
          if names.length > 1
            user.last_name = names[1]
          end
          user.fbid = f['id']
          user.pic = f['picture']['data']['url']
          user.save
        end
      rescue Exception => e
        logger.error 'Error building facebook graph' 
        logger.error e.inspect.to_s
      end
  end 
end

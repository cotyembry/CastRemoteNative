TODO:

	BEFORE DISTRIBUTION:
		Use a Gemfile

			It is recommended that you use a Gemfile to define your dependency on fastlane. This will clearly define the used fastlane version, and its dependencies, and will also speed up using fastlane.

			Install bundler using sudo gem install bundler
			Create a ./Gemfile in the root directory of your project with the content
			source "https://rubygems.org"

			gem "fastlane"
			Run [sudo] bundle update and add both the ./Gemfile and the ./Gemfile.lock to version control
			Every time you run fastlane, use bundle exec fastlane [lane]
			On your CI, add [sudo] bundle install as your first build step
			To update fastlane, just run [sudo] bundle update



	-set the scroll position of the ScrollView when the keyboard is showing (put it at a desirable position) - this should be a solution that works for a view thats horizontal or vertical

	-add delay where after selecting 'seek', the numbers stay in there for a like 5 seconds, then they clear
		add a clear button that works for both text input boxes

	-//TODO: check to see if I need to optimize this .scan method in DeviceManager.swift to handle intelligently when it is called multiple times (i.e. keeping the code from recreating a class instance in its place, etc)

	-todo: cleanup CastIcon.js's logic on how it has to call the .getDevices method twice (maybe in the Native side do a DispatchQueue.main.async{} ... DispatchQueue.main.done - or whatever the method is named for swift that fires after the .async method finishes - I know there is one, I've used it before)

# Findtrails Website
Project description:

Imagine being on holiday and wanting to run or walk a nice route in nature, using your GPS watch or another navigation device. Try to google it and you will most likely find nothing. If you do find something, it will be on a website that looks like it hasn’t been changed since the autumn of 1996. You could plot a route yourself on a map, but you’re not sure if this will take you past the nicest paths and scenery. My website will offer just this: type in your location and have your pick of fine, quality-assured local routes, downloadable in GPX format. As a member, you can also upload and share your routes with other users and rate them. In this way, finding the best routes is made easy and a community of outdoor lovers is created!
 
# Features:
•	Search routes function on location
•	List nearby routes on a map as markers. Markers will have a link to downloading file. Optional: click on GPS routes to see them displayed on the map.
•	User registration and login
•	Registered users can download gpx files to store them on your watch, phone or other GPS device. 
•	Registered users can upload gpx files (data type / extension constraint) to share their best hikes with the world
•	Optional: rate the GPS route
•	Optional: blog function
•	Optional: integrate AJAX

# Milestones
•	User registration in database
•	Upload file function (data type / extension constraint)
•	Download file function
•	Authentication (bcrypt hashing, optional: passport login with Facebook)
•	Integration of GoogleMaps api
o	GeoCode location of uploaded box files
o	Use coordinates of files to search location
o	Display starting point of route in marker on map
o	Optional: display the whole routes on the map
•	Optional: rate the GPS routes
•	AJAX integration

# Lay-out
•	Front page with navbar. Impressive nature picture. Searchbar in the middle for quick access to functionality.
•	When search is performed, page with map is rendered that has markers that link to all nearby runs
•	When marker is clicked, info pane about route pops up, with link to page that shows route.
•	One route page has download option and information about route.
•	Optional: Blog page with articles

# Necessary pug files:
•	Application
•	Index
•	Show search results
•	Show 1 route
•	About
•	Blog

# Plan and timeline:
1.	Create repo on GitHub 
2.	Set up basic app structure (use express generator?)
3.	Install dependencies
•	Express (app)
•	Morgan
•	Body-parser
•	Sequelize (database)
•	Bcrypt (authentication)
•	Session (authentication)
•	Multer (file upload)
•	Crypto (file upload)
•	Path (file upload)
•	GoogleMapsAPI (maps)
4.	Create database and make database module
•	Model users (username, email, password)
•	Model files (tables: sport, level, ascent, duration, location)
•	User is linked to files (can see how much files the user has contributed)  User.hasMany(Files)
5.	Registration and login functionality
•	Set up route to registration form
•	Make registration module (include bcrypt in registration)
•	Set some dummy users in database, hash their password
6.	File-upload and file download
•	Make form for file upload  datatype
•	Set up routes
•	Post the content of form into database
•	File has one user attached to it
•	Download  research what is needed for this!
7.	Search functionality
•	Set up route for the search
•	Make search module with post request
•	First search on different attributes of files (type of sport, level, ascent, duration, location: country)
•	Search on location:
8.	GoogleMaps API integration
•	Using the query in the search to render the map in an iframe (instead of a static map)
•	Linking the search query to nearby routes (files)
•	Use Geocoding to parse location of files into coordinates, use these coordinates to render all nearby routes  more research on GoogleMaps API, alternative is OpenStreetMap
•	More research needed!
9.	Frontend:
•	Modern style, responsive
•	User framework: Materialize or foundation?
10.	Extras:
•	Login with FaceBook (passport node.js module?)
•	Rate GPS routes
•	Make a blog page
•	AJAX

# Notes

Store coordinates of GPS files in a json files
Search on location though this json file
Render locations on a map using this json file
Do not query directly from database

Download function - rename downloaded files
FMC format? Render the routes on the map?
Return them again in GPX?

AJAX:
- error message if there are no routes found in backend (node) or in AJAX?

Center map on user's location when openeing website?

Delete markers when there is a new query

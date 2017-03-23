const express = require('express'),
      sequelize = require ('sequelize'),
      bodyParser = require ('body-parser'),
      router = express.Router(),
      GoogleMapsAPI = require('googlemaps');

// connecting to databse
const db = require(__dirname +'/database')

// setting router sub app to use bodyparser
router.use(bodyParser.urlencoded({ extended: false }))

// settings for publicConfig of GoogleMaps API
var publicConfig = {
  key: 'AIzaSyBdVgxHDOdfpMCYuDeqIg6RCi4zF3w20Lk',
  stagger_time:       1000, // for elevationPath
  encode_polylines:   false,
  secure:             true // use https

};
// search function, geocoding address input in search bar.
// comparing coordinates with coordinates of saved routes in database

const search = router.post('/search', (req, res) => {
  var geocodeParams = {
  "address":    req.body.search
	}
  const gmAPI = new GoogleMapsAPI(publicConfig);
  const searchQuery = {}
  console.log("SearchQuery is: ", searchQuery)
  gmAPI.geocode(geocodeParams, (err, response) => {

    console.log('Geocode result is: ', response.results[0].geometry.location)
    searchQuery.lat =  response.results[0].geometry.location.lat
    searchQuery.lng =  response.results[0].geometry.location.lng

    console.log("New SearchQuery is: ", searchQuery)
    // find all instances in databse
  	db.Route.findAll().then((result) => {
      console.log("Result is ", result)

      const searchMatch = []

      // loop through all routes
      for (var i = 0; i < result.length; i++) {
        // find matches if lat and lng are within 3 points of search location
        if (
          ( (searchQuery.lat + 3) > result[i].lat && (searchQuery.lat - 3) < result[i].lat ) &&
          ( (searchQuery.lng + 3) > result[i].lng && (searchQuery.lng - 3) < result[i].lng )
        ) searchMatch.push(  result[i] )
      }

      console.log('Matches are ', searchMatch)

    res.send({results: searchMatch})
    }).catch( err => {
      console.log(err);
      // working on error message to send to frontend: here or in if / else statement?
      res.send({message: "No matches!"})
    })
  })
})


module.exports = search

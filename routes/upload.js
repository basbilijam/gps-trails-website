const express = require ('express')
const router = express.Router()
const sequelize = require ('sequelize')
const bodyParser = require('body-parser')
const GoogleMapsAPI = require('googlemaps')
const multer  = require('multer')
const crypto = require('crypto')
const path = require('path')

// settings for multer, uploads storage location, and keeping file extensions

const storage = multer.diskStorage({
  destination: __dirname + '/../public/uploads/',
  filename: (req, file, cb) => {
    crypto.pseudoRandomBytes(16,  (err, raw) => {
      if (err) return cb(err)
      cb(null, raw.toString('hex') + path.extname(file.originalname))
    })
  }
})

const upload = multer({
  storage: storage,
  limits: { fileSize: 1 * 1000 * 10000 },
  fileFilter: (req, file, cb) => {
    console.log('File is', file)
   if (file.originalname.indexOf('.gpx') == -1 ) {
     return cb(new Error('Wrong file type!'), false);
   }
   cb(null, true);
   }
})

// connecting to databse
const db = require('../modules/database')

// setting router sub app to use bodyparser
router.use(bodyParser.urlencoded({ extended: false }))

// settings for publicConfig of GoogleMaps API
var publicConfig = {
  key: 'AIzaSyBdVgxHDOdfpMCYuDeqIg6RCi4zF3w20Lk',
  stagger_time:       1000, // for elevationPath
  encode_polylines:   false,
  secure:             true // use https
};

// set up route to upload page
router.get('/upload', (req, res, next) => {
  res.render('upload-file', {user: req.session.user})
})

module.exports = router

// post form for uploading new GPS files
router.post('/upload', upload.single('upload'), (req, res) => {
  console.log('Req.body is', req.body)
  // setting parameters for geocoding
  var geocodeParams = {
  "address":    req.body.location
	}
  const gmAPI = new GoogleMapsAPI(publicConfig);
  const newRoute = {
    name: req.body.name,
    location: req.body.location,
    level: req.body.level,
    length: req.body.length,
    description: req.body.description,
    upload: req.file.filename,
    userId: req.session.user.id
  }
  gmAPI.geocode(geocodeParams, (err, response) => {
    console.log('Geocode result is: ', response.results[0].geometry.location)
    newRoute.lat =  response.results[0].geometry.location.lat
    newRoute.lng =  response.results[0].geometry.location.lng
  	db.Route.create(newRoute).then( () => {
      console.log(newRoute)
    })
  // res.render('index', { title: 'Thanks for uploading your GPS route!',  user: req.session.user })
  })
})

module.exports = router

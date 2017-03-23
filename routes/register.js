const express = require ('express')
const session = require ('express-session')
const bodyParser = require('body-parser')
const bcrypt = require('bcrypt-nodejs')
const router = express.Router()

// setting up route to register page
router.get('/register', (req, res) => {
  res.render('register')
})

// connecting to databse
const db = require('../modules/database')

// setting router sub app to use bodyparser
router.use(bodyParser.urlencoded({ extended: false }))

// posting new user to database
router.post('/register', (req, res) => {
  console.log('Req.body is', req.body)
  const newUser = {
    username: req.body.username,
    email: req.body.email
    // password: hash
    }
  // hashing the password with bcrypt module
  bcrypt.hash(req.body.password, null, null, (err, hash) => {
    newUser.password = hash
    db.User.create(newUser).then( () => {
      console.log(newUser)
    })
  })
  res.redirect('/')
})

module.exports = router

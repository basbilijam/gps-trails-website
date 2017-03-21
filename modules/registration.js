const express = require ('express')
const router = express.Router()
const sequelize = require ('sequelize')
const bodyParser = require('body-parser')
const bcrypt = require('bcrypt-nodejs')

// connecting to databse
const db = require('./modules/m-db')

// setting router sub app to use bodyparser
router.use(bodyParser.urlencoded({ extended: false }))

// posting new user to database with google maps directly, adding the option to upload a picture.
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
  res.redirect('/log-in')
})

module.exports = router

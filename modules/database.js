// set up database connection
const sequelize = require ('sequelize')
const pg = require('pg')
const express = require ('express')
const bcrypt = require('bcrypt-nodejs')

// testing database without env user and password: process.env.POSTGRES_USER, process.env.POSTGRES_PASSWORD,

const db = new sequelize( 'gpsroutes', process.env.POSTGRES_USER, process.env.POSTGRES_PASSWORD, {
  host: 'localhost',
  dialect: 'postgres'
  // console.log('Env user is: ', process.env.POSTGRES_USER);
  // console.log('Env password is: ', process.env.POSTGRES_PASSWORD);
} )

//// Models
// User
const User = db.define( 'user', {
	username: sequelize.STRING,
	email: sequelize.STRING,
	password: sequelize.STRING
} )

// GPS routes
const Route = db.define( 'route', {
  name: sequelize.STRING,
	location: sequelize.STRING,
  lat: sequelize.STRING,
  lng: sequelize.STRING,
	level: sequelize.STRING,
  length: sequelize.STRING,
  description: sequelize.TEXT,
  upload: sequelize.STRING
} )

// setting db relations

Route.belongsTo( User )
User.hasMany( Route )

// creating database with one test user
db
  .sync({ force: false })
  .then( (err) => {
    console.log('It worked!')
    bcrypt.hash("password", null, null, (err, hash) => {
      return Promise.all ([
        User.create( {
    			username: "Bas",
    			email: "bas@bas.com",
    			password: hash
  		  } )
      ])
    })
  })
  .catch( console.log.bind( console ) )

// exporting database as a module
module.exports = {
  conn: db,
  User:User,
  Route:Route
}

const express = require ('express')
const router = express.Router()
const sequelize = require ('sequelize')
const fs = require('fs')
var path = require('path');

const db = require('../modules/database')

app.get('/download', function(req, res){

  let file = fs.readFileSync(__dirname + '/public/upload/'+route.id, 'binary');

  res.setHeader('Content-Length', 'name/gpx');
  res.write(file, 'binary');
  res.end();
});

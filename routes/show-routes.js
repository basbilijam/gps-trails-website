const express = require('express')
const router = express.Router()
const GoogleMapsAPI = require('googlemaps')

// GET show routes
router.get('/show-routes', (req, res, next) => {
  res.render('show-routes', { title: 'Search for nearby GPS Routes', user: req.session.user })
})

module.exports = router

const express = require('express')
const router = express.Router()

// GET home page
router.get('/about', (req, res, next) => {
  res.render('about', {user: req.session.user})
})

module.exports = router

const express = require ('express')
const router = express.Router()

// setting up route to register page
router.get('/register', (req, res) => {
  res.render('register')
})

module.exports = router

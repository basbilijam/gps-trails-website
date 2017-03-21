const express = require ('express')
const session = require ('express-session')
const router = express.Router()

// setting up route to login
router.get('/log-in', (req, res) => {
  if (req.session.user) {
    res.render('dashboard', {
      user: req.session.user
    })
  } else {
    res.render('log-in');
  }
})

// exporting router
module.exports = router

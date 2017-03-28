const express = require ('express')
const session = require ('express-session')
const bodyParser = require('body-parser')
const bcrypt = require('bcrypt-nodejs')

const router = express.Router()

const db = require('../modules/database')

// setting up route to login
router.get('/log-in', (req, res) => {
  if (req.session.user) {
    res.render('index', {
      user: req.session.user
    })
  } else {
    res.render('log-in');
  }
})

// login function and rendering dashboard when logged in
router.post('/log-in', (req, res) => {
  console.log('The user posted', req.body );
  db.User.findOne( {
    where: {
      username: req.body.username
    }
  }).then(user => {
    console.log('Grabbed user', user)
    bcrypt.compare( req.body.password, user.password, (err, result) => {
      console.log('Password compare result ' + result)
      if (result) {
        console.log('You logged in successfully!')
        req.session.visited = true;
        console.log(req.session.visited);
        req.session.user = user;
        console.log(req.session.user);
        res.render('index', {
          title: 'Findtrails: GPS routes sharing platform',
          user: req.session.user
        });
      }
      else {
        console.log('Login failed!')
        res.send('wrongpassword');
      }
    })
  }).catch(err => {
    res.render('log-in');
    console.log('Catch error!')
  });
});

router.get('/logout', (req,res) => {
  req.session.destroy( (err) => {
    console.log('Log Out: '+req.session);
    if (err) {
      console.log(err);
    } else {
      res.redirect('/');
    }
  });
});

// exporting router
module.exports = router

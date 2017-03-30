// requiring dependencies
const express = require('express')
const path = require('path')
const favicon = require('serve-favicon')
const logger = require('morgan')
const cookieParser = require('cookie-parser')
const bodyParser = require('body-parser')
const pug = require ('pug')
const session = require ('express-session')
const bcrypt = require('bcrypt-nodejs')
const nodemailer = require('nodemailer');

// requiring custom modules and routes
const db = require(__dirname + '/modules/database')
const search = require(__dirname +'/modules/search')
const index = require('./routes/index')
const register = require('./routes/register')
const authentication = require('./routes/authentication')
const upload = require('./routes/upload')
const showRoutes = require('./routes/show-routes')
const about = require('./routes/about')

// setting the app to express
const app = express()

// Activate the session app wide
app.use(session({
  secret: 'super secure',
  resave: false,
  saveUninitialized: false,
  cookie: { secure: false }
}))

// view engine setup
app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'pug')

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'))
app.use(bodyParser.urlencoded({ extended: false }))
app.use(cookieParser())
app.use(express.static(path.join(__dirname, 'public')))

// use routes
app.use('/', index)
app.use('/', register)
app.use('/', authentication)
app.use('/', upload)
app.use('/', showRoutes)
app.use('/', search)
app.use('/', about)

// catch 404 and forward to error handler
app.use( (req, res, next) => {
  const err = new Error('Not Found')
  err.status = 404;
  next(err);
});

// error handler
app.use( (err, req, res, next) => {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {}

  // render the error page
  res.status(err.status || 500)
  res.render('error')
});


// route to contact form?
app.get('/contact', (req, res) => {
  console.log('Contact established')
})

// mail function for contact form
app.post('/contact', (req, res) => {
  console.log('reg body contact form is: ', req.body);
  var mailOpts, smtpTrans;
  //Setup Nodemailer transport (Create an application-specific password to avoid problems).
  smtpTrans = nodemailer.createTransport('SMTP', {
      service: 'Gmail',
      auth: {
          user: "basbilijam@gmail.com",
          pass: "application-specific-password"
      }
  });

  mailOpts = {
      from: req.body.email + ' &lt;' + req.body.email + '&gt;', //grab form data from the request body object
      to: 'basbilijam@gmail.com',
      subject: 'Website contact form',
      text: req.body.message
  };
  smtpTrans.sendMail(mailOpts, (error, response) => {
    //Email not sent
    if (error) {
      console.log('Error is ', err)
      res.render('error')
    }
    //Yay!! Email sent
    else {
      console.log('Contact form succes!')
      res.render('index')
    }
  });
});

app.listen(3000, (req, res) => {
  console.log('Server running on port 3000!')
})

module.exports = app

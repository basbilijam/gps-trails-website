const express = require ('express')
const session = require ('express-session')
const bodyParser = require('body-parser')
const nodemailer = require('nodemailer');

const router = express.Router()

// route to contact form?
router.get('/contact', (req, res) => {
  console.log('Contact established')
})

// mail function for contact form
router.post('/contact', (req, res) => {
  console.log('Test mail')
  console.log('reg body contact form is: ', req.body);
  var mailOpts, smtpTrans;
  //Setup Nodemailer transport.
  smtpTrans = nodemailer.createTransport('smtps://basbilijam%40gmail.com:' + process.env.CONTACT_FORM_PASSWORD +'@smtp.gmail.com'
    );

  mailOpts = {
      from: req.body.email, //grab form data from the request body object
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

// exporting router
module.exports = router

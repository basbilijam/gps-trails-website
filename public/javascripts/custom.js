// thanks for submitting!

$(document).ready(function() {
  console.log('DOM LOADED')
  // thanks for uploading file message
  $('#register').submit(function(event) {
    // thanks for uploading file message
        $('#thanks').append("<p>Thanks for signing up!</p>"+
                            "<p>You can now start sharing and searching for GPX files</p>")
      });

  // new search
  $('#new-search').click(function(event) {
    $('html, body').animate({
      scrollTop: $("#index-errors").offset().top
    }, 500);
  })

  // log in messages
  $('#log-in').submit(function(event) {
    console.log('Clicked yay')
    event.preventDefault()

    $( "#login-failed" ).empty();

    // log in successfull or wrong password message
    $.post('/log-in', { username: $('#username').val(),password: $('#password').val() }, function (data) {
      console.log(data)
      if (!data.login) {
        $('#login-result').append("<p>Wrong password or username, please try again!</p>")
      }
      else {
        window.location = '/' ;
        $('#login-result').append("<p>Login successful!</p>")
      }
    });
  });
})

// thanks for submitting!

$(document).ready(function() {
  // thanks for uploading file message
  $('#upload').submit(function(event) {
    $('#thanks').append("<p>Thanks for sharing your file!</p>")
  });
  $('#log-in').submit(function(event) {
    // working on wrong password message
    $.get('/log-in', function (data) {
      if (data.length = 0)
      $('#login-failed').append("<p>Wrong password or username combination.</p>")
    });
  });
});

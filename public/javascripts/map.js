$(document).ready(function() {

  var routeId = []; // from database
  var userCords = [];
  // var infowindow = null;

  //Start geolocation

  if (navigator.geolocation) {

    function error(err) {
      console.warn('ERROR(' + err.code + '): ' + err.message);
    }

    function success(pos){
      userCords = pos.coords;

      return userCords;
    }

    // Get the user's current position
    navigator.geolocation.getCurrentPosition(success, error);
    //console.log(pos.latitude + " " + pos.longitude);
  } else {
    alert('Geolocation is not supported in your browser');
  }

  //End Geo location

  // set options and styles for map
  var mapOptions = {
    zoom: 9,
    styles: [{"featureType":"administrative","elementType":"labels.text.fill","stylers":[{"color":"#444444"}]},{"featureType":"landscape","elementType":"all","stylers":[{"color":"#f2f2f2"}]},{"featureType":"landscape","elementType":"geometry.fill","stylers":[{"saturation":"50"},{"color":"#c5c16d"},{"lightness":"65"},{"gamma":"1.87"}]},{"featureType":"landscape.natural","elementType":"labels.text.fill","stylers":[{"saturation":"15"}]},{"featureType":"landscape.natural.landcover","elementType":"geometry.fill","stylers":[{"saturation":"50"},{"visibility":"on"},{"color":"#c5c16d"}]},{"featureType":"landscape.natural.landcover","elementType":"geometry.stroke","stylers":[{"hue":"#ffcb00"}]},{"featureType":"landscape.natural.terrain","elementType":"geometry.fill","stylers":[{"visibility":"on"},{"color":"#aba867"},{"saturation":"-56"},{"lightness":"42"},{"gamma":"1.48"}]},{"featureType":"poi","elementType":"all","stylers":[{"visibility":"off"}]},{"featureType":"road","elementType":"all","stylers":[{"saturation":-100},{"lightness":45}]},{"featureType":"road.highway","elementType":"all","stylers":[{"visibility":"simplified"}]},{"featureType":"road.highway","elementType":"geometry.stroke","stylers":[{"color":"#aba867"},{"visibility":"on"},{"weight":"0.20"}]},{"featureType":"road.highway","elementType":"labels","stylers":[{"visibility":"on"},{"saturation":"2"}]},{"featureType":"road.arterial","elementType":"labels.icon","stylers":[{"visibility":"off"}]},{"featureType":"road.local","elementType":"geometry.stroke","stylers":[{"saturation":"2"},{"visibility":"on"},{"color":"#777777"}]},{"featureType":"transit","elementType":"all","stylers":[{"visibility":"off"}]},{"featureType":"water","elementType":"all","stylers":[{"color":"#c2c3a5"},{"visibility":"on"}]},{"featureType":"water","elementType":"geometry.fill","stylers":[{"visibility":"on"},{"color":"#a2def8"}]},{"featureType":"water","elementType":"labels.text","stylers":[{"visibility":"on"},{"color":"#555454"},{"weight":"0.01"}]}],
    center: new google.maps.LatLng({lat: 52.3772189, lng: 4.848612999999999}),
    panControl: false,
    panControlOptions: {
      position: google.maps.ControlPosition.BOTTOM_LEFT
    },
    zoomControl: true,
    zoomControlOptions: {
      style: google.maps.ZoomControlStyle.LARGE,
      position: google.maps.ControlPosition.RIGHT_CENTER
    },
    scaleControl: false

  };

  //Adding infowindow option
  var infowindow = new google.maps.InfoWindow({
    maxWidth: 300
  });

  //Fire up Google maps and place inside the map-canvas div
  map = new google.maps.Map(document.getElementById('map-canvas'), mapOptions);

  // Place marker
  let allMarkers = [];
  function placeMarker (placelat, placelng, whichmap, infoWindowContent) {
    var marker = new google.maps.Marker({
        position: {
          lat: placelat,
          lng: placelng
        },
        map: whichmap,
      });
      google.maps.event.addListener(marker, 'click', function(){
        infowindow.setContent( infoWindowContent );
        infowindow.open(map, marker);
        const iwOuter = $('.gm-style-iw');
        const iwBackground = iwOuter.prev();
        iwBackground.children(':nth-child(2)').css({'display' : 'none'});

        // Removes white background DIV
        iwBackground.children(':nth-child(4)').css({'display' : 'none'});

        // Moves the infowindow 115px to the right.
        iwOuter.parent().parent().css({left: '115px'});

        // Moves the shadow of the arrow 76px to the left margin.
        iwBackground.children(':nth-child(1)').attr('style', function(i,s){ return s + 'left: 76px !important;'});

        // Moves the arrow 76px to the left margin.
        iwBackground.children(':nth-child(3)').attr('style', function(i,s){ return s + 'left: 76px !important;'});

        // Changes the desired tail shadow color.
        iwBackground.children(':nth-child(3)').find('div').children().css({'box-shadow': 'rgba(72, 181, 233, 0.6) 0px 1px 6px', 'z-index' : '1'});

        // Reference to the div that groups the close button elements.
        const iwCloseBtn = iwOuter.next();

        // Apply the desired effect to the close button
        //iwCloseBtn.css({opacity: '1', right: '38px', top: '3px', border: '7px solid #48b5e9', 'border-radius': '13px', 'box-shadow': '0 0 5px #3990B9'});

        // If the content of infowindow not exceed the set maximum height, then the gradient is removed.
        if($('.iw-content').height() < 140){
          $('.iw-bottom-gradient').css({display: 'none'});
        }
        iwCloseBtn.mouseout(function(){
          $(this).css({opacity: '1'});
        });
      });
      return marker
    }

  // function to clear all markers again
  function deleteMarkers() {
        // clearMarkers();
        for (var i = 0; i < allMarkers.length; i++) {
          allMarkers[i].setMap(null)
        }
        allMarkers = []
      }

  $('#searchLocation').submit(function(event) { // bind function to submit event of form

    // delete possible markers from previous query
    deleteMarkers()

    // delete possible text from previous unsuccessfull query
    $( '#notfound' ).empty();

    // prevent default post of searchresult to make AJAX possible
    event.preventDefault()

    // scroll to map
    // $('html, body').animate({
    //         scrollTop: $("#map-canvas").offset().top
    //     }, 500);

    $.post( "/search", { search: $('#search').val() }, function( data ) {
      console.log(data)

      // if there are gpx routes within the area of search, use data from backend to place markers on map
      if (data.length > 0) {

        // scroll to map
        $('html, body').animate({
                scrollTop: $("#map-canvas").offset().top
            }, 500);

        for (var i = 0; i < data.length; i++) {

          // placing markers and setting content for infowindow
          var newMarker = placeMarker( Number(data[i].lat), Number(data[i].lng), map,
          "<div id='iw-container'>"+
            "<div class='iw-content'>"+
              "<div class='iw-title'>"+ data[i].name +"</div>" +
              "<div class='iw-subtitle'>Location: "+data[i].location+"</div>"+
              "<div class='iw-subtitle'>Level: "+data[i].level+"</div>"+
              "<div class='iw-subtitle'>Length: "+data[i].length+"</div"+
              "<div><p>Description: "+data[i].description+"</p>"+
            "</div>"+
            "<div class='iw-subtitle'><a href='/uploads/"+data[i].upload+"' download>Download file</a></div>")

          // fill temp array with markers from search query
          allMarkers.push(newMarker)

          // centre map to location of searchquery
          map.setCenter(new google.maps.LatLng(data[i].lat,data[i].lng));

        }
      } else {
        // if there are no gpx routes nearby, send message
        $('#notfound').append("<p>No results found at that location!</p>")
      }
    })
  });

  return false; // important: prevent the form from submitting
});

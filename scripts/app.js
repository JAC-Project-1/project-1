
    

$(document).ready(function () {
  // array
  var grapes = ["Riesling", "Chardonnay", "Pinot Grigio", "Sauvignon Blanc", "Pinot Noir", "Zinfandel", "Syrah", "Cabernet Sauvignon"];

  //displays the grape buttons

  function displayButtons() {
    $("#buttonList").empty();
    for (var i = 0; i < grapes.length; i++) {
      var wineButton = $("<button>");
      wineButton.addClass("wineGrapes");
      wineButton.addClass("btn btn-primary")
      wineButton.attr("data-name", grapes[i]);
      wineButton.text(grapes[i]);
      $("#buttonList").append(wineButton);
    }
  }

  displayButtons();

  // display results and have user filter 


  var wineColor = "";
  var country = "";



  $(".wineColor").on("click", function () {
    // var wine = $(this).attr("data-name");
    wineColor = $(this).attr("data-name");
    console.log(wineColor);
    runAPI();
  })

  $(document).on("click", ".dropdown-item", function (e) {
    e.preventDefault();
    country = $(this).attr("data-name");
    console.log(country);
    // runAPI();
  });


  function runAPI() {
    var queryURL = "https://api.globalwinescore.com/globalwinescores/latest/?color=" + wineColor + "&limit=5";
    var proxy = "https://cors-anywhere.herokuapp.com/"

    $.ajax({
        url: proxy + queryURL,
        method: "GET",
        dataType: 'json',
        beforeSend: function (xhr) {
          xhr.setRequestHeader('Authorization', 'Token 52e6dfd158b34f0d6106e1afc0e639c438a2a387');
        },
      })

      .then(function (response) {
        console.log(response);
        var results = response.results
        jQuery('<div/>', {
          id: 'myMap'
      }).appendTo($('.mapHere'));
        for (var i = 0; i < results.length; i++) {
          // pull wine score and country
          // var wineDiv = $("<div>");
          var wineRating = (results[i].score);
          var wineCountry = (results[i].country);
          var wineName = (results[i].wine);
          var appellation = (results[i].appellation);

        //  var $newdiv1 = $( "<div id='radioBtn'></div>" );
          $radio = $('<input />', {
            id: 'rad' + i,
       
            value: test(appellation,wineCountry),
            type: "radio",
            class: 'radioBtn'
            //onclick: selectMap()
        });
        // $radio.click(function () {
        //   alert("Test");
        // console.log(($this).attr('name'))
        // });

 var rad = $('.radioBtn');
  var prev = null;


  for (var i = 0; i < rad.length; i++) {
      rad[i].addEventListener('change', function() {
          (prev) ? console.log(prev.value): null;
          if (this !== prev) {
              prev = this; //searchPlaces = this;
          }
          console.log(this.value)
          
          var latitude="";
          var longitude="";
         var searchPlaces ="";
          searchPlaces=this.value;
       
          fetch('https://geocoder.ls.hereapi.com/6.2/geocode.json?apiKey=Tdk4bDsH0c_93qop53EKHV1F8NPY9NtESC1sYjTEtG8&searchtext='+searchPlaces)
          .then(
          function(response) {
            if (response.status !== 200) {
              console.log('Looks like there was a problem. Status Code: ' +
                response.status);
              return;
            }
          
            // Examine the text in the response
            response.json().then(function(data) {
             // console.log(data);
              //console.log(data.Response.View["0"].Result["0"].Location.DisplayPosition);
              latitude= data.Response.View["0"].Result["0"].Location.DisplayPosition.Latitude;
             
              longitude= data.Response.View["0"].Result["0"].Location.DisplayPosition.Longitude; 
              console.log (latitude, longitude);
              if (longitude !== null && latitude !== null) {var map = new Microsoft.Maps.Map('#myMap', {
                credentials: 'AuA74d7xZ2653coU0pUYku6IsU67j_wncOmTg__SX0iR1WuqDZrL8VHHr2DFTMA3',
                center: new Microsoft.Maps.Location(latitude, longitude),
                mapTypeId: Microsoft.Maps.MapTypeId.aerial,
                zoom: 10
                });
                var center = map.getCenter();
                    //Create custom Pushpin
                    var pin = new Microsoft.Maps.Pushpin(center, {
                        title: searchPlaces,
                        subTitle: 'Wine Country',
                        text: '1'
                    });
                
                    //Add the pushpin to the map
                    map.entities.push(pin);}
              
            });
          }
          
          )
          .catch(function(err) {
          console.log('Fetch Error :-S', err);
          });

      });
  }


          // Create the new row
          var newRow = $("<tr>").append(
            // $newdiv1.append($radio),
        $radio,
            $("<td>").text(wineName),
            $("<td>").text(wineRating),
            $("<td>").text(wineCountry),
            $("<td>").text(appellation)
           
          );

          // Append the new row to the table
          $("#wine-table > tbody").append(newRow);

          };
        })
      }
    


    
  // }).catch(function (error) {
  //   console.log(error);

  


      


}) // end function

function test(str1, str2) {

  var res = str1 + ' ' + str2;

  return res;

}


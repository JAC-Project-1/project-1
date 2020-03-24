const searchPlaces = [];
const lat = [];
const long = [];
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

        for (var i = 0; i < results.length; i++) {
          // pull wine score and country
          // var wineDiv = $("<div>");
          var wineRating = (results[i].score);
          var wineCountry = (results[i].country);
          var wineName = (results[i].wine);
          var appellation = (results[i].appellation);

          // console.log(results[i].country);
          // console.log(wineRating);
          // console.log(wineCountry);

          // wineDiv.append(wineName);
          // wineDiv.append(wineRating);
          // wineDiv.append(wineCountry);
          // wineDiv.appendTo(document.body);

          // Create the new row
          var newRow = $("<tr>").append(
            $("<td>").text(wineName),
            $("<td>").text(wineRating),
            $("<td>").text(wineCountry),
            $("<td>").text(appellation)
          );

          // Append the new row to the table
          $("#wine-table > tbody").append(newRow);
          searchPlaces.push(test(appellation, wineCountry))
          var latitude = [];
          var longitude = [];

          fetch('https://geocoder.ls.hereapi.com/6.2/geocode.json?apiKey=Tdk4bDsH0c_93qop53EKHV1F8NPY9NtESC1sYjTEtG8&searchtext=' + searchPlaces[i])
          .then(
            function (response) {
              if (response.status !== 200) {
                console.log('Looks like there was a problem. Status Code: ' +
                  response.status);
                return;
              }

              // Examine the text in the response
              response.json().then(function (data) {
                // console.log(data);
                //console.log(data.Response.View["0"].Result["0"].Location.DisplayPosition);
                latitude = data.Response.View["0"].Result["0"].Location.DisplayPosition.Latitude;

                longitude = data.Response.View["0"].Result["0"].Location.DisplayPosition.Longitude;
                console.log(latitude, longitude);
                lat.push(latitude);
                long.push(longitude);
              });
            }
          )
          .catch(function (err) {
            console.log('Fetch Error :-S', err);
          });
          
          for(var i=0, j=0;i<lat.length,j<long.length;i++,j++){


            function GetMap() {
              var map = new Microsoft.Maps.Map('#myMap', {
                credentials: 'AuA74d7xZ2653coU0pUYku6IsU67j_wncOmTg__SX0iR1WuqDZrL8VHHr2DFTMA3',
                center: new Microsoft.Maps.Location(latitude, longitude),
                mapTypeId: Microsoft.Maps.MapTypeId.aerial,
                zoom: 10
              })


              var center = map.getCenter(lat[i], long[j]);

            // var pin = new Microsoft.Maps.Pushpin(new Microsoft.Maps.Location(lat[i], long[j]));
            // map.entities.push(pin);
            var pin = new Microsoft.Maps.Pushpin(center, {
              title: searchPlaces[i],
              subTitle: 'Wine Country',
              text: '1'
            });

            //Add the pushpin to the map
            map.entities.push(pin);

            }

        }




          
    
          };
        })
      }
    


    
  // }).catch(function (error) {
  //   console.log(error);

}) // end function
function test(str1, str2) {

  var res = str2 + ',' + str1;

  return res;

}

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
      beforeSend: function (xhr) { xhr.setRequestHeader('Authorization', 'Token 52e6dfd158b34f0d6106e1afc0e639c438a2a387'); },
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
        };
  });


  }

   
// }).catch(function (error) {
//   console.log(error);

}) // end function




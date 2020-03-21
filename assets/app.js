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


$(".wineColor").on("click", function() {
    // var wine = $(this).attr("data-name");
    var wineColor = $(this).attr("data-name");
    console.log(wineColor);
    var country = 

    var queryURL = "https://api.globalwinescore.com/globalwinescores/latest/?color=red&limit=5";
    var proxy = "https://cors-anywhere.herokuapp.com/"

    $.ajax({
      url: proxy + queryURL,
      method: "GET",
      dataType: 'json',
      beforeSend: function(xhr){xhr.setRequestHeader('Authorization', 'Token 52e6dfd158b34f0d6106e1afc0e639c438a2a387');},
    })


      .then(function(response) {
        console.log (response);
        var results = response.results

        // for (var i = 0; i < results.length; i++) {
        //   var gifDiv = $("<div>");

        //   var rating = results[i].rating;

        //   var p = $("<p>").text("Rating: " + rating);

        //   var personImage = $("<img>");
        //   personImage.attr("src", results[i].images.fixed_height.url);

        //   gifDiv.prepend(p);
        //   gifDiv.prepend(personImage);

        //   $("#gifs-appear-here").prepend(gifDiv);
        
      }).catch(function(error){
          console.log(error);
      })
  });
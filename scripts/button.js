
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
$(document).ready(function ($) {

  var $search = $('#search');
  var $results = $('#results');



  $('.wineGrapes').click(function () {


    var searchQuery = $(this).attr("data-name");

    $.ajax({
      url: 'https://en.wikipedia.org/w/api.php',
      dataType: 'jsonp',
      data: {
        action: 'query',
        format: 'json',
        prop: 'extracts',
        //exchars: '20000',
        exlimit: 'max',
        explaintext: '',
        exintro: '',
        pilimit: 'max',
        rawcontinue: '',
        generator: 'search',
        gsrsearch: searchQuery,
        gsrnamespace: '0',
        gsrlimit: '1'
      },
      success: function (data) {
        $results.empty();
        var pages = data.query.pages;
        console.log(pages);
        for (var page in pages) {
          $results.append(

            '<article id="result">' +
            '<h5 class="card-title" id="wineTitle">' + pages[page].title + '</h5>' +
            ' <p class="card-text">' + pages[page].extract + '</p>' +
            '</article>' +
            '<a href="https://en.wikipedia.org/wiki/' + pages[page].title + '" target="_blank" class="btn btn-primary">' + 'Find out more on wiki!' +
            '</a>'
          );
        }
      }
    });
  });
});




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
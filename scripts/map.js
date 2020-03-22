
        var latitude="";
        var longitude="";
        var searchText="Oakville california"
        fetch('https://geocoder.ls.hereapi.com/6.2/geocode.json?apiKey=Tdk4bDsH0c_93qop53EKHV1F8NPY9NtESC1sYjTEtG8&searchtext='+searchText)
.then(
function(response) {
  if (response.status !== 200) {
    console.log('Looks like there was a problem. Status Code: ' +
      response.status);
    return;
  }

  // Examine the text in the response
  response.json().then(function(data) {
    console.log(data);
    console.log(data.Response.View["0"].Result["0"].Location.DisplayPosition);
    latitude= data.Response.View["0"].Result["0"].Location.DisplayPosition.Latitude;
    longitude= data.Response.View["0"].Result["0"].Location.DisplayPosition.Longitude;
  });
}
)
.catch(function(err) {
console.log('Fetch Error :-S', err);
});



function GetMap()
        {
            var map = new Microsoft.Maps.Map('#myMap', {
credentials: 'AuA74d7xZ2653coU0pUYku6IsU67j_wncOmTg__SX0iR1WuqDZrL8VHHr2DFTMA3',
center: new Microsoft.Maps.Location(latitude, longitude),
mapTypeId: Microsoft.Maps.MapTypeId.aerial,
zoom: 10
});
var center = map.getCenter();
    //Create custom Pushpin
    var pin = new Microsoft.Maps.Pushpin(center, {
        title: searchText,
        subTitle: 'Wine Country',
        text: '1'
    });

    //Add the pushpin to the map
    map.entities.push(pin);
        }

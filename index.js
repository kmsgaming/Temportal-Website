$.getJSON('data/places.json', function(data) {
  let places = data.places;
  document.getElementById("hosting").innerHTML = document.getElementById("hosting").innerHTML.replace("!NUM1", places.length);
  
  for (let i = places.length-1; i > places.length-7; i--) {
	document.getElementById("places").innerHTML +=
	  "<a title=\"" + places[i].name + "\" href=\"/place?id=" + parseInt(i+1) + "\"><img class='thumbnailIcon' src='" + places[i].thumbnail + "' alt='thumbnail'></a><br>";
  }
});

$.getJSON('data/godoblocks.json', function(data) {
  let places = data.places;
  document.getElementById("hosting").innerHTML = document.getElementById("hosting").innerHTML.replace("!NUM2", places.length);
});
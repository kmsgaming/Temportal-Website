window.addEventListener('load', function () {	
  let u = window.location;
  if (u.toString().includes("?id=")){
	let id = window.location.search.substring(1);
	id = parseInt(id.replace("id=", ""))-1;
	if (id < 0) { window.location.href = "/"; }
	
	$.getJSON('data/godoblocks.json', function(data) {
	  let place = data.places[id];
	  if (place == undefined){
	    document.getElementById("placeError").style = "";
	    document.getElementById("placeContents").style = "display:none;";
	    return;
	  }
	  document.title = place.name + " - Temportal";
	  document.getElementById("author").innerHTML = place.author;
	  document.getElementById("name").innerHTML = place.name;
	  document.getElementById("thumbnail").src = place.thumbnail;
	  document.getElementById("description").innerHTML = place.description;
	  document.getElementById("download").href = place.data;
	  document.getElementById("download").download = place.name + ".gdbl";
	  
	  const dateFormat = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
	  let released = new Date(place.released);
	  document.getElementById("released").innerHTML = released.toLocaleDateString('en-us', dateFormat);
	  document.getElementById("client").innerHTML = place.client;
	  document.getElementById("tag").innerHTML = place.tag;
	}
	).fail(function(){
	  document.getElementById("author").innerHTML = "Error!";
	});
	
  } else { window.location.href = "/"; }
});
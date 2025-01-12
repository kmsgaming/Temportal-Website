function GetParameterValues(param) {
  var url = window.location.href.slice(window.location.href.indexOf('?') + 1).split('&');
  for (var i = 0; i < url.length; i++) {
    var urlparam = url[i].split('=');
    if (urlparam[0] == param) {
      return urlparam[1];
    }
  }
}

const CATEGORY_PLACES = 0
const CATEGORY_GODOBLOCKS = 1

var sort = "addasc";
var search = "";
var tag = "";
var page = 1;
var category = CATEGORY_PLACES;
var categoryString = "places"
var categoryStringItemPage = "place"

if (typeof GetParameterValues("category") != "undefined"){
  category = GetParameterValues("category");
}
if (category == CATEGORY_PLACES) {
  categoryString = "places"
  categoryStringItemPage = "place"
} else if (category == CATEGORY_GODOBLOCKS) {
  categoryString = "godoblocks"
  categoryStringItemPage = "minigame"
}

$.getJSON('data/' + categoryString + '.json', function(data) {
  let places = data.places;
  
  document.getElementById("category").value = category;
  updateTags();
  
  if (typeof GetParameterValues("page") != "undefined"){
    page = GetParameterValues("page");
  }
  if (typeof GetParameterValues("sort") != "undefined"){
    sort = GetParameterValues("sort");
	document.getElementById("sort").value = sort
  }
  if (typeof GetParameterValues("search") != "undefined"){
    search = decodeURIComponent(GetParameterValues("search")).replace("+", " ");
	document.getElementById("search").value = search
  }
  if (typeof GetParameterValues("tag") != "undefined"){
    tag = decodeURIComponent(GetParameterValues("tag")).replace("+", " ");
	if (category==CATEGORY_PLACES){ document.getElementById("tag_places").value = tag };
	if (category==CATEGORY_GODOBLOCKS){ document.getElementById("tag_godoblocks").value = tag };
  }
  
  if (sort == "addasc") {
	places.reverse();
  }
  if (sort == "new") {
	places.sort((a, b) => new Date(b.released) - new Date(a.released));
  }
  if (sort == "old") {
	places.sort((a, b) => new Date(a.released) - new Date(b.released));
  }
  if (tag != "") {
	  places = places.filter(word => word.tag.toLowerCase().indexOf(tag.toLowerCase()) > -1);
  }
  
  places = places.filter(word => word.name.toLowerCase().indexOf(search.toLowerCase()) > -1);
  
  if (places.length == 0) {
    document.getElementById("browseTable").style = "display:none;"
	document.getElementById("notfound").style = "display:block;"
  }
  
  const dateFormat = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
  
  for (let i = page*10-10; i < page*10; i++) {
	if (i >= places.length) { break; }
	
	let released = new Date(places[i].released)
	document.getElementById("places").innerHTML += 
	  "<tr><td><a href='/" + categoryStringItemPage + "?id=" + places[i].id + "'><img class='thumbnailIcon' src='" + places[i].thumbnail + "' alt='thumbnail'></a></td>" +
	  "<td><a href='/" + categoryStringItemPage + "?id=" + places[i].id + "'>" + places[i].name + "</a></td>" +
	  "<td>" + places[i].author + "</td>" +
	  "<td>" + released.toLocaleDateString('en-us', dateFormat) + "</td></tr>";
  }
  
  document.getElementById("places").innerHTML += "<tr width=100% style='text-align:center;'><td colspan=4 id='pages'></td></tr>"
  for (let i = 1; i < Math.ceil(places.length/10)+1; i++)
  {
	if (page != i) {
	  document.getElementById("pages").innerHTML += 
	    "<a href='?page=" + i + "&search=" + search + "&sort=" + sort + "&tag=" + tag + "&category=" + category + "'>" + i + "</a>&nbsp;";
	} else {
	  document.getElementById("pages").innerHTML += i + "&nbsp;";
	}
  }
}
).fail(function(){
  document.getElementById("places").innerHTML = "Oops! Something has gone wrong!"
});

function updateTags() {
	let newCategory = document.getElementById("category").value;
	if (newCategory == 0){
		document.getElementById("tag_places").disabled = false;
		document.getElementById("tag_godoblocks").disabled = true;
	} else if (newCategory == 1) {
		document.getElementById("tag_godoblocks").disabled = false;
		document.getElementById("tag_places").disabled = true;
	}
}
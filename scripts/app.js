// define globals
var weekly_quakes_endpoint = "http://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/4.5_week.geojson";
var $quakesList;
var map;
var template;

$(document).on("ready", function() {
	var source = $("#quake-template").html();
	var template = Handlebars.compile(source);

	$.get(weekly_quakes_endpoint, function(data) {
		console.log(data);
		var quakeResults = data.features;
		console.log(quakeResults);

		var trackHtml = template({quakes: quakeResults});
		$("#info").append(trackHtml);

		quakeResults.forEach(function(currQuake) {
			var lat = currQuake.geometry.coordinates[0];
			var long = currQuake.geometry.coordinates[1];
			var latLong = {lat: lat, lng: long};
			var marker = new google.maps.Marker({
				position: latLong,
				map: map,
				title: currQuake.properties.title,
			});
		});
	});
});
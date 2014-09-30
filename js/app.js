var Foursquare = {

	searchButton: $('#search'),
	textField: $('#textField'),
	locateField: $('#locateField'),

	base: "https://api.foursquare.com/v2/venues/explore?callback=?",

	params: {
		
		near: "",
		venuePhotos: 1,
		client_id: "MTA2P5Q0RYJY5ZJPNTCBMGGLQOIFPPJ5TSPVGO4P5K1GTEZS",
		client_secret: "WCHQY2TKTSNLBU5FXYPDEQQL3I0B4BGRGET32KRE10ZPF3QU",
		v: "20140806",
		radius:50000,
		m: "foursquare",
		query:""
		
	},

	initialize: function () {
		Foursquare.initEvents();
	},


	initEvents: function() {
		Foursquare.searchButton.click(Foursquare.validate);
		$('.tabs a').click(function(event){
			event.preventDefault();
			var tabs = $(this).attr('href');
			Foursquare.params.query = tabs;
			Foursquare.FetchData();

		})
	},

	FetchData: function(reply) {
		$('#feedback').html('<img src="img/preloader.gif">')
		Foursquare.params.near = Foursquare.locateField.val() || 'lagos';
		$.getJSON( Foursquare.base, Foursquare.params, function(venues) {
				Foursquare.loadItem(venues, '#feedback');
			});
	},

	loadItem: function(response, container) {

		var fields = response.response.groups[0].items;
			
		$('#feedback' + container).text("");
		var post_div = ""
		$.each(fields, function (i) {
			var reasons= fields[i].reasons;
			var venue = fields[i].venue;
			var categories = fields[i].venue.categories;
			var stats = fields[i].venue.stats;
			var pictures = venue.photos.groups[0].items[0];
					 	post_div += '<div class="post">'  

					 		post_div += '<div id="descriptions">'
								post_div +=		"<p>" + venue.name + "</p>" 
								post_div += 	"<p>" + venue.location.formattedAddress + "</p>" 
								post_div += 	"<p>" + venue.categories[0].name + "</p>" 
								post_div += 	"<p>" + "Visited:  " + venue.stats.checkinsCount + "</p>"
							post_div += '</div>' 

							post_div += '<div id= "images">' 
								post_div+=		"<img src='" + pictures.prefix +"200x200" +pictures.suffix + "' />"
							post_div += '</div>'

						post_div+='</div>';

			$('#feedback' + container).html(post_div);
		})	
	},

	validate: function (event){
		event.preventDefault();
		Foursquare.params.query =Foursquare.textField.val();
		if (Foursquare.textField.val().length < 2 ) {
			$('#error').text("Your search isn't decriptive enough")
		} else {
			Foursquare.FetchData();
			$('#error').text("")
		}
	}
}

$(document).ready(Foursquare.initialize);
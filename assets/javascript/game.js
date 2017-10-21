$(document).ready(function () {

	var animes = ["Dragonball Z", "Naruto", "Bleach", "Himouto", "One Piece", "One Punch Man"];
	var gifPlaying = false;
      function displayGIF() {
      	$(".giphy-results").empty();
	      var anime = $(this).attr("data-name");
	      var apiKey = "IOiw0rmLSNerL5w2aeCTpCnGd8BQwFyh";
	      var limit = 10;
	      var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + anime + "&api_key=" + apiKey + "&limit=" + limit;

	        // Creates AJAX call for the specific movie button being clicked
	      $.ajax({
	         url: queryURL, 
	         method: "GET"
	      }).done(function(response) {
	      	for (var i = 0; i < response.data.length; i++) {
	      		//created a dif to wrap the Rating and Giphy
	      		var wrap = $("<div>");
	      		wrap.addClass("results");
	      		var rating = $("<div>");
	      		rating.addClass("rating");
	      		rating.html("<h3>Rating: " + response.data[i].rating + "</h3>");
	      		wrap.append(rating);
	      		var giphy = $("<div>");
	      		giphy.addClass("giphy");
	      		//
	      		giphy.attr("gif", response.data[i].fixed_height.url);
	      		giphy.html("<img src=" + response.data[i].images.fixed_height_still.url + ">");
	      		wrap.append(giphy);
	      		$(".giphy-results").append(wrap);
	      	};
	      });
      };

      function playGIF() {
      	if(gifPlaying) {
      		$(".giphy").html("<img src=" + giphy.attr("gif") + ">");
      	} else {

      	}
      }; 

      	// Function for displaying anime button
      function createButtons() {
        	$(".button-search").empty();
        	for (var i = 0; i < animes.length; i++) {
         	var newAnime = $("<button>");
         	newAnime.addClass("animebtn");
         	newAnime.attr("data-name", animes[i]);
         	newAnime.text(animes[i]);
         	$(".button-search").append(newAnime);
        }
      };

      	// Function that takes input and pushes input into Anime Button Array to display at the top
      $("#add-anime").on("click", function(event) {
      	event.preventDefault();
      	var anime = $("#anime-input").val().trim();
      	animes.push(anime);
      	createButtons();
      });

      $(document).on("click", ".animebtn", displayGIF);

      $(document).on("click", ".giphy", playGIF);

      createButtons();

});
$(document).ready(function () {

	var animes = ["Dragonball Z", "Naruto", "Bleach", "Himouto", "One Piece", "One Punch Man", "Full Metal Alchemist", "Pokemon", "Digimon", "Death Note", "RBWY", "Sword Art Online", "Attack on Titan"];
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
	      		var giphy = $("<img>");
	      		giphy.addClass("giphy");
	      		giphy.attr("state", "still");
               giphy.attr("src", response.data[i].images.fixed_height_still.url);
               giphy.attr("animate", response.data[i].images.fixed_height_downsampled.url);
               giphy.attr("still", response.data[i].images.fixed_height_still.url);
	      		wrap.append(giphy);
	      		$(".giphy-results").append(wrap);
	      	};
	      });
      };

      function playGIF() {
         var state = $(this).attr("state");
         var animate = $(this).attr("animate");
         var still = $(this).attr("still");

         if (state === "still") {
            $(this).attr("src", animate);
            $(this).attr("state", "animate");
         } else {
            $(this).attr("src", still);
            $(this).attr("state", "still");
         };
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
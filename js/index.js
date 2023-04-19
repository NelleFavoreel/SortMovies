"use strict";

import Movie from "./Movie.js";

const app = {
	init: function () {
		this.getData();
		console.log("hello world");
	},
	getData() {
		fetch("https://imdb-api.com/en/API/Top250Movies/k_3blwlx4a")
			.then((movieList) => movieList.json())
			.then(function (response) {
				response.items.forEach(function (movieInfo) {
					const movie = new Movie(movieInfo.crew, movieInfo.imDbRating, movieInfo.image, movieInfo.rank, movieInfo.title, movieInfo.year);
					console.log(movie);
				});
			});
	},
};
var requestOptions = {
	method: "GET",
	redirect: "follow",
};

app.init();

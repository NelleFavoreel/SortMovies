"use strict";

import Movie from "./Movie.js";

const app = {
	movies: [],
	userInput: {
		selectedSort: "title",
		selectedAll: "all",
	},
	applyAll() {
		this.movies = app.movies;
		this.sortMovies();
		this.filterMovies();
		this.renderMovies();
	},
	init: function () {
		this.getData();
		const sortRadios = document.getElementsByName("sortBy");
		sortRadios.forEach(function (radio) {
			radio.addEventListener("change", function (event) {
				app.userInput.selectedSort = this.value;
				app.applyAll();
			});
		});
		const filterRadios = document.getElementsByName("filter");
		filterRadios.forEach(function (radio) {
			radio.addEventListener("change", function (event) {
				app.userInput.selectedAll = this.value;
				app.applyAll();
			});
		});
	},
	getData() {
		fetch("https://imdb-api.com/en/API/Top250Movies/k_3blwlx4a")
			.then((movieList) => movieList.json())
			.then(function (response) {
				response.items.forEach(function (movieInfo) {
					const movie = new Movie(movieInfo.crew, movieInfo.imDbRating, movieInfo.image, movieInfo.rank, movieInfo.title, movieInfo.year);
					app.movies.push(movie);
					document.querySelector("#content_section").insertAdjacentHTML("beforeend", movie.htmlString);
				});
			});
		console.log(app.userInput.selectedSort);
	},
	filterMovies() {
		let originalMovies = [...this.movies]; // Make a copy of the original movies array
		let filteredList = originalMovies.filter(function (movie) {
			let year = movie.year;
			let filter = app.userInput.selectedAll;
			if (filter === "all") {
				return true;
			} else if (filter === "year-2000") {
				return year < 2000;
			} else if (filter === "year+2000") {
				return year >= 2000;
			}
		});
		console.log("filtered list", filteredList);
		this.movies = filteredList;
	},
	sortMovies() {
		app.movies.sort(function (a, b) {
			let sortBy = app.userInput.selectedSort;

			if (sortBy === "rank" || sortBy === "year") {
				let numA = parseInt(a[sortBy]);
				let numB = parseInt(b[sortBy]);
				return numA - numB;
			} else if (sortBy === "title") {
				if (a[sortBy] < b[sortBy]) {
					return -1;
				} else if (a[sortBy] > b[sortBy]) {
					return 1;
				}
			} else {
				return 0;
			}
		});
	},

	renderMovies() {
		document.querySelector("#content_section").innerHTML = "";
		app.movies.forEach(function (movie) {
			document.querySelector("#content_section").insertAdjacentHTML("beforeend", movie.htmlString);
		});
	},
};
var requestOptions = {
	method: "GET",
	redirect: "follow",
};

app.init();

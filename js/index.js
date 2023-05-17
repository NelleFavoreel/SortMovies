"use strict";

import Movie from "./Movie.js";

const app = {
	movies: [],
	filteredMovies: [],
	userInput: {
		selectedSort: "title",
		selectedAll: "all",
	},
	applyAll() {
		this.movies = app.movies;
		this.filterMovies();
		this.sortMovies();

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
				app.applyAll();
			})
			.catch(function (error) {
				console.log("Error:", error);
			});
		console.log(app.userInput.selectedSort);
	},
	filterMovies() {
		app.filteredMovies = app.movies;
		//console.log(app.filteredMovies);
		//let filteredMovies = app.filteredMovies;
		let filteredList = app.filteredMovies.filter(function (movie) {
			let year = movie.year;
			let filter = app.userInput.selectedAll;
			if (filter == "all") {
				return true;
			}
			if (filter == "year-2000") {
				return year < 2000;
			}
			if (filter == "year+2000") {
				return year >= 2000;
			}
			console.log(filteredList);
		});
		app.filteredMovies = filteredList;
		console.log(filteredList);
	},

	sortMovies() {
		app.filteredMovies.sort(function (a, b) {
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
		app.filteredMovies.forEach(function (movie) {
			document.querySelector("#content_section").insertAdjacentHTML("beforeend", movie.htmlString);
		});
	},
};
var requestOptions = {
	method: "GET",
	redirect: "follow",
};
app.init();

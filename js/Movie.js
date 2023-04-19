export default class Movie {
	constructor(crew, imDbRating, image, rank, title, year) {
		this.crew = crew;
		this.imDbRating = imDbRating;
		this.image = image;
		this.rank = rank;
		this.title = title;
		this.year = year;
	}
	get htmlString() {
		return `
        <article>
          <img src=${this.image} alt="">
          <div class="article_content_wrapper">
            <div>
              <h3>Name: ${this.title}</h3>
              <h4>Year: ${this.year}</h4>
			  <h4>Rank: ${this.rank}</h4>
			  <h4>Rating: ${this.imDbRating}</h4>
            </div>
          </div>
        </article>`;
	}
}

import React, { Component } from 'react';
import './MovieDetails.css';

class MovieDetails extends Component {
  constructor() {
    super();
    this.state =
      {
        id: 21,
        title: "Sonic the Hedgehog",
        poster_path: "https://image.tmdb.org/t/p/original//aQvJ5WPzZgYVDrxLX4R6cLJCEaQ.jpg",
        backdrop_path: "https://image.tmdb.org/t/p/original//tCUcf3oNWMW8kwAj3WC6CvIN5ah.jpg",
        release_date: "2020-02-12",
        overview: "Based on the global blockbuster videogame franchise from Sega, Sonic the Hedgehog tells the story of the world’s speediest hedgehog as he embraces his new home on Earth. In this live-action adventure comedy, Sonic and his new best friend team up to defend the planet from the evil genius Dr. Robotnik and his plans for world domination.",
        average_rating: 7
      }
  }

  render() {
    return (
      <article className='movie-details-container'>
        <img src={this.state.backdrop_path} alt='movie backdrop' className='movie-backdrop'/>
        <div className='movie-details'>
          <button className='close-button'>X</button>
          <h1 className='movie-title'>{this.state.title}</h1>
          <p>{this.state.release_date}</p>
          <p className='movie-overview'>{this.state.overview}</p>
          <div className='rating-container'>
            <button className='rating-button'>+</button>
            <p className='movie-number'>{this.state.average_rating}</p>
            <button className='rating-button'>-</button>
          </div>
        </div>
      </article>
    )
  }
}

export default MovieDetails;

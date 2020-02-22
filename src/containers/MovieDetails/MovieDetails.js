import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import './MovieDetails.css';
import { connect } from 'react-redux';

export class MovieDetails extends Component {

  formatDate = (releaseDate) => {
     const monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    let date = releaseDate.split('-')
    return `${monthNames[date[1] - 1]} ${date[2]}, ${date[0]}`;
  }

  render() {
    return (
      <article className='movie-details-container'>
        <img src={this.props.selectedMovie.movie.backdrop_path} alt='movie backdrop' className='movie-backdrop'/>
        <div className='movie-details'>
          <Link to={'/'}><button className='close-button'>X</button></Link>
          <h1 className='movie-title'>{this.props.selectedMovie.movie.title}</h1>
          <p>{this.formatDate(this.props.selectedMovie.movie.release_date)}</p>
          <p className='movie-overview'>{this.props.selectedMovie.movie.overview}</p>
          <div className='rating-container'>
            <button className='rating-button'>+</button>
            <p className='movie-number'>{this.props.selectedMovie.movie.average_rating}</p>
            <button className='rating-button'>-</button>
          </div>
        </div>
      </article>
    )
  }
}

export const mapStateToProps = (state) => ({
  selectedMovie: state.selectedMovieReducer
})

export default connect(mapStateToProps)(MovieDetails);

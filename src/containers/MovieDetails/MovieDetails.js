import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import './MovieDetails.css';
import { connect } from 'react-redux';

export class MovieDetails extends Component {
  constructor() {
    super();
    this.state =
      {
        ratingDropbox: null
      }
  }

  formatDate = (releaseDate) => {
     const monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    let date = releaseDate.split('-')
    return `${monthNames[date[1] - 1]} ${date[2]}, ${date[0]}`;
  }

  updateRatingState = num => {
    this.setState({ratingDropbox: parseInt(num)})
  }

  submitRating = (rating, userId, movieId) => {

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
            <select onChange={e => this.updateRatingState(e.target.value)} id='rating-dropbox'>
              <option value={null}>rate!</option>
              <option value={1}>1</option>
              <option value={2}>2</option>
              <option value={3}>3</option>
              <option value={4}>4</option>
              <option value={5}>5</option>
              <option value={6}>6</option>
              <option value={7}>7</option>
              <option value={8}>8</option>
              <option value={9}>9</option>
              <option value={10}>10</option>
            </select>
            <button className='submit-rating-button'>submit rating</button>
          </div>
          <p className='movie-number'>current rating: {this.props.selectedMovie.movie.average_rating}</p>
        </div>
      </article>
    )
  }
}

export const mapStateToProps = (state) => ({
  selectedMovie: state.selectedMovieReducer
})

export default connect(mapStateToProps)(MovieDetails);

import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import './MovieDetails.css';
import { connect } from 'react-redux';
import { getRatings } from '../../actions';
import { postRating, getUserRatings, deleteRating } from '../../apiCalls';

export class MovieDetails extends Component {
  constructor(props) {
    super(props);
    this.state = {
      ratingDropbox: null,
      userRating: this.props.selectedMovie.user_rating,
      errorMessage: ''
    }
  }

  formatDate = (releaseDate) => {
     const monthNames = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
    let date = releaseDate.split('-')
    return `${monthNames[date[1] - 1]} ${date[2]}, ${date[0]}`;
  }

  updateRatingState = num => {
    this.setState({ratingDropbox: parseInt(num)})
  }

  submitRating = (userId, movieId, rating) => {
    this.setState({userRating: rating})
    if (!this.state.ratingDropbox) {
      this.setState({errorMessage: 'Please select a rating number to submit!'})
    } else {
      const ratingId = this.findMovieRatingId(movieId)
      if (!ratingId) {
        postRating(userId, movieId, rating )
      } else {
        this.makeDeleteRequest(userId, ratingId, movieId, rating)
      }
    }
  }

  removeRating = (userId, movieId) => {
    const ratingId = this.findMovieRatingId(movieId);
    if (ratingId) {
      const rating = 0;
      deleteRating(userId, ratingId)
        .then(() => getUserRatings(userId))
        .then(ratings => this.props.addUserRatings(ratings.ratings))
        .then(() => this.setState({userRating: rating}))
        .catch(error => console.log(error))
    }
  }

  makeDeleteRequest = (userId, ratingId, movieId, rating) => {
    deleteRating(userId, ratingId)
      .then(() => this.updateRatings(userId, movieId, rating ))
      .catch(error => console.log(error))
  }

  updateRatings = (userId, movieId, rating ) => {
    getUserRatings(userId)
      .then(ratings => this.props.addUserRatings(ratings.ratings))
      .then(() => postRating(userId, movieId, rating ))
      .catch(error => console.log(error))
  }

  findMovieRatingId = id => {
    let ratingIdNum = this.props.ratings.filter(movie => movie.movie_id === id)
    if (ratingIdNum.length) {
      return ratingIdNum[0].id
    } else {
      return 0;
    }
  }

  render() {
    return (
      <article className='movie-details-container'>
        <img src={this.props.selectedMovie.backdrop_path} alt='movie backdrop' className='movie-backdrop'/>
        <div className='movie-details'>
          <Link to={'/'}><button className='close-button'>X</button></Link>
          <h1 className='movie-title'>{this.props.selectedMovie.title}</h1>
          <p>{this.formatDate(this.props.selectedMovie.release_date)}</p>
          <p className='movie-overview'>{this.props.selectedMovie.overview}</p>
            <p className='rating-error-msg'>{this.state.errorMessage}</p>
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
            <button className='submit-rating-button' onClick={() =>  this.submitRating(this.props.user.id, this.props.selectedMovie.id, this.state.ratingDropbox)}>Submit Rating</button>
          </div>
          <p className='movie-number'><span className='bold-text'>Average Rating:</span> {this.props.selectedMovie.average_rating ? this.props.selectedMovie.average_rating.toFixed(1) : 0}</p>
          <p className='movie-number'><span className='bold-text'>My Rating:</span> {this.state.userRating ? this.state.userRating : 'Add Your Rating Above!'}</p>
          <button className='remove-rating-button' onClick={() => this.removeRating(this.props.user.id, this.props.selectedMovie.id) }>Remove Rating</button>
        </div>
      </article>
    )
  }
}

export const mapStateToProps = (state) => ({
  selectedMovie: state.selectedMovie,
  user: state.user,
  ratings: state.ratings
})

export const mapDispatchToProps = dispatch => ({
  addUserRatings: ratings => dispatch(getRatings(ratings))
})

export default connect(mapStateToProps, mapDispatchToProps)(MovieDetails);

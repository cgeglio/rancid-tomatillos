import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import './MovieDetails.css';
import { connect } from 'react-redux';
import { getRatings } from '../../actions';

export class MovieDetails extends Component {
  constructor(props) {
    super(props);
    this.state = {ratingDropbox: null}
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
    if (!this.state.ratingDropbox) {
      window.alert(`Please select a rating number to submit!`)
    } else {
      const ratingId = this.findMovieRatingId(movieId)
      if (!ratingId) {
        this.makeRatingRequest(userId, movieId, rating )
      } else {
        this.makeDeleteRequest(userId, ratingId, movieId, rating)
      }
    }
  }

  makeRatingRequest = (userId, movieId, rating) => {
    const options = {
      method: 'POST',
      body: JSON.stringify({
        movie_id: movieId,
        rating: rating
        }),
      headers: {'Content-Type': 'application/json'}
    }
    fetch(`https://rancid-tomatillos.herokuapp.com/api/v1/users/${userId}/ratings`, options)
      .then(res => {
      if(!res.ok) {
        throw Error('Something is not right, try again later')
      }
      return res.json()})
  }

  makeDeleteRequest = (userId, ratingId, movieId, rating) => {
    fetch(`https://rancid-tomatillos.herokuapp.com/api/v1/users/${userId}/ratings/${ratingId}`, {
    method: "DELETE",
    })
    .then(response => {
      if (!response.ok) {
        throw Error('Error Message');
      }
    })
    .then( () => this.getUserRatings(userId, movieId, rating ))
  }

  getUserRatings = (userId, movieId, rating ) => {
    fetch(`https://rancid-tomatillos.herokuapp.com/api/v1/users/${userId}/ratings`)
      .then(response => response.json())
      .then(ratings => this.props.addUserRatings(ratings.ratings))
      .then(() => this.makeRatingRequest(userId, movieId, rating ))
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
            <button className='submit-rating-button' onClick={() => this.submitRating(this.props.user.id, this.props.selectedMovie.movie.id, this.state.ratingDropbox)}>submit rating</button>
          </div>
          <p className='movie-number'>average rating: {this.props.selectedMovie.movie.average_rating}</p>
        </div>
      </article>
    )
  }
}

export const mapStateToProps = (state) => ({
  selectedMovie: state.selectedMovieReducer,
  user: state.user,
  ratings: state.ratings
})

export const mapDispatchToProps = dispatch => ({
  addUserRatings: ratings => dispatch(getRatings(ratings))
})

export default connect(mapStateToProps, mapDispatchToProps)(MovieDetails);

import React, { Component } from 'react';
import './MoviesContainer.css';
import MoviePreview from '../../Components/MoviePreview/MoviePreview';
import { connect } from 'react-redux';
import { getMovies } from '../../actions'
import { updateSelectedMovie } from '../../actions';
import { getRatings } from '../../actions';

export class MoviesContainer extends Component {

  componentDidMount() {
    fetch('https://rancid-tomatillos.herokuapp.com/api/v1/movies')
      .then(response => response.json())
      .then(movies => {
        this.props.addMoviesToStore(movies.movies)})
      .catch(error => console.log(error))
  }

  findUserRating = movie => {
    return this.props.ratings.find(rating => rating.movie_id === movie) ? this.props.ratings.find(rating => rating.movie_id === movie).rating : 0;
  }

  saveSelectedMovieToStore = movie => {
    this.props.addSelectedMovieToStore(movie);
  }

  findUser = () => {
    return this.props.user.id ? true : false
  }

  getUserRatings = () => {
    fetch(`https://rancid-tomatillos.herokuapp.com/api/v1/users/${this.props.user.id}/ratings`)
      .then(response => response.json())
      .then(ratings => this.props.addUserRatings(ratings.ratings))
      .catch(error => console.log(error))
    }

  render() {

    this.getUserRatings()

    let allMovies = this.props.movies.map(movie => {
      movie.user_rating = this.props.ratings ? this.findUserRating(movie.id) : 0;
      return <MoviePreview saveSelectedMovieToStore={this.saveSelectedMovieToStore} key={movie.id} userLoggedIn={this.findUser()} movie={movie}/>
    })

    let sortedMovies = this.props.movies.sort((a, b) => a.average_rating - b.average_rating)

    let topMovies = sortedMovies.map(movie => <MoviePreview saveSelectedMovieToStore={this.saveSelectedMovieToStore} userLoggedIn={this.findUser()} key={movie.id} movie={movie}/>)

    return (
      !this.props.movies ? <p>loading</p> : (
      <section className='movies-display-container'>
        <section className='movies-heading'>
          <h3>Highy Rated Movies</h3>
        </section>
        <section className='top-rated-movies'>
          {topMovies}
        </section>
        <section className='movies-heading'>
          <h3>All Movies</h3>
        </section>
        <section className='bottom-display-section'>
          {allMovies}
        </section>
    </section>
  ))
  }
}

export const mapStateToProps = (state) => ({
  movies: state.movies,
  selectedMovie: state.selectedMovieReducer,
  user: state.user,
  ratings: state.ratings
})

export const mapDispatchToProps = (dispatch) =>({
  addMoviesToStore: movies => dispatch(getMovies(movies)),
  addSelectedMovieToStore: movie => dispatch(updateSelectedMovie(movie)),
  addUserRatings: ratings => dispatch(getRatings(ratings))
})

export default connect(mapStateToProps, mapDispatchToProps)(MoviesContainer);

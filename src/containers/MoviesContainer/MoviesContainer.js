import React, { Component } from 'react';
import './MoviesContainer.css';
import MoviePreview from '../../Components/MoviePreview/MoviePreview';
import { connect } from 'react-redux';
import { getMovies } from '../../actions'
import { updateSelectedMovie } from '../../actions';


class MoviesContainer extends Component {

  componentDidMount() {
    fetch('https://rancid-tomatillos.herokuapp.com/api/v1/movies')
      .then(response => response.json())
      .then(movies => {
        this.props.addMoviesToStore(movies.movies)})
      .catch(error => console.log(error))
  }

  formatDate(releaseDate) {
     const monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    let date = releaseDate.split('-')
    return `${monthNames[date[1] - 1]} ${date[2]}, ${date[0]}`;
  }

  findUserRating = movie => {
    return this.props.ratings.find(rating => rating.movie_id === movie) ? this.props.ratings.find(rating => rating.movie_id === movie).rating : 0;
  }

  saveSelectedMovieToStore = movie => {
    this.props.addSelectedMovieToStore(movie);
  }

  render() {

    let allMovies = this.props.movies.map(movie => {
      movie.user_rating = this.props.ratings ? this.findUserRating(movie.id) : 0;
      return <MoviePreview saveSelectedMovieToStore={this.saveSelectedMovieToStore} key={movie.id} date={this.formatDate(movie.release_date)} movie={movie}/>})

    let sortedMovies = this.props.movies.sort((a, b) => a.average_rating - b.average_rating)
    let topMovies = sortedMovies.map(movie => <MoviePreview saveSelectedMovieToStore={this.saveSelectedMovieToStore} user={this.props.user.id ? true : false} key={movie.id} movie={movie}/>)

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

const mapStateToProps = (state) => ({
  movies: state.movies,
  selectedMovie: state.selectedMovieReducer,
  user: state.user,
  ratings: state.ratings
})

const mapDispatchToProps = (dispatch) =>({
  addMoviesToStore: movies => dispatch(getMovies(movies)),
  addSelectedMovieToStore: movie => dispatch(updateSelectedMovie(movie))
})

export default connect(mapStateToProps, mapDispatchToProps)(MoviesContainer);

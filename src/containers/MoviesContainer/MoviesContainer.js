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
      .then(movies => this.props.addMoviesToStore(movies.movies))
      .catch(error => console.log(error))
  }

  saveSelectedMovieToStore = movie => {
    this.props.addSelectedMovieToStore(movie)
    console.log('in saveSelectedMovieToStore method', movie);
  }

  render() {
    if (!this.props.movies) {
      return  <p>loading</p>
    }
    let allMovies = this.props.movies.map(movie => {
      return <MoviePreview saveSelectedMovieToStore={this.saveSelectedMovieToStore} key={movie.id} movie={movie}/>})
    return (
      <section className='movies-display-container'>
        <section className='top-rated-movies'>
        </section>
        <section className='bottom-display-section'>
          {allMovies}
        </section>
      </section>
    )
  }
}

const mapStateToProps = (state) => ({
  movies: state.movies,
  selectedMovie: state.selectedMovieReducer
})

const mapDispatchToProps = (dispatch) =>({
  addMoviesToStore: movies => dispatch(getMovies(movies)),
  addSelectedMovieToStore: movie => dispatch(updateSelectedMovie(movie))
})

export default connect(mapStateToProps, mapDispatchToProps)(MoviesContainer);

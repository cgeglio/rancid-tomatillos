import React, { Component } from 'react';
import './MoviesContainer.css';
import MoviePreview from '../../Components/MoviePreview/MoviePreview';
import { connect } from 'react-redux';
import { getMovies } from '../../actions'

class MoviesContainer extends Component {

  componentDidMount() {
    fetch('https://rancid-tomatillos.herokuapp.com/api/v1/movies')
      .then(response => response.json())
      .then(movies => {
        console.log(movies.movies)
        this.props.addMoviesToStore(movies.movies)})
      .catch(error => console.log(error))
  }

  render() {
    if (!this.props.movies) {
      return  <p>loading</p>
    }
    let allMovies = this.props.movies.map(movie => {
      return <MoviePreview key={movie.id} movie={movie}/>})
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
  movies: state.movies
})

const mapDispatchToProps = (dispatch) =>({
  addMoviesToStore: movies => dispatch(getMovies(movies))
})

export default connect(mapStateToProps, mapDispatchToProps)(MoviesContainer);
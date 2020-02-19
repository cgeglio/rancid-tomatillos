import React from 'react';
import './MoviesContainer.css';
import MoviePreview from '../MoviePreview/MoviePreview';

const MoviesContainer = ({ movies }) => {
  let allMovies =  movies.map(movie => {
    return <MoviePreview key={movie.id} movie={movie}/>
  })

  let filteredMovies =  movies.filter(film => {
    return film.average_rating > 5
  })

  let topMovies = filteredMovies.map(movie => {
    return <MoviePreview key = {movie.id} movie = {movie}/>
  })
  
      console.log(filteredMovies)
  return (
    <section className='movies-display-container'>
      <section className='top-rated-movies'>
        {topMovies}
      </section>
      <section className='bottom-display-section'>
        {allMovies}
      </section>
    </section>
  )
}

export default MoviesContainer;
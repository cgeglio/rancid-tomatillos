import React from 'react';
import MoviePreview from '../MoviePreview/MoviePreview';

const MoviesContainer = ({ movies }) => {
  return movies.map(movie => {
    return <MoviePreview key={movie.id} movie={movie}/>
  })
}

export default MoviesContainer;
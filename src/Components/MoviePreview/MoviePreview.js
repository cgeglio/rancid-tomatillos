import React from 'react';
import { Link } from 'react-router-dom';
import './MoviePreview.css';

const MoviePreview = ({ movie, saveSelectedMovieToStore }) => {
  return (
    <article onClick={ () => saveSelectedMovieToStore(movie) } className='movie-preview-container'>
      <p className='preview-avg-rating'>{movie.average_rating}</p>
      <Link to={`/movie_details`}><img src={movie.poster_path} alt='movie poster' className='movie-poster-image'/></Link>
    </article>
  )
}

export default MoviePreview;

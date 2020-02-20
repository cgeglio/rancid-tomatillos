import React from 'react';
import './MoviePreview.css';

const MoviePreview = ({ movie }) => {
  return (
    <article className='movie-preview-container'>
      <img src={movie.poster_path} alt='movie poster' className='movie-poster-image'/>
    </article>
  )
}

export default MoviePreview;

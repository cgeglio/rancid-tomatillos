import React from 'react';
import './MoviePreview.css';
import { Link } from 'react-router-dom';

const MoviePreview = ({ date, movie, user }) => {
  return (
    <article className='movie-preview-container'>
      <p>{date}</p>
      <div className='ratings'>
        <p className='preview-rating'>{movie.average_rating}</p>
        {movie.user_rating ? <p className='preview-rating'>{movie.user_rating}</p> : <Link to={!user ? '/login' : `/movies/${movie.id}`} className='preview-rating-button'>Rate</Link>}
      </div>
      <img src={movie.poster_path} alt='movie poster' className='movie-poster-image'/>
    </article>
  )
}

export default MoviePreview;

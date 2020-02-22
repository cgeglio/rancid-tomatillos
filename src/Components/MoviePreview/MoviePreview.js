import React from 'react';
import { Link } from 'react-router-dom';
import './MoviePreview.css';
import lemon from '../../Assets/lemon.png';

const MoviePreview = ({ date, movie, user, saveSelectedMovieToStore  }) => {
  return (
    <article onClick={ () => saveSelectedMovieToStore(movie) } className='movie-preview-container'>
      <p>{date}</p>
      <div className='ratings'>
        <div className='rating-bundle'><p className='preview-rating'>{movie.average_rating}</p>
        <img src={lemon} className='rating-lemon'/></div>
        {movie.user_rating ? <div className='user-rating-bundle'><p className='preview-rating'>{movie.user_rating}</p><img src={lemon} className='rating-lemon'/></div> : <button className='preview-rating-button'>Rate</button>}
      </div>
      <Link to={`/movie_details`}><img src={movie.poster_path} alt='movie poster' className='movie-poster-image'/></Link>
    </article>
  )
}

export default MoviePreview;

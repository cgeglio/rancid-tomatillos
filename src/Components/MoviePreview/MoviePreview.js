import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import './MoviePreview.css';
import lemon from '../../Assets/lemon.png';

class MoviePreview extends Component {

  determinePath = () => {
    return !this.props.userLoggedIn ? '/login' : `/movies/${this.props.movie.id}`;
  }

  render() {

    return (
      <article className='movie-preview-container' onClick={() => { this.props.saveSelectedMovieToStore(this.props.movie) }}>
        <p>{this.props.date}</p>
        <div className='ratings'>
          <div className='rating-bundle'><p className='preview-rating'>{this.props.movie.average_rating.toFixed(1)}</p>
          <p className='avg-rating-label'>AVG.</p>
          <img src={lemon} className='rating-lemon'/></div>
          {this.props.movie.user_rating ? 
          <div className='user-rating-bundle'>
            <p className='preview-rating'>{this.props.movie.user_rating}</p>
            <p className='user-rating-label'>MINE</p>
            <img src={lemon} className='rating-lemon'/>
          </div> : 
          <Link to={this.determinePath()} >
            <button type="button" onClick={() => { this.props.saveSelectedMovieToStore(this.props.movie) }} className='preview-rating-button'>Rate</button>
          </Link>}
        </div>
        <Link to={this.determinePath()}><img src={this.props.movie.poster_path} alt='movie poster' className='movie-poster-image'/></Link>
      </article>
    )
  }
}

export default MoviePreview;

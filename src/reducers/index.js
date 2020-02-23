import { combineReducers } from 'redux';
import { movies } from './moviesReducer'
import { user } from './userReducer'
import { selectedMovie } from './selectedMovieReducer';
import { ratings } from './ratingsReducer'

export const rootReducer = combineReducers({
  selectedMovie,
  movies,
  user,
  ratings
});

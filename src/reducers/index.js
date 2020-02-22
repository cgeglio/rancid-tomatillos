import { combineReducers } from 'redux';
import { movies } from './moviesReducer'
import { user } from './userReducer'
import { selectedMovieReducer } from './selectedMovieReducer';
import { ratings } from './ratingsReducer'

export const rootReducer = combineReducers({
  selectedMovieReducer,
  movies,
  user,
  ratings
});

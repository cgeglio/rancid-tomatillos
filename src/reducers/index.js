import { combineReducers } from 'redux';
import { movies } from './moviesReducer'
import { user } from './userReducer'
import { selectedMovieReducer } from './selectedMovieReducer';

export const rootReducer = combineReducers({
  selectedMovieReducer,
  movies,
  user
});

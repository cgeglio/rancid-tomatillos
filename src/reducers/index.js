import { combineReducers } from 'redux';
import { movies } from './moviesReducer'

export const rootReducer = combineReducers({
  movies
});

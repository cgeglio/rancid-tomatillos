import { combineReducers } from 'redux';
import { movies } from './moviesReducer'
import { user } from './userReducer'
import { ratings } from './ratingsReducer'

export const rootReducer = combineReducers({
  movies,
  user,
  ratings
});

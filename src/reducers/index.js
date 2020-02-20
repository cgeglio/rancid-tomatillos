import { combineReducers } from 'redux';
import { movies } from './moviesReducer'
import { user } from './userReducer'

export const rootReducer = combineReducers({
  movies,
  user
});

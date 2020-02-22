export const getMovies = movies => ({
  type: 'GET_MOVIES',
  movies
});

export const updateUser = user => ({
  type: 'UPDATE_USER',
  user
});

export const updateSelectedMovie = movie => ({
  type: 'UPDATE_SELECTED_MOVIE',
  movie
});

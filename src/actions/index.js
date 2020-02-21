export const getMovies = movies => ({
  type: 'GET_MOVIES',
  movies
});

export const updateUser = user => ({
  type: 'UPDATE_USER',
  user
});

export const logoutUser = user => ({
  type: 'LOGOUT_USER',
  user
})

export const getRatings = ratings => ({
  type: 'GET_RATINGS',
  ratings
})

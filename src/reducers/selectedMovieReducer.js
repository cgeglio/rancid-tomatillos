export const selectedMovie = (state = {}, action) => {
  switch(action.type) {
    case 'UPDATE_SELECTED_MOVIE':
      return action.movie
    default:
      return state;
  }
}

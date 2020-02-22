
export const selectedMovieReducer = (state = {}, action) => {
  switch(action.type) {
    case 'UPDATE_SELECTED_MOVIE':
      return action
    default:
      return state;
  }
}

export const ratings = (state = [], action) => {
  switch(action.type) {
    case 'GET_RATINGS':
      return action.ratings
    case 'REMOVE_RATINGS':
      return []
    default:
      return state;
  }
}

import { movies } from '../reducers/moviesReducer.js'

describe('movies', () => {
  it('should return the initial state if no state is provided', () => {
    const expected = [];
    const result = movies(undefined, {});
    expect(result).toEqual(expected)
  })

  it('should return the correct state if the action type is GET_MOVIES', () => {
    const moviesArray = [{
      id: 21,
      title: "Sonic the Hedgehog",
    }]

    const mockState = [];
    const mockAction = {
      type: 'GET_MOVIES',
      movies: moviesArray,
    }
    const expected = [{
      id: 21,
      title: "Sonic the Hedgehog",
    }]

    const result = movies(mockState, mockAction);
    expect(result).toEqual(expected)
  })
})

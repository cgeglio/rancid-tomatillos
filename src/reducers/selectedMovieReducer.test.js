import { selectedMovie } from '../reducers/selectedMovieReducer.js';

describe('selectedMovieReducer', () => {
  it('should return the initial state if no state is provided', () => {
    const expected = {};
    const result = selectedMovie(undefined, {});
    expect(result).toEqual(expected)
  })

  it('should return the correct state if the action type is UPDATE_SELECTED_MOVIE', () => {
    const mockMovie = {
      title: 'Ford v Ferrari',
      average_rating: 5,
    }
    const mockState = [];
    const mockAction = {
      type: 'UPDATE_SELECTED_MOVIE',
      movie: mockMovie,
    }
    const expected = mockMovie;

    const result = selectedMovie(mockState, mockAction);
    expect(result).toEqual(expected)
  })

});

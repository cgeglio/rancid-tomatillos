import { ratings } from '../reducers/ratingsReducer.js'

describe('ratings', () => {
  it('should return the initial state if no state is provided', () => {
    const expected = [];
    const result = ratings(undefined, {});
    expect(result).toEqual(expected)
  })

  it('should return the correct state if the action type is GET_RATINGS', () => {
    const ratingsArray = [{
      rating: 5,
    }]

    const mockState = [];
    const mockAction = {
      type: 'GET_RATINGS',
      ratings: ratingsArray,
    }
    const expected = [{
      rating: 5,
    }]

    const result = ratings(mockState, mockAction);
    expect(result).toEqual(expected)
  })

  it('should return the correct state if the action type is REMOVE_RATINGS', () => {
    const mockState = [{
      rating: 5,
    }]
    const mockAction = {
      type: 'REMOVE_RATINGS',
      ratings: [{
        rating: 5
      }],
    }
    const expected = [];

    const result = ratings(mockState, mockAction);
    expect(result).toEqual(expected)
  })
})

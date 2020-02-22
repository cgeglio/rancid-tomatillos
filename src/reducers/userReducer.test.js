import { user } from '../reducers/userReducer.js'

describe('user', () => {
  it('should return the initial state if no state is provided', () => {
    const expected = {};
    const result = user(undefined, {});
    expect(result).toEqual(expected)
  })

  it('should return the correct state if the action type is UPDATE_USER', () => {
    const mockUser = {
      name: 'Robbie',
      email: 'robbie@turing.io',
      id: 20,
    }
    const mockState = {};
    const mockAction = {
      type: 'UPDATE_USER',
      user: mockUser,
    }
    const expected = mockUser;

    const result = user(mockState, mockAction);
    expect(result).toEqual(expected)
  })

  it('should return the correct state if the action type is LOGOUT_USER', () => {
    const mockState = {
      name: 'Robbie',
      email: 'robbie@turing.io',
      id: 20,
    }
    const mockAction = {
      type: 'LOGOUT_USER',
    }
    const expected = {};

    const result = user(mockState, mockAction);
    expect(result).toEqual(expected)
  })
})

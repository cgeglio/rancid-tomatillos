import React from 'react';
import { LoginForm, mapDispatchToProps } from './LoginForm';
import { shallow } from 'enzyme';
import { updateUser } from '../../actions';
import { getRatings } from '../../actions';

describe('LoginForm', () => {
  describe('LoginForm container/component', () => {
    let wrapper;
    let mockEvent;
    let mockState;

    beforeEach(() => {
      wrapper = shallow(<LoginForm />)
      mockState = {
        email: 'fakeEmail',
        password: 'fakePassword',
        error: true
      }
      mockEvent = {
        target:
        {
          name: 'email',
          value: 'fake value'
        },
        preventDefault: jest.fn()
      }
    })

    it('should match snapshot', () => {
      expect(wrapper).toMatchSnapshot();
    })

    it('should update state when handleChange is invoked', () => {
      expect(wrapper.state('email')).toEqual('')
      wrapper.instance().handleChange(mockEvent)
      expect(wrapper.state('email')).toEqual('fake value')
    })

    it('should verify user inputs', () => {
      expect(wrapper.state('error')).toEqual(false)
      wrapper.instance().verifyInputs(mockEvent);
      expect(wrapper.state('error')).toEqual(true)
    })
  });

  describe('mapDispatchToProps', () => {
    it('should call dispatch with the updateUser action when fetchUserInfo is called', () => {
      let mockResponse = { user : {
          id: 1,
          name: 'Robbie'
      }};
      window.fetch = jest.fn().mockImplementation(() => {
        return Promise.resolve({
          ok: true,
          json: () => Promise.resolve(mockResponse)
        });
      });
      const mockDispatch = jest.fn();
      const actionToDispatch = updateUser(mockResponse);
      const mappedProps = mapDispatchToProps(mockDispatch);
      mappedProps.addUser(mockResponse)
      expect(mockDispatch).toHaveBeenCalledWith(actionToDispatch)
    })
  })

  it('should call dispatch with the getRatings action when getUserRatings is called', () => {
    let mockResponse = { ratings : {
        movie_id: 10,
        rating: 6
    }};
    window.fetch = jest.fn().mockImplementation(() => {
      return Promise.resolve({
        ok: true,
        json: () => Promise.resolve(mockResponse)
      });
    });
    const mockDispatch = jest.fn();
    const actionToDispatch = getRatings(mockResponse);
    const mappedProps = mapDispatchToProps(mockDispatch);
    mappedProps.addUserRatings(mockResponse)
    expect(mockDispatch).toHaveBeenCalledWith(actionToDispatch)
  })
});

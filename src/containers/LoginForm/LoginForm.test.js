import React from 'react';
import { LoginForm, mapDispatchToProps } from './LoginForm';
import { shallow } from 'enzyme';
import { updateUser, getRatings } from '../../actions';
import { getUserInfo, getUserRatings } from '../../apiCalls';

jest.mock('../../apiCalls')

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
      getUserInfo.mockImplementation(() => {
      return Promise.resolve([{ id: 29, name: 'Robbie' }]);
    })

      getUserRatings.mockImplementation(() => {
      return Promise.resolve([{ id: 300, movie_id: 20, rating: 5}]);
    });

  });

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
    });

    it('should call fetchUserInfo when completeLogin is invoked', () => {
      const mockState = {
        email: 'sam@turing.io',
        password: '123456',
        error: false
      }
      const expected = {
        email: 'sam@turing.io',
        password: '123456'
      }
      wrapper.instance().setState(mockState);
      wrapper.instance().fetchUserInfo = jest.fn()
      wrapper.instance().completeLogin()
      expect(wrapper.instance().fetchUserInfo).toHaveBeenCalledWith(expected)
    });

    it('should clear state when complete login is invoked', () => {
      const defaultState = {
        email: 'sam@turing.io',
        password: '123456',
        error: false
      }
      const expected = { email: '', password: '', error: false };
      wrapper.instance().setState(defaultState);
      wrapper.instance().completeLogin();
      expect(wrapper.state()).toEqual(expected);
    });

    it('should fire off getUserInfo when fetchUserInfo is invoked', () => {
      const mockUser = {name: 'Robbie'}
      wrapper.instance().fetchUserInfo(mockUser)
      expect(getUserInfo).toHaveBeenCalledWith(mockUser)
    });

    it('should fire off getUserRatings when fetchUserRatings is invoked', () => {
      const mockUserId = 7
      wrapper.instance().fetchUserRatings(mockUserId)
      expect(getUserRatings).toHaveBeenCalledWith(mockUserId)
    });

    it('should fire off verifyInputs when login button is clicked', () => {
    wrapper.instance().verifyInputs = jest.fn();
    wrapper.instance().forceUpdate()
    const mockEvent = {
      preventDefault: jest.fn()
    }
    wrapper.find('.login-btn').simulate('click', mockEvent)
    expect(wrapper.instance().verifyInputs).toHaveBeenCalled()
    });
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

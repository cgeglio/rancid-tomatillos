import React from 'react';
import LoginForm from './LoginForm';
import { shallow } from 'enzyme';

describe('LoginForm', () => {

  let wrapper;
  let mockEvent;

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

})

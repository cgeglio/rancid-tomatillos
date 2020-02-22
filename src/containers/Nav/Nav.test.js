import React from 'react';
import ReactDOM from 'react-dom';
import Nav from './Nav';
import { shallow } from 'enzyme';

describe('Nav', () => {

  let wrapper;

  beforeEach(() => {
    wrapper = shallow(<Nav />)
  })

  it ('should render a Nav', () => {
    expect(wrapper).toMatchSnapshot()
  })

})

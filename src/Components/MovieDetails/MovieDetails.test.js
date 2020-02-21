import React from 'react';
import ReactDOM from 'react-dom';
import MovieDetails from './MovieDetails';
import { shallow } from 'enzyme';

describe('MovieDetails', () => {

  let wrapper;

  beforeEach(() => {
    wrapper = shallow(<MovieDetails />)
  })

  it ('should render a MovieDetails component', () => {
    expect(wrapper).toMatchSnapshot()
  })

})

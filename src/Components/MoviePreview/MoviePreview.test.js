import React from 'react';
import ReactDOM from 'react-dom';
import  MoviePreview from './MoviePreview';
import { shallow } from 'enzyme';

describe('MoviePreview', () => {

  it('should match the snapshot', () => {
    let mockDate = '2020/10/10'
    let mockMovie = {average_rating: 5, poster_path: 'url'};
    const wrapper = shallow(<MoviePreview movie={mockMovie} date={mockDate} />);
    expect(wrapper).toMatchSnapshot();
  });

});

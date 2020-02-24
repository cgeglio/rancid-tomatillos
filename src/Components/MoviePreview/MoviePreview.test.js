import React from 'react';
import ReactDOM from 'react-dom';
import  MoviePreview from './MoviePreview';
import { shallow } from 'enzyme';
import { Simulate } from 'react-dom/test-utils';

describe('MoviePreview', () => {

  it('should match the snapshot', () => {
    let mockDate = '2020/10/10'
    let mockMovie = {average_rating: 5, poster_path: 'url'};
    const wrapper = shallow(<MoviePreview movie={mockMovie} date={mockDate} />);
    expect(wrapper).toMatchSnapshot();
  });

  it('should determine that if the user is logged in, the path is login', () => {
    const mockUserLoggedIn = true;
    let mockDate = '2020/10/10'
    let mockMovie = {average_rating: 5, poster_path: 'url', id: 2};
    const wrapper = shallow(<MoviePreview movie={mockMovie} date={mockDate} userLoggedIn={mockUserLoggedIn}/>);
    const mockDeterminePath = wrapper.instance().determinePath();
    expect(mockDeterminePath).toEqual('/movies/2');
  });

  it('should determine that if the user is logged in, the path is movie details', () => {
    const mockUserLoggedIn = false;
    let mockDate = '2020/10/10'
    let mockMovie = {average_rating: 5, poster_path: 'url', id:2};
    const wrapper = shallow(<MoviePreview movie={mockMovie} date={mockDate} userLoggedIn={mockUserLoggedIn}/>);
    const mockDeterminePath = wrapper.instance().determinePath();
    expect(mockDeterminePath).toEqual('/login');
  });

  it('should fire off saveSelectedMovieToStore with selected movie', () => {
    let mockSaveSelectedMovieToStore = jest.fn();
    const mockUserLoggedIn = false;
    let mockDate = '2020/10/10'
    let mockMovie = {average_rating: 5, poster_path: 'url', id:2};
    const wrapper = shallow(<MoviePreview movie={mockMovie} saveSelectedMovieToStore={mockSaveSelectedMovieToStore} date={mockDate} userLoggedIn={mockUserLoggedIn}/>);
    wrapper.find('.preview-rating-button').simulate('click')
    expect(wrapper.instance().props.saveSelectedMovieToStore).toHaveBeenCalledWith(mockMovie)
  });
});

import React from 'react';
import ReactDOM from 'react-dom';
import { MovieDetails, mapStateToProps }from './MovieDetails';
import { shallow } from 'enzyme';

describe('MovieDetails', () => {
  describe('MovieDetails container/component', () => {
    it('should match the snapshot', () => {
      const wrapper = shallow(<MovieDetails selectedMovie={{movie: {title: 'Sonic the Hedgehog', release_date: '2020-02-10', user_rating: 5, average_rating: 8}}} />);
      expect(wrapper).toMatchSnapshot();
    });
  });

  describe('mapStateToProps', () => {
    it('should return an object with the selectedMovie information, the user, and the user\'s ratings', () => {
      const mockState = {
        movies: [ { title: 'Jumanji' } ],
        selectedMovieReducer: {movie: {title: 'Sonic the Hedgehog', user_rating: 7, average_rating: 8}},
        ratings: [{rating: 5}, {rating: 4}],
        user: {name: 'Eric, id: 30'},
      };
      const expected = {
        selectedMovie: {movie: {title: 'Sonic the Hedgehog', user_rating: 7, average_rating: 8}},
        ratings: [{rating: 5}, {rating: 4}],
        user: {name: 'Eric, id: 30'},
      }
      const mappedProps = mapStateToProps(mockState);
      expect(mappedProps).toEqual(expected)
    });
  });
});

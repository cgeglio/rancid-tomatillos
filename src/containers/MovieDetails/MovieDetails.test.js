import React from 'react';
import ReactDOM from 'react-dom';
import { MovieDetails, mapStateToProps, mapDispatchToProps }from './MovieDetails';
import { shallow } from 'enzyme';
import { getRatings } from '../../actions/index.js';

describe('MovieDetails', () => {
  describe('MovieDetails container/component', () => {
    it('should match the snapshot', () => {
      const wrapper = shallow(<MovieDetails selectedMovie={{title: 'Sonic the Hedgehog', release_date: '2020-02-10', user_rating: 5, average_rating: 8}} />);
      expect(wrapper).toMatchSnapshot();
    });
  });

  describe('mapStateToProps', () => {
    it('should return an object with the selectedMovie information, the user, and the user\'s ratings', () => {
      const mockState = {
        movies: [ { title: 'Jumanji' } ],
        selectedMovie: {title: 'Sonic the Hedgehog', user_rating: 7, average_rating: 8},
        ratings: [{rating: 5}, {rating: 4}],
        user: {name: 'Eric, id: 30'},
      };
      const expected = {
        selectedMovie: {title: 'Sonic the Hedgehog', user_rating: 7, average_rating: 8},
        ratings: [{rating: 5}, {rating: 4}],
        user: {name: 'Eric, id: 30'},
      }
      const mappedProps = mapStateToProps(mockState);
      expect(mappedProps).toEqual(expected)
    });
  });

  describe('mapDispatchToProps', () => {
    it('should call dispatch with getRatings', () => {
      const mockDispatch = jest.fn();
      const mockRatings = [{
        id: 290,
        movie_id: 28,
        rating: 9,
      }]
      const actionToDispatch = getRatings(mockRatings)
      const mappedProps = mapDispatchToProps(mockDispatch);
      mappedProps.addUserRatings(mockRatings)

      expect(mockDispatch).toHaveBeenCalledWith(actionToDispatch)
    });
  });
});

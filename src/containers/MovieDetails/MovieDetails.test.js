import React from 'react';
import ReactDOM from 'react-dom';
import { MovieDetails, mapStateToProps, mapDispatchToProps }from './MovieDetails';
import { shallow } from 'enzyme';
import { getRatings } from '../../actions/index.js';
import { postRating, getUserRatings, deleteRating } from '../../apiCalls';

jest.mock('../../apiCalls');

describe('MovieDetails', () => {
  describe('MovieDetails container/component', () => {
    it('should match the snapshot', () => {
      const wrapper = shallow(<MovieDetails selectedMovie={{title: 'Sonic the Hedgehog', release_date: '2020-02-10', user_rating: 5, average_rating: 8}} />);
      expect(wrapper).toMatchSnapshot();
    });

    it('should start off with a default state', () => {
      const wrapper = shallow(<MovieDetails selectedMovie={{title: 'Sonic the Hedgehog', release_date: '2020-02-10', user_rating: 5, average_rating: 8}} />);
      const expectedState = {
        ratingDropbox: null,
        userRating: 5,
        errorMessage: ''
      }
      expect(wrapper.state()).toEqual(expectedState)
    })

    it('should format the movies release date', () => {
      const mockDate = '2020-01-01';
      const user = {
        email: "sam@turing.io",
        id: 20,
        name: "Sam"
      }
      const expectedDate = 'January 01, 2020'
      const wrapper = shallow(<MovieDetails selectedMovie={{title: 'Sonic the Hedgehog', release_date: '2020-02-10', user_rating: 5, average_rating: 8}} />);
      const mockFormatDate = wrapper.instance().formatDate(mockDate)
      expect(mockFormatDate).toEqual(expectedDate)
    });

    it('should update state when updateRatingState is called', () => {
      const wrapper = shallow(<MovieDetails selectedMovie={{title: 'Sonic the Hedgehog', release_date: '2020-02-10', user_rating: 5, average_rating: 8}} />);
      const num = 6
      const expected = {errorMessage: '', ratingDropbox: 6, userRating: 5}
      wrapper.instance().updateRatingState(num)
      expect(wrapper.state()).toEqual(expected)
    })
  });


    describe('submitRating', () => {

       let wrapper, mockUserId, mockMovieId, mockRating;

      beforeEach(() => {
        wrapper = shallow(<MovieDetails selectedMovie={{title: 'Sonic the Hedgehog', release_date: '2020-02-10', user_rating: 5, average_rating: 8}} />);
        mockUserId = 20;
        mockMovieId = 30;
        mockRating = 10;
      })

      it('should setState with users rating', () => {
        wrapper.instance().submitRating(mockUserId, mockMovieId, mockRating)
        expect(wrapper.state('userRating')).toEqual(10)
      })

      it('should setState with error message if user did not select a rating', () => {
        const expectedState = {
          ratingDropbox: null,
          userRating: 10,
          errorMessage: 'Please select a rating number to submit!'
        }
        wrapper.instance().submitRating(mockUserId, mockMovieId, mockRating)
        expect(wrapper.state()).toEqual(expectedState)
      })

      it('should call findMovieRatingId if user selected a rating', () => {
        wrapper.setState({ratingDropbox: 10})
        wrapper.instance().findMovieRatingId = jest.fn()
        wrapper.instance().submitRating(mockUserId, mockMovieId, mockRating)
        expect(wrapper.instance().findMovieRatingId).toHaveBeenCalledWith(mockMovieId)
      })

      it('should call postRating if the movie does not have a rating', () => {
        wrapper.instance().findMovieRatingId = jest.fn().mockImplementation(() => 0)
        wrapper.instance().submitRating(mockUserId, mockMovieId, mockRating)
        expect(postRating).toHaveBeenCalledWith(mockUserId, mockMovieId, mockRating)
      })

      it('should call makeDeleteRequest if the movie does have a rating', () => {
        wrapper.setState({ratingDropbox: 10})
        wrapper.instance().findMovieRatingId = jest.fn().mockImplementation(() => 10)
        wrapper.instance().makeDeleteRequest = jest.fn()
        wrapper.instance().submitRating(mockUserId, mockMovieId, mockRating)
        expect(wrapper.instance().makeDeleteRequest).toHaveBeenCalledWith(mockUserId, 10, mockMovieId, mockRating)
      })
    })

    describe('removeRating', () => {
       it('should fire off deleteRating if there is a rating id', () => {
         const mockResponse = {status: 204}
         const deleteRating = jest.fn().mockImplementation(() => {
           return Promise.resolve({
             ok: true,
             json: () => Promise.resolve(mockResponse)
           })
         })

         const mockUserId = 20;
         const mockMovieId = 30;
         const mockRatingId = 200;
         const wrapper = shallow(<MovieDetails selectedMovie={{title: 'Sonic the Hedgehog', release_date: '2020-02-10', user_rating: 5, average_rating: 8}} />);
         wrapper.instance().findMovieRatingId = jest.fn()
         wrapper.instance().removeRating(mockUserId, mockMovieId)
         deleteRating(mockUserId, mockRatingId)

         expect(deleteRating).toHaveBeenCalledWith(mockUserId, 200)
       })
    });

    describe('findMovieRatingId', () => {
      it('should be able to find a movie\'s rating id if it has one', () => {
        let mockMovieId = 30;
        const wrapper = shallow(<MovieDetails selectedMovie={{title: 'Sonic the Hedgehog', user_rating: 7, average_rating: 8, release_date: '2020-01-20'}} ratings={[{id: 340, rating: 10, movie_id: 30}]} />);
        let mockFindMovieRatingId = wrapper.instance().findMovieRatingId(mockMovieId)
        expect(mockFindMovieRatingId).toEqual(340);
      })

      it('should rerurn 0 if a movie does not have a rating id', () => {
        let mockMovieId = 30;
        const wrapper = shallow(<MovieDetails selectedMovie={{title: 'Sonic the Hedgehog', user_rating: 7, average_rating: 8, release_date: '2020-01-20'}} ratings={[{id: 340, rating: 10, movie_id: 35}]} />);
        let mockFindMovieRatingId = wrapper.instance().findMovieRatingId(mockMovieId)
        expect(mockFindMovieRatingId).toEqual(0);
      })
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

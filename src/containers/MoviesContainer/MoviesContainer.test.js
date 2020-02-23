import React from 'react';
import { MoviesContainer, mapStateToProps, mapDispatchToProps } from './MoviesContainer.js';
import { shallow } from 'enzyme';
import { getMoviesData } from '../../apiCalls';
import { getUserRatings } from '../../apiCalls';
import { updateSelectedMovie, getMovies, getRatings } from '../../actions/index.js';

jest.mock('../../apiCalls')

describe('MoviesContainer', () => {

  beforeEach(() => {
    getMoviesData.mockImplementation(() => {
      return Promise.resolve([{ id: 29, title: "Ford v Ferrari" }]);
    });

    getUserRatings.mockImplementation(() => {
      return Promise.resolve([{ movie_id: 30, rating: 5 }]);
    });
  });

  it('should match the snapshot', () => {
    const user = {
      email: "sam@turing.io",
      id: 20,
      name: "Sam"
    }
    const wrapper = shallow(<MoviesContainer user={user} movies={[{id: 29, title: "Ford v Ferrari",}]} ratings={[{movie_id: 30, rating: 5}]}/>)
    expect(wrapper).toMatchSnapshot();
  });

  describe('mapStateToProps', () => {
    it('should return an array of movie objects', () => {
      const mockMoviesArray = [{
        id: 29,
        title: "Ford v Ferrari",
        poster_path: "image.jpg",
        backdrop_path: "image.jpg",
        release_date: "2019-11-13",
        overview: "American car designer",
        average_rating: 1,
        user_rating: 0
      }]
      const mockState = {
        movies: mockMoviesArray
      }
      const expected = {
        movies: mockMoviesArray}
      const mappedProps = mapStateToProps(mockState);
      expect(mappedProps).toEqual(expected);
    });
  });

  describe('mapDispatchToProps', () => {
    it('should call dispatch with updateSelectedMovie', () => {
      const mockDispatch = jest.fn();
      const selectedMovie = {
        id: 29,
        title: "Ford v Ferrari",
        poster_path: "image.jpg",
        backdrop_path: "image.jpg",
        release_date: "2019-11-13",
        overview: "American car designer",
        average_rating: 1,
        user_rating: 0
      }
      const actionToDispatch = updateSelectedMovie(selectedMovie);
      const mappedProps = mapDispatchToProps(mockDispatch)
      mappedProps.addSelectedMovieToStore(selectedMovie)

      expect(mockDispatch).toHaveBeenCalledWith(actionToDispatch)
    })

    it('should call dispatch with getMovies', () => {
      const mockDispatch = jest.fn();
      const moviesArr = [{
        id: 29,
        title: "Ford v Ferrari",
        poster_path: "image.jpg",
        backdrop_path: "image.jpg",
        release_date: "2019-11-13",
        overview: "American car designer",
        average_rating: 1,
        user_rating: 0
      }]
      const actionToDispatch = getMovies(moviesArr)
      const mappedProps = mapDispatchToProps(mockDispatch);
      mappedProps.addMoviesToStore(moviesArr)

      expect(mockDispatch).toHaveBeenCalledWith(actionToDispatch)
    });

    it('should call dispatch with getRatings', () => {
      const mockDispatch = jest.fn();
      const mockRatings = [{
        id: 290,
        movie_id: 28,
        rating: 4
      }]
      const actionToDispatch = getRatings(mockRatings)
      const mappedProps = mapDispatchToProps(mockDispatch);
      mappedProps.addUserRatings(mockRatings)

      expect(mockDispatch).toHaveBeenCalledWith(actionToDispatch)
    });
  });
});

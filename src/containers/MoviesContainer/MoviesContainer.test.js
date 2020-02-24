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

  describe('MoviesContainer Component', () => {

  it('should match the snapshot', () => {
    const user = {
      email: "sam@turing.io",
      id: 20,
      name: "Sam"
    }
    const wrapper = shallow(<MoviesContainer user={user} movies={[{id: 29, title: "Ford v Ferrari",}]} ratings={[{movie_id: 30, rating: 5}]}/>)
    expect(wrapper).toMatchSnapshot();
  });

  describe('saveSelectedMovieToStore', () => {
    it('should call addSelectedMovieToStore with a movie when saveSelectedMovieToStore is invoked', () => {
      const user = {
        email: "sam@turing.io",
        id: 20,
        name: "Sam"
      }
      const wrapper = shallow(<MoviesContainer user={user} movies={[{id: 29, title: "Ford v Ferrari",}]} ratings={[{movie_id: 30, rating: 5}]}/>)
      const movie = {
        id: 29,
        title: "Ford v Ferrari",
        poster_path: "image.jpg",
        backdrop_path: "image.jpg",
        release_date: "2019-11-13",
        overview: "American car designer",
        average_rating: 1,
        user_rating: 0
      }
      wrapper.instance().props = {addSelectedMovieToStore: movie => movie}
      const spy = jest.spyOn(wrapper.instance().props, 'addSelectedMovieToStore')
      wrapper.instance().saveSelectedMovieToStore(movie)
      expect(spy).toHaveBeenCalled();
    })
  })

  describe('findUser', () => {
    it('should return true if there is a user', () => {
      const user = {
        email: "sam@turing.io",
        id: 20,
        name: "Sam"
      }
      const wrapper = shallow(<MoviesContainer user={user} movies={[{id: 29, title: "Ford v Ferrari",}]} ratings={[{movie_id: 30, rating: 5}]}/>)
      wrapper.instance().props = {user}
      expect(wrapper.instance().findUser()).toEqual(true)
    })

    it('should return false if there is no user', () => {
      const user = {
        email: "sam@turing.io",
        id: 20,
        name: "Sam"
      }
      const wrapper = shallow(<MoviesContainer user={user} movies={[{id: 29, title: "Ford v Ferrari",}]} ratings={[{movie_id: 30, rating: 5}]}/>)
      wrapper.instance().props = {user: {}}
      expect(wrapper.instance().findUser()).toEqual(false)
    })
  })
  
  describe('findUserRating', () => {
    
    it('should find a users ratings when passed an id', () => {
      const user = {name: 'Eric', id: 40}
      const mockRatings = [{rating_id:300, movie_id: 30, rating: 5}]
      const mockMovies = [{id: 30, title: 'Ford v Ferrari'}, {id: 29, title: 'Frozen II'}]
      const wrapper = shallow(<MoviesContainer user={user} movies={mockMovies} ratings={mockRatings}/>)
      const movieId = 30
      const mockFindRatings = wrapper.instance().findUserRating(movieId);
      
      expect(mockFindRatings).toEqual(5)
    });

    it('should return 0 if movie has not been rated', () => {
      const user = {name: 'Eric', id: 40}
      const mockRatings = [{rating_id:300, movie_id: 30, rating: 5}]
      const mockMovies = [{id: 34, title: 'Ford v Ferrari'}, {id: 29, title: 'Frozen II'}]
      const wrapper = shallow(<MoviesContainer user={user} movies={mockMovies} ratings={mockRatings}/>)
      const movieId = 34
      const mockFindRatings = wrapper.instance().findUserRating(movieId);
      
      expect(mockFindRatings).toEqual(0)
    });
  });

  describe('updateUserRatings', () => {
    it('should return null if no user', () => {
      const user = {
        email: "sam@turing.io",
        id: 20,
        name: "Sam"
      }
      const wrapper = shallow(<MoviesContainer user={user} movies={[{id: 29, title: "Ford v Ferrari",}]} ratings={[{movie_id: 30, rating: 5}]}/>)
      wrapper.instance().props = {user: {}}
      expect(wrapper.instance().updateUserRatings()).toEqual(null)
    })

    it('should invoke getUserRatings when udpateUserRatings is called with a user', () => {
      const user = {
        email: "sam@turing.io",
        id: 20,
        name: "Sam"
      }
      const wrapper = shallow(<MoviesContainer user={user} movies={[{id: 29, title: "Ford v Ferrari",}]} ratings={[{movie_id: 30, rating: 5}]}/>)
      wrapper.instance().props = {user}
      wrapper.instance().updateUserRatings()
      expect(getUserRatings).toHaveBeenCalledWith(user.id)
      })
    })
  })

  describe('mapStateToProps', () => {
    it('should return an array of movie objects, selectedMovie info, user info, and an array of ratings objects', () => {
      const mockMovies = [{
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
        movies: mockMovies,
        selectedMovie: {movie: {title: 'Ford v Ferrari'}},
        user: {name: 'Eric', id: 40},
        ratings: [{rating: 5}, {rating: 6}],
        actors: [{name: 'Christian Bale'}]
      }
      const expected = {
        movies: mockMovies,
        selectedMovie: {movie: {title: 'Ford v Ferrari'}},
        user: {name: 'Eric', id: 40},
        ratings: [{rating: 5}, {rating: 6}],
      }
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

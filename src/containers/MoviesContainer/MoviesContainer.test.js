import React from 'react';
import { MoviesContainer, mapStateToProps, mapDispatchToProps } from './MoviesContainer.js';
import { shallow } from 'enzyme';
import { getMoviesData } from '../../apiCalls';

jest.mock('../../apiCalls')

describe('MoviesContainer', () => {

  beforeEach(() => {
    getMoviesData.mockImplementation(() => {
      return Promise.resolve([{
        id: 29,
        title: "Ford v Ferrari",
        poster_path: "https://image.tmdb.org/t/p/original//6ApDtO7xaWAfPqfi2IARXIzj8QS.jpg",
        backdrop_path: "https://image.tmdb.org/t/p/original//n3UanIvmnBlH531pykuzNs4LbH6.jpg",
        release_date: "2019-11-13",
        overview: "American car designer",
        average_rating: 1,
        user_rating: 0
      }])
    })
  })

  it('should match the snapshot', () => {
    const user = {
      email: "sam@turing.io",
      id: 20,
      name: "Sam"
    }
    const wrapper = shallow(<MoviesContainer user={user} movies={[{
        id: 29,
        title: "Ford v Ferrari",
        poster_path: "https://image.tmdb.org/t/p/original//6ApDtO7xaWAfPqfi2IARXIzj8QS.jpg",
        backdrop_path: "https://image.tmdb.org/t/p/original//n3UanIvmnBlH531pykuzNs4LbH6.jpg",
        release_date: "2019-11-13",
        overview: "American car designer",
        average_rating: 1,
        user_rating: 0
      }]}/>)
    expect(wrapper).toMatchSnapshot();
  })
})
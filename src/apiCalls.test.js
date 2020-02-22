import { getMoviesData, getUserInfo, getUserRatings } from './apiCalls';

describe('getMoviesData', () => {
  let mockResponse = [{
    id: 29,
    title: "Ford v Ferrari",
    poster_path: "https://image.tmdb.org/t/p/original//6ApDtO7xaWAfPqfi2IARXIzj8QS.jpg",
    backdrop_path: "https://image.tmdb.org/t/p/original//n3UanIvmnBlH531pykuzNs4LbH6.jpg",
    release_date: "2019-11-13",
    overview: "American car designer",
    average_rating: 1,
    user_rating: 0
  }]

  beforeEach(() => {
    window.fetch = jest.fn().mockImplementation(() => {
      return Promise.resolve({
        ok: true,
        json: () => Promise.resolve(mockResponse)
      });
    });
  });

  it('should call fetch with the correct url', () => {
    getMoviesData();
    expect(window.fetch).toHaveBeenCalledWith('https://rancid-tomatillos.herokuapp.com/api/v1/movies')
  });

  it('should return an array of movies', () => {
    getMoviesData()
    .then(movies => expect(movies).toEqual(mockResponse));
  });

  it('should return an error if the response is not okay', () => {
    window.fetch = jest.fn().mockImplementation(() => {
      return Promise.reject(Error('200 status code not found: getMovies throw error'))
    })
    expect(getMoviesData()).rejects.toEqual(Error('200 status code not found: getMovies throw error'))
  });

  describe('getUserInfo', () => {
    let mockUser = {
      email: "sam@turing.io",
      id: 20,
      name: "Sam"
    }

    beforeEach(() => {
      window.fetch = jest.fn().mockImplementation(() => {
        return Promise.resolve({
          ok: true,
          json: Promise.resolve(mockUser)
        })
      })
    })

    it('should fetch with correct arguments', () => {
      const options = {
        method: 'POST',
        body: JSON.stringify(mockUser),
        headers: {
          'Content-Type': 'application/json'
        }
      }
      const expectedArguments = ['https://rancid-tomatillos.herokuapp.com/api/v1/login', options]
      getUserInfo(mockUser);
      expect(window.fetch).toHaveBeenCalledWith(...expectedArguments)
    });
  });

  describe('getUserRatings', () => {
    let mockUserId = 42
    let mockResponse = [{
      id: 726,
      user_id: 20,
      movie_id: 21,
      rating: 4,
      created_at: "2020-02-21T01:32:41.615Z",
      updated_at: "2020-02-21T01:32:41.615Z"
    }]
    beforeEach(() => {
      window.fetch = jest.fn().mockImplementation(() => {
        return Promise.resolve({
          ok: true,
          json: () => Promise.resolve(mockResponse)
        });
      });
    });

    it('should fetch with correct url', () => {
      getUserRatings(mockUserId);
      expect(window.fetch).toHaveBeenCalledWith('https://rancid-tomatillos.herokuapp.com/api/v1/users/42/ratings')
    });

    it('should return an array of ratings', () => {
      getUserRatings(mockUserId)
      .then(ratings => expect(ratings).toEqual(mockResponse))
    });
  });
});
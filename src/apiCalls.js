export const getMoviesData = () => {
  return fetch('https://rancid-tomatillos.herokuapp.com/api/v1/movies')
  .then(response => {
    if (!response.ok) {
      throw Error('200 status code not found: getMovies throw error')
    }
    return response.json()
  })
}

export const getUserInfo = user => {
  const options = {
    method: 'POST',
    body: JSON.stringify(user),
    headers: {
      'Content-Type': 'application/json'
    }
  }
  return fetch('https://rancid-tomatillos.herokuapp.com/api/v1/login', options)
  .then(response => {
    if (!response.ok) {
      throw Error('200 status code not found: getUserInfo throw error')
    }
    return response.json()
  })
}

export const getUserRatings = userId => {
  return fetch(`https://rancid-tomatillos.herokuapp.com/api/v1/users/${userId}/ratings`)
  .then(response => {
    if (!response.ok) {
      throw Error('200 status code not found: getUserRatings throw error')
    }
    return response.json()
  })
}

export const postRating = (userId, movieId, rating) => {
  const options = {
    method: 'POST',
    body: JSON.stringify({
      movie_id: movieId,
      rating: rating
      }),
    headers: {'Content-Type': 'application/json'}
  }
  return fetch(`https://rancid-tomatillos.herokuapp.com/api/v1/users/${userId}/ratings`, options)
    .then(res => {
    if(!res.ok) {
      throw Error('Something is not right, try again later')
    }
    return res.json()})
}

export const deleteRating = (userId, ratingId) => {
  return fetch(`https://rancid-tomatillos.herokuapp.com/api/v1/users/${userId}/ratings/${ratingId}`, {
  method: "DELETE",
  })
  .then(response => {
    if (!response.ok) {
      throw Error('There was an error making your delete request');
    }
  })
}

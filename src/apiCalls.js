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
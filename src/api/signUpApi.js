export default class SignUpApi {

  static signup(userInfo) {
    const API_HOST = process.env.REACT_APP_API_HOST_LOCAL ? process.env.REACT_APP_API_HOST_LOCAL : 'https://asset-deck-api.herokuapp.com';
    const request = new Request(`${API_HOST}/signup`, {
      method: 'POST',
      headers: new Headers({
        'Content-type': 'application/json'
      }),
      body: JSON.stringify({auth: userInfo})
    });

    return fetch(request).then(response => {
      return response.json();
    }).catch(error =>  {
      return error;
    });
  }
}

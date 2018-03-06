const API_URL = process.env.REACT_APP_API_URL;

export default class SessionApi {
  static login(credentials) {
    const request = new Request(`${API_URL}/login`, {
      method: 'POST',
      headers: new Headers({
        'Content-type': 'application/json'
      }),
      body: JSON.stringify({auth: credentials})
    });

    return fetch(request).then(response => {
      return response.json();
    }).catch(error => {
      return error;
    });
  }
}

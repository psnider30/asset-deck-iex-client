
export default class SessionApi {
  static login(credentials) {
    const request = new Request('http://localhost:3001/api/login', {
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

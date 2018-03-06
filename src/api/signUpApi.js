export default class SignUpApi {
  static signup(userInfo) {
    const request = new Request('http://localhost:3001/api/signup', {
      method: 'POST',
      headers: new Headers({
        'Content-type': 'application/json'
      }),
      body: JSON.stringify({auth: userInfo})
    });

    return fetch(request).then(response => {
      return response.json();
    }).catch(error => {
      return error;
    });
  }
}

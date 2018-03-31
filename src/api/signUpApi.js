export default class SignUpApi {
  static signup(userInfo) {
    const request = new Request(`${process.env.API_HOST}/signup`, {
      method: 'POST',
      headers: new Headers({
        'Content-type': 'application/json'
      }),
      body: JSON.stringify({auth: userInfo})
    });

    return fetch(request).then(response => {
      return response.json();
    }).catch(error => {
    });
  }
}

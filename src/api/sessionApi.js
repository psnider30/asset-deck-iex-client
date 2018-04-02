export default class SessionApi {
  static login(credentials) {
    debugger;
    console.log(process.env.REACT_APP_API_HOST)
    const request = new Request(`${process.env.REACT_APP_API_HOST}/login`, {
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

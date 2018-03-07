const API_URL = process.env.REACT_APP_API_URL;
console.log(API_URL)

export default class userAssetsApi {

  static requestHeaders() {
    return {'AUTHORIZATION': `Bearer ${sessionStorage.jwt}`}
  }

  static saveUserAsset(symbol, username) {
    const headers = Object.assign({'Content-Type': 'application/json'}, this.requestHeaders());
    const request = new Request(`${API_URL}/assets`, {
      method: 'POST',
      headers: headers,
      body: JSON.stringify({asset:
        {
          symbol: symbol,
          username: username
        }
      })
    });

    return fetch(request).then(response => {
      response.json();
    }).catch(error => {
      console.log(error);
    });
  }
}

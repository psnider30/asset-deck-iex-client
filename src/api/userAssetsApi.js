const API_URL = process.env.REACT_APP_API_URL;
console.log(API_URL)

export default class userAssetsApi {
  static saveUserAsset(symbol) {
    const request = new Request(`${API_URL}/assets`, {
      method: 'POST',
      headers: new Headers({
        "Content-Type": "application/json"
      }),
      body: JSON.stringify({asset: symbol})
    });

    return fetch(request).then(response => {
      response.json();
    }).catch(error => {
      console.log(error);
    });
  }
}

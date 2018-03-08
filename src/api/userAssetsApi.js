import { fetchAsset } from '../actions/assetActions';
import { stopFetchingData } from '../actions/assetActions';
const API_URL = process.env.REACT_APP_API_URL;
console.log(API_URL)

export default class userAssetsApi {

  static requestHeaders() {
    return {'AUTHORIZATION': `Bearer ${sessionStorage.jwt}`}
  }

  static saveUserAsset(asset, username, dispatch) {
    const headers = Object.assign({'Content-Type': 'application/json'}, this.requestHeaders());
    const request = new Request(`${API_URL}/assets`, {
      method: 'POST',
      headers: headers,
      body: JSON.stringify({asset:
        {
          symbol: asset.symbol,
          username: username
        }
      })
    });
    return makeRequest(request, asset, username, dispatch)
  }
}

  const makeRequest = async (request, asset, username, dispatch) => {

    const response = await fetch(request).catch(error => console.log(error))
    const json = await response.json();
    if (!json.errors) {
      fetchAsset(asset, username, dispatch)
    } else {
      dispatch(stopFetchingData())
      alert("Symbol already added")
    }
  }


// function fetchWithPromise(request) {
//   new Promise((resolve, reject) => {
//    fetch(request).then(response => {
//      if (response.ok) {
//        resolve(response)
//        debugger
//        console.log(response)
//      } else {
//        debugger
//         console.log('error')
//      }
//    });
//  });
// }


// }).catch(error => {
//   console.log(error);
// });

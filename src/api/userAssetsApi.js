import { fetchAsset } from '../actions/assetActions';
import { stopFetchingData } from '../actions/assetActions';
const API_URL = process.env.REACT_APP_API_URL;
console.log(API_URL)

export default class userAssetsApi {

  static requestHeaders() {
    return {'AUTHORIZATION': `Bearer ${sessionStorage.jwt}`}
  }

  static saveUserAsset(asset, username, userAssets, dispatch) {
    const headers = Object.assign({'Content-Type': 'application/json'}, this.requestHeaders());
    const body = JSON.stringify({asset:
      {
        symbol: asset.symbol,
        username: username,
        uuid: asset.id,
      }
    })

    asset.updating ?
    this.updateAsset(asset, username, userAssets, dispatch, headers, body) :
    this.saveNewAsset(asset, username, dispatch, headers, body)

  }

  static saveNewAsset(asset, username, dispatch, headers, body) {
    const request = new Request(`${API_URL}/assets`, {
      method: 'POST',
      headers: headers,
      body: body
    });

    return makeSaveRequest(request, asset, username, dispatch)
  }

  static updateAsset(asset, username, userAssets, dispatch, headers, body) {
    const request = new Request(`${API_URL}/assets/update`, {
      method: 'PUT',
      headers: headers,
      body: body
    });
    if (userAssets.includes(asset.symbol)) {
      return fetchAsset(asset, username, dispatch)
    } else {
      return makeSaveRequest(request, asset, username, dispatch)
    }
  }

  static deleteUserAsset(asset, username) {
    const headers = Object.assign({'Content-Type': 'application/json'}, this.requestHeaders());
    const request = new Request(`${API_URL}/assets/delete`, {
      method: 'DELETE',
      headers: headers,
      body: JSON.stringify({asset:
        {
          symbol: asset.symbol,
          username: username,
          uuid: asset.id,
        }
      })
    });

    return fetch(request).then(response => {
      console.log(response);
      return response.json();
    }).catch(error => console.log(error))
  }
}

  const makeSaveRequest = async (request, asset, username, dispatch) => {
    const response = await fetch(request).catch(error => console.log(error))
    const json = await response.json();
    if (!json.errors) {
      fetchAsset(asset, username, dispatch)
    } else {
      dispatch(stopFetchingData())
      alert(`${json.errors.message}`)
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

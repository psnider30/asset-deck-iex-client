import { fetchAsset } from '../actions/assetActions';
import { stopFetchingData } from '../actions/assetActions';
import { loadUserAsset } from '../actions/assetActions';
const API_URL = process.env.REACT_APP_API_URL;
console.log(API_URL)

export default class userAssetsApi {

  static requestHeaders() {
    return {'AUTHORIZATION': `Bearer ${sessionStorage.jwt}`}
  }

  static requestBody(asset, username) {
    return JSON.stringify({asset:
      {
        symbol: asset.symbol,
        username: username,
        uuid: asset.id,
      }
    })
  }

  static saveUserAsset(asset, username, userAssets, dispatch, replacing) {
    const headers = Object.assign({'Content-Type': 'application/json'}, this.requestHeaders());
    const body = this.requestBody(asset, username);

    asset.updating ?
    this.updateAsset(asset, username, userAssets, dispatch, headers, body, replacing) :
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

  static updateAsset(asset, username, userAssets, dispatch, headers, body, replacing) {
    const request = new Request(`${API_URL}/assets/update`, {
      method: 'PUT',
      headers: headers,
      body: body
    });
    return makeSaveRequest(request, asset, username, dispatch, replacing)
  }

  static deleteUserAsset(asset, username) {
    const headers = Object.assign({'Content-Type': 'application/json'}, this.requestHeaders());
    const body = this.requestBody(asset, username);
    const request = new Request(`${API_URL}/assets/delete`, {
      method: 'DELETE',
      headers: headers,
      body: body
    });

    return fetch(request).then(response => {
      console.log(response);
      return response.json();
    }).catch(error => console.log(error))
  }

  static fetchUserAssets(username, dispatch) {
    const headers = Object.assign({'Content-Type': 'application/json'}, this.requestHeaders());
    const request = new Request(`${API_URL}/assets/user-assets`, {
      method: 'POST',
      headers: headers,
      body: JSON.stringify({ asset: { username: username } })
    });

    return fetch(request).then(response => {
      if (response.ok) { return response.json() }
        }).then(data => {
          data.forEach(userAsset => loadUserAsset(userAsset, dispatch))
        }).catch(error => {
          return Promise.reject(Error(error.message))
        })
      }

    // Make Request to fetch list of user assets symbols
    // Compare fetched assets symbols to userAssets array
    // If Symbol in db, but not userAssets, then fetch with addUserAsset (username from currentUser)
  }

  const makeSaveRequest = async (request, asset, username, dispatch, replacing = false) => {
    const response = await fetch(request).catch(error => console.log(error))
    const json = await response.json();
    if (!json.errors) {
      fetchAsset(asset, dispatch, replacing)
    } else {
      dispatch(stopFetchingData())
      alert(`${json.errors.message}`)
    }
  }

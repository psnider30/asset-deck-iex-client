import { fetchAsset } from '../actions/assetActions';
import { stopFetchingData } from '../actions/assetActions';
import { loadUserAsset } from '../actions/assetActions';
const API_URL = process.env.REACT_APP_API_URL;
console.log(API_URL)

export default class userAssetsApi {

  static requestHeaders() {
    return {
      'AUTHORIZATION': `Bearer ${sessionStorage.jwt}`,
      'Content-Type': 'application/json'
    }
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
    const headers = this.requestHeaders();
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

    return this.makeSaveRequest(request, asset, username, dispatch)
  }

  static updateAsset(asset, username, userAssets, dispatch, headers, body, replacing) {
    const request = new Request(`${API_URL}/assets/update`, {
      method: 'PUT',
      headers: headers,
      body: body
    });
    return this.makeSaveRequest(request, asset, username, dispatch, replacing)
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
          if (data.assets) {
            data.assets.forEach((userAsset, idx) => {
              const shares = data.user_asset_shares[idx]
              loadUserAsset(userAsset, shares, dispatch)
            })
          }
        }).catch(error => {
          debugger
          return Promise.reject(Error(error.message))
        })
      }

    // Make Request to fetch list of user assets symbols
    // Compare fetched assets symbols to userAssets array
    // If Symbol in db, but not userAssets, then fetch with addUserAsset (username from currentUser)
  static makeSaveRequest(request, asset, username, dispatch, replacing = false) {
    return fetch(request).then(response => {
      if (response.ok) {
        response.json()
        fetchAsset(asset, dispatch, replacing)
      } else {
        alert(`status: ${response.status}, ${response.statusText}`)
        dispatch(stopFetchingData())
      }
    }).catch(error => {
      console.log(error)
      dispatch(stopFetchingData())
      alert(error)
    })
  }

  static SaveShareTransaction(assetId, username, transaction) {
    const headers = this.requestHeaders();
    const request = new Request(`${API_URL}/assets/update-shares`, {
      method: 'POST',
      headers: headers,
      body: JSON.stringify({ asset:
        { username: username,
          uuid: assetId,
          transaction: transaction,
        }
      })
    });

  return fetch(request).then(response => response.json())
    .catch(error => {
      console.log(error)
    })
  }
}

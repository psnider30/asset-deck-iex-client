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

  static updateRequestBody(asset, username) {
    return JSON.stringify({asset:
      {
        symbol: asset.symbol,
        username: username,
        uuid: asset.newId,
        uuidOld: asset.id
      }
    })
  }

  static saveRequestBody(asset, username) {
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

    asset.updating ?
    this.updateAsset(asset, username, userAssets, dispatch, headers, replacing) :
    this.saveNewAsset(asset, username, dispatch, headers)

  }

  static saveNewAsset(asset, username, dispatch, headers) {
    const body = this.saveRequestBody(asset, username);
    const request = new Request(`${API_URL}/assets`, {
      method: 'POST',
      headers: headers,
      body: body
    });

    return this.makeSaveRequest(request, dispatch).then(assetRes => {
      if (assetRes.uuid !== asset.id) { asset.id = assetRes.uuid }
      fetchAsset(asset, dispatch)
    })
  }

  static updateAsset(asset, username, userAssets, dispatch, headers, replacing) {
    const body = this.updateRequestBody(asset, username);
    const request = new Request(`${API_URL}/assets/update`, {
      method: 'PUT',
      headers: headers,
      body: body
    });
    return this.makeSaveRequest(request, dispatch).then(assetRes => {
      const assetId = !!assetRes.uuid ? assetRes.uuid : asset.id
      asset = {...asset, id: assetId, oldId: asset.id}
      fetchAsset(asset, dispatch, replacing)
  })
}

  static makeSaveRequest(request, dispatch) {
    return fetch(request).then(res => res.json())
    .catch(error => {
      console.log(error)
      dispatch(stopFetchingData())
      // alert(`status: ${res.status}, ${res.statusText}`)
    })
  }

  static deleteUserAsset(asset, username) {
    const headers = Object.assign({'Content-Type': 'application/json'}, this.requestHeaders());
    const body = this.saveRequestBody(asset, username);
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
          return Promise.reject(Error(error.message))
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
  }
}

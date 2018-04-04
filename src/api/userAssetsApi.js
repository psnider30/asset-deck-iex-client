import { fetchAsset, stopFetchingData, loadUserAsset } from '../actions/assetActions';

const API_HOST = process.env.REACT_APP_API_HOST_LOCAL ? process.env.REACT_APP_API_HOST_LOCAL + '/api' : 'https://asset-deck-api.herokuapp.com/api';

export default class userAssetsApi {

  static requestHeaders() {
    return {
      'AUTHORIZATION': `Bearer ${sessionStorage.jwt}`,
      'Content-Type': 'application/json'
    };
  }

  static updateRequestBody(asset, username) {
    return JSON.stringify({asset:
      {
        symbol: asset.symbol,
        username: username,
        uuid: asset.newId,
        uuidOld: asset.id
      }
    });
  }

  static saveRequestBody(asset, username) {
    return JSON.stringify({asset:
      {
        symbol: asset.symbol,
        username: username,
        uuid: asset.id,
      }
    });
  }

  static saveUserAsset(asset, username, userAssets, dispatch, replacing) {
    const headers = this.requestHeaders();

    asset.updating ?
    this.updateAsset(asset, username, userAssets, dispatch, headers, replacing) :
    this.saveNewAsset(asset, username, dispatch, headers);

  }

  static saveNewAsset(asset, username, dispatch, headers) {
    const body = this.saveRequestBody(asset, username);
    const request = new Request(`${API_HOST}/assets`, {
      method: 'POST',
      headers: headers,
      body: body
    });

    return this.makeSaveRequest(request, dispatch).then(assetRes => {
      if (assetRes.uuid !== asset.id) { asset.id = assetRes.uuid }
      fetchAsset(asset, dispatch)
    });
  }

  static updateAsset(asset, username, userAssets, dispatch, headers, replacing) {
    const body = this.updateRequestBody(asset, username);
    const request = new Request(`${API_HOST}/assets/update`, {
      method: 'PUT',
      headers: headers,
      body: body
    });
    return this.makeSaveRequest(request, dispatch).then(assetRes => {
      const assetId = assetRes.uuid ? assetRes.uuid : asset.id;
      asset = {...asset, id: assetId, oldId: asset.id};
      fetchAsset(asset, dispatch, replacing);
  });
}

  static makeSaveRequest(request, dispatch) {
    return fetch(request).then(res => res.json())
    .catch(error => {
      dispatch(stopFetchingData())
      return error;
      // alert(`status: ${res.status}, ${res.statusText}`)
    });
  }

  static deleteUserAsset(asset, username) {
    const headers = Object.assign({'Content-Type': 'application/json'}, this.requestHeaders());
    const body = this.saveRequestBody(asset, username);
    const request = new Request(`${API_HOST}/assets/delete`, {
      method: 'DELETE',
      headers: headers,
      body: body
    });

    return fetch(request).then(response => {
      return response.json();
    }).catch(error => {
      return error;
    });
  }

  static fetchUserAssets(username, dispatch) {
    const headers = Object.assign({'Content-Type': 'application/json'}, this.requestHeaders());
    const request = new Request(`${API_HOST}/assets/user-assets`, {
      method: 'POST',
      headers: headers,
      body: JSON.stringify({ asset: { username: username } })
    });

    return fetch(request).then(response => {
      if (response.ok) { return response.json() }
        }).then(data => {
          if (data.assets) {
            data.assets.forEach((userAsset, idx) => {
              const shares = data.user_asset_shares[idx];
              loadUserAsset(userAsset, shares, dispatch);
            })
          }
        }).catch(error => {
          return error;
          // return Promise.reject(Error(error.message))
        });
      }

  static SaveShareTransaction(assetId, username, transaction) {
    const headers = this.requestHeaders();
    const request = new Request(`${API_HOST}/assets/update-shares`, {
      method: 'POST',
      headers: headers,
      body: JSON.stringify({ asset:
        { username: username,
          uuid: assetId,
          transaction: transaction,
        }
      })
    });
  return fetch(request).then(response => response.json());
  }
}

import userAssetsApi from '../api/userAssetsApi';
import * as types from './actionTypes';
const IEX_API = `https://api.iextrading.com/1.0/stock`;

let assetData = { quote: {}, fundamentals: {}, financials: {}, timeSeries: {}, logo: {} };

const fetchMain = (symbol) => {
  return fetch(`${IEX_API}/${symbol}/quote`)
    .then(response => response.json())
}

const fetchFundamentals = (symbol) => {
  return fetch(`${IEX_API}/${symbol}/stats`)
    .then(response => response.json())
}

const fetchFinancials = (symbol) => {
  return fetch(`${IEX_API}/${symbol}/financials`)
    .then(response => response.json())
}

const fetchMonthlyTimeSeries = (symbol) => {
  return fetch(`${IEX_API}/${symbol}/chart/5y?chartInterval=21`)
    .then(response => response.json())
}

const fetchDailyTimeSeries = (symbol) => {
  return fetch(`${IEX_API}/${symbol}/chart/1y`)
    .then(response => response.json())
}

const fetchLogo = (symbol) => {
  return fetch(`${IEX_API}/${symbol}/logo`)
  .then(response => response.json())
}

const fetchCompanyInfo = (symbol) => {
  return fetch(`${IEX_API}/${symbol}/company`)
    .then(response => response.json())
}

export const addUserAsset = (asset, username, userAssets) => {
  return dispatch => {
    // This first fetch checks if asset is fetchable before sending post request to create or update in the rails api
    fetch(`${IEX_API}/${asset.symbol}/company`).then(response => {
      if (response.status === 200) {
        const replacing = !userAssets.includes(asset.symbol);
        // send request to save asset to rails if the asset is being replaced or this is saving a new asset (not updating)
        if (replacing || !asset.updating) {
          userAssetsApi.saveUserAsset(asset, username, userAssets, dispatch, replacing)
        } else {
          return fetchAsset(asset, dispatch)
        }
      } else {
        dispatch(stopFetchingData())
        alert('Invalid Sybol')
      }
    })
  }
}

export const loadUserAssets = (username) => {
  return dispatch => {
    userAssetsApi.fetchUserAssets(username, dispatch)
  }
}

export const loadUserAsset = (userAsset, dispatch) => {
  dispatch(startFetchingData())
  const asset = { ...userAsset, id: userAsset.uuid, updating: false}
    return fetchAsset(asset, dispatch)
}

export const fetchAsset = (asset, dispatch, replacing = false) => {
    Promise.all([fetchMain(asset.symbol), fetchFundamentals(asset.symbol), fetchFinancials(asset.symbol),
    fetchMonthlyTimeSeries(asset.symbol), fetchDailyTimeSeries(asset.symbol), fetchLogo(asset.symbol),
    fetchCompanyInfo(asset.symbol)])
      .then(values => {
        assetData.quote = values[0];
        assetData.fundamentals = values[1];
        assetData.financials = values[2].financials[0];
        assetData.timeSeries.monthly = values[3];
        assetData.timeSeries.daily = values[4];
        assetData.logo = values[5];
        assetData.companyInfo = values[6];
        assetData.id = asset.id
        if (asset.updating) {
          dispatch(updateAsset({...assetData, id: asset.id, replacing: replacing}))
        } else {
          dispatch(addAsset({...assetData, id: asset.id}))
        }
        console.log(assetData)
        dispatch(updateAssetsInMemory())
      })
      .catch(error => {
        debugger;
        dispatch(stopFetchingData())
        console.log(error);
    })
}

export function startFetchingData() {
  return { type: types.START_FETCHING_DATA }
}

export function stopFetchingData() {
  return { type: types.STOP_FETCHING_DATA }
}

function deleteAssetSuccess(asset) {
  return {
    type: types.REMOVE_ASSET,
    assetId: asset.id,
  }
}

function addAsset(asset) {
  return {
    type: types.ADD_ASSET,
    asset,
  }
}

export function updateAsset(asset) {
  return {
    type: types.UPDATE_ASSET,
    asset
  }
}

export function removeAsset(asset, username) {
  return dispatch => {
    return userAssetsApi.deleteUserAsset(asset, username).then(response => {
      response.success ? dispatch(deleteAssetSuccess(asset)) : console.log(response.erros.message)
    }).catch(error => console.log(error));
  };
}

export function updateAssetsInMemory() {
  return {
    type: types.UPDATE_ASSETS_IN_MEMORY,
  }
}

export function resetReplacingAsset() {
  return {
    type: types.RESET_REPLACING_ASSET
  }
}

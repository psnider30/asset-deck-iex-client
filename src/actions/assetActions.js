import _ from 'lodash'
import userAssetsApi from '../api/userAssetsApi';
import * as types from './actionTypes';
import * as iex from '../api/fetchAssetData';
require('es6-promise').polyfill();
// const Promise = require('es5-promise').Promise;

let assetData = { quote: {}, fundamentals: {}, financials: {}, timeSeries: {}, logo: {} };
const IEX_API = 'https://api.iextrading.com/1.0/stock';

export const addUserAsset = (asset, username, userAssets) => {
  return dispatch => {
    // This first fetch checks if asset is fetchable before sending post request to create or update in the rails api
    fetch(`${IEX_API}/${asset.symbol}/company`).then(response => {
      if (response.status === 200) {
        const replacing = !userAssets.includes(asset.symbol.toUpperCase());
        // send request to save asset to rails if the asset is being replaced or this is saving a new asset (not updating)
        if (replacing || !asset.updating) {
          userAssetsApi.saveUserAsset(asset, username, userAssets, dispatch, replacing)
        } else {
          return fetchAsset(asset, dispatch)
        }
      } else {
        dispatch(stopFetchingData())
        alert('Invalid Symbol')
      }
    })
  }
}

export const loadUserAssets = (username) => {
  return dispatch => {
    userAssetsApi.fetchUserAssets(username, dispatch)
  }
}

export const loadUserAsset = (userAsset, shares, dispatch) => {
  dispatch(startFetchingData())
  const asset = { ...userAsset, id: userAsset.uuid, shares: shares, updating: false}
    return fetchAsset(asset, dispatch)
}

export const fetchAsset = (asset, dispatch, replacing = false) => {
    Promise.all([iex.fetchMain(asset.symbol), iex.fetchFundamentals(asset.symbol), iex.fetchFinancials(asset.symbol),
    iex.fetchMonthlyTimeSeries(asset.symbol), iex.fetchDailyTimeSeries(asset.symbol), iex.fetchLogo(asset.symbol),
    iex.fetchCompanyInfo(asset.symbol)])
      .then(values => {
        assetData.quote = values[0];
        assetData.fundamentals = values[1];
        assetData.financials = _.isEmpty(values[2]) ? null : values[2].financials[0];
        assetData.timeSeries.monthly = values[3];
        assetData.timeSeries.daily = values[4];
        assetData.logo = values[5];
        assetData.companyInfo = values[6];
        assetData.id = asset.id
        if (asset.updating) {
          dispatch(updateAsset({...assetData, id: asset.id, oldId: asset.oldId, shares: 0, replacing: replacing}))
        } else {
          dispatch(addAsset({...assetData, id: asset.id, shares: asset.shares}))
        }
        dispatch(updateAssetsInMemory())
      })
      .catch(error => {
        dispatch(stopFetchingData())
        return error;
    });
}

export function startFetchingData() {
  return { type: types.START_FETCHING_DATA };
}

export function stopFetchingData() {
  return { type: types.STOP_FETCHING_DATA };
}

function deleteAssetSuccess(asset) {
  return {
    type: types.REMOVE_ASSET,
    assetId: asset.id,
  };
}

function addAsset(asset) {
  return {
    type: types.ADD_ASSET,
    asset,
  };
}

export function updateAsset(asset) {
  return {
    type: types.UPDATE_ASSET,
    asset
  };
}

export function clearAssets() {
  return { type: types.CLEAR_ASSETS }
}

export function removeAsset(asset, username) {
  return dispatch => {
    return userAssetsApi.deleteUserAsset(asset, username).then(response => {
      if (response.success) { dispatch(deleteAssetSuccess(asset)); }
    }).catch(error => {
      return error;
    });
  };
}

export function updateAssetsInMemory() {
  return {
    type: types.UPDATE_ASSETS_IN_MEMORY,
  };
}

export function resetReplacingAsset() {
  return {
    type: types.RESET_REPLACING_ASSET
  };
}

export function buyAsset(asset, username) {
  return dispatch => {
    return userAssetsApi.SaveShareTransaction(asset.id, username, 'buy').then(assetData => {
      const assetWithBuy = {...asset, shares: assetData.shares}
      dispatch(buyAssetSuccess(assetWithBuy))
    }).catch(error => {
      return error;
    });
  };
}

export function sellAsset(asset, username) {
  return dispatch => {
    return userAssetsApi.SaveShareTransaction(asset.id, username, 'sell').then(assetData => {
      const assetWithSale = {...asset, shares: assetData.shares};
      dispatch(sellAssetSuccess(assetWithSale))
    }).catch(error => {
      return error;
    });
  };
}

function buyAssetSuccess(asset) {
  return {
    type: types.UPDATE_ASSET_SHARES,
    asset
  };
}

function sellAssetSuccess(asset) {
  return {
    type: types.UPDATE_ASSET_SHARES,
    asset
  }
}

export function setUpdatingShares() {
  return {
    type: types.SET_UPDATING_SHARES
  };
}

export function resetUpdatingShares() {
  return {
    type: types.RESET_UPDATING_SHARES
  };
}

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

export const addUserAsset = (asset, username) => {
  return dispatch => {
    fetch(`${IEX_API}/${asset.symbol}/logo`).then(response => {
      if (response.status === 200) {
         userAssetsApi.saveUserAsset(asset, username, dispatch)
      } else {
        dispatch(stopFetchingData())
        alert('Invalid Sybol')
      }
    })
  }
}

export const fetchAsset = (asset, username, dispatch) => {
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
        asset.updating ? dispatch(updateAsset({...assetData, id: asset.id}, asset.symbol, username)) :
        dispatch(addAsset(assetData, username))
        console.log(assetData)
        dispatch(updateAssetsInMemory())
      })
      .catch(error => {
        dispatch(stopFetchingData())
        alert('Symbol Not Found')
        console.log(error);
    })
}

export function startFetchingData() {
  return { type: types.START_FETCHING_DATA }
}

export function stopFetchingData() {
  return { type: types.STOP_FETCHING_DATA }
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

export function removeAsset(assetId) {
  return {
    type: types.REMOVE_ASSET,
    assetId
  }
}

export function updateAssetsInMemory() {
  return {
    type: types.UPDATE_ASSETS_IN_MEMORY
  }
}

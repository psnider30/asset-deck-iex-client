import { stopFetchingData }from './fetchingDataActions'

let symbol = 'aapl'
let timeSeries = '1m'
let type = 'quote'

const AV_API =`https://www.alphavantage.co/query?function=TIME_SERIES_WEEKLY_ADJUSTED&symbol=NFLX&apikey=${process.env.ALPHA_VANTAGE_KEY}`;
const IEX_API = `https://api.iextrading.com/1.0/stock/`;

export const fetchAsset = (asset) => {
  return dispatch => {
    fetch(`${IEX_API}/${asset.symbol}/quote`)
      .then(response => response.json())
      .then(assetData => {
        dispatch(addAsset(assetData))
        stopFetchingData()
        console.log(assetData)
    })
  }
}

function addAsset(asset) {
  return {
    type: 'ADD_ASSET',
    asset,
  }
}

export function findAsset(assetId) {
  return {
    type: 'FIND_ASSET',
    assetId
  }
}

export function updateAsset(asset) {
  return {
    type: 'UPDATE_ASSET',
    asset
  }
}

export function removeAsset(assetId) {
  return {
    type: 'REMOVE_ASSET',
    assetId
  }
}

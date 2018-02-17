import { stopFetchingData }from './fetchingDataActions'
const APIURL =`https://www.alphavantage.co/query?function=TIME_SERIES_WEEKLY_ADJUSTED&symbol=MSFT&apikey=${process.env.ALPHA_VANTAGE_KEY}`

const receivedAssetData = (assetData) => {
  return {
    type: 'RECEIVED_ASSET_DATA',
    assetData
  }
}

export const fetchAssetData = () => {
  return dispatch => {
    fetch(`${APIURL}`)
      .then(response => response.json())
      .then(assetData => {
        dispatch(receivedAssetData(assetData))
        stopFetchingData()
    })
  }
}

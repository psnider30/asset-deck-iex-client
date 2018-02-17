import { stopFetchingData }from './fetchingDataActions'

const IEX_ALL_SYMBOLS_API = 'https://api.iextrading.com/1.0/stock/ref-data/symbols'

const receivedAllSymbols = (allSymbols) => {
  return {
    type: 'RECEIVED_ASSET_DATA',
    allSymbols
  }
}

export const fetchAllSymbols = () => {
  return dispatch => {
    fetch(`${IEX_ALL_SYMBOLS_API}`)
      .then(response => response.json())
      .then(allSymbols => {
        dispatch(receivedAllSymbols(allSymbols))
        stopFetchingData()
        console.log(allSymbols)
    })
  }
}

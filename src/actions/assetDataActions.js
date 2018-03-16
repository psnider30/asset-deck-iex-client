// Left in App due to possibility of future feature where all symbols and companies are fetched when
// entering the app so a predictive search may be possible for symbols and company names in the quote form

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
        console.log(allSymbols)
    })
  }
}

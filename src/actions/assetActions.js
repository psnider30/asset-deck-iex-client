const IEX_API = `https://api.iextrading.com/1.0/stock`;

let assetData = { quote: {}, fundamentals: {}, financials: {} }

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



export const fetchAsset = (asset) => {
  return dispatch => {
    Promise.all([fetchMain(asset.symbol), fetchFundamentals(asset.symbol), fetchFinancials(asset.symbol)])
      .then(values => {
        assetData.quote = values[0];
        assetData.fundamentals = values[1];
        assetData.financials = values[2].financials[0];
        asset.updating ? dispatch(updateAsset({...assetData, id: asset.id})) : dispatch(addAsset(assetData))
        console.log(assetData)
      })
      .catch(error => {
      alert('Symbol Not Found')
      console.log(error);
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

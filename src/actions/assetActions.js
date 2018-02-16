export function addAsset(asset) {
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

export default (state = {}, action) => {
  switch(action.type) {
    case 'RECEIVED_ASSET_DATA':
      return action.assetData;
    default:
      return state;
  }
}

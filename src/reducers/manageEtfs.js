export default function manageEtfs(state = {
  etfs: [],
  editing: null,
}, action) {
  switch(action.type) {
    case 'ADD_ETF':
      return state;
    case 'DELETE_ETF':
      return state;
    default:
      return state;
  }
}

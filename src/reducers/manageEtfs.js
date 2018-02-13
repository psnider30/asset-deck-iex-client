import uuidv4 from 'uuid/v4';

export default function manageEtfs(state = {
  etfs: [],
  editing: null,
}, action) {
  switch(action.type) {
    case 'ADD_ETF':
      const etf = {...action.etf, id: uuidv4()}
      return {...state, etfs: [...state.etfs, etf]};
    case 'REMOVE_ETF':
      const etfs = state.etfs.filter(etf => etf.id !== action.id);
      return {...state, etfs: etfs}
    default:
      return state;
  }
}

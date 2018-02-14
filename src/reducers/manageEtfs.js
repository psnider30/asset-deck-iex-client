import uuidv4 from 'uuid/v4';

export default function manageEtfs(state = {etfs: []}, action) {
  let idx;
  let etf;

  switch(action.type) {
    case 'ADD_ETF':
      etf = {...action.etf, id: uuidv4()}
      return {...state, etfs: [...state.etfs, etf]};
    case 'FIND_ETF':
      return {...state, editing: action.etfId};
    case 'UPDATE_ETF':
      idx = state.etfs.findIndex(etf => etf.id === action.etf.id);
      return {
        ...state,
        etfs: [...state.etfs.slice(0, idx), action.etf, ...state.etfs.slice(idx + 1)]
      }
    case 'REMOVE_ETF':
      const etfs = state.etfs.filter(etf => etf.id !== action.etfId);
      return {...state, etfs: etfs}
    default:
      return state;
  }
}

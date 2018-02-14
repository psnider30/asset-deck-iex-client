import uuidv4 from 'uuid/v4';

export default function manageEtfs(state = {
  etfs: [],
  etfToUpdate: null,
}, action) {
  switch(action.type) {
    case 'ADD_ETF':
      const etf = {...action.etf, id: uuidv4()}
      return {...state, etfs: [...state.etfs, etf]};
    case 'FIND_ETF':
      return {...state, editing: action.etfId};
    case 'UPDATE_ETF':
      const idx = state.etfs.indexOf(action.etf);
      debugger;
      return {
        ...state,
        etfs: [...state.etfs.slice(0, idx), action.etf, state.etfs.slice(idx + 1)]
      }
    case 'REMOVE_ETF':
      const etfs = state.etfs.filter(etf => etf.id !== action.id);
      return {...state, etfs: etfs}
    default:
      return state;
  }
}

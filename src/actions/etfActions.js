export function addEtf(etf) {
  return {
    type: 'ADD_ETF',
    etf,
  }
}

export function findEtf(etfId) {
  return {
    type: 'FIND_ETF',
    etfId
  }
}

export function updateEtf(etf) {
  return {
    type: 'UPDATE_ETF',
    etf
  }
}

export function removeEtf(etfId) {
  return {
    type: 'REMOVE_ETF',
    etfId
  }
}

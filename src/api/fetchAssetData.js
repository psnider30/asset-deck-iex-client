const REACT_APP_IEX_API = process.env.REACT_APP_IEX_API;

export const fetchMain = (symbol) => {
  return fetch(`${REACT_APP_IEX_API}/${symbol}/quote`)
    .then(response => response.json());
};

export const fetchFundamentals = (symbol) => {
  return fetch(`${REACT_APP_IEX_API}/${symbol}/stats`)
    .then(response => response.json());
};

export const fetchFinancials = (symbol) => {
  return fetch(`${REACT_APP_IEX_API}/${symbol}/financials`)
    .then(response => response.json());
};

export const fetchMonthlyTimeSeries = (symbol) => {
  return fetch(`${REACT_APP_IEX_API}/${symbol}/chart/5y?chartInterval=21`)
    .then(response => response.json());
};

export const fetchDailyTimeSeries = (symbol) => {
  return fetch(`${REACT_APP_IEX_API}/${symbol}/chart/1y`)
    .then(response => response.json());
};

export const fetchLogo = (symbol) => {
  return fetch(`${REACT_APP_IEX_API}/${symbol}/logo`)
  .then(response => response.json());
};

export const fetchCompanyInfo = (symbol) => {
  return fetch(`${REACT_APP_IEX_API}/${symbol}/company`)
    .then(response => response.json());
};

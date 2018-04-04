const IEX_API = 'https://api.iextrading.com/1.0/stock';

export const fetchMain = (symbol) => {
  return fetch(`${IEX_API}/${symbol}/quote`)
    .then(response => response.json());
};

export const fetchFundamentals = (symbol) => {
  return fetch(`${IEX_API}/${symbol}/stats`)
    .then(response => response.json());
};

export const fetchFinancials = (symbol) => {
  return fetch(`${IEX_API}/${symbol}/financials`)
    .then(response => response.json());
};

export const fetchMonthlyTimeSeries = (symbol) => {
  return fetch(`${IEX_API}/${symbol}/chart/5y?chartInterval=21`)
    .then(response => response.json());
};

export const fetchDailyTimeSeries = (symbol) => {
  return fetch(`${IEX_API}/${symbol}/chart/1y`)
    .then(response => response.json());
};

export const fetchLogo = (symbol) => {
  return fetch(`${IEX_API}/${symbol}/logo`)
  .then(response => response.json());
};

export const fetchCompanyInfo = (symbol) => {
  return fetch(`${IEX_API}/${symbol}/company`)
    .then(response => response.json());
};

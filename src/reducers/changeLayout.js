export default function changeLayout(state = {
  layout: 'main',
  asset: null,
}, action) {
  switch(action.type) {
    case "MAIN_LAYOUT":
      return {...state, layout: action.layout, asset: null}
    case "FUNDAMENTALS_LAYOUT":
      return {...state, layout: action.layout, asset: null}
    case "CHANGE_SUMMARY_LAYOUT":
      return {...state, layout: action.layout, asset: null}
    case "FINANCIALS_LAYOUT":
      return {...state, layout: action.layout, asset: null}
    case "TIME_SERIES_LAYOUT":
      return {...state, layout: action.layout, asset: action.asset}
    default:
      return state;
  }
};

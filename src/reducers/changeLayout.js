export default function changeLayout(state = {
  layout: 'main',
  asset: null,
}, action) {
  switch(action.type) {
    case "MAIN_LAYOUT":
      return {...state, layout: action.layout}
    case "FUNDAMENTALS_LAYOUT":
      return {...state, layout: action.layout}
    case "CHANGE_SUMMARY_LAYOUT":
      return {...state, layout: action.layout}
    case "FINANCIALS_LAYOUT":
      return {...state, layout: action.layout}
    case "TIME_SERIES_LAYOUT":
      return {...state, layout: action.layout, asset: action.asset}
    default:
      return state;
  }
};

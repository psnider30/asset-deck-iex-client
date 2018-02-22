export default function changeLayout(state = 'main', action) {
  switch(action.type) {
    case "MAIN_LAYOUT":
      return action.layout
    case "FUNDAMENTALS_LAYOUT":
      return action.layout
    case "TIME_SERIES_LAYOUT":
      return action.layout
    case "CHANGE_SUMMARY_LAYOUT":
      return action.layout
    case "FINANCIALS_LAYOUT":
      return action.layout
    default:
      return state;
  }
};

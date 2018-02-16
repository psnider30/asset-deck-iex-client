export default (state= { timeSeries: '1 min'}, action) => {
  switch(action.type) {
    case "CHANGE_TIME_SERIES":
      return {...state, timeSeries: action.timeSeries}
    default:
      return state;
  }
};

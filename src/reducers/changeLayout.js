import * as types from '../actions/actionTypes';

export default function changeLayout(state = {
  layout: '',
  asset: null,
}, action) {
  switch(action.type) {
    case types.MAIN_LAYOUT:
      return {...state, layout: action.layout, asset: null}
    case types.FUNDAMENTALS_LAYOUT:
      return {...state, layout: action.layout, asset: null}
    case types.CHANGE_SUMMARY_LAYOUT:
      return {...state, layout: action.layout, asset: null}
    case types.FINANCIALS_LAYOUT:
      return {...state, layout: action.layout, asset: null}
    case types.TIME_SERIES_LAYOUT:
      return {...state, layout: action.layout, asset: action.asset}
    default:
      return state;
  }
}

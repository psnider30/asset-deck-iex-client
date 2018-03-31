import * as types from './actionTypes';

export function changeLayout(newLayout, currentLayout, asset=null) {
  if (newLayout === currentLayout) { return; }
  if (newLayout === 'quote') {
    return mainLayout(newLayout);
  } else if (newLayout === 'fundamentals') {
    return fundamentals(newLayout);
  } else if (newLayout === 'change-summary') {
    return changeSummary(newLayout)
  } else if (newLayout === 'financials') {
    return financials(newLayout);
  } else if (newLayout === 'timeSeries') {
    return timeSeries(newLayout, asset);
  } else {
    return mainLayout('quote');
  }
}

function mainLayout(layout) {
  return {
    type: types.MAIN_LAYOUT,
    layout
  };
}

function fundamentals(layout) {
  return {
    type: types.FUNDAMENTALS_LAYOUT,
    layout
  };
}

function changeSummary(layout) {
  return {
    type: types.CHANGE_SUMMARY_LAYOUT,
    layout
  };
}

function financials(layout) {
  return {
    type: types.FINANCIALS_LAYOUT,
    layout
  };
}

function timeSeries(layout, asset) {
  return {
    type: types.TIME_SERIES_LAYOUT,
    layout,
    asset
  };
}

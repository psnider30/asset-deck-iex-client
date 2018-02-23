export function changeLayout(newLayout, currentLayout, asset=null) {
  if (newLayout === currentLayout) { return }

  if (newLayout === 'main') {
    return mainLayout(newLayout)
  } else if (newLayout === 'fundamentals') {
    return fundamentals(newLayout)
  } else if (newLayout === 'changeSummary') {
    return changeSummary(newLayout)
  } else if (newLayout === 'financials') {
    return financials(newLayout)
  } else if (newLayout === 'timeSeries') {
    return timeSeries(newLayout, asset)
  }
}

function mainLayout(layout) {
  return {
    type: 'MAIN_LAYOUT',
    layout
  }
}

function fundamentals(layout) {
  return {
    type: 'FUNDAMENTALS_LAYOUT',
    layout
  }
}

function changeSummary(layout) {
  return {
    type: 'CHANGE_SUMMARY_LAYOUT',
    layout
  }
}

function financials(layout) {
  return {
    type: 'FINANCIALS_LAYOUT',
    layout
  }
}

function timeSeries(layout, asset) {
  return {
    type: 'TIME_SERIES_LAYOUT',
    layout,
    asset
  }
}

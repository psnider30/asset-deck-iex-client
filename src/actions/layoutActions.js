export function changeLayout(newLayout, currentLayout) {
  if (newLayout === currentLayout) { return }

  if (newLayout === 'main') {
    return mainLayout(newLayout)
  } else if (newLayout === 'fundamentals') {
    return fundamentals(newLayout)
  } else if (newLayout === 'timeSeries') {
    return timeSeries(newLayout)
  } else if (newLayout === 'changeSummary') {
    return changeSummary(newLayout)
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

function timeSeries(layout) {
  return {
    type: 'TIME_SERIES_LAYOUT',
    layout
  }
}

export function changeLayout(newLayout, currentLayout) {
  if (newLayout === currentLayout) { return }

  if (newLayout === 'main') {
    return mainLayout(newLayout)
  } else if (newLayout === 'fundamentals') {
    return fundamentals(newLayout)
  } else if (newLayout === 'timeSeries') {
    return timeSeries(newLayout)
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

function timeSeries(layout) {
  return {
    type: 'TIME_SERIES_LAYOUT',
    layout
  }
}

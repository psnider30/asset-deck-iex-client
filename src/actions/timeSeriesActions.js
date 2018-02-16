export function changeTimeSeries(timeSeries) {
  return {
    type: 'CHANGE_TIME_SERIES',
    timeSeries,
  }
}

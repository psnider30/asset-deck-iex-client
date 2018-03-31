export function formatNumber(value) {
  if (!value) { return ' - '; }
  const thousand = 1000;
  const million = 1000000;
  const billion = 1000000000;
  const trillion = 1000000000000;
  const absValue = Math.abs(value);

  if (absValue < thousand) {
    return value >= 0 ? absValue.toFixed(2) : '-' + absValue.toFixed(2);
  } else if (absValue >= thousand && absValue <= million) {
    return value >= 0 ? (absValue/thousand).toFixed(2) + 'k' :
    '-' + (absValue/thousand).toFixed(2) + 'k';
  } else if (absValue >= million && absValue <= billion) {
    return value >= 0 ? (absValue/million).toFixed(2) + 'M' :
    '-' + (absValue/million).toFixed(2) + 'M';
  } else if (absValue >= billion && absValue <= trillion) {
    return value >= 0 ? (absValue/billion).toFixed(2) + 'B' :
    '-' + (absValue/billion).toFixed(2) + 'B';
  } else if (absValue >= trillion) {
    return value >= 0 ? (absValue/trillion).toFixed(2) + 'T' :
    '-' + (absValue/trillion).toFixed(2) + 'T';
  } else {
    return value >= 0 ? absValue.toFixed(2) : '-' + absValue.toFixed(2);
  }
}

export function removeSeconds(time) {
  if (time.length > 11) { return time; }
  const timeArr = time.split(':');
  const postFix = timeArr[2].split(' ')[1];
  return timeArr[0] + ':' + timeArr[1] + ' ' + postFix;
}

export function decimalToPercentage(decimal) {
  const prefix = decimal > 0 ? '+ ' : '';
  return prefix + (decimal * 100).toFixed(2) + ' %';
}

export function addPlus(value) {
  return value > 0 ? '+ ' + value : value;
}

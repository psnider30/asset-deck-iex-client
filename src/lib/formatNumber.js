export function formatNumber(value) {
  if (!value) { return ' - '}
    const thousand = 1000;
    const million = 1000000;
    const billion = 1000000000;
    const trillion = 1000000000000;

    if (value < thousand) {
        return value.toFixed(2);
    } else if (value >= thousand && value <= 1000000) {
         return  (value/thousand).toFixed(2) + 'k';
    } else if (value >= million && value <= billion) {
        return (value/million).toFixed(2) + 'M';
    } else if (value >= billion && value <= trillion) {
        return (value/billion).toFixed(2) + 'B';
    } else {
        return (value/trillion).toFixed(2) + 'T';
    }
}

export function removeSeconds(time) {
  if (time.length > 11) {return time}
  const timeArr = time.split(':')
  const postFix = timeArr[2].split(' ')[1]
  return timeArr[0] + ':' + timeArr[1] + ' ' + postFix
}

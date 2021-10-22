const timeCalc = (nowTime, rawTime) => {
  const elapsedTime = nowTime - rawTime;
  const minutes = Math.floor(elapsedTime / 1000) / 60;

  if (minutes < 1) {
    return `Just now.`;
  } else if (minutes < 2) {
    return `1 Minute ago`;
  } else if (minutes < 60) {
    return `${Math.floor(minutes)}m`;
  } else if (minutes < 1440) {
    return `${Math.floor(minutes / 60)}h`;
  } else if (minutes < 2880) {
    return `1 Day ago`;
  } else {
    return `${Math.floor(minutes / 1440)}d`;
  }
};

export default timeCalc;

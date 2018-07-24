const dateFormat = date => {
  date = new Date(date);
  var day = date.getDate();
  var monthIndex = date.getMonth() + 1;
  var year = date.getFullYear();
  if (day < 10) {
    day = '0' + day;
  }
  if (monthIndex < 10) {
    monthIndex = '0' + monthIndex;
  }

  return year + '-' + monthIndex + '-' + day;
};

export default dateFormat;

// Compare dates
function compareDates(date1, date2) {
  const newDate1 = new Date(date1);
  const newDate2 = new Date(date2);
  if (
    newDate1.getDate() === newDate2.getDate() &&
    newDate1.getMonth() === newDate2.getMonth() &&
    newDate1.getYear() === newDate2.getYear()
  ) {
    return true;
  }
  return false;
}

// Compare strings
function compareStrings(string1, string2) {
  return string1.toLowerCase() === string2.toLowerCase();
}

module.exports = { compareDates, compareStrings };

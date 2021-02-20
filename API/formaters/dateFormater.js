function getFormatedDate(date) {
    if (!date) {
      return null;
    }


    const options = {
      year: 'numeric',
      month: 'numeric',
      day: 'numeric',
      hour: 'numeric',
      minute: 'numeric'
    };
    return Intl.DateTimeFormat('ro-RO', options).format(date);
}

function getFormatedDate2(date) {
  if (!date) {
    return null;
  }


  const options = {
    year: 'numeric',
    month: 'numeric',
    day: 'numeric',
  };
  return Intl.DateTimeFormat('ro-RO', options).format(date);
}

module.exports.getFormatedDate2 = getFormatedDate2;
module.exports.getFormatedDate = getFormatedDate;
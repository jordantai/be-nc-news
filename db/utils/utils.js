exports.formatDates = (list) => {
  const formattedDate = list.map((date) => {
    if (Object.keys(date).length > 0) {
      let { created_at: newDate, ...restOfKeys } = date;
      newDate = new Date(date["created_at"]);
      const formatDate = newDate.toLocaleString("en-GB", { hour12: false });
      return { created_at: formatDate, ...restOfKeys };
    } else {
      return {};
    }
  });
  return formattedDate;
};

exports.makeRefObj = (list, key, value) => {
  const refObj = {};
  list.forEach((article) => {
    refObj[article[key]] = article[value];
  });
  return refObj;
};

exports.formatComments = (comments, articleRef) => {};

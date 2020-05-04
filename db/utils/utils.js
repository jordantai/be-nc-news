exports.formatDates = (list) => {
  const formattedDate = list.map((date) => {
    if (Object.keys(date).length > 0) {
      const newDate = new Date(date["created_at"]);
      return (formatDate = {
        created_at: newDate.toLocaleString("en-GB", { hour12: false }),
      });
    } else {
      return {};
    }
  });
  return formattedDate;
};

exports.makeRefObj = (list) => {
  return {};
};

exports.formatComments = (comments, articleRef) => {};

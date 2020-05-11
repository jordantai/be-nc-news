exports.formatDates = (list) => {
  const formattedDate = list.map((date) => {
    if (Object.keys(date).length > 0) {
      let { created_at: newDate, ...restOfKeys } = date;
      newDate = new Date(date["created_at"]);
      return { created_at: newDate, ...restOfKeys };
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

exports.formatComments = (comments, articleRef, keyToChange, keyToCreate) => {
  const newComments = comments.map((comment) => {
    if (articleRef) {
      const {
        created_by: authorValue,
        [keyToChange]: key,
        ...restOfKeys
      } = comment;
      return {
        author: authorValue,
        [keyToCreate]: articleRef[key],
        ...restOfKeys,
      };
    }
  });
  return newComments;
};

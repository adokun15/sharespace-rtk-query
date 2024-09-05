export const SortListByDate = (list = []) => {
  const DateInMillisecond = (date) => {
    const date_ = new Date(date);
    return date_.getTime();
  };

  const newSortedList = list.sort(
    (a, b) => DateInMillisecond(a.timeSent) - DateInMillisecond(b.timeSent)
  );

  return newSortedList;
};

export const FilterList = (list = [], id) => {
  const newFilterList = list.filter((item) => item.id !== id);
  return newFilterList;
};

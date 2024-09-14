export const SortListByDate = (list = []) => {
  const DateInMillisecond = (date) => {
    if (!date) return undefined;
    const date_ = new Date(date);
    return date_.getTime();
  };

  const newSortedList = list
    .map((item) => {
      return {
        ...item,
        milli:
          DateInMillisecond(item?.timeSent) ||
          DateInMillisecond(item?.dateReceived),
      };
    })
    .sort((a, b) => b.milli - a.milli);

  return newSortedList;
};

export const handleDashedString = (date) => {
  const [year, month, day] = date.split("-");

  const monthnew = parseInt(month);
  const newday = parseInt(day) + 1;

  let newDate = new Date(year, monthnew, newday);

  return newDate.toISOString();
};

export const ageHandler = (date) => {
  const dateString = new Date(date);
  const currentDateString = new Date();

  let supposedAge = currentDateString.getFullYear() - dateString.getFullYear(); //16
  if (
    dateString.getMonth() >= currentDateString.getMonth() &&
    dateString.getDate() >= currentDateString.getDate()
  ) {
    supposedAge = supposedAge + 1;
  }

  return +supposedAge;
};

export const NoticeDate = (date) => {
  const dateString = new Date(date);

  return `${dateString.toLocaleTimeString("en-GB", {
    weekday: "long",
    year: "2-digit",
  })}`;
};

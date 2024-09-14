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

export const ChatMessageDate = (date) => {
  const dateString = new Date(date);

  const hours = `${dateString.getHours()}`.padStart(2, "0");
  const minutes = `${dateString.getMinutes()}`.padStart(2, "0");
  return `${hours}:${minutes} ${
    dateString.getHours() >= 12 && dateString.getHours() <= 23 ? "pm" : "am"
  }`;
};

export const NoticeDate = (date) => {
  const dateString = new Date(date);
  const date_ = `${dateString.getFullYear()}/${dateString.getMonth()}/${dateString.getDate()}`;

  return `${date_} ${ChatMessageDate(date)}`;
};

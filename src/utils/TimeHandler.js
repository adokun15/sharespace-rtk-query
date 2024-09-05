export const handleDashedString = (date) => {
  const [year, month, day] = date.split("-");

  const monthnew = parseInt(month);
  const newday = parseInt(day) + 1;

  let newDate = new Date(year, monthnew, newday);

  return newDate.toISOString();
};

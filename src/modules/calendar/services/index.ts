export const getDaysInMonth = (year: number, month: number) => {
  return new Date(year, month, 0).getDate();
};

export const monthFormatter = (date: Date, opt: Intl.DateTimeFormatOptions = { month: 'short' }) => {
  const format = new Intl.DateTimeFormat('ru-RU', opt);

  return `${date.getDate()} ${format.format(date)}`;
};

export const getDaysInMonth = (year: number, month: number) => {
  return new Date(year, month, 0).getDate();
};

export const monthFormatter = (date: Date, opt: Intl.DateTimeFormatOptions = { month: 'short' }) => {
  const format = new Intl.DateTimeFormat('ru-RU', opt);

  return `${date.getDate()} ${format.format(date)}`;
};

export const getControllerType = (path: string) =>
  ({
    '/year': {
      nextLabel: 'Следующий год',
      prevLabel: 'Предыдущий год',
      config: {
        year: 'numeric',
      },
    },
    '/month': {
      nextLabel: 'Следующий месяц',
      prevLabel: 'Предыдущий месяц',
      config: {
        month: 'long',
        year: 'numeric',
      },
    },
  })[path] ?? {
    nextLabel: 'Следующий',
    prevLabel: 'Предыдущий',
    config: {
      year: 'numeric',
    },
  };

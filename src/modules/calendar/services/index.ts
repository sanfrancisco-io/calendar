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

const TOTAL_FIXED_WEEKS = 42;

export const getDates = (date?: Date, fixedWeeks: boolean = false) => {
  const selectedDate = new Date(date ?? new Date());

  const selectedMonthIndex = selectedDate.getMonth();
  const selectedYear = selectedDate.getFullYear();

  const lastWeekdayOfSelectedMonth = new Date(selectedYear, selectedMonthIndex + 1, 0).getDay();
  const firstWeekdayOfSelectedMonth = new Date(selectedYear, selectedMonthIndex, 1).getDay();

  const daysInPreviousMonth = getDaysInMonth(selectedYear, selectedMonthIndex);
  const daysInCurrentMonth = getDaysInMonth(selectedYear, selectedMonthIndex + 1);

  let prevMonthFillerStartDate = daysInPreviousMonth - firstWeekdayOfSelectedMonth + 1;
  const prevMonthFillerDates = Array.from({ length: firstWeekdayOfSelectedMonth }, () => {
    return new Date(selectedYear, selectedMonthIndex - 1, prevMonthFillerStartDate++);
  });

  const currentMonthDates = Array.from({ length: daysInCurrentMonth }, (_, index) => {
    return new Date(selectedYear, selectedMonthIndex, index + 1);
  });

  const nextMonthFillerCount = lastWeekdayOfSelectedMonth < 6 ? 6 - lastWeekdayOfSelectedMonth : 0;
  const nextMonthFillerDates = Array.from(
    {
      length: fixedWeeks
        ? TOTAL_FIXED_WEEKS - (prevMonthFillerDates.length + currentMonthDates.length)
        : nextMonthFillerCount,
    },
    (_, index) => {
      return new Date(selectedYear, selectedMonthIndex + 1, index + 1);
    }
  );

  return {
    dates: [...prevMonthFillerDates, ...currentMonthDates, ...nextMonthFillerDates],
    prevMonthFillerDatesLen: prevMonthFillerDates.length,
    currentMonthDatesLen: currentMonthDates.length,
  };
};
